class Lodis::Command::Hash extends Lodis::Command::Base
  __get_from_hash: (key, options = with_keys: true, with_values: true, only: []) ->
    hash = this.__get_hash(key)
    result = []
    for key, value of hash.values
      result.push key   if options["with_keys"]
      result.push value if options["with_values"] or ( options["only"] and key in options["only"])
    result

  __get_hash: (key) ->
    new Lodis::DataType::Hash(this.__get_from_storage(key)).unpack()

  __alter_integer_value_for_hash: (hash_key, key, quantity) ->
    if this.hexists(hash_key, key)
      value = parseInt this.hget(hash_key, key)
      if typeof value is "number"
        new_value = value + quantity
        this.hset(hash_key, key, new_value)
        new_value
      else throw new Lodis::DataType::InvalidType
    else
      this.hset(hash_key, key, quantity)
      quantity

  hexists: (hash_key, key) ->
    if this.__exists_in_storage(hash_key)
      hash = this.__get_hash(hash_key)
      hash.get(key)?

  hset: (hash_key, key, value) ->
    hash = if this.__exists_in_storage(hash_key)
             this.__get_hash(hash_key)
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
      hash.get(key)

  hdel: (hash_key, key) ->
    if this.hexists(hash_key, key)
      hash = this.__get_hash(hash_key)
      hash.remove(key)
      hash.pack()
      value = hash.toString()
      this.__set_in_storage(hash_key, value)
      true
    else
      false

  hgetall: (hash_key) ->
    this.__get_from_hash(hash_key) if this.__exists_in_storage(hash_key)

  hincrby: (hash_key, key, quantity) ->
    this.__alter_integer_value_for_hash(hash_key, key, quantity)

  hkeys: (hash_key) ->
    this.__get_from_hash(hash_key, with_keys: true, with_values: false) if this.exists(hash_key)

  hlen: (hash_key) ->
    this.hkeys(hash_key).length if this.exists(hash_key)

  hmget: (hash_key, keys...) ->
    this.__get_from_hash(hash_key, with_values: true, with_keys: false, only: keys) if this.exists(hash_key)

  hmset: (hash_key, keys_and_values...) ->
    result = new Lodis::DataType::Hash
    result.add(keys_and_values[i-1], value) for i, value of keys_and_values when i % 2
    result.pack()
    value = result.toString()
    this.__set_in_storage(hash_key, value)

  hsetnx: (hash_key, key, value) ->
    if !this.hexists(hash_key, key)
      this.hset(hash_key, key, value)
      true
    else
      false

  hvals: (hash_key) ->
    this.__get_from_hash(hash_key, with_keys: false, with_values: true) if this.exists(hash_key)


