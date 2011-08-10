# # DataType::Base
#
# Here is where the main implementation of packing is made.
# All the other datatypes inherit this class to use its packing capabilities and properties definition.
#

class Lodis::DataType::InvalidType < Error

class Lodis::DataType::Base
  constructor: (@values) ->
    this.unpack()

  toJSON: (string) -> JSON.stringify string

  fromJSON: (string) -> JSON.parse string

  toString: -> this.values

  parse: (string) -> string

  # Packs all the given data for a given type
  pack: ->
    this.values = "#{this.type.toString()}#{this.packer(this.values)}"

  packer: (values) -> values

  check_valid_type: (type) ->
    throw new Lodis::DataType::InvalidType if (parseInt type != this.type)

  unpack: ->
    if this.values?.length
      [head, tail...] = this.values
      this.check_valid_type(head)
      this.values = tail.join('')
      this
