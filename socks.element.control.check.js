/*
 * Socks .Element.Control.Check 
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
  
  Socks.Element.Control.Check = function(parent, style, fun) {
    this._socks_type = 'Socks.Element.Control.Check';
    this._elementId = window.Socks._nextElementId++;
		this._parent = parent;
    
    // create style object
    this._style = new Socks.Style();
    
    // create element in the DOM
    this._createElement();
    
    // set the default event type
    this._defaultEventType = "click";
    
    // set the default event
    if(fun !== undefined) {
      this.setFunction(fun);
    }
    
    //set styles
    this.setStyle(style);
  };
  
  Socks.Element.Control.Check.prototype = new Socks.Element.Control();
  
  Socks.Element.Control.Check.prototype._createElement = function() {
    if(this._element === undefined) {
      this._element = document.createElement('input');
      this._element.type = 'checkbox';
      this._element.style.zIndex = 1;
            
      this.setStyle({margin:0,padding:0});
      
      // set layout related styles
      this._setLayout();
      // insert the element into the parent
      this._insertIntoParent(this._element);
    } else {
      this.setStyle(this.getStyle());
    }
    return this._element;
  };
  
  Socks.Element.Control.Check.prototype.isSelected = function() {
    this._selected = this._element.checked;
    return this._selected;
  };
    
  Socks.Element.Control.Check.prototype.setSelected = function(selected) {
    selected = toBoolean(selected);
    this._selected = selected;
    
    if(this._element !== undefined) {
      this._element.checked = (this._selected ? 'checked' : '');
    }

    return this;
  };
  
})(window.SOCKS);

