/*
 * Socks .Element.Control.Image 
 *
 * Copyright (c) 2009 Peter Jihoon Kim
 * 
 * Licensed under the MIT License (MIT-LICENSE.txt)
 *
 * http://wiki.github.com/petejkim/socks
 *
 */
 
(function(Socks){
  
  var type = Socks.Common.type;
  
  Socks.Element.Control.Image = function(parent, style, image, text, fun) {
    this._socks_type = 'Socks.Element.Control.Image';
    this._elementId = window.Socks._nextElementId++;
		this._parent = parent;
    
    // create style object
    this._style = new Socks.Style();
    
    // image URI
    this._image = (image !== undefined ? image : '');
    
    // alternative text
    this._text = (text !== undefined ? text : '');
      
    // create element in the DOM
    this._createElement();
    
    // set the default event type
    this._defaultEventType = "click";
    
    // set the default event
    if(fun !== undefined) {
      this.setFunction(fun); // sets this
    }
  
    // set styles
    this.setStyle(style);
  };
  
  Socks.Element.Control.Image.prototype = new Socks.Element.Control();
  
  Socks.Element.Control.Image.prototype._createElement = function() {
    if(this._element === undefined) {
      this._element = document.createElement('img');
      this._element.src = this._image;
      this._element.alt = this._text;
      this._element.style.zIndex = 1;
      
      this.setStyle({margin:0,padding:0});
      
      // set layout related styles
      this._setLayout();
      // insert the element into the parent
      this._insertIntoParent(this._element);
    } else {
      this._element.src = this._image;
      this._element.alt = this._text;
      this.setStyle(this.getStyle());
    }
    return this._element;
  };
  
  
  Socks.Element.Control.Image.prototype.getImage = function() {
    return this._text;
  };
    
  Socks.Element.Control.Image.prototype.setImage = function(image) {
    this._image = image.toString();
    
    if(this._element !== undefined) {
      this._element.value = this._text;
    }
    return this;
  };
  
  Socks.Element.Control.Image.prototype.getText = Socks.Element.Control.Button.prototype.getText;
  Socks.Element.Control.Image.prototype.setText = Socks.Element.Control.Button.prototype.setText;
  Socks.Element.Control.Image.prototype.setDisabled = 
    Socks.Element.Control.Image.prototype.focus = 
    Socks.Element.Control.Image.prototype.blur = function() {
    return this;
  };
  
})(window.SOCKS);

