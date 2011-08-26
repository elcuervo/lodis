class @Lodis
  constructor: ->
    this.storage = window.localStorage
    this.expiration_set = window.sessionStorage

    U.extend this, new Lodis::Command::String
    U.extend this, new Lodis::Command::Key
    U.extend this, new Lodis::Command::Hash

  # XXX
  flushall: ->
    this.storage.clear()
    this.expiration_set.clear()

  dbsize: -> this.storage.length
