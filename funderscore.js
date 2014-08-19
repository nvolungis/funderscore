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
          iterator.call(context, list[i], i, list);
        } 
      }else{
        for(i in list) {
          if(list.hasOwnProperty(i)){
            iterator.call(context, list[i], i, list);
          }
        }
      }

      return list;
    };



    //returns a transformation of list defined by running each value through
    //the iterator function

    fu.map = fu.collect = function(list, iterator, ctx){
      var return_val = [];

      each(list, function(value, index){
        return_val.push(iterator.call(ctx, value, index, list));
      });

      return return_val;
    }; 



    //return a single value produced by running the iterator on each value in the list

    fu.reduce = fu.foldl = fu.inject = function(list, iterator, memo, ctx){
      var initial = arguments.length > 2;

      fu.each(list, function(value, index, list){
        if(!initial){
          memo = value;
          initial = true;
        }else{
          memo = iterator.call(ctx, memo, value, index, list);
        }
      });


      return memo;
    };



    // like reduce, but runs throught the values from right to left, instead of left to right;

    fu.reduceRight = fu.foldr = function(list, iterator, memo, ctx){
      var pairs, i, len, initial = arguments.length > 2;

      pairs = fu.map(list, function(value, index, list){
        return [index, value];
      }); 

      len = pairs.length - 1;

      for (i = len; i>=0; i--) {
        if(!initial){
          memo = pairs[i][1];
          initial = true;
        }else {
          memo = iterator.call(ctx, memo, pairs[i][1], pairs[i][0], list);
        }
      }

      return memo;    
    };


    fu.find = function(list, predicate, ctx){
      var i, len;

      if(list instanceof Array) {
        len = list.length;

        for(i=0; i<len; i+=1){
          if(predicate.call(ctx, list[i])) return list[i];
        } 
      }else{
        for(i in list) {
          if(list.hasOwnProperty(i)){
            if(predicate.call(ctx, list[i])) return list[i];
          }
        }
      }

      return;
    };


    fu.filter = function(list, predicate, ctx){
      var i, len, returns = [];

      if(list instanceof Array) {
        len = list.length;

        for(i=0; i<len; i+=1){
          if(predicate.call(ctx, list[i])) returns.push(list[i]);
        } 
      }else{
        for(i in list) {
          if(list.hasOwnProperty(i)){
            if(predicate.call(ctx, list[i])) returns.push(list[i]);
          }
        }
      }

      return returns;
       
    };




    //// OBJECTS ////


     


    //// UTILITIES ////
    
    fu.identity = function(value){
      return value; 
    };

    return fu;
  }());




  //export the module if we're in node, otherwise, attach the module to the 
  //window object
  
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
