class Lodis::DataType::Set extends Lodis::DataType::Base
  type: 3

  constructor: (@values = []) ->

  set: (list) -> this.values = list

  length: ->
    this.values.length

  add: (value) ->
    this.values.push value

  packer: (values) ->
    this.toJSON(values)

  unpack: ->
    super
    this.set this.fromJSON(this.values) if typeof this.values is 'string'
    this
