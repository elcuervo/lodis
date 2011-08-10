class @Lodis
  constructor: ->
    this.storage = window.localStorage
    this.expiration_set = window.sessionStorage

  # Internal commands

  __get_from_storage: (key) -> this.storage.getItem(key)

  __set_in_storage: (key, value) -> this.storage.setItem(key, value)

  __exists_in_storage: (key) -> this.__get_from_storage(key)?

  # String Operations

  __alter_integer_value: (key, quantity) ->
    value = parseInt this.get(key)
    if typeof value is "number"
      value = value + quantity
      this.set(key, value)
      value
    else throw new Lodis::DataType::InvalidType


  append: (key, value) ->
    old_value = this.get(key) or new String
    new_value = old_value + value
    this.set(key, new_value)
    new_value.length

  decr: (key) -> this.decrby(key, 1)

  incr: (key) -> this.incrby(key, 1)

  decrby: (key, quantity) ->
    this.__alter_integer_value(key, -quantity) if this.exists(key)

  incrby: (key, quantity) ->
    this.__alter_integer_value(key, quantity) if this.exists(key)

  set: (key, value) ->
    string = new Lodis::DataType::String
    string.set(value)
    string.pack()
    this.__set_in_storage(key, string.toString())
    true

  exists: (key) -> this.__get_from_storage(key)?

  get: (key) ->
    if this.exists(key)
      new Lodis::DataType::String(this.__get_from_storage(key)).toString()
    else
      null

  # TODO
  setbit: (key, offset, value) ->

  # TODO
  getbit: (key) ->

  getrange: (key, start, end) ->
    if this.exists(key)
      string  = this.get(key)
      start   = string.length + start if start < 0
      end     = string.length + end   if end   < 0
      string.substr start, end + 1

   getset: (key, value) ->
     if this.exists(key)
      old_value = this.get(key)
      this.set(key, value)
      old_value

  mget: (keys...) ->
    result = []
    result.push this.get(key) for key in keys
    result

  mset: (keys_and_values...) ->
    this.set(keys_and_values[i-1], value) for i, value of keys_and_values when i % 2

  msetnx: (keys_and_values...) ->
    return for i, key_or_value of keys_and_values when (!(i % 2) and this.exists(key_or_value))
    this.mset(keys_and_values...)

  setex: (key, expire, value) ->
    this.set(key, value)
    this.expire(key, expire)

  setnx: (key, value) -> this.set(key, value) if !this.exists(key)

  setrange: (key, offset, value) ->
    old_value = if this.exists(key)
      this.get(key).substr(0, offset)
    else
      result = new String
      result += " " for i in [0...offset]
      result

    this.set(key, "#{old_value}#{value}")

  strlen: (key) ->
    if this.exists(key)
      this.get(key).length
    else
      0

  # Keys Operations

  __get_expiration: (key) ->
    JSON.parse this.expiration_set.getItem(key)

  __set_expiration: (key, value) ->
    this.expiration_set.setItem(key, JSON.stringify(value))

  __del_expiration: (key) ->
    this.expiration_set.removeItem(key)

  del: (keys...) ->
    this.storage.removeItem(key) for key in keys
    true

  expire: (key, seconds) ->
    miliseconds = seconds*1000
    timeout_id = setTimeout this._expire_key, miliseconds, key
    value = id: timeout_id, timeout: new Date().getTime() + miliseconds
    this.__set_expiration(key, value)
    true

  expireat: (key, miliseconds) ->
    return false if (miliseconds < new Date().getTime()) or !this.exists(key)
    seconds = (miliseconds - new Date().getTime()) / 1000
    this.expire(key, seconds)
    true

  ttl: (key) ->
    if this.exists(key)
      if value = this.__get_expiration(key)
        Math.floor((value.timeout - new Date().getTime()) / 1000)
      else
        -1

  keys: (regexp) ->
    found_keys = []
    for i in [0...this.dbsize()]
      key = this.storage.key(i)
      found_keys.push key if key.match(regexp)
    found_keys

  persist: (key) ->
    if this.exists(key)
      if value = this.__get_expiration(key)
        clearTimeout value.id
        this.__del_expiration(key)

  rename: (key, new_key) ->
    value = this.get(key)
    this.del(key)
    this.set(new_key, value)

  renamenx: (key, new_key) ->
    this.rename(key, new_key) if !this.exists(new_key)

  # Hash Operations

  __get_from_hash: (key, options = with_keys: true, with_values: true, only: []) ->
    hash = this.__get_hash(key)
    hash.unpack()
    result = []
    for key, value of hash.values
      result.push key   if options["with_keys"]
      result.push value if options["with_values"] or ( options["only"] and key in options["only"])
    result


  __get_hash: (key) ->
    new Lodis::DataType::Hash(this.__get_from_storage(key))

  hexists: (hash_key, key) ->
    if this.__exists_in_storage(hash_key)
      hash = this.__get_hash(hash_key)
      hash.unpack()
      hash.get(key)?

  hset: (hash_key, key, value) ->
    hash = if this.__exists_in_storage(hash_key)
             this.__get_hash(hash_key).unpack()
           else
             new Lodis::DataType::Hash

    hash.add(key, value)
    hash.pack()
    value = hash.toString()
    this.__set_in_storage(hash_key, value)
    true

  hget: (hash_key, key) ->
    if this.__exists_in_storage(hash_key)
      hash = this.__get_hash(hash_key)
      hash.unpack()
      hash.get(key)

  hgetall: (hash_key) ->
    this.__get_from_hash(hash_key) if this.__exists_in_storage(hash_key)

  # XXX
  flushall: ->
    this.storage.clear()
    this.expiration_set.clear()

  dbsize: -> this.storage.length
