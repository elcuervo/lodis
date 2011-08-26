# from underscore.js
@U = {}
@U.extend = (obj) ->
  [head, tail] = arguments
  obj[key] = value for key, value of tail
  obj
