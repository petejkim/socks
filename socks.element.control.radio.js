/*
 * Socks .Element.Control.Radio 
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
  
  Socks.Element.Control.Radio = function(parent, style, name, fun) {
    this._socks_type = 'Socks.Element.Control.Radio';
    this._elementId = window.Socks._nextElementId++;
		this._parent = parent;
    
    // create style object
    this._style = new Socks.Style();
    
    // sets the name
    if(name !== undefined) {
      this._name = name;
    } else {
      this._name = "radio_" + this._parent._slotId.toString();
    }
    
    // create element in the DOM
    this._createElement();
    
    // set the default event type
    this._defaultEventType = "click";
    
    // set the default event
    if(fun !== undefined) {
      this.setFunction(fun); // sets this
    }
       
    //set styles
    this.setStyle(style);
  };
  
  Socks.Element.Control.Radio.prototype = new Socks.Element.Control();
  
  Socks.Element.Control.Radio.prototype._createElement = function() {
    if(this._element === undefined) {
      this._element = document.createElement('input');
      this._element.type = 'radio';
      this._element.name = this._name;      
      
      var context = this;
      if(this._element.outerHTML && this._element.outerHTML.indexOf('radio') !== -1 && this._element.outerHTML.indexOf('name') === -1) {
        // IE radio bug workaround - http://msdn.microsoft.com/en-us/library/ms534184(VS.85).aspx
        this._element = document.createElement('<INPUT type=radio name='+this._name+'>');
      } else if(this._element.outerHTML && this._element.outerHTML.indexOf('name') === -1) {
        // Safari 2 radio bug workaround
        this._element.setAttribute('type','radio');
        this._element.setAttribute('name',this._name);
        var radioWorkaround = function(e) {
          // if radio buttons are not wrapped in the same form element, they don't belong to the same group.
          // so the other radio buttons have to be manually deselected.
          var inputs = document.getElementsByTagName('input');
          for(var i=0; i<inputs.length; i++) {
            if(inputs[i].getAttribute('name') === context._element.getAttribute('name') && inputs[i].getAttribute('type') === 'radio' && inputs[i] !== context._element) {
              inputs[i].checked = false;
            }
          }
        };
        this.addEvent('click', function(e) {radioWorkaround(e);});
      }
      
      this._element.style.zIndex = 1;
      
      this.setStyle({margin:1,padding:0});

      // set layout related styles
      this._setLayout();
      // insert the element into the parent
      this._insertIntoParent(this._element);
    } else {
      this.setStyle(this.getStyle());
    }
    return this._element;
  };
  
  Socks.Element.Control.Radio.prototype.isSelected = function() {
    this._selected = this._element.checked;
    return this._selected;
  };
  
  Socks.Element.Control.Radio.prototype.setSelected = function(selected) {
    selected = toBoolean(selected);
    this._selected = selected;
    
    if(this._element !== undefined) {
      this._element.checked = (this._selected ? 'checked' : '');
    }
    return this;
  };
  
})(window.SOCKS);

