/*
 * Socks .Element.TextFragment.Link 
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
  
  Socks.Element.TextFragment.Link = function(parent, style, array, fun) {
    this._socks_type = 'Socks.Element.TextFragment.Link';
    this._elementId = window.Socks._nextElementId++;
    this._parent = parent;
    
    // create style object
    this._style = new Socks.Style();
    
    if(array !== undefined) {
      this._contents = array;
    } else {
      this._contents = [];
    }

    // set the default event type
    this._defaultEventType = "click";
        
    var len = this._contents.length;
    if(fun === undefined && len > 0 && type(this._contents[len-1]) === 'String') {
      this._uri = this._contents.pop();
      
      if(this._contents.length === 0) {
        this._contents.push(this._uri);
      }
    }
    
    // create element in the memory
    this._createElement('a');
    
    // set the default event
    if(fun !== undefined) {
      this.setFunction(fun); // sets this
    }
    
    //set styles
    this.setStyle(style);
  };
  
  Socks.Element.TextFragment.Link.prototype = new Socks.Element.TextFragment();
  
  Socks.Element.TextFragment.Link.prototype._createElement = function(tag, style) {
    if(this._element === undefined) {
      this._element = document.createElement(tag);
      this._createChildNodes();
      
      if('_uri' in this) {
        this._element.href = this._uri;
      } else if(this._fun !== undefined) {
        this._element.href = '#';
        this._addClickEvent();
      }
      
      if(style !== undefined) {
        this.setStyle(style);
      }
    } else {
      this._createChildNodes();
      this.setStyle(this.getStyle());
    }
    return this._element;
  };
    
  Socks.Element.TextFragment.Link.prototype.getFunction = Socks.Element.Control.prototype.getFunction;
    
  Socks.Element.TextFragment.Link.prototype.setFunction = function(fun) {
    if(type(fun) === 'Function') {
      if('_uri' in this) {
        delete this._uri;
      }
        
      if(this._element !== undefined) {
        this._element.href = '#';
        Socks.Element.Control.prototype.setFunction.call(this, fun);
      }
    }
    return this;
  };
  
  Socks.Element.TextFragment.Link.prototype.getURI = function() {
    if('_uri' in this) {
      return this._uri;
    }
    return '';
  };
  
  Socks.Element.TextFragment.Link.prototype.setURI = function(uri) {
    uri=uri.toString();
    if(type(uri) === 'String') {
      this._uri = uri;
      if(this._element !== undefined) {
        this._element.href = this._uri;
        
        if('_eventFunc' in this) {
          if(this._element.removeEventListener) {
          	this._element.removeEventListener('click', this._eventFunc, false);
          } else if(this._element.attachEvent){
            this._element.detachEvent('onclick', this._eventFunc);
          }
          
          delete this._eventFunc;
          delete this._fun;
        }
      }
    }
    return this;
  };
  
})(window.SOCKS);

