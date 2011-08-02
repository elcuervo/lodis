class @Lodis

  constructor: ->
    this.storage = window.localStorage

  _pack:   (value) -> JSON.stringify value

  _unpack: (value) -> JSON.parse value

  _expire_key: (key) =>
    this.del(key)
    delete this._expiration_hash[key]

  _get_set: (key) ->
    this._unpack(this.get(key)) or []

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

  decrby: (key, quantity = 1) ->
    if this.exists(key)
      value = parseInt this.get(key)
      if typeof value is "number"
        value -= quantity
        this.set(key, value)
        value
      else
        throw new Error

  incr: (key) ->
    if this.exists(key)
      value = parseInt this.get(key)
      if typeof value is "number"
        value += 1
        this.set(key, value)
        value
      else
        throw new Error

  lpop: (hash) ->

  rpop: (hash) ->
