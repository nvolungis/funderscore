var assert = require('assert'),
    fu     = require('../funderscore.js');

describe("Collections", function(){
  describe('#each', function(){

    it('returns the original list for chaining', function(){
      var list = [0,1,2];
      assert.equal(fu.each(list, function(){}), list);
    });


    it('works for objects', function(){
      var i, answers = [];

      fu.each({'one': 1, 'two': 2, 'three': 3}, function(value, key){
        answers.push(value);         
      });

      assert.deepEqual(answers, [1,2,3]);
    });


    it('only iterates through its own properties', function(){
      var i, answers = [], 
          list = {
            'one': 1,
            'two': 2
          };

      list.constructor.prototype.three = 3;

      fu.each(list, function(value, key){
        answers.push(value);
      });

      assert.deepEqual(answers, [1,2]);
    });


    it('calls the iterator with the appropriate context', function(){
      var ctx = {multiplier: 5},
          returns = [];

      fu.each([1,2,3], function(value, index){
        returns.push(value * this.multiplier); 
      }, ctx); 

      assert.deepEqual(returns, [5, 10, 15]);
    });


    it('calls the iterator for each element in the list with value and index', function(){
      var count = 0;

      fu.each([1,2,3], function(value, index){
        assert.equal(value, index + 1); 
        count += 1; 
      });

      assert.equal(count, 3);
    });

    
    it('handles a null property', function(){
      fu.each(null, function(value, key){});
    });
  });


  describe('#map', function(){

  });
});
