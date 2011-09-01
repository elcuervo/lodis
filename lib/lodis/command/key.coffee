class Lodis::Command::Key extends Lodis::Command::Base
  __expire_key: (key, storage, expiration_storage) =>
    storage.remove(key)
    expiration_storage.remove(key)

  __get_expiration: (key) ->
    JSON.parse this.expiration_storage.get(key)

  __set_expiration: (key, value) ->
    this.expiration_storage.set(key, JSON.stringify(value))

  __del_expiration: (key) ->
    this.expiration_storage.remove(key)

  del: (keys...) ->
    this.storage.remove(key) for key in keys
    true

  expire: (key, seconds) ->
    miliseconds = seconds*1000
    timeout_id = setTimeout(this.__expire_key, miliseconds, key, this.storage, this.expiration_storage)
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
      key = this.storage.index(i)
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