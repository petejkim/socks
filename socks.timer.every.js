/*
 * Socks .Timer.Every 
 *
 * Copyright (c) 2009 Peter Jihoon Kim
 * 
 * Licensed under the MIT License (MIT-LICENSE.txt)
 *
 * http://wiki.github.com/petejkim/socks
 *
 */
 
(function(Socks){
  
  Socks.Timer.Every = function(context, seconds, fun) {
    seconds = parseFloat(seconds) || 1;
    this._count = 0;
    Socks.Timer.call(this, context, seconds, fun);
    this._socks_type = 'Socks.Timer.Every';
  };
  
  Socks.Timer.Every.prototype = new Socks.Timer();
  
  // set a function that runs in the given context
  Socks.Timer.Every.prototype._setFun = function(fun) {
    var context = this._context;
    var count = this._count;
    var funInContext = function() {
      fun.call(context,count);
      count++;
    };
    this._fun = funInContext;
    return this;
  };
  
  // starts the timer
  Socks.Timer.Every.prototype.start = function() {
    // if the timer is already started, stop it first.
    if(this._timeoutId !== undefined) {
      this.stop();
    }
    if(this._seconds !== undefined && this._fun && this._context) {
      this._timeoutId = window.setInterval(this._fun, parseInt(this._seconds*1000,10));
    }
    return this;
  };
  
  // stops the timer
  Socks.Timer.Every.prototype.stop = function() {
    if(this._timeoutId !== undefined) {
      window.clearInterval(this._timeoutId);
      delete this._timeoutId;
    }
    return this;
  };
  
})(window.SOCKS);

