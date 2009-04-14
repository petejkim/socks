/*
 * Socks .Element.TextBlock 
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
  
  Socks.Element.TextBlock = function() {
    this._socks_type = 'Socks.Element.TextBlock';
  };
  
  Socks.Element.TextBlock.prototype = new Socks.Element();
  
  Socks.Element.TextBlock.prototype._createChildNodes = function() {
    if(this._element !== undefined) {
      //remove all childnodes
      while(this._element.firstChild) {
        this._element.removeChild(this._element.firstChild);
      }
    
      for(var i=0; i<this._contents.length; i++) {
        if(type(this._contents[i]) === 'String') {
          this._element.appendChild(document.createTextNode(this._contents[i]));
        } else if(this._contents[i] instanceof Socks.Element.TextFragment) {
          this._element.appendChild(this._contents[i]._getElement());
        } else {
          this._contents.splice(i,1);
          i--;
        }
      }
    }
    return this._element;
  };
  
  Socks.Element.TextBlock.prototype._createElement = function(tag, style) {
    if(this._element === undefined) {
      this._element = document.createElement(tag);
      
      this._createChildNodes();
            
      if(style !== undefined) {
        this.setStyle(style);
      }
      
      // set layout related styles
      this._setLayout();
      // insert the element into the parent
      this._insertIntoParent(this._element);            
    } else {
      this._createChildNodes();
      this.setStyle(this.getStyle());
    }
    return this._element;
  };
  
  Socks.Element.TextBlock.prototype.getText = function() {
    var text = '';
    
    for(var i=0; i<this._contents.length; i++) {
      if(type(this._contents[i]) === 'String') {
        text += this._contents[i];
      } else if(this._contents[i] instanceof Socks.Element.TextFragment) {
        text += this._contents[i].getText();
      }
    }
    
    return text;
  };
  
  Socks.Element.TextBlock.prototype.setText = function() {
    var array=[];
    if(arguments.length > 0) {
    	for(var i=0; i<arguments.length; i++) {
    		switch(type(arguments[i])) {
    		case 'Number':
    	  case 'Boolean':
    		case 'String':
    		  array.push(arguments[i].toString());
    		  break;
    		case 'Function':
    		  if(arguments[i] === Socks.Slot.prototype.br) {
    		    var newBrElement = new Socks.Element.TextFragment.Br(this);
    		    //this._contents.push(newBrElement);
    		    array.push(newBrElement);
    		  }
    		  break;
    		default:
    		  if(arguments[i] instanceof Socks.Element.TextFragment) {
    		    array.push(arguments[i]);
    	    }
    		}
    	}
    }
    
    this._contents = array;
    this._createChildNodes();
    return this;
  };
  
})(window.SOCKS);

