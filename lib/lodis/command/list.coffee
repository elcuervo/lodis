class Lodis::Command::List extends Lodis::Command::Base
  __get_list: (key) ->
    new Lodis::DataType::List(this.__get_from_storage(key)).unpack()

  __save_list: (key, list, array) ->
    list.set(array)
    list.pack()
    value = list.toString()
    this.__set_in_storage(key, value)

  llen: (key) ->
    if this.__exists_in_storage(key)
      list = this.__get_list(key)
      list.length()

  lindex: (key, index) ->
    if this.__exists_in_storage(key)
      list = this.__get_list(key)
      index = list.length() + index if index < 0
      list.values[index] or false

  blpop: (key) -> this.lpop(key)

  lpop: (key) ->
    if this.__exists_in_storage(key)
      list = this.__get_list(key)
      value = list.values[1..-1]
      list.set value
      list.pack()
      value = list.toString()
      this.__set_in_storage(key, value)
      value

  lpushx: (key, value) ->
    if this.__exists_in_storage(key)
      this.lpush(key, value)
    else
      false

  lrem: (key, count, item) ->
    if this.__exists_in_storage(key)
      quantity = Math.abs(count)
      list = this.__get_list(key)
      array = list.values
      array = array.reverse() if count < 0
      result = []

      for value in array
        if value == item and quantity > 0
          quantity -= 1
        else
          result.push value

      result = result.reverse() if count < 0
      list.set result
      list.pack()
      value = list.toString()
      this.__set_in_storage(key, value)

  linsert: (key, direction, reference_value, value) ->
    if this.__exists_in_storage(key)
      direction = switch direction.toUpperCase()
        when "BEFORE" then -1
        when "AFTER"  then 1

      list = this.__get_list(key)
      values = list.values
      reference_value = values.indexOf(reference_value) + direction
      [left_side, right_side] = [values[0...reference_value], values[reference_value..-1]]

      result = left_side.concat([value])
      result = result.concat(right_side)
      list.set result
      list.pack()
      result = list.toString()
      this.__set_in_storage(key, result)

  rpush: (key, values...) ->
    list = this.__get_list(key)
    list.add(value) for value in values
    length = list.length()
    list.pack()
    value = list.toString()
    this.__set_in_storage(key, value)
    length

  lrange: (key, start, end) ->
    end += 1
    list = this.__get_list(key)
    end = list.length() + end if end < 1
    result = list.values.slice(start, end)
    result = [result] if result.constructor is String
    result

  lpush: (key, values...) ->
    list = this.__get_list(key)
    array = list.values
    array.unshift value for value in values
    this.__save_list(key, list, array)
    list.length()

   lset: (key, index, value) ->
    if this.__exists_in_storage(key)
      list = this.__get_list(key)
      array = list.values
      index = array.length + index if index < 0
      array[index] = value
      this.__save_list(key, list, array)

   ltrim: (key, start, end) ->
    if this.__exists_in_storage(key)
      list = this.__get_list(key)
      array = list.values
      end = array.length + end if end < 0
      result = array[start..end]
      this.__save_list(key, list, result)

  brpop: (key) -> this.rpop(key)

  rpop: (key) ->
    if this.__exists_in_storage(key)
      list = this.__get_list(key)
      array = list.values
      value = array.pop()
      this.__save_list(key, list, array)
      value

  brpoplpush: (key, other_key) -> this.rpoplpush(key, other_key)

  rpoplpush: (key, other_key) ->
    if this.__exists_in_storage(key)
      value = this.rpop(key)
      this.lpush(other_key, value)
      value

  rpushx: (key, item) ->
    this.rpush(key, item) if this.__exists_in_storage(key)
