/*
 * Socks .Element.TextBlock.Para 
 *
 * Copyright (c) 2009 Peter Jihoon Kim
 * 
 * Licensed under the MIT License (MIT-LICENSE.txt)
 *
 * http://wiki.github.com/petejkim/socks
 *
 */
 
(function(Socks){
      
  Socks.Element.TextBlock.Para = function(parent, style, array) {
    this._socks_type = 'Socks.Element.TextBlock.Para';
    this._elementId = window.Socks._nextElementId++;
    this._parent = parent;
    
    // create style object
    this._style = new Socks.Style();
    
    if(array !== undefined) {
      this._contents = array;
    } else {
      this._contents = [];
    }
    
    // create element in the DOM
    this._createElement('p', {margin:0, padding:0, fontSize:12, fontWeight:'normal'});
  
    //set styles
    this.setStyle(style);
  };
  
  Socks.Element.TextBlock.Para.prototype = new Socks.Element.TextBlock();
  
})(window.SOCKS);

