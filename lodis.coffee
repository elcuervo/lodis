class @Lodis

  constructor: ->
    this.storage = window.localStorage

  _pack:   (value) -> JSON.stringify value

  _unpack: (value) -> JSON.parse value

  _expire_key: (key) =>
    this.del(key)
    delete this._expiration_hash[key]

  _get_set_or_default: (key, default_value) ->
    this._unpack(this.get(key)) or default_value

  _get_set: (key) ->
    this._get_set_or_default(key, [])

  _get_hash: (key) ->
    this._get_set_or_default(key, {})

  _get_from_hash: (key, options = with_keys: true, with_values: true, only: []) ->
    hash = this._get_hash(key)
    result = []
    for key, value of hash
      result.push key   if options["with_keys"]
      result.push value if options["with_values"] or ( options["only"] and key in options["only"])
    result

  _alter_int_value: (key, quantity) ->
   if this.exists(key)
      value = parseInt this.get(key)
      if typeof value is "number"
        value = value + quantity
        this.set(key, value)
        value
      else
        throw new Error

  _expiration_hash: {}

  del: (keys...) ->
    this.storage.removeItem(key) for key in keys
    true

  set: (key, value) ->
    this.storage.setItem(key, value)
    true

  get: (key) ->
    this.storage.getItem(key)

  exists: (key) ->
    this.get(key)?

  dbsize: -> this.storage.length

  keys: (regexp) ->
    found_keys = []
    for i in [0..this.dbsize() - 1]
      key = this.storage.key(i)
      found_keys.push key if key.match(regexp)
    found_keys

  expire: (key, seconds) ->
    miliseconds = seconds*1000
    this._expiration_hash[key] = new Date().getTime() + miliseconds
    setTimeout this._expire_key, miliseconds, key
    true

  expireat: (key, miliseconds) ->
    return false if (miliseconds < new Date().getTime()) or !this.exists(key)
    seconds = (miliseconds - new Date().getTime()) / 1000
    this.expire key, seconds
    true

  ttl: (key) ->
    if this.exists(key)
      if this._expiration_hash[key]
        Math.floor((this._expiration_hash[key] - new Date().getTime()) / 1000)
      else
        -1

  append: (key, value) ->
    this.set(key, "#{this.get(key)}#{value}") if this.exists(key)

  auth: (password) ->
    true # this should do someting?

  bgrewriteaof: -> true

  bgsave: -> true

  blpop: ->

  lrange: (key, start, end) ->
    end += 1
    set = this._get_set(key)
    end = set.length + end if end < 1
    result = set.slice(start, end)

  lpush: (key, item) ->
    set = this._get_set(key)
    set.unshift(item)
    this.set key, this._pack(set)

  rpush: (key, item) ->
    set = this._get_set(key)
    set.push(item)
    this.set key, this._pack(set)

  decr: (key) ->
    this.decrby(key, 1)

  incr: (key) ->
    this.incrby(key, 1)

  decrby: (key, quantity = 1) ->
    this._alter_int_value(key, -quantity)

  incrby: (key, quantity = 1) ->
    this._alter_int_value(key, quantity)

  echo: (message) -> message

  flushall: ->
    this.storage.clear()

  flushdb: ->
    this.flushall()

  getrange: (key, start, end) ->
    if this.exists(key)
      string = this.get(key)
      start = string.length + start if start < 0
      end   = string.length + end   if end   < 0
      string.substr start, end + 1

  getset: (key, value) ->
    if this.exists(key)
      old_value = this.get(key)
      this.set(key, value)
      old_value

  hset: (hash_key, key, value) ->
    hash = this._get_hash(hash_key)
    hash[key] = value
    value = this._pack(hash)
    this.set(hash_key, value)
    true

  hget: (hash_key, key) ->
    if this.exists(hash_key)
      hash = this._get_hash(hash_key)
      hash[key]

  hgetall: (hash_key) ->
    this._get_from_hash(hash_key) if this.exists(hash_key)

  hexists: (hash_key, key) ->
    this.hget(hash_key, key)?

  hkeys: (hash_key) ->
    this._get_from_hash(hash_key, with_keys: true, with_values: false) if this.exists(hash_key)

  hlen: (hash_key) ->
    this.hkeys(hash_key).length if this.exists(hash_key)

  hincrby: (hash_key, key, quantity) ->
    if this.hexists(hash_key, key)
      old_value = parseInt this.hget(hash_key, key)
      if typeof old_value is "number"
        new_value = old_value + quantity
        this.hset(hash_key, key, new_value)
        new_value
      else
        throw new Error("Invalid type")

  hmget: (hash_key, keys...) ->
    this._get_from_hash(hash_key, with_values: true, with_keys: false, only: keys) if this.exists(hash_key)

  hmset: (hash_key, keys_and_values...) ->
    result = {}
    result[keys_and_values[i-1]] = value for i, value of keys_and_values when i % 2
    value = this._pack(result)
    this.set(hash_key, value)

  hsetnx: (hash_key, key, value) ->
    if !this.exists(hash_key)
      this.hset(hash_key, key, value)
      true
    else
      false

  hvals: (hash_key) ->
    this._get_from_hash(hash_key, with_keys: false, with_values: true) if this.exists(hash_key)

  lindex: (key, index) ->
    if this.exists(key)
      hash = this._get_set(key)
      index = hash.length + index if index < 0
      hash[index] or false

  linsert: (key, direction, reference_value, value) ->
    if this.exists(key)
      direction = switch direction.toUpperCase()
        when "BEFORE" then -1
        when "AFTER"  then 1

      set = this._get_set(key)
      reference_value = set.indexOf(reference_value) + direction
      [left_side, right_side] = [set[0...reference_value], set[reference_value..-1]]

      result = left_side.concat([value])
      result = result.concat(right_side)
      value = this._pack(result)
      this.set(key, value)

  llen: (key) ->
    if this.exists(key)
      set = this._get_set(key)
      set.length

  lpop: (key) ->
    if this.exists(key)
      set = this._get_set(key)
      value = set[1..-1]
      this.set key, this._pack(value)


  rpop: (key) ->
