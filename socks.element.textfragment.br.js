/*
 * Socks .Element.TextFragment.Br 
 *
 * Copyright (c) 2009 Peter Jihoon Kim
 * 
 * Licensed under the MIT License (MIT-LICENSE.txt)
 *
 * http://wiki.github.com/petejkim/socks
 *
 */
 
(function(Socks){
  
  Socks.Element.TextFragment.Br = function(parent) {
    this._socks_type = 'Socks.Element.TextFragment.Br';
    this._elementId = window.Socks._nextElementId++;
    this._parent = parent;
        
    // create element in the memory
    this._createElement('br');
  };
  
  Socks.Element.TextFragment.Br.prototype = new Socks.Element.TextFragment();
  
  Socks.Element.TextFragment.Br.prototype._createChildNodes = function(){
    return this._element;
  };
  
  Socks.Element.TextFragment.Br.prototype._createElement = function(tag) {
    if(this._element === undefined) {
      this._element = document.createElement(tag);
    } 
    return this._element;
  };
    
  Socks.Element.TextFragment.Br.prototype.getText = function(){
    return "\n";
  };
  
  Socks.Element.TextFragment.Br.prototype.setText = function(){
    return this;
  };
  
})(window.SOCKS);

