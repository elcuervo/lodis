# Behave using LinkedList
# Notation: (1,'foo','bar','baz',33)
class Lodis::DataType::List extends Lodis::DataType::Base
  type: 2

  # Parse from a array based this.values during initialization
  parse: -> new LinkedList this.values
