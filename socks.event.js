/*
 * Socks .Event 
 *
 * Copyright (c) 2009 Peter Jihoon Kim
 * 
 * Licensed under the MIT License (MIT-LICENSE.txt)
 *
 * http://wiki.github.com/petejkim/socks
 *
 */
 
(function(Socks){
  
  Socks.Event = function(context, element, type, preventDefault, stopPropagation, fun) {
    this._socks_type = 'Socks.Event';
    this._context = context;
    this._element = element;
    this._type = type || "click";
    this._preventDefault = preventDefault;
    this._stopPropagation = stopPropagation;
    this._fun = fun;
    this.addListener();
  };
  
  Socks.Event.prototype.getType = function() {
    return this._type;
  };
  
  Socks.Event.prototype.setType = function(type) {
    this._type = type || "click";
    return this;
  };
  
  Socks.Event.prototype.getPreventDefault = function() {
    return this._preventDefault;
  };
  
  Socks.Event.prototype.setPreventDefault = function(preventDefault) {
    this._preventDefault = preventDefault;
    return this;
  };
  
  Socks.Event.prototype.getStopPropagation = function() {
    return this._stopPropagation;
  };
  
  Socks.Event.prototype.setStopPropagation = function(stopPropagation) {
    this._stopPropagation = stopPropagation;
    return this;
  };
  
  Socks.Event.prototype.getContext = function() {
    return this._context;
  };
  
  Socks.Event.prototype.setContext = function(context) {
    this._context = context;
    return this;
  };
  
  Socks.Event.prototype.getElement = function() {
    return this._element;
  };
  
  Socks.Event.prototype.setElement = function(element) {
    this._element = element;
    return this;
  };
  
  Socks.Event.prototype.getFunction = function() {
    return this._fun;
  };
  
  Socks.Event.prototype.setFunction = function(fun) {
    this._fun = fun;
    return this;
  };
  
  Socks.Event.prototype.addListener = function() {
    // remove event listener if there's any
    this.removeListener();
    if(this._fun !== undefined && this._element !== undefined && this._context !== undefined && this._type !== undefined) {
      var fun = this._fun;
      var context = this._context;
      var preventDefault = this._preventDefault;
      var stopPropagation = this._stopPropagation;
      
      this._eventFun = function(e) {
        // IE sets global window.event
        e = e || window.event;
        
        if(preventDefault) {
          // prevent default actions
          e.returnValue = false;
          if(e.preventDefault) {
            e.preventDefault();
          }
        }
        
        if(stopPropagation) {
          // prevent bubbling
          e.cancelBubble = true;
          if(e.stopPropagation) {
            e.stopPropagation();
          }
        }
        fun.call(context,e);
        
        if(preventDefault) {
          return false;
        }
      };
      
      // add event listener
      if(this._element.addEventListener) {
      	this._element.addEventListener(this._type, this._eventFun, false);
      } else if(this._element.attachEvent){
        this._element.attachEvent('on' + this._type, this._eventFun); // for MSIE
      }
    }
    return this;
  };
  
  Socks.Event.prototype.removeListener = function() {
    if(this._eventFun !== undefined && this._element !== undefined && this._type !== undefined) {
      // remove event listener
      if(this._element.removeEventListener) {
      	this._element.removeEventListener(this._type, this._eventFun, false);
      } else if(this._element.attachEvent) {
        this._element.detachEvent('on' + this._type, this._eventFun); // for MSIE
      }
    }
    return this;
  };
  
  Socks.Event.prototype.remove = function() {
    this.removeListener();
    delete this._context;
    delete this._element;
    delete this._fun;
    return this;
  };
  
})(window.SOCKS);

