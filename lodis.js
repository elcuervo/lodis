(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  }, __slice = Array.prototype.slice;
  this.Lodis = (function() {
    function Lodis() {
      this._expire_key = __bind(this._expire_key, this);      this.storage = window.localStorage;
    }
    Lodis.prototype._pack = function(value) {
      return JSON.stringify(value);
    };
    Lodis.prototype._unpack = function(value) {
      return JSON.parse(value);
    };
    Lodis.prototype._expire_key = function(key) {
      this.del(key);
      return delete this._expiration_hash[key];
    };
    Lodis.prototype._get_set_or_default = function(key, default_value) {
      return this._unpack(this.get(key)) || default_value;
    };
    Lodis.prototype._get_set = function(key) {
      return this._get_set_or_default(key, []);
    };
    Lodis.prototype._get_hash = function(key) {
      return this._get_set_or_default(key, {});
    };
    Lodis.prototype._set_packed = function(key, value) {
      value = this._pack(value);
      return this.set(key, value);
    };
    Lodis.prototype._get_from_hash = function(key, options) {
      var hash, result, value;
      if (options == null) {
        options = {
          with_keys: true,
          with_values: true,
          only: []
        };
      }
      hash = this._get_hash(key);
      result = [];
      for (key in hash) {
        value = hash[key];
        if (options["with_keys"]) {
          result.push(key);
        }
        if (options["with_values"] || (options["only"] && __indexOf.call(options["only"], key) >= 0)) {
          result.push(value);
        }
      }
      return result;
    };
    Lodis.prototype._alter_int_value = function(key, quantity) {
      var value;
      if (this.exists(key)) {
        value = parseInt(this.get(key));
        if (typeof value === "number") {
          value = value + quantity;
          this.set(key, value);
          return value;
        } else {
          throw new Error;
        }
      }
    };
    Lodis.prototype._expiration_hash = {};
    Lodis.prototype.del = function() {
      var key, keys, _i, _len;
      keys = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        key = keys[_i];
        this.storage.removeItem(key);
      }
      return true;
    };
    Lodis.prototype.set = function(key, value) {
      this.storage.setItem(key, value);
      return true;
    };
    Lodis.prototype.get = function(key) {
      return this.storage.getItem(key);
    };
    Lodis.prototype.exists = function(key) {
      return this.get(key) != null;
    };
    Lodis.prototype.dbsize = function() {
      return this.storage.length;
    };
    Lodis.prototype.keys = function(regexp) {
      var found_keys, i, key, _ref;
      found_keys = [];
      for (i = 0, _ref = this.dbsize() - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        key = this.storage.key(i);
        if (key.match(regexp)) {
          found_keys.push(key);
        }
      }
      return found_keys;
    };
    Lodis.prototype.expire = function(key, seconds) {
      var miliseconds, timeout_id;
      miliseconds = seconds * 1000;
      timeout_id = setTimeout(this._expire_key, miliseconds, key);
      this._expiration_hash[key] = {
        id: timeout_id,
        timeout: new Date().getTime() + miliseconds
      };
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
      if (this.exists(key)) {
        if (this._expiration_hash[key]) {
          return Math.floor((this._expiration_hash[key].timeout - new Date().getTime()) / 1000);
        } else {
          return -1;
        }
      }
    };
    Lodis.prototype.append = function(key, value) {
      if (this.exists(key)) {
        return this.set(key, "" + (this.get(key)) + value);
      }
    };
    Lodis.prototype.auth = function(password) {
      return true;
    };
    Lodis.prototype.bgrewriteaof = function() {
      return true;
    };
    Lodis.prototype.bgsave = function() {
      return true;
    };
    Lodis.prototype.blpop = function() {};
    Lodis.prototype.lrange = function(key, start, end) {
      var result, set;
      end += 1;
      set = this._get_set(key);
      if (end < 1) {
        end = set.length + end;
      }
      result = set.slice(start, end);
      if (result.constructor === String) {
        result = [result];
      }
      return result;
    };
    Lodis.prototype.lpush = function(key, item) {
      var set;
      set = this._get_set(key);
      set.unshift(item);
      return this._set_packed(key, set);
    };
    Lodis.prototype.rpush = function(key, item) {
      var set;
      set = this._get_set(key);
      set.push(item);
      return this._set_packed(key, set);
    };
    Lodis.prototype.rpushx = function(key, item) {
      if (this.exists(key)) {
        return this.rpush(key, item);
      }
    };
    Lodis.prototype.decr = function(key) {
      return this.decrby(key, 1);
    };
    Lodis.prototype.incr = function(key) {
      return this.incrby(key, 1);
    };
    Lodis.prototype.decrby = function(key, quantity) {
      if (quantity == null) {
        quantity = 1;
      }
      return this._alter_int_value(key, -quantity);
    };
    Lodis.prototype.incrby = function(key, quantity) {
      if (quantity == null) {
        quantity = 1;
      }
      return this._alter_int_value(key, quantity);
    };
    Lodis.prototype.echo = function(message) {
      return message;
    };
    Lodis.prototype.flushall = function() {
      return this.storage.clear();
    };
    Lodis.prototype.flushdb = function() {
      return this.flushall();
    };
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
    Lodis.prototype.hset = function(hash_key, key, value) {
      var hash;
      hash = this._get_hash(hash_key);
      hash[key] = value;
      this._set_packed(hash_key, hash);
      return true;
    };
    Lodis.prototype.hget = function(hash_key, key) {
      var hash;
      if (this.exists(hash_key)) {
        hash = this._get_hash(hash_key);
        return hash[key];
      }
    };
    Lodis.prototype.hgetall = function(hash_key) {
      if (this.exists(hash_key)) {
        return this._get_from_hash(hash_key);
      }
    };
    Lodis.prototype.hexists = function(hash_key, key) {
      return this.hget(hash_key, key) != null;
    };
    Lodis.prototype.hkeys = function(hash_key) {
      if (this.exists(hash_key)) {
        return this._get_from_hash(hash_key, {
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
    Lodis.prototype.hincrby = function(hash_key, key, quantity) {
      var new_value, old_value;
      if (this.hexists(hash_key, key)) {
        old_value = parseInt(this.hget(hash_key, key));
        if (typeof old_value === "number") {
          new_value = old_value + quantity;
          this.hset(hash_key, key, new_value);
          return new_value;
        } else {
          throw new Error("Invalid type");
        }
      }
    };
    Lodis.prototype.hmget = function() {
      var hash_key, keys;
      hash_key = arguments[0], keys = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (this.exists(hash_key)) {
        return this._get_from_hash(hash_key, {
          with_values: true,
          with_keys: false,
          only: keys
        });
      }
    };
    Lodis.prototype.hmset = function() {
      var hash_key, i, keys_and_values, result, value;
      hash_key = arguments[0], keys_and_values = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      result = {};
      for (i in keys_and_values) {
        value = keys_and_values[i];
        if (i % 2) {
          result[keys_and_values[i - 1]] = value;
        }
      }
      return this._set_packed(hash_key, result);
    };
    Lodis.prototype.hsetnx = function(hash_key, key, value) {
      if (!this.exists(hash_key)) {
        this.hset(hash_key, key, value);
        return true;
      } else {
        return false;
      }
    };
    Lodis.prototype.hvals = function(hash_key) {
      if (this.exists(hash_key)) {
        return this._get_from_hash(hash_key, {
          with_keys: false,
          with_values: true
        });
      }
    };
    Lodis.prototype.lindex = function(key, index) {
      var hash;
      if (this.exists(key)) {
        hash = this._get_set(key);
        if (index < 0) {
          index = hash.length + index;
        }
        return hash[index] || false;
      }
    };
    Lodis.prototype.linsert = function(key, direction, reference_value, value) {
      var left_side, result, right_side, set, _ref;
      if (this.exists(key)) {
        direction = (function() {
          switch (direction.toUpperCase()) {
            case "BEFORE":
              return -1;
            case "AFTER":
              return 1;
          }
        })();
        set = this._get_set(key);
        reference_value = set.indexOf(reference_value) + direction;
        _ref = [set.slice(0, reference_value), set.slice(reference_value)], left_side = _ref[0], right_side = _ref[1];
        result = left_side.concat([value]);
        result = result.concat(right_side);
        return this._set_packed(key, result);
      }
    };
    Lodis.prototype.llen = function(key) {
      var set;
      if (this.exists(key)) {
        set = this._get_set(key);
        return set.length;
      }
    };
    Lodis.prototype.lpop = function(key) {
      var set, value;
      if (this.exists(key)) {
        set = this._get_set(key);
        value = set.slice(1);
        return this._set_packed(key, value);
      }
    };
    Lodis.prototype.lpushx = function(key, value) {
      if (this.exists(key)) {
        return this.lpush(key, value);
      } else {
        return false;
      }
    };
    Lodis.prototype.lrem = function(key, count, item) {
      var quantity, result, set, value, _i, _len;
      if (this.exists(key)) {
        quantity = Math.abs(count);
        set = this._get_set(key);
        if (count < 0) {
          set = set.reverse();
        }
        result = [];
        for (_i = 0, _len = set.length; _i < _len; _i++) {
          value = set[_i];
          if (value === item && quantity > 0) {
            quantity -= 1;
          } else {
            result.push(value);
          }
        }
        if (count < 0) {
          result = result.reverse();
        }
        return this._set_packed(key, result);
      }
    };
    Lodis.prototype.lset = function(key, index, value) {
      var set;
      if (this.exists(key)) {
        set = this._get_set(key);
        if (index < 0) {
          index = set.length + index;
        }
        set[index] = value;
        return this._set_packed(key, set);
      }
    };
    Lodis.prototype.ltrim = function(key, start, end) {
      var result, set;
      if (this.exists(key)) {
        set = this._get_set(key);
        if (end < 0) {
          end = set.length + end;
        }
        result = set.slice(start, (end + 1) || 9e9);
        return this._set_packed(key, result);
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
    Lodis.prototype.persist = function(key) {
      if (this.exists(key)) {
        if (this._expiration_hash[key]) {
          clearTimeout(this._expiration_hash[key].id);
          return delete this._expiration_hash[key];
        }
      }
    };
    Lodis.prototype.ping = function() {
      return "PONG";
    };
    Lodis.prototype.randomkey = function() {
      var keys;
      keys = this.keys();
      return keys[Math.floor(Math.random() * keys.length)];
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
    Lodis.prototype.rpop = function(key) {
      var set, value;
      if (this.exists(key)) {
        set = this._get_set(key);
        value = set.pop();
        this._set_packed(key, set);
        return value;
      }
    };
    Lodis.prototype.rpoplpush = function(hash_key, other_hash_key) {
      var value;
      if (this.exists(hash_key)) {
        value = this.rpop(hash_key);
        this.lpush(other_hash_key, value);
        return value;
      }
    };
    Lodis.prototype.sadd = function() {
      var key, member, members, set, _i, _len, _results;
      key = arguments[0], members = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      set = this._get_set(key);
      _results = [];
      for (_i = 0, _len = members.length; _i < _len; _i++) {
        member = members[_i];
        if (__indexOf.call(set, member) < 0) {
          _results.push(this.lpush(key, member));
        }
      }
      return _results;
    };
    Lodis.prototype.smembers = function(key) {
      if (this.exists(key)) {
        return this._get_set(key);
      }
    };
    return Lodis;
  })();
}).call(this);
