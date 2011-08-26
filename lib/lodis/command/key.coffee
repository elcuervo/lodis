class Lodis::Command::Key extends Lodis::Command::Base
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
