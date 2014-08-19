"use strict";

(function(){
  var root = this,
      previous_funderscore = root.funderscore,
      funderscore;

  funderscore = (function(){
    var fu = {}, each;


    //iterates over a list (obj or array) and calls iterator for each
    
    each = fu.each = function(list, iterator, context){
      var i, len; 

      if(list == null) return list;

      len = list.length;
      
      if(list instanceof Array) {
        for(i=0; i<len; i+=1){
          iterator.call(context, list[i], i);
        } 
      }else{
        for(i in list) {
          if(list.hasOwnProperty(i)){
            iterator.call(context, list[i], i);
          }
        }
      }

      return list;
    };


    //returns a transformation of list defined by running each value through
    //the iterator function

    map = fu.map = function(list, iterator, ctx){
      var return_val = [];

      each(list, function(value, index){
        return_val.push(iterator.call(ctx, value, index, list));
      });

      return return_val;
    }; 


    return fu;
  }());


  if( typeof exports !== 'undefined'){
    if( typeof module !== 'undefined' && module.exports){
      exports = module.exports = funderscore;
    }
    exports.funderscore = funderscore;
  }else {
    root.funderscore = funderscore;
  }

  funderscore.noConflict = function(){
    root.funderscore = previous_funderscore; 
    return funderscore;
  };

}).call(this);
