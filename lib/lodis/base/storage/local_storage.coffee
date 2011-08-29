class Lodis::Storage::LocalStorage
  constructor: ->
    this.storage = window.localStorage

  set: (key, value) ->
    this.storage.setItem(key, value)

  get: (key) ->
    this.storage.getItem(key)

  remove: (key) ->
    this.storage.removeItem(key)

  flush: ->
    this.storage.clear()

  index: (index) ->
    this.storage.key(index)

  size: ->
    this.storage.length
