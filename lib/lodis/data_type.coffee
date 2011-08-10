class Lodis::DataType
  find: (string) ->
    [type, tail...] = string
    {
      0: Lodis::DataType::String
      1: Lodis::DataType::Hash
      2: Lodis::DataType::List
    }[type]
