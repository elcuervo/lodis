class @Node
  next: null
  prev: null

  constructor: (@value) ->

  toString: -> @value

class @LinkedList
  first: null
  length: 0
  constructor: (values = false) ->
    if values.length
      this.add value for value in values
    this

  add: (values...) ->
    for value in values
      node = new Node(value)
      if this.first?
        current = this.first
        current = current.next while current.next?
        current.next = node
      else
        this.first = node

      this.length++

  remove: (index) ->
    if -1 < index < this.length
      current = this.first
      i = 0
      if index is 0
        this.first = current.next
      else
        while i++ < index
          previous = current
          current = current.next

        previous.next = current.next

      this.length--
      current.value

  item: (index) ->
    if -1 < index < this.length
      current = this.first
      i = 0
      current = current.next while i++ < index
      current.value
