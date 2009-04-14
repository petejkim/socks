/*
 * Socks .Timer 
 *
 * Copyright (c) 2009 Peter Jihoon Kim
 * 
 * Licensed under the MIT License (MIT-LICENSE.txt)
 *
 * http://wiki.github.com/petejkim/socks
 *
 */
 
(function(Socks){
  
  Socks.Timer = function(context, seconds, fun) {
    this._socks_type = 'Socks.Timer';

    // default timeout is 0
    this._seconds = parseFloat(seconds) || 0;    
    this._context = context || null;
    
    //store function and the context in which the function should run
    if(fun) {
      this._setFun(fun);
      this.start();
    }
  };
  
  // set a function that runs in the given context
  Socks.Timer.prototype._setFun = function(fun) {
    var context = this._context;
    var timer = this;
    var funInContext = function() {
      fun.call(context);
      timer.stop();
    };
    this._fun = funInContext;
    return this;
  };
  
  // starts the timer
  Socks.Timer.prototype.start = function() {
    // if the timer is already started, stop it first.
    if(this._timeoutId !== undefined) {
      this.stop();
    }
    if(this._seconds !== undefined && this._fun && this._context) {
      this._timeoutId = window.setTimeout(this._fun, parseInt(this._seconds*1000,10));
    }
    return this;
  };
  
  // stops the timer
  Socks.Timer.prototype.stop = function() {
    if(this._timeoutId !== undefined) {
      window.clearTimeout(this._timeoutId);
      delete this._timeoutId;
    }
    return this;
  };

  // toggles the timer
  Socks.Timer.prototype.toggle = function() {
    if(this._timeoutId === undefined) {
      this.start();
    } else {
      this.stop();
    }
    return this;
  };
    
})(window.SOCKS);


