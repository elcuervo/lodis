class Lodis::Command::String extends Lodis::Command::Base
  __alter_integer_value: (key, quantity) ->
    if this.exists(key)
      value = parseInt this.get(key)
      if typeof value is "number"
        value = value + quantity
        this.set(key, value)
        value
      else throw new Lodis::DataType::InvalidType
    else
      this.set(key, quantity)

  append: (key, value) ->
    old_value = this.get(key) or ""
    new_value = old_value.toString() + value
    this.set(key, new_value)
    new_value.length

  decr: (key) -> this.decrby(key, 1)

  incr: (key) -> this.incrby(key, 1)

  decrby: (key, quantity) ->
    this.__alter_integer_value(key, -quantity)

  incrby: (key, quantity) ->
    this.__alter_integer_value(key, quantity)

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
      result = ""
      result += " " for i in [0...offset]
      result

    this.set(key, "#{old_value}#{value}")

  strlen: (key) ->
    if this.exists(key)
      this.get(key).length
    else
      0
