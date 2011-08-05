class @Lodis
  constructor: ->
    this.storage  = window.localStorage

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

  _set_packed: (key, value) ->
    value = this._pack(value)
    this.set(key, value)

  _get_difference_or_intersection_for_sets: (action = 'DIFF', keys...) ->
    [head, tail...] = keys
    set = this._get_set(head)
    other_set = result = []
    other_set = other_set.concat(this._get_set(key)) for key in tail

    for value in set
      condition = switch action.toUpperCase()
        when 'DIFF'  then value not in other_set
        when 'INTER' then value in other_set
      result.push value if condition

    result.reverse()

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
    timeout_id = setTimeout this._expire_key, miliseconds, key
    this._expiration_hash[key] = id: timeout_id, timeout: new Date().getTime() + miliseconds
    true

  expireat: (key, miliseconds) ->
    return false if (miliseconds < new Date().getTime()) or !this.exists(key)
    seconds = (miliseconds - new Date().getTime()) / 1000
    this.expire key, seconds
    true

  ttl: (key) ->
    if this.exists(key)
      if this._expiration_hash[key]
        Math.floor((this._expiration_hash[key].timeout - new Date().getTime()) / 1000)
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
    result = [result] if result.constructor is String
    result

  lpush: (key, item) ->
    set = this._get_set(key)
    set.unshift(item)
    this._set_packed(key, set)

  rpush: (key, item) ->
    set = this._get_set(key)
    set.push(item)
    this._set_packed(key, set)

  rpushx: (key, item) ->
    this.rpush(key, item) if this.exists(key)

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
    this._set_packed(hash_key, hash)
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
    this._set_packed(hash_key, result)

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
      this._set_packed(key, result)

  llen: (key) ->
    if this.exists(key)
      set = this._get_set(key)
      set.length

  lpop: (key) ->
    if this.exists(key)
      set = this._get_set(key)
      value = set[1..-1]
      this._set_packed(key, value)

  lpushx: (key, value) ->
    if this.exists(key)
      this.lpush(key, value)
    else
      false

  lrem: (key, count, item) ->
    if this.exists(key)
      quantity = Math.abs(count)
      set = this._get_set(key)
      set = set.reverse() if count < 0
      result = []

      for value in set
        if value == item and quantity > 0
          quantity -= 1
        else
          result.push value

      result = result.reverse() if count < 0
      this._set_packed(key, result)

  lset: (key, index, value) ->
    if this.exists(key)
      set = this._get_set(key)
      index = set.length + index if index < 0
      set[index] = value
      this._set_packed(key, set)

  ltrim: (key, start, end) ->
    if this.exists(key)
      set = this._get_set(key)
      end = set.length + end if end < 0
      result = set[start..end]
      this._set_packed(key, result)

  mget: (keys...) ->
    result = []
    result.push this.get(key) for key in keys
    result

  mset: (keys_and_values...) ->
    this.set(keys_and_values[i-1], value) for i, value of keys_and_values when i % 2

  msetnx: (keys_and_values...) ->
    return for i, key_or_value of keys_and_values when (!(i % 2) and this.exists(key_or_value))
    this.mset(keys_and_values...)

  persist: (key) ->
    if this.exists(key)
      if this._expiration_hash[key]
        clearTimeout this._expiration_hash[key].id
        delete this._expiration_hash[key]

  ping: -> "PONG"

  randomkey: ->
    keys = this.keys()
    keys[Math.floor(Math.random() * keys.length)]

  rename: (key, new_key) ->
    value = this.get(key)
    this.del(key)
    this.set(new_key, value)

  renamenx: (key, new_key) ->
    this.rename(key, new_key) if !this.exists(new_key)

  rpop: (key) ->
    if this.exists(key)
      set = this._get_set(key)
      value = set.pop()
      this._set_packed(key, set)
      value

  rpoplpush: (hash_key, other_hash_key) ->
    if this.exists(hash_key)
      value = this.rpop(hash_key)
      this.lpush(other_hash_key, value)
      value

  sadd: (key, members...) ->
    set = this._get_set(key)
    this.lpush(key, member) for member in members when member not in set

  smembers: (key) ->
    this._get_set(key) if this.exists(key)

  save: -> true # ?

  scard: (key) ->
    this._get_set(key).length

  sdiff: (keys...) ->
    this._get_difference_or_intersection_for_sets('DIFF', keys...)

  sdiffstore: (destination, keys...) ->
    this._set_packed(destination, this.sdiff(keys...))

  select: (db) -> db is 0

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

  shutdown: -> true # ?

  sinter: (keys...) ->
    this._get_difference_or_intersection_for_sets('INTER', keys...)

  sinterstore: (destination, keys...) ->
    this._set_packed(destination, this.sinter(keys...))

  sismember: (key, value) ->
    if this.exists(key)
      set = this._get_set(key)
      set.indexOf(value) > -1

