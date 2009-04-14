/*
 * Socks .Element.TextFragment 
 *
 * Copyright (c) 2009 Peter Jihoon Kim
 * 
 * Licensed under the MIT License (MIT-LICENSE.txt)
 *
 * http://wiki.github.com/petejkim/socks
 *
 */
 
(function(Socks){
  
  Socks.Element.TextFragment = function() {
    this._socks_type = 'Socks.Element.TextFragment';
  };
  
  Socks.Element.TextFragment.prototype = new Socks.Element();
  
  Socks.Element.TextFragment.prototype._createChildNodes = Socks.Element.TextBlock.prototype._createChildNodes;
  
  Socks.Element.TextFragment.prototype._createElement = function(tag, style) {
    if(this._element === undefined) {
      this._element = document.createElement(tag);
      this._createChildNodes();
      
      this._element.style.display = 'inline';
      
      if(style !== undefined) {
        this.setStyle(style);
      }
    } else {
      this._createChildNodes();
      this.setStyle(this.getStyle());
    }
    return this._element;
  };
  
  Socks.Element.TextFragment.prototype._getElement = function() {
    return this._element;
  };
  
  Socks.Element.TextFragment.prototype.getText = Socks.Element.TextBlock.prototype.getText;
  Socks.Element.TextFragment.prototype.setText = Socks.Element.TextBlock.prototype.setText;
  //Socks.Element.TextFragment.prototype.setContents = Socks.Element.TextBlock.prototype.setContents;  
  //Socks.Element.TextFragment.prototype.getContents = Socks.Element.TextBlock.prototype.getContents;
  
})(window.SOCKS);

