(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
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
    Lodis.prototype._get_set = function(key) {
      return this._unpack(this.get(key)) || [];
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
      var miliseconds;
      miliseconds = seconds * 1000;
      this._expiration_hash[key] = new Date().getTime() + miliseconds;
      setTimeout(this._expire_key, miliseconds, key);
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
          return Math.floor((this._expiration_hash[key] - new Date().getTime()) / 1000);
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
      return result = set.slice(start, end);
    };
    Lodis.prototype.lpush = function(key, item) {
      var set;
      set = this._get_set(key);
      set.unshift(item);
      return this.set(key, this._pack(set));
    };
    Lodis.prototype.rpush = function(key, item) {
      var set;
      set = this._get_set(key);
      set.push(item);
      return this.set(key, this._pack(set));
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
    Lodis.prototype.lpop = function(hash) {};
    Lodis.prototype.rpop = function(hash) {};
    return Lodis;
  })();
}).call(this);
