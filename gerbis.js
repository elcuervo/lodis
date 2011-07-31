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
      this.storage.setItem(key, this._pack(value));
      return true;
    };
    Gerbis.prototype.get = function(key) {
      return this._unpack(this.storage.getItem(key));
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
    return Gerbis;
  })();
}).call(this);
