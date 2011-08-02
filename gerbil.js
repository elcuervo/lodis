(function() {
  var Pico;
  Pico = (function() {
    Pico.prototype.success = 0;
    Pico.prototype.fail = 0;
    Pico.prototype.count = 0;
    Pico.prototype.assertions = 0;
    function Pico(description, tests) {
      this.description = description;
      this.tests = tests;
    }
    Pico.prototype.extract = function(key, from) {
      var value;
      value = from[key] || function() {};
      delete from[key];
      return value;
    };
    Pico.prototype.run = function() {
      var key, value, _ref;
      console.log(this.description);
      this.before = this.extract("before", this.tests);
      this.after = this.extract("after", this.tests);
      _ref = this.tests;
      for (key in _ref) {
        value = _ref[key];
        this.exec(key, value);
      }
      return console.warn("Results for " + this.description + " " + this.success + "/" + this.count + " tests. " + this.assertions + " assertions");
    };
    Pico.prototype.assert_equal = function(obj1, obj2) {
      var error, key, value, _i, _len;
      if (!(obj1 != null) || !(obj2 != null)) {
        throw new Error;
      }
      if (obj1.constructor !== obj2.constructor) {
        throw new Error("diff");
      }
      error = new Error("expected " + obj1 + " got " + obj2);
      switch (obj1.constructor) {
        case Array:
          if (obj1.length === obj2.length) {
            key = 0;
            for (_i = 0, _len = obj1.length; _i < _len; _i++) {
              value = obj1[_i];
              if (value !== obj2[key]) {
                throw new Error("not equal");
              }
              key += 1;
            }
          } else {
            throw error;
          }
          break;
        case Number:
        case String:
          if (obj1 !== obj2) {
            throw error;
          }
      }
      return this.assertions += 1;
    };
    Pico.prototype.assert = function(expectation) {
      this.assertions += 1;
      if (!expectation) {
        throw new Error;
      }
    };
    Pico.prototype.exec = function(test_name, test) {
      var initial_assertions;
      this.before();
      try {
        initial_assertions = this.assertions;
        test.apply(this);
        this.success += 1;
        return console.log(" |-- " + test_name + " SUCCESS (" + (this.assertions - initial_assertions) + " assertions)");
      } catch (error) {
        this.fail += 1;
        return console.error(" |-- " + error + ": " + test_name + " FAILED");
      } finally {
        this.after();
        this.count += 1;
      }
    };
    return Pico;
  })();
  this.scenario = function(description, tests) {
    var pico;
    pico = new Pico(description, tests);
    return pico.run();
  };
}).call(this);
