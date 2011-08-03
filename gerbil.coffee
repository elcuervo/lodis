class Gerbil
  success:  0
  fail:     0
  count:    0
  assertions: 0

  constructor: (@description, @tests) ->

  extract: (key, from) ->
    value = from[key] || () ->
    delete from[key]
    value

  run: ->
    console.log @description
    @setup =  this.extract "setup",   @tests
    @before = this.extract "before",  @tests
    @after  = this.extract "after",   @tests

    @setup()
    this.exec key, value for key, value of @tests
    console.warn "Results for #{@description} #{@success}/#{@count} tests. #{@assertions} assertions"

  assert_equal: (obj1, obj2) ->
    return throw new Error("obj1 is #{obj1} and obj2 is #{obj2}") if !obj1 or !obj2
    return throw new Error("types are different obj1: #{obj1.constructor}, obj2: #{obj2.constructor}") if obj1.constructor != obj2.constructor

    error = new Error("expected #{obj2} got #{obj1}")
    switch obj1.constructor
      when Array
        if obj1.length == obj2.length
          for key, value of obj1
            throw error unless value == obj2[key]
        else
          throw error
      when Number, String
        throw error unless obj1 == obj2
    current_scenario.assertions += 1

  assert: (expectation) ->
    current_scenario.assertions += 1
    return throw new Error("assertion failed") if !expectation

  exec: (test_name, test) ->
    @before()
    try
      initial_assertions = @assertions
      test.apply(this)
      @success  += 1
      console.log " |-- #{test_name} SUCCESS (#{@assertions - initial_assertions} assertions)"
    catch error
      @fail     += 1
      console.error " |-- #{error}: #{test_name} FAILED"
    finally
      @after()
      @count    += 1

@scenario = (description, tests) ->
  @current_scenario = new Gerbil(description, tests)
  @assert = current_scenario.assert
  @assert_equal = current_scenario.assert_equal
  current_scenario.run()
