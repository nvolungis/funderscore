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



  //Map shat

  describe('#map', function(){
    it('calls iterator with correct args', function(){
      var list = [1,2,3], count = 0;

      fu.map(list, function(value, index, list){
        assert.equal(list[index], value); 
        count += 1;
      });

      assert.equal(3, count);
    });

    
    it('applies the transformation to each element in the list', function(){
      var mapped = fu.map([1,2,3], function(value, index, list){
        return value * 2; 
      });

      assert.deepEqual(mapped, [2,4,6]);
    });


    it('uses the correct context', function(){
      var ctx = { multiplier: 5},
          mapped;

      mapped = fu.map([1,2,3], function(value, index, list){
        return value * this.multiplier;
      }, ctx);


      assert.deepEqual(mapped, [5, 10, 15]);
    });
  });



  //Collect
 
  describe('#collect', function(){
    it('is the same as map', function(){
      assert.strictEqual(fu.map, fu.collect);
    });
  });  



  //Reduce Left
  
  describe('#reduce', function(){

    it('can sum up an array', function(){
      var sum = fu.reduce([1,2,3], function(memo, value, index, list){
        return memo + value;
      });

      assert.equal(sum, 6);
    });


    it('can accept an inital value', function(){
      var sum = fu.reduce([1,2,3], function(memo, value, index, list){
        return memo + value; 
      }, 2); 

      assert.equal(sum, 8);
    });


    it('applies the correct context', function(){
      var ctx = {multiplier: 5},
          result;

      result = fu.reduce([1,2,3], function(memo, value, index, list){
        return memo + ( value * this.multiplier );
      }, 0, ctx);

      assert.equal(result, 30);
    });
  }); 


  describe('#foldl', function(){
    it('is an alias for reduce', function(){
      assert.strictEqual(fu.reduce, fu.foldl);
    });
  });


  describe('#inject', function(){
    it('is an alias for reduce', function(){
      assert.strictEqual(fu.reduce, fu.inject);
    });
  });




  // Reduce Right

  describe('#reduceRight', function(){
    it('can reduce from right to left', function(){
      var result;

      result = fu.reduceRight(['foo', 'bar', 'baz'], function(memo, value, index, list){
        return memo + value;
      }, '');

      assert.equal(result, 'bazbarfoo');
    });
  });


  it('can reduce and object too', function(){
    var result, input = {
      'kfoo': 'foo',
      'kbar': 'bar',
      'kbaz': 'baz'
    };

    result = fu.reduceRight(input, function(memo, value, index, list){
      return memo + value;
    }, '');

    assert.equal(result, 'bazbarfoo');
  });


  it('ignores properties on the prototype', function(){
    var result, input = {
      'kfoo': 'foo',
      'kbar': 'bar',
      'kbaz': 'baz'
    };

    input.constructor.prototype.kbiz = 'biz';

    result = fu.reduceRight(input, function(memo, value, index, list){
      return memo + value;
    }, '');

    assert.equal(result, 'bazbarfoo');
  });


  describe('#foldr', function(){
    it('is an alias for reduceRight', function(){
      assert.strictEqual(fu.reduceRight, fu.foldr); 
    });
  });


  // Find
 
  describe('#find', function(){
    it('returns the first value in the list that passes the "predicate"', function(){
      var value;

      value = fu.find([1,2,3,2], function(value){
        return value === 3;
      });

      assert.equal(value, 3);
    });


    it('returns undefined if the value is not found', function(){
      var value;

      value = fu.find([1,2,3], function(value){
        return value === 4;
      });

      assert.equal(value, undefined);
    });


    it('gets called with the correct context', function(){
      var value, ctx = {target_value: 2};

      value = fu.find([1,2,3], function(value){
        return value === this.target_value; 
      }, ctx);
    });

    
    it('can be used as findWhere', function(){

    });
  });



  // Filter

  describe('#filter', function(){
    it('returns all the values that pass the predicate in an array', function(){
      var filtered;

      filtered = fu.filter([1,2,3,4], function(value){
        return value % 2 === 0;
      });

      assert.deepEqual(filtered, [2, 4]);
    });

  });
});
