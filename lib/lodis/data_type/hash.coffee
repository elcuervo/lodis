class Lodis::DataType::Hash extends Lodis::DataType::Base
  type: 1

  constructor: (@values = {}) ->

  packer: (values) ->
    this.toJSON(values)

  unpack: ->
    super
    console.warn this.values
    this.set this.fromJSON this.values

  set: (hash) -> this.values = hash

  add: (key, value) -> this.values[key] = value

  get: (key) ->
    this.values[key]
