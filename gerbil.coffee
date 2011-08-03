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
    @before = this.extract "before",  @tests
    @after  = this.extract "after",   @tests
    for key, value of @tests
      this.exec key, value
    console.warn "Results for #{@description} #{@success}/#{@count} tests. #{@assertions} assertions"

  assert_equal: (obj1, obj2) ->
    return throw new Error if !obj1? or !obj2?
    return throw new Error("diff") if obj1.constructor != obj2.constructor

    error = new Error("expected #{obj2} got #{obj1}")
    switch obj1.constructor
      when Array
        if obj1.length == obj2.length
          key = 0
          for value in obj1
            throw error unless value == obj2[key]
            key += 1
        else
          throw error
      when Number, String
        throw error unless obj1 == obj2
    @assertions += 1

  assert: (expectation) ->
    @assertions += 1
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
  g = new Gerbil(description, tests)
  g.run()
