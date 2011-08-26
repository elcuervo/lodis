class Lodis::Command::Base
  __get_from_storage: (key) -> this.storage.getItem(key)

  __set_in_storage: (key, value) -> this.storage.setItem(key, value)

  __exists_in_storage: (key) -> this.__get_from_storage(key)?


