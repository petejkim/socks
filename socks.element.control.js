/*
 * Socks .Element.Control 
 *
 * Copyright (c) 2009 Peter Jihoon Kim
 * 
 * Licensed under the MIT License (MIT-LICENSE.txt)
 *
 * http://wiki.github.com/petejkim/socks
 *
 */
 
(function(Socks){
  
  var toBoolean = Socks.Common.toBoolean;
  var type = Socks.Common.type;
  
  Socks.Element.Control = function() {
    this._socks_type = 'Socks.Element.Control';
  };
  
  Socks.Element.Control.prototype = new Socks.Element();
  
  Socks.Element.Control.prototype.isDisabled = function() {
    if('_disabled' in this) {
      return this._disabled;
    } else {
      return false;
    }
  };
  
  Socks.Element.Control.prototype.setDisabled = function(disabled) {
    disabled = toBoolean(disabled);
    this._disabled = disabled;
    
    if(this._element !== undefined) {
      this._element.disabled = (this._disabled ? 'disabled' : '');
    }
    return this;
  };
  
  Socks.Element.Control.prototype.disable = function() {
    return this.setDisabled(true);
  };

  Socks.Element.Control.prototype.enable = function() {
    return this.setDisabled(false);
  };
  
  Socks.Element.Control.prototype.focus = function(){
    if(this._element !== undefined) {
      this._element.focus();
    }
    return this;
  };
  
  Socks.Element.Control.prototype.blur = function(){
    if(this._element !== undefined) {
      this._element.blur();
    }
    return this;
  };
  
  //------------------------------------------------------
  // Events
  
  // gets the default event's function
  Socks.Element.Control.prototype.getFunction = function() {
    if(this._events !== undefined) {
      var defaultEvent = this._events[this._defaultEventType];
    
      if(defaultEvent !== undefined) {
        return defaultEvent.getFunction();
      }
    }
    return null;
  };
  
  // sets the default event's function
  Socks.Element.Control.prototype.setFunction = function(fun) {
    if(this._events === undefined) {
      this._events = {};
    }
    var defaultEvent = this._events[this._defaultEventType];

    if(defaultEvent !== undefined) {
      defaultEvent.setFunction(fun);  // set function
      defaultEvent.addListener(); // re-add event listener
    } else {
      this._events[this._defaultEventType] = this.addEvent(this._defaultEventType, fun);
    }
    return this;
  };
  
  Socks.Element.Control.prototype._onKeyAction = function(eventType, args) {
    var preventDefault = false;
    var stopPropagation = true;
    var fun;
    eventType = eventType || 'keydown';
    
		for(var i=0; i<args.length; i++) {
		  var arg = args[i];
			switch(type(arg)) {
			case 'Object':
		    if('preventDefault' in arg) {
		      preventDefault = arg.preventDefault;
		    }
		    if('stopPropagation' in arg) {
		      stopPropagation = arg.stopPropagation;
		    }
				break;
			case 'Function':
			  fun = arg;
			}
		}
		
		if(fun !== undefined) {
      var funWrapper = function(e) {
        var key = Socks.Common.keyCodeToString(e.keyCode);
        fun.call(this, key, e);
      };
  		
      return this.addEvent({type:eventType, preventDefault:preventDefault, stopPropagation:stopPropagation}, funWrapper);
		}	
		return null;
  };
  
  Socks.Element.Control.prototype.onKeyDown = function() {
    // onKeyDown { |key, e| }
    return this._onKeyAction('keydown',arguments);
  };
  
  Socks.Element.Control.prototype.onKeyUp = function() {
    // onKeyUp { |key, e| }
    return this._onKeyAction('keyup',arguments);
  };
  
})(window.SOCKS);

