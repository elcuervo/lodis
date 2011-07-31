(function() {
  this.scenario = function(msg, tests, listener) {
    var after, before, create_event, extract, failed_assertion, failed_scenario, failed_test, key, scenario_end, scenario_start, scenario_was_failed, successful_assertion, successful_scenario, successful_test, test, test_end, test_name, test_start;
    if (listener == null) {
      listener = document;
    }
    extract = function(key, from) {
      var value;
      value = from[key] || function() {};
      delete from[key];
      return value;
    };
    create_event = function(name, options) {
      var event;
      if (options == null) {
        options = {};
      }
      event = document.createEvent('Event');
      event.initEvent(name, true, true);
      event.result = options;
      event.add = function(options) {
        var key, value, _results;
        _results = [];
        for (key in options) {
          value = options[key];
          _results.push(event.result[key] = value);
        }
        return _results;
      };
      return event;
    };
    test_start = create_event('test_start');
    test_end = create_event('test_end');
    successful_test = create_event('successful_test');
    failed_test = create_event('failed_test');
    successful_assertion = create_event('successful_assertion');
    failed_assertion = create_event('failed_assertion');
    scenario_start = create_event('scenario_start', {
      scenario: msg
    });
    scenario_end = create_event('scenario_end', {
      scenario: msg
    });
    successful_scenario = create_event('successful_scenario', {
      scenario: msg
    });
    failed_scenario = create_event('failed_scenario', {
      scenario: msg
    });
    this.assert = function(assertion) {
      if (!assertion) {
        listener.dispatchEvent(failed_assertion);
        throw new Error;
      } else {
        return listener.dispatchEvent(successful_assertion);
      }
    };
    before = extract("before", tests);
    after = extract("after", tests);
    scenario_was_failed = false;
    listener.dispatchEvent(scenario_start);
    for (key in tests) {
      test = tests[key];
      test_name = {
        test_name: key
      };
      test_start.add(test_name);
      test_end.add(test_name);
      successful_test.add(test_name);
      failed_test.add(test_name);
      listener.dispatchEvent(test_start);
      try {
        before();
        test();
        after();
        listener.dispatchEvent(successful_test);
      } catch (error) {
        failed_test.add({
          test_message: error
        });
        scenario_was_failed = true;
        listener.dispatchEvent(failed_test);
      } finally {
        listener.dispatchEvent(test_end);
      }
    }
    listener.dispatchEvent(scenario_end);
    if (scenario_was_failed) {
      return listener.dispatchEvent(failed_scenario);
    } else {
      return listener.dispatchEvent(successful_scenario);
    }
  };
}).call(this);
