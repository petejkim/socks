/*
 * Socks .Element.Control.ListBox 
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
  
  Socks.Element.Control.ListBox = function(parent, style, array, text, fun) {
    this._socks_type = 'Socks.Element.Control.ListBox';
    this._elementId = window.Socks._nextElementId++;
		this._parent = parent;
    
    // create style object
    this._style = new Socks.Style();

    // set the listbox contents
    if(array !== undefined) {
      this._contents = array;
    } else {
      this._contents = [];
    }
    
    // set the text
    if(text !== undefined) {
      this._default = text;
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
  
  Socks.Element.Control.ListBox.prototype = new Socks.Element.Control();
  
  Socks.Element.Control.ListBox.prototype._createChildNodes = function() {
    if(this._element !== undefined) {
      //remove all childnodes
      while(this._element.firstChild) {
        this._element.removeChild(this._element.firstChild);
      }
    
      for(var i=0; i<this._contents.length; i++) {
        var optionElement;
        switch(type(this._contents[i])) {
        case 'String': // option
          // create option element and append it
          optionElement = document.createElement('option');
          optionElement.appendChild(document.createTextNode(this._contents[i]));
          optionElement.value = this._contents[i];
          if(this._contents[i] === this._default) {
            optionElement.selected = 'selected';
          }
          this._element.appendChild(optionElement);
          break;
        case 'Array': // option groups
          if(this._contents[i].length > 0 && type(this._contents[i][0]) === 'String') {
            // create option group element
            var optGroupElement = document.createElement('optgroup');
            // set option group label
            optGroupElement.label = this._contents[i][0];
            // options within the group
            for(var j=1; j<this._contents[i].length; j++) {
              if(type(this._contents[i][j]) === 'String') {
                // create option element and append it
                optionElement = document.createElement('option');
                optionElement.appendChild(document.createTextNode(this._contents[i][j]));
                optionElement.value = this._contents[i][j];
                if(this._contents[i][j] === this._default) {
                  optionElement.selected = 'selected';
                }
                optGroupElement.appendChild(optionElement);
              } else {
                // remove item if not applicable
                this._contents[i].splice(j,1);
                j--;
              }
            }
            //append option group element
            this._element.appendChild(optGroupElement);
          }
          break;
        default:
          // remove item if not applicable
          this._contents.splice(i,1);
          i--;
        }
      }
    }
    return this._element;
  };
  
  Socks.Element.Control.ListBox.prototype._createElement = function() {
    if(this._element === undefined) {
      this._element = document.createElement('select');
      this._element.style.zIndex = 1;
      
      this._createChildNodes();
      
      this.setStyle({fontSize:11,margin:0,padding:0});
      
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
      this.setStyle(this.getStyle());
    }
    return this._element;
  };
  
  Socks.Element.Control.ListBox.prototype.getSelected = function() {
    if(this._element !== undefined) {
      return this._element.value;
    }
    return null;
  };
  
  Socks.Element.Control.ListBox.prototype.setSelected = function(name) {
    name = name.toString();
      
    if(this._element !== undefined) {
      this._element.value = name;
    }
    return this;
  };
  
})(window.SOCKS);

