/*
 * Socks .Element.TextFragment.Strong 
 *
 * Copyright (c) 2009 Peter Jihoon Kim
 * 
 * Licensed under the MIT License (MIT-LICENSE.txt)
 *
 * http://wiki.github.com/petejkim/socks
 *
 */
 
(function(Socks){
  
  Socks.Element.TextFragment.Strong = function(parent, style, array) {
    this._socks_type = 'Socks.Element.TextFragment.Strong';
    this._elementId = window.Socks._nextElementId++;
    this._parent = parent;
    
    // create style object
    this._style = new Socks.Style();
    
    if(array !== undefined) {
      this._contents = array;
    } else {
      this._contents = [];
    }
    
    // create element in the memory
    this._createElement('strong',{fontWeight:'bold'});
  
    //set styles
    this.setStyle(style);
  };
  
  Socks.Element.TextFragment.Strong.prototype = new Socks.Element.TextFragment();
    
})(window.SOCKS);

