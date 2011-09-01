(function() {
  var __slice = Array.prototype.slice, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Node = (function() {
    Node.prototype.next = null;
    Node.prototype.prev = null;
    function Node(value) {
      this.value = value;
    }
    Node.prototype.toString = function() {
      return this.value;
    };
    return Node;
  })();
  this.LinkedList = (function() {
    LinkedList.prototype.first = null;
    LinkedList.prototype.length = 0;
    function LinkedList(values) {
      var value, _i, _len;
      if (values == null) {
        values = false;
      }
      if (values.length) {
        for (_i = 0, _len = values.length; _i < _len; _i++) {
          value = values[_i];
          this.add(value);
        }
      }
      this;
    }
    LinkedList.prototype.add = function() {
      var current, node, value, values, _i, _len, _results;
      values = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _results = [];
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        value = values[_i];
        node = new Node(value);
        if (this.first != null) {
          current = this.first;
          while (current.next != null) {
            current = current.next;
          }
          current.next = node;
        } else {
          this.first = node;
        }
        _results.push(this.length++);
      }
      return _results;
    };
    LinkedList.prototype.remove = function(index) {
      var current, i, previous;
      if ((-1 < index && index < this.length)) {
        current = this.first;
        i = 0;
        if (index === 0) {
          this.first = current.next;
        } else {
          while (i++ < index) {
            previous = current;
            current = current.next;
          }
          previous.next = current.next;
        }
        this.length--;
        return current.value;
      }
    };
    LinkedList.prototype.item = function(index) {
      var current, i;
      if ((-1 < index && index < this.length)) {
        current = this.first;
        i = 0;
        while (i++ < index) {
          current = current.next;
        }
        return current.value;
      }
    };
    return LinkedList;
  })();
  this.U = {};
  this.U.extend = function(obj) {
    var head, key, tail, value;
    head = arguments[0], tail = arguments[1];
    for (key in tail) {
      value = tail[key];
      obj[key] = value;
    }
    return obj;
  };
  this.Lodis = (function() {
    function Lodis(storage, expiration_storage) {
      this.storage = storage != null ? storage : new Lodis.prototype.Storage.prototype.LocalStorage;
      this.expiration_storage = expiration_storage != null ? expiration_storage : new Lodis.prototype.Storage.prototype.SessionStorage;
      U.extend(this, new Lodis.prototype.Command.prototype.Key);
      U.extend(this, new Lodis.prototype.Command.prototype.String);
      U.extend(this, new Lodis.prototype.Command.prototype.Hash);
      U.extend(this, new Lodis.prototype.Command.prototype.List);
      U.extend(this, new Lodis.prototype.Command.prototype.Set);
    }
    Lodis.prototype.flushall = function() {
      this.storage.flush();
      return this.expiration_storage.flush();
    };
    Lodis.prototype.dbsize = function() {
      return this.storage.size();
    };
    return Lodis;
  })();
  Lodis.prototype.Storage = (function() {
    function Storage() {}
    return Storage;
  })();
  Lodis.prototype.Storage.prototype.LocalStorage = (function() {
    function LocalStorage() {
      this.storage = window.localStorage;
    }
    LocalStorage.prototype.set = function(key, value) {
      return this.storage.setItem(key, value);
    };
    LocalStorage.prototype.get = function(key) {
      return this.storage.getItem(key);
    };
    LocalStorage.prototype.remove = function(key) {
      return this.storage.removeItem(key);
    };
    LocalStorage.prototype.flush = function() {
      return this.storage.clear();
    };
    LocalStorage.prototype.index = function(index) {
      return this.storage.key(index);
    };
    LocalStorage.prototype.size = function() {
      return this.storage.length;
    };
    return LocalStorage;
  })();
  Lodis.prototype.Storage.prototype.SessionStorage = (function() {
    function SessionStorage() {
      this.storage = window.sessionStorage;
    }
    SessionStorage.prototype.set = function(key, value) {
      return this.storage.setItem(key, value);
    };
    SessionStorage.prototype.get = function(key) {
      return this.storage.getItem(key);
    };
    SessionStorage.prototype.remove = function(key) {
      return this.storage.removeItem(key);
    };
    SessionStorage.prototype.flush = function() {
      return this.storage.clear();
    };
    SessionStorage.prototype.index = function(index) {
      return this.storage.key(index);
    };
    SessionStorage.prototype.size = function() {
      return this.storage.length;
    };
    return SessionStorage;
  })();
  Lodis.prototype.Command = (function() {
    function Command() {}
    return Command;
  })();
  Lodis.prototype.Command.prototype.Base = (function() {
    function Base() {}
    Base.prototype.__get_from_storage = function(key) {
      return this.storage.get(key);
    };
    Base.prototype.__set_in_storage = function(key, value) {
      return this.storage.set(key, value);
    };
    Base.prototype.__exists_in_storage = function(key) {
      return this.__get_from_storage(key) != null;
    };
    return Base;
  })();
  Lodis.prototype.Command.prototype.Hash = (function() {
    __extends(Hash, Lodis.prototype.Command.prototype.Base);
    function Hash() {
      Hash.__super__.constructor.apply(this, arguments);
    }
    Hash.prototype.__get_from_hash = function(key, options) {
      var hash, result, value, _ref;
      if (options == null) {
        options = {
          with_keys: true,
          with_values: true,
          only: []
        };
      }
      hash = this.__get_hash(key);
      result = [];
      _ref = hash.values;
      for (key in _ref) {
        value = _ref[key];
        if (options["with_keys"]) {
          result.push(key);
        }
        if (options["with_values"] || (options["only"] && __indexOf.call(options["only"], key) >= 0)) {
          result.push(value);
        }
      }
      return result;
    };
    Hash.prototype.__get_hash = function(key) {
      return new Lodis.prototype.DataType.prototype.Hash(this.__get_from_storage(key)).unpack();
    };
    Hash.prototype.__alter_integer_value_for_hash = function(hash_key, key, quantity) {
      var new_value, value;
      if (this.hexists(hash_key, key)) {
        value = parseInt(this.hget(hash_key, key));
        if (typeof value === "number") {
          new_value = value + quantity;
          this.hset(hash_key, key, new_value);
          return new_value;
        } else {
          throw new Lodis.prototype.DataType.prototype.InvalidType;
        }
      } else {
        this.hset(hash_key, key, quantity);
        return quantity;
      }
    };
    Hash.prototype.hexists = function(hash_key, key) {
      var hash;
      if (this.__exists_in_storage(hash_key)) {
        hash = this.__get_hash(hash_key);
        return hash.get(key) != null;
      }
    };
    Hash.prototype.hset = function(hash_key, key, value) {
      var hash;
      hash = this.__exists_in_storage(hash_key) ? this.__get_hash(hash_key) : new Lodis.prototype.DataType.prototype.Hash;
      hash.add(key, value);
      hash.pack();
      value = hash.toString();
      this.__set_in_storage(hash_key, value);
      return true;
    };
    Hash.prototype.hget = function(hash_key, key) {
      var hash;
      if (this.__exists_in_storage(hash_key)) {
        hash = this.__get_hash(hash_key);
        return hash.get(key);
      }
    };
    Hash.prototype.hdel = function(hash_key, key) {
      var hash, value;
      if (this.hexists(hash_key, key)) {
        hash = this.__get_hash(hash_key);
        hash.remove(key);
        hash.pack();
        value = hash.toString();
        this.__set_in_storage(hash_key, value);
        return true;
      } else {
        return false;
      }
    };
    Hash.prototype.hgetall = function(hash_key) {
      if (this.__exists_in_storage(hash_key)) {
        return this.__get_from_hash(hash_key);
      }
    };
    Hash.prototype.hincrby = function(hash_key, key, quantity) {
      return this.__alter_integer_value_for_hash(hash_key, key, quantity);
    };
    Hash.prototype.hkeys = function(hash_key) {
      if (this.exists(hash_key)) {
        return this.__get_from_hash(hash_key, {
          with_keys: true,
          with_values: false
        });
      }
    };
    Hash.prototype.hlen = function(hash_key) {
      if (this.exists(hash_key)) {
        return this.hkeys(hash_key).length;
      }
    };
    Hash.prototype.hmget = function() {
      var hash_key, keys;
      hash_key = arguments[0], keys = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (this.exists(hash_key)) {
        return this.__get_from_hash(hash_key, {
          with_values: true,
          with_keys: false,
          only: keys
        });
      }
    };
    Hash.prototype.hmset = function() {
      var hash_key, i, keys_and_values, result, value;
      hash_key = arguments[0], keys_and_values = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      result = new Lodis.prototype.DataType.prototype.Hash;
      for (i in keys_and_values) {
        value = keys_and_values[i];
        if (i % 2) {
          result.add(keys_and_values[i - 1], value);
        }
      }
      result.pack();
      value = result.toString();
      return this.__set_in_storage(hash_key, value);
    };
    Hash.prototype.hsetnx = function(hash_key, key, value) {
      if (!this.hexists(hash_key, key)) {
        this.hset(hash_key, key, value);
        return true;
      } else {
        return false;
      }
    };
    Hash.prototype.hvals = function(hash_key) {
      if (this.exists(hash_key)) {
        return this.__get_from_hash(hash_key, {
          with_keys: false,
          with_values: true
        });
      }
    };
    return Hash;
  })();
  Lodis.prototype.Command.prototype.Key = (function() {
    __extends(Key, Lodis.prototype.Command.prototype.Base);
    function Key() {
      this.__expire_key = __bind(this.__expire_key, this);
      Key.__super__.constructor.apply(this, arguments);
    }
    Key.prototype.__expire_key = function(key, storage, expiration_storage) {
      storage.remove(key);
      return expiration_storage.remove(key);
    };
    Key.prototype.__get_expiration = function(key) {
      return JSON.parse(this.expiration_storage.get(key));
    };
    Key.prototype.__set_expiration = function(key, value) {
      return this.expiration_storage.set(key, JSON.stringify(value));
    };
    Key.prototype.__del_expiration = function(key) {
      return this.expiration_storage.remove(key);
    };
    Key.prototype.del = function() {
      var key, keys, _i, _len;
      keys = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        key = keys[_i];
        this.storage.remove(key);
      }
      return true;
    };
    Key.prototype.expire = function(key, seconds) {
      var miliseconds, timeout_id, value;
      miliseconds = seconds * 1000;
      timeout_id = setTimeout(this.__expire_key, miliseconds, key, this.storage, this.expiration_storage);
      value = {
        id: timeout_id,
        timeout: new Date().getTime() + miliseconds
      };
      this.__set_expiration(key, value);
      return true;
    };
    Key.prototype.expireat = function(key, miliseconds) {
      var seconds;
      if ((miliseconds < new Date().getTime()) || !this.exists(key)) {
        return false;
      }
      seconds = (miliseconds - new Date().getTime()) / 1000;
      this.expire(key, seconds);
      return true;
    };
    Key.prototype.ttl = function(key) {
      var value;
      if (this.exists(key)) {
        if (value = this.__get_expiration(key)) {
          return Math.floor((value.timeout - new Date().getTime()) / 1000);
        } else {
          return -1;
        }
      }
    };
    Key.prototype.keys = function(regexp) {
      var found_keys, i, key, _ref;
      found_keys = [];
      for (i = 0, _ref = this.dbsize(); 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        key = this.storage.index(i);
        if (key.match(regexp)) {
          found_keys.push(key);
        }
      }
      return found_keys;
    };
    Key.prototype.persist = function(key) {
      var value;
      if (this.exists(key)) {
        if (value = this.__get_expiration(key)) {
          clearTimeout(value.id);
          return this.__del_expiration(key);
        }
      }
    };
    Key.prototype.rename = function(key, new_key) {
      var value;
      value = this.get(key);
      this.del(key);
      return this.set(new_key, value);
    };
    Key.prototype.renamenx = function(key, new_key) {
      if (!this.exists(new_key)) {
        return this.rename(key, new_key);
      }
    };
    return Key;
  })();
  Lodis.prototype.Command.prototype.List = (function() {
    __extends(List, Lodis.prototype.Command.prototype.Base);
    function List() {
      List.__super__.constructor.apply(this, arguments);
    }
    List.prototype.__get_list = function(key) {
      return new Lodis.prototype.DataType.prototype.List(this.__get_from_storage(key)).unpack();
    };
    List.prototype.__save_list = function(key, list, array) {
      var value;
      list.set(array);
      list.pack();
      value = list.toString();
      return this.__set_in_storage(key, value);
    };
    List.prototype.llen = function(key) {
      var list;
      if (this.__exists_in_storage(key)) {
        list = this.__get_list(key);
        return list.length();
      }
    };
    List.prototype.lindex = function(key, index) {
      var list;
      if (this.__exists_in_storage(key)) {
        list = this.__get_list(key);
        if (index < 0) {
          index = list.length() + index;
        }
        return list.values[index] || false;
      }
    };
    List.prototype.blpop = function(key) {
      return this.lpop(key);
    };
    List.prototype.lpop = function(key) {
      var list, value;
      if (this.__exists_in_storage(key)) {
        list = this.__get_list(key);
        value = list.values.slice(1);
        list.set(value);
        list.pack();
        value = list.toString();
        this.__set_in_storage(key, value);
        return value;
      }
    };
    List.prototype.lpushx = function(key, value) {
      if (this.__exists_in_storage(key)) {
        return this.lpush(key, value);
      } else {
        return false;
      }
    };
    List.prototype.lrem = function(key, count, item) {
      var array, list, quantity, result, value, _i, _len;
      if (this.__exists_in_storage(key)) {
        quantity = Math.abs(count);
        list = this.__get_list(key);
        array = list.values;
        if (count < 0) {
          array = array.reverse();
        }
        result = [];
        for (_i = 0, _len = array.length; _i < _len; _i++) {
          value = array[_i];
          if (value === item && quantity > 0) {
            quantity -= 1;
          } else {
            result.push(value);
          }
        }
        if (count < 0) {
          result = result.reverse();
        }
        list.set(result);
        list.pack();
        value = list.toString();
        return this.__set_in_storage(key, value);
      }
    };
    List.prototype.linsert = function(key, direction, reference_value, value) {
      var left_side, list, result, right_side, values, _ref;
      if (this.__exists_in_storage(key)) {
        direction = (function() {
          switch (direction.toUpperCase()) {
            case "BEFORE":
              return -1;
            case "AFTER":
              return 1;
          }
        })();
        list = this.__get_list(key);
        values = list.values;
        reference_value = values.indexOf(reference_value) + direction;
        _ref = [values.slice(0, reference_value), values.slice(reference_value)], left_side = _ref[0], right_side = _ref[1];
        result = left_side.concat([value]);
        result = result.concat(right_side);
        list.set(result);
        list.pack();
        result = list.toString();
        return this.__set_in_storage(key, result);
      }
    };
    List.prototype.rpush = function() {
      var key, length, list, value, values, _i, _len;
      key = arguments[0], values = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      list = this.__get_list(key);
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        value = values[_i];
        list.add(value);
      }
      length = list.length();
      list.pack();
      value = list.toString();
      this.__set_in_storage(key, value);
      return length;
    };
    List.prototype.lrange = function(key, start, end) {
      var list, result;
      end += 1;
      list = this.__get_list(key);
      if (end < 1) {
        end = list.length() + end;
      }
      result = list.values.slice(start, end);
      if (result.constructor === String) {
        result = [result];
      }
      return result;
    };
    List.prototype.lpush = function() {
      var array, key, list, value, values, _i, _len;
      key = arguments[0], values = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      list = this.__get_list(key);
      array = list.values;
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        value = values[_i];
        array.unshift(value);
      }
      this.__save_list(key, list, array);
      return list.length();
    };
    List.prototype.lset = function(key, index, value) {
      var array, list;
      if (this.__exists_in_storage(key)) {
        list = this.__get_list(key);
        array = list.values;
        if (index < 0) {
          index = array.length + index;
        }
        array[index] = value;
        return this.__save_list(key, list, array);
      }
    };
    List.prototype.ltrim = function(key, start, end) {
      var array, list, result;
      if (this.__exists_in_storage(key)) {
        list = this.__get_list(key);
        array = list.values;
        if (end < 0) {
          end = array.length + end;
        }
        result = array.slice(start, (end + 1) || 9e9);
        return this.__save_list(key, list, result);
      }
    };
    List.prototype.brpop = function(key) {
      return this.rpop(key);
    };
    List.prototype.rpop = function(key) {
      var array, list, value;
      if (this.__exists_in_storage(key)) {
        list = this.__get_list(key);
        array = list.values;
        value = array.pop();
        this.__save_list(key, list, array);
        return value;
      }
    };
    List.prototype.brpoplpush = function(key, other_key) {
      return this.rpoplpush(key, other_key);
    };
    List.prototype.rpoplpush = function(key, other_key) {
      var value;
      if (this.__exists_in_storage(key)) {
        value = this.rpop(key);
        this.lpush(other_key, value);
        return value;
      }
    };
    List.prototype.rpushx = function(key, item) {
      if (this.__exists_in_storage(key)) {
        return this.rpush(key, item);
      }
    };
    return List;
  })();
  Lodis.prototype.Command.prototype.Set = (function() {
    __extends(Set, Lodis.prototype.Command.prototype.Base);
    function Set() {
      Set.__super__.constructor.apply(this, arguments);
    }
    Set.prototype.__get_set = function(key) {
      return new Lodis.prototype.DataType.prototype.Set(this.__get_from_storage(key)).unpack();
    };
    Set.prototype.__save_set = function(key, set) {
      var value;
      set.pack();
      value = set.toString();
      return this.__set_in_storage(key, value);
    };
    Set.prototype.sadd = function() {
      var key, member, members, set, _i, _len;
      key = arguments[0], members = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      set = this.__get_set(key);
      for (_i = 0, _len = members.length; _i < _len; _i++) {
        member = members[_i];
        if (__indexOf.call(set.values, member) < 0) {
          set.add(member);
        }
      }
      return this.__save_set(key, set);
    };
    Set.prototype.smembers = function(key) {
      if (this.__exists_in_storage(key)) {
        return this.__get_set(key).values;
      }
    };
    return Set;
  })();
  Lodis.prototype.Command.prototype.String = (function() {
    __extends(String, Lodis.prototype.Command.prototype.Base);
    function String() {
      String.__super__.constructor.apply(this, arguments);
    }
    String.prototype.__alter_integer_value = function(key, quantity) {
      var value;
      if (this.exists(key)) {
        value = parseInt(this.get(key));
        if (typeof value === "number") {
          value = value + quantity;
          this.set(key, value);
          return value;
        } else {
          throw new Lodis.prototype.DataType.prototype.InvalidType;
        }
      } else {
        return this.set(key, quantity);
      }
    };
    String.prototype.append = function(key, value) {
      var new_value, old_value;
      old_value = this.get(key) || "";
      new_value = old_value.toString() + value;
      this.set(key, new_value);
      return new_value.length;
    };
    String.prototype.decr = function(key) {
      return this.decrby(key, 1);
    };
    String.prototype.incr = function(key) {
      return this.incrby(key, 1);
    };
    String.prototype.decrby = function(key, quantity) {
      return this.__alter_integer_value(key, -quantity);
    };
    String.prototype.incrby = function(key, quantity) {
      return this.__alter_integer_value(key, quantity);
    };
    String.prototype.set = function(key, value) {
      var string;
      string = new Lodis.prototype.DataType.prototype.String;
      string.set(value);
      string.pack();
      this.__set_in_storage(key, string.toString());
      return true;
    };
    String.prototype.exists = function(key) {
      return this.__get_from_storage(key) != null;
    };
    String.prototype.get = function(key) {
      if (this.exists(key)) {
        return new Lodis.prototype.DataType.prototype.String(this.__get_from_storage(key)).toString();
      } else {
        return null;
      }
    };
    String.prototype.setbit = function(key, offset, value) {};
    String.prototype.getbit = function(key) {};
    String.prototype.getrange = function(key, start, end) {
      var string;
      if (this.exists(key)) {
        string = this.get(key);
        if (start < 0) {
          start = string.length + start;
        }
        if (end < 0) {
          end = string.length + end;
        }
        return string.substr(start, end + 1);
      }
    };
    String.prototype.getset = function(key, value) {
      var old_value;
      if (this.exists(key)) {
        old_value = this.get(key);
        this.set(key, value);
        return old_value;
      }
    };
    String.prototype.mget = function() {
      var key, keys, result, _i, _len;
      keys = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      result = [];
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        key = keys[_i];
        result.push(this.get(key));
      }
      return result;
    };
    String.prototype.mset = function() {
      var i, keys_and_values, value, _results;
      keys_and_values = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _results = [];
      for (i in keys_and_values) {
        value = keys_and_values[i];
        if (i % 2) {
          _results.push(this.set(keys_and_values[i - 1], value));
        }
      }
      return _results;
    };
    String.prototype.msetnx = function() {
      var i, key_or_value, keys_and_values;
      keys_and_values = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (i in keys_and_values) {
        key_or_value = keys_and_values[i];
        if (!(i % 2) && this.exists(key_or_value)) {
          return;
        }
      }
      return this.mset.apply(this, keys_and_values);
    };
    String.prototype.setex = function(key, expire, value) {
      this.set(key, value);
      return this.expire(key, expire);
    };
    String.prototype.setnx = function(key, value) {
      if (!this.exists(key)) {
        return this.set(key, value);
      }
    };
    String.prototype.setrange = function(key, offset, value) {
      var i, old_value, result;
      old_value = (function() {
        if (this.exists(key)) {
          return this.get(key).substr(0, offset);
        } else {
          result = "";
          for (i = 0; 0 <= offset ? i < offset : i > offset; 0 <= offset ? i++ : i--) {
            result += " ";
          }
          return result;
        }
      }).call(this);
      return this.set(key, "" + old_value + value);
    };
    String.prototype.strlen = function(key) {
      if (this.exists(key)) {
        return this.get(key).length;
      } else {
        return 0;
      }
    };
    return String;
  })();
  Lodis.prototype.DataType = (function() {
    function DataType() {}
    DataType.prototype.find = function(string) {
      var tail, type;
      type = string[0], tail = 2 <= string.length ? __slice.call(string, 1) : [];
      return {
        0: Lodis.prototype.DataType.prototype.String,
        1: Lodis.prototype.DataType.prototype.Hash,
        2: Lodis.prototype.DataType.prototype.List
      }[type];
    };
    return DataType;
  })();
  (Lodis.prototype.DataType.prototype.InvalidType = (function() {
    function InvalidType() {}
    return InvalidType;
  })()) < Error;
  Lodis.prototype.DataType.prototype.Base = (function() {
    function Base(values) {
      this.values = values;
      this.unpack();
    }
    Base.prototype.toJSON = function(string) {
      return JSON.stringify(string);
    };
    Base.prototype.fromJSON = function(string) {
      return JSON.parse(string);
    };
    Base.prototype.toString = function() {
      return this.values;
    };
    Base.prototype.parse = function(string) {
      return string;
    };
    Base.prototype.pack = function() {
      return this.values = "" + (this.type.toString()) + (this.packer(this.values));
    };
    Base.prototype.packer = function(values) {
      return values;
    };
    Base.prototype.check_valid_type = function(type) {
      if (parseInt(type !== this.type)) {
        throw new Lodis.prototype.DataType.prototype.InvalidType;
      }
    };
    Base.prototype.unpack = function() {
      var head, tail, _ref, _ref2;
      if ((_ref = this.values) != null ? _ref.length : void 0) {
        _ref2 = this.values, head = _ref2[0], tail = 2 <= _ref2.length ? __slice.call(_ref2, 1) : [];
        this.check_valid_type(head);
        this.values = tail.join('');
        return this;
      }
    };
    return Base;
  })();
  Lodis.prototype.DataType.prototype.Hash = (function() {
    __extends(Hash, Lodis.prototype.DataType.prototype.Base);
    Hash.prototype.type = 1;
    function Hash(values) {
      this.values = values != null ? values : {};
    }
    Hash.prototype.packer = function(values) {
      return this.toJSON(values);
    };
    Hash.prototype.unpack = function() {
      Hash.__super__.unpack.apply(this, arguments);
      this.set(this.fromJSON(this.values));
      return this;
    };
    Hash.prototype.set = function(hash) {
      return this.values = hash;
    };
    Hash.prototype.add = function(key, value) {
      return this.values[key] = value;
    };
    Hash.prototype.remove = function(key) {
      return delete this.values[key];
    };
    Hash.prototype.get = function(key) {
      return this.values[key];
    };
    return Hash;
  })();
  Lodis.prototype.DataType.prototype.List = (function() {
    __extends(List, Lodis.prototype.DataType.prototype.Base);
    List.prototype.type = 2;
    function List(values) {
      this.values = values != null ? values : [];
    }
    List.prototype.set = function(list) {
      return this.values = list;
    };
    List.prototype.length = function() {
      return this.values.length;
    };
    List.prototype.add = function(value) {
      return this.values.push(value);
    };
    List.prototype.packer = function(values) {
      return this.toJSON(values);
    };
    List.prototype.unpack = function() {
      List.__super__.unpack.apply(this, arguments);
      if (typeof this.values === 'string') {
        this.set(this.fromJSON(this.values));
      }
      return this;
    };
    return List;
  })();
  Lodis.prototype.DataType.prototype.Set = (function() {
    __extends(Set, Lodis.prototype.DataType.prototype.Base);
    Set.prototype.type = 3;
    function Set(values) {
      this.values = values != null ? values : [];
    }
    Set.prototype.set = function(list) {
      return this.values = list;
    };
    Set.prototype.length = function() {
      return this.values.length;
    };
    Set.prototype.add = function(value) {
      return this.values.push(value);
    };
    Set.prototype.packer = function(values) {
      return this.toJSON(values);
    };
    Set.prototype.unpack = function() {
      Set.__super__.unpack.apply(this, arguments);
      if (typeof this.values === 'string') {
        this.set(this.fromJSON(this.values));
      }
      return this;
    };
    return Set;
  })();
  Lodis.prototype.DataType.prototype.String = (function() {
    __extends(String, Lodis.prototype.DataType.prototype.Base);
    function String() {
      String.__super__.constructor.apply(this, arguments);
    }
    String.prototype.type = 0;
    String.prototype.set = function(string) {
      return this.values = string;
    };
    String.prototype.parse = function() {
      return this.toJSON(this.values);
    };
    return String;
  })();
}).call(this);
