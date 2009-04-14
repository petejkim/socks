/*
 * Socks .Element.HTML 
 *
 * Copyright (c) 2009 Peter Jihoon Kim
 * 
 * Licensed under the MIT License (MIT-LICENSE.txt)
 *
 * http://wiki.github.com/petejkim/socks
 *
 */
 
(function(Socks){
    
  Socks.Element.HTML = function(parent, style, text) {
    this._socks_type = 'Socks.Element.HTML';
    this._elementId = window.Socks._nextElementId++;
		this._parent = parent;
    
    // create style object
    this._style = new Socks.Style();
    
    // innerHTML
    this._innerHTML = (text !== undefined ? text : '');
      
    // create element in the DOM
    this._createElement();
  
    // set styles
    this.setStyle(style);
  };
  
  Socks.Element.HTML.prototype = new Socks.Element.Control();
  
  Socks.Element.HTML.prototype._createElement = function() {
    if(this._element === undefined) {
      this._element = document.createElement('div');
      this._element.innerHTML = this._innerHTML;
      this._element.style.zIndex = 1;
            
      // set layout related styles
      this._setLayout();
      // insert the element into the parent
      this._insertIntoParent(this._element);
    } else {
      this._element.innerHTML = this._innerHTML;
      this.setStyle(this.getStyle());
    }
    return this._element;
  };
  
  Socks.Element.HTML.prototype.getHTML = function() {
    return this._innerHTML;
  };
    
  Socks.Element.HTML.prototype.setHTML = function(html) {
    this._innerHTML = html.toString();
    
    if(this._element !== undefined) {
      this._element.innerHTML = this._innerHTML;
    }
    return this;
  };
  
})(window.SOCKS);

