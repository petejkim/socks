/*
 * Socks .Slot.Stack 
 *
 * Copyright (c) 2009 Peter Jihoon Kim
 * 
 * Licensed under the MIT License (MIT-LICENSE.txt)
 *
 * http://wiki.github.com/petejkim/socks
 *
 */
 
(function(Socks){
  
  Socks.Slot.Stack = function(parent, styles, fun) {
    this._slotType = 'stack';
    this._parent = parent;
        
    Socks.Slot.call(this, this._parent._element, styles, fun);
    this._socks_type = 'Socks.Slot.Stack';
  };
  
  Socks.Slot.Stack.prototype = new Socks.Slot();
  
})(window.SOCKS);

