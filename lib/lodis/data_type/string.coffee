# Behave using String
# Notation 'string'
class Lodis::DataType::String extends Lodis::DataType::Base
  type: 0

  set: (string) ->
    this.values = string

  parse: -> this.toJSON this.values
