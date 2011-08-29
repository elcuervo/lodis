class @Lodis
  constructor: (@storage = new Lodis::Storage::LocalStorage, @expiration_storage = new Lodis::Storage::SessionStorage) ->
    U.extend this, new Lodis::Command::Key
    U.extend this, new Lodis::Command::String
    U.extend this, new Lodis::Command::Hash
    U.extend this, new Lodis::Command::List

  # XXX
  flushall: ->
    this.storage.flush()
    this.expiration_storage.flush()

  dbsize: -> this.storage.size()
