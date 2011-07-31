class @Gerbis

  constructor: ->
    this.storage = window.localStorage

  _pack:   (value) -> JSON.stringify value

  _unpack: (value) -> JSON.parse value

  _expire_key: (key) =>
    this.del(key)
    delete this._expiration_hash[key]

  _expiration_hash: {}

  del: (keys...) ->
    this.storage.removeItem(key) for key in keys
    true

  set: (key, value) ->
    this.storage.setItem(key, this._pack value)
    true

  get: (key) ->
    this._unpack this.storage.getItem(key)

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
