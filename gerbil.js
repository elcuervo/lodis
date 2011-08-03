(function() {
  var Gerbil;
  Gerbil = (function() {
    Gerbil.prototype.success = 0;
    Gerbil.prototype.fail = 0;
    Gerbil.prototype.count = 0;
    Gerbil.prototype.assertions = 0;
    function Gerbil(description, tests) {
      this.description = description;
      this.tests = tests;
    }
    Gerbil.prototype.extract = function(key, from) {
      var value;
      value = from[key] || function() {};
      delete from[key];
      return value;
    };
    Gerbil.prototype.run = function() {
      var key, value, _ref;
      console.log(this.description);
      this.setup = this.extract("setup", this.tests);
      this.before = this.extract("before", this.tests);
      this.after = this.extract("after", this.tests);
      this.setup();
      _ref = this.tests;
      for (key in _ref) {
        value = _ref[key];
        this.exec(key, value);
      }
      return console.warn("Results for " + this.description + " " + this.success + "/" + this.count + " tests. " + this.assertions + " assertions");
    };
    Gerbil.prototype.assert_equal = function(obj1, obj2) {
      var error, key, value;
      if (!obj1 || !obj2) {
        throw new Error("obj1 is " + obj1 + " and obj2 is " + obj2);
      }
      if (obj1.constructor !== obj2.constructor) {
        throw new Error("types are different obj1: " + obj1.constructor + ", obj2: " + obj2.constructor);
      }
      error = new Error("expected " + obj2 + " got " + obj1);
      switch (obj1.constructor) {
        case Array:
          if (obj1.length === obj2.length) {
            for (key in obj1) {
              value = obj1[key];
              if (value !== obj2[key]) {
                throw error;
              }
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
      return current_scenario.assertions += 1;
    };
    Gerbil.prototype.assert = function(expectation) {
      current_scenario.assertions += 1;
      if (!expectation) {
        throw new Error("assertion failed");
      }
    };
    Gerbil.prototype.exec = function(test_name, test) {
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
    return Gerbil;
  })();
  this.scenario = function(description, tests) {
    this.current_scenario = new Gerbil(description, tests);
    this.assert = current_scenario.assert;
    this.assert_equal = current_scenario.assert_equal;
    return current_scenario.run();
  };
}).call(this);
