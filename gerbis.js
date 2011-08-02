(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
  this.Gerbis = (function() {
    function Gerbis() {
      this._expire_key = __bind(this._expire_key, this);      this.storage = window.localStorage;
    }
    Gerbis.prototype._pack = function(value) {
      return JSON.stringify(value);
    };
    Gerbis.prototype._unpack = function(value) {
      return JSON.parse(value);
    };
    Gerbis.prototype._expire_key = function(key) {
      this.del(key);
      return delete this._expiration_hash[key];
    };
    Gerbis.prototype._get_set = function(key) {
      return this._unpack(this.get(key)) || [];
    };
    Gerbis.prototype._expiration_hash = {};
    Gerbis.prototype.del = function() {
      var key, keys, _i, _len;
      keys = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        key = keys[_i];
        this.storage.removeItem(key);
      }
      return true;
    };
    Gerbis.prototype.set = function(key, value) {
      this.storage.setItem(key, value);
      return true;
    };
    Gerbis.prototype.get = function(key) {
      return this.storage.getItem(key);
    };
    Gerbis.prototype.exists = function(key) {
      return this.get(key) != null;
    };
    Gerbis.prototype.dbsize = function() {
      return this.storage.length;
    };
    Gerbis.prototype.keys = function(regexp) {
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
    Gerbis.prototype.expire = function(key, seconds) {
      var miliseconds;
      miliseconds = seconds * 1000;
      this._expiration_hash[key] = new Date().getTime() + miliseconds;
      setTimeout(this._expire_key, miliseconds, key);
      return true;
    };
    Gerbis.prototype.expireat = function(key, miliseconds) {
      var seconds;
      if ((miliseconds < new Date().getTime()) || !this.exists(key)) {
        return false;
      }
      seconds = (miliseconds - new Date().getTime()) / 1000;
      this.expire(key, seconds);
      return true;
    };
    Gerbis.prototype.ttl = function(key) {
      if (this.exists(key)) {
        if (this._expiration_hash[key]) {
          return Math.floor((this._expiration_hash[key] - new Date().getTime()) / 1000);
        } else {
          return -1;
        }
      }
    };
    Gerbis.prototype.append = function(key, value) {
      if (this.exists(key)) {
        return this.set(key, "" + (this.get(key)) + value);
      }
    };
    Gerbis.prototype.auth = function(password) {
      return true;
    };
    Gerbis.prototype.bgrewriteaof = function() {
      return true;
    };
    Gerbis.prototype.bgsave = function() {
      return true;
    };
    Gerbis.prototype.blpop = function() {};
    Gerbis.prototype.lrange = function(key, start, end) {
      var result, set;
      end += 1;
      set = this._get_set(key);
      return result = set.slice(start, end);
    };
    Gerbis.prototype.lpush = function(key, item) {
      var set;
      set = this._get_set(key);
      set.unshift(item);
      return this.set(key, this._pack(set));
    };
    Gerbis.prototype.rpush = function(key, item) {
      var set;
      set = this._get_set(key);
      set.push(item);
      return this.set(key, this._pack(set));
    };
    Gerbis.prototype.decr = function(key) {
      return this.decrby(key, 1);
    };
    Gerbis.prototype.decrby = function(key, quantity) {
      var value;
      if (quantity == null) {
        quantity = 1;
      }
      if (this.exists(key)) {
        value = parseInt(this.get(key));
        if (typeof value === "number") {
          value -= quantity;
          this.set(key, value);
          return value;
        } else {
          throw new Error;
        }
      }
    };
    Gerbis.prototype.incr = function(key) {
      var value;
      if (this.exists(key)) {
        value = parseInt(this.get(key));
        if (typeof value === "number") {
          value += 1;
          this.set(key, value);
          return value;
        } else {
          throw new Error;
        }
      }
    };
    Gerbis.prototype.lpop = function(hash) {};
    Gerbis.prototype.rpop = function(hash) {};
    return Gerbis;
  })();
}).call(this);
