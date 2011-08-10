(function() {
  var __slice = Array.prototype.slice;
  this.Node = (function() {
    Node.prototype.next = null;
    Node.prototype.prev = null;
    function Node(value) {
      this.value = value;
    }
    Node.prototype.toString = function() {
      return this.value;
    };
    return Node;
  })();
  this.LinkedList = (function() {
    LinkedList.prototype.first = null;
    LinkedList.prototype.length = 0;
    function LinkedList() {}
    LinkedList.prototype.add = function() {
      var current, node, value, values, _i, _len, _results;
      values = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _results = [];
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        value = values[_i];
        node = new Node(value);
        if (this.first != null) {
          current = this.first;
          while (current.next != null) {
            current = current.next;
          }
          current.next = node;
        } else {
          this.first = node;
        }
        _results.push(this.length++);
      }
      return _results;
    };
    LinkedList.prototype.remove = function(index) {
      var current, i, previous;
      if ((-1 < index && index < this.length)) {
        current = this.first;
        i = 0;
        if (index === 0) {
          this.first = current.next;
        } else {
          while (i++ < index) {
            previous = current;
            current = current.next;
          }
          previous.next = current.next;
        }
        this.length--;
        return current.value;
      }
    };
    LinkedList.prototype.item = function(index) {
      var current, i;
      if ((-1 < index && index < this.length)) {
        current = this.first;
        i = 0;
        while (i++ < index) {
          current = current.next;
        }
        return current.value;
      }
    };
    return LinkedList;
  })();
}).call(this);
