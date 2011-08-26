(function() {
  var __slice = Array.prototype.slice, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
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
    function Lodis() {
      this.storage = window.localStorage;
      this.expiration_set = window.sessionStorage;
    }
    Lodis.prototype.__get_from_storage = function(key) {
      return this.storage.getItem(key);
    };
    Lodis.prototype.__set_in_storage = function(key, value) {
      return this.storage.setItem(key, value);
    };
    Lodis.prototype.__exists_in_storage = function(key) {
      return this.__get_from_storage(key) != null;
    };
    Lodis.prototype.__alter_integer_value = function(key, quantity) {
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
    Lodis.prototype.append = function(key, value) {
      var new_value, old_value;
      old_value = this.get(key) || new String;
      new_value = old_value + value;
      this.set(key, new_value);
      return new_value.length;
    };
    Lodis.prototype.decr = function(key) {
      return this.decrby(key, 1);
    };
    Lodis.prototype.incr = function(key) {
      return this.incrby(key, 1);
    };
    Lodis.prototype.decrby = function(key, quantity) {
      return this.__alter_integer_value(key, -quantity);
    };
    Lodis.prototype.incrby = function(key, quantity) {
      return this.__alter_integer_value(key, quantity);
    };
    Lodis.prototype.set = function(key, value) {
      var string;
      string = new Lodis.prototype.DataType.prototype.String;
      string.set(value);
      string.pack();
      this.__set_in_storage(key, string.toString());
      return true;
    };
    Lodis.prototype.exists = function(key) {
      return this.__get_from_storage(key) != null;
    };
    Lodis.prototype.get = function(key) {
      if (this.exists(key)) {
        return new Lodis.prototype.DataType.prototype.String(this.__get_from_storage(key)).toString();
      } else {
        return null;
      }
    };
    Lodis.prototype.setbit = function(key, offset, value) {};
    Lodis.prototype.getbit = function(key) {};
    Lodis.prototype.getrange = function(key, start, end) {
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
    Lodis.prototype.getset = function(key, value) {
      var old_value;
      if (this.exists(key)) {
        old_value = this.get(key);
        this.set(key, value);
        return old_value;
      }
    };
    Lodis.prototype.mget = function() {
      var key, keys, result, _i, _len;
      keys = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      result = [];
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        key = keys[_i];
        result.push(this.get(key));
      }
      return result;
    };
    Lodis.prototype.mset = function() {
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
    Lodis.prototype.msetnx = function() {
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
    Lodis.prototype.setex = function(key, expire, value) {
      this.set(key, value);
      return this.expire(key, expire);
    };
    Lodis.prototype.setnx = function(key, value) {
      if (!this.exists(key)) {
        return this.set(key, value);
      }
    };
    Lodis.prototype.setrange = function(key, offset, value) {
      var i, old_value, result;
      old_value = (function() {
        if (this.exists(key)) {
          return this.get(key).substr(0, offset);
        } else {
          result = new String;
          for (i = 0; 0 <= offset ? i < offset : i > offset; 0 <= offset ? i++ : i--) {
            result += " ";
          }
          return result;
        }
      }).call(this);
      return this.set(key, "" + old_value + value);
    };
    Lodis.prototype.strlen = function(key) {
      if (this.exists(key)) {
        return this.get(key).length;
      } else {
        return 0;
      }
    };
    Lodis.prototype.__get_expiration = function(key) {
      return JSON.parse(this.expiration_set.getItem(key));
    };
    Lodis.prototype.__set_expiration = function(key, value) {
      return this.expiration_set.setItem(key, JSON.stringify(value));
    };
    Lodis.prototype.__del_expiration = function(key) {
      return this.expiration_set.removeItem(key);
    };
    Lodis.prototype.del = function() {
      var key, keys, _i, _len;
      keys = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        key = keys[_i];
        this.storage.removeItem(key);
      }
      return true;
    };
    Lodis.prototype.expire = function(key, seconds) {
      var miliseconds, timeout_id, value;
      miliseconds = seconds * 1000;
      timeout_id = setTimeout(this._expire_key, miliseconds, key);
      value = {
        id: timeout_id,
        timeout: new Date().getTime() + miliseconds
      };
      this.__set_expiration(key, value);
      return true;
    };
    Lodis.prototype.expireat = function(key, miliseconds) {
      var seconds;
      if ((miliseconds < new Date().getTime()) || !this.exists(key)) {
        return false;
      }
      seconds = (miliseconds - new Date().getTime()) / 1000;
      this.expire(key, seconds);
      return true;
    };
    Lodis.prototype.ttl = function(key) {
      var value;
      if (this.exists(key)) {
        if (value = this.__get_expiration(key)) {
          return Math.floor((value.timeout - new Date().getTime()) / 1000);
        } else {
          return -1;
        }
      }
    };
    Lodis.prototype.keys = function(regexp) {
      var found_keys, i, key, _ref;
      found_keys = [];
      for (i = 0, _ref = this.dbsize(); 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        key = this.storage.key(i);
        if (key.match(regexp)) {
          found_keys.push(key);
        }
      }
      return found_keys;
    };
    Lodis.prototype.persist = function(key) {
      var value;
      if (this.exists(key)) {
        if (value = this.__get_expiration(key)) {
          clearTimeout(value.id);
          return this.__del_expiration(key);
        }
      }
    };
    Lodis.prototype.rename = function(key, new_key) {
      var value;
      value = this.get(key);
      this.del(key);
      return this.set(new_key, value);
    };
    Lodis.prototype.renamenx = function(key, new_key) {
      if (!this.exists(new_key)) {
        return this.rename(key, new_key);
      }
    };
    Lodis.prototype.__get_from_hash = function(key, options) {
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
    Lodis.prototype.__get_hash = function(key) {
      return new Lodis.prototype.DataType.prototype.Hash(this.__get_from_storage(key)).unpack();
    };
    Lodis.prototype.__alter_integer_value_for_hash = function(hash_key, key, quantity) {
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
    Lodis.prototype.hexists = function(hash_key, key) {
      var hash;
      if (this.__exists_in_storage(hash_key)) {
        hash = this.__get_hash(hash_key);
        return hash.get(key) != null;
      }
    };
    Lodis.prototype.hset = function(hash_key, key, value) {
      var hash;
      hash = this.__exists_in_storage(hash_key) ? this.__get_hash(hash_key) : new Lodis.prototype.DataType.prototype.Hash;
      hash.add(key, value);
      hash.pack();
      value = hash.toString();
      this.__set_in_storage(hash_key, value);
      return true;
    };
    Lodis.prototype.hget = function(hash_key, key) {
      var hash;
      if (this.__exists_in_storage(hash_key)) {
        hash = this.__get_hash(hash_key);
        return hash.get(key);
      }
    };
    Lodis.prototype.hdel = function(hash_key, key) {
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
    Lodis.prototype.hgetall = function(hash_key) {
      if (this.__exists_in_storage(hash_key)) {
        return this.__get_from_hash(hash_key);
      }
    };
    Lodis.prototype.hincrby = function(hash_key, key, quantity) {
      return this.__alter_integer_value_for_hash(hash_key, key, quantity);
    };
    Lodis.prototype.hkeys = function(hash_key) {
      if (this.exists(hash_key)) {
        return this.__get_from_hash(hash_key, {
          with_keys: true,
          with_values: false
        });
      }
    };
    Lodis.prototype.hlen = function(hash_key) {
      if (this.exists(hash_key)) {
        return this.hkeys(hash_key).length;
      }
    };
    Lodis.prototype.hmget = function() {
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
    Lodis.prototype.hmset = function() {
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
    Lodis.prototype.hsetnx = function(hash_key, key, value) {
      if (!this.hexists(hash_key, key)) {
        this.hset(hash_key, key, value);
        return true;
      } else {
        return false;
      }
    };
    Lodis.prototype.hvals = function(hash_key) {
      if (this.exists(hash_key)) {
        return this.__get_from_hash(hash_key, {
          with_keys: false,
          with_values: true
        });
      }
    };
    Lodis.prototype.flushall = function() {
      this.storage.clear();
      return this.expiration_set.clear();
    };
    Lodis.prototype.dbsize = function() {
      return this.storage.length;
    };
    return Lodis;
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
    function List() {
      List.__super__.constructor.apply(this, arguments);
    }
    List.prototype.type = 2;
    List.prototype.parse = function() {
      return new LinkedList(this.values);
    };
    return List;
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
