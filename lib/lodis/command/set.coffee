class Lodis::Command::Set extends Lodis::Command::Base
  __get_set: (key) ->
    new Lodis::DataType::Set(this.__get_from_storage(key)).unpack()

  __save_set: (key, set) ->
    set.pack()
    value = set.toString()
    this.__set_in_storage(key, value)

  sadd: (key, members...) ->
    set = this.__get_set(key)
    set.add(member) for member in members when member not in set.values
    this.__save_set(key, set)

  smembers: (key) ->
    this.__get_set(key).values if this.__exists_in_storage(key)


