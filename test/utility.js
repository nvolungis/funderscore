var assert = require('assert'),
    fu     = require('../funderscore.js');

describe('Utility', function(){
  describe('#identity', function(){
    it('returns the value passed it', function(){
      var before = 'test',
          after;

      after = fu.identity(before);

      assert.strictEqual(before, after);
    });
  });
});
