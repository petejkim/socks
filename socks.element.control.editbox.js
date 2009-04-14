/*
 * Socks .Element.Control.EditBox 
 *
 * Copyright (c) 2009 Peter Jihoon Kim
 * 
 * Licensed under the MIT License (MIT-LICENSE.txt)
 *
 * http://wiki.github.com/petejkim/socks
 *
 */
 
(function(Socks){
    
  Socks.Element.Control.EditBox = function(parent, style, text, fun) {
    this._socks_type = 'Socks.Element.Control.EditBox';
    this._elementId = window.Socks._nextElementId++;
		this._parent = parent;
    
    // create style object
    this._style = new Socks.Style();
    
    // set the text
    if(text !== undefined) {
      this._text = text;
    } else {
      this._text = '';
    }
    
    // create element in the DOM
    this._createElement();
  
    // set the default event type
    this._defaultEventType = "change";
    
    // set the default event
    if(fun !== undefined) {
      this.setFunction(fun); // sets this
    }
    
    //set styles
    this.setStyle(style);
  };
  
  Socks.Element.Control.EditBox.prototype = new Socks.Element.Control();
  
  Socks.Element.Control.EditBox.prototype._createElement = function() {
    if(this._element === undefined) {
      this._element = document.createElement('textarea');
      this._element.value = this._text;
      this._element.style.zIndex = 1;
      
      this.setStyle({fontFamily:'sans-serif',fontSize:12,padding:0,margin:0});
      
      // set layout related styles
      this._setLayout();
      // insert the element into the parent
      if(!window.Socks.msie) {
        this._insertIntoParent(this._element);
      } else {
        // ie margin inheritance bug
        var wrapperDiv = document.createElement('div');
        wrapperDiv.appendChild(this._element);
        this._insertIntoParent(wrapperDiv); 
      }
    } else {
      this._element.value = this._text;
      this.setStyle(this.getStyle());
    }
    return this._element;
  };
  
  Socks.Element.Control.EditBox.prototype.getText = function() {
    if(this._element !== undefined) {
      this._text = this._element.value;
    }
    return this._text;
  };
  
  Socks.Element.Control.EditBox.prototype.setText = function(text) {
    this._text = text.toString();
      
    if(this._element !== undefined) {
      this._element.value = this._text;
    }
    return this;
  };
  
})(window.SOCKS);

