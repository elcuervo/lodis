(function() {
  this.U = {};
  this.U.extend = function(obj) {
    var head, key, tail, value;
    head = arguments[0], tail = arguments[1];
    for (key in tail) {
      value = tail[key];
      obj[key] = value;
    }
    return obj;
  };
}).call(this);
