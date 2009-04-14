/*
 * Socks .Element.Control.Progress 
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
  
  Socks.Element.Control.Progress = function(parent, style) {
    this._socks_type = 'Socks.Element.Control.Progress';
    this._elementId = window.Socks._nextElementId++;
		this._parent = parent;
    
    // create style object
    this._style = new Socks.Style();
        
    // create pseudo 'bar' object
    this._bar = {};

    // create style object for the bar
    this._bar._style = new Socks.Style();
    
    // create element in the DOM
    this._createElement();
  
    //set styles
    this.setStyle(style);
  };
  
  Socks.Element.Control.Progress.prototype = new Socks.Element.Control();
  
  Socks.Element.Control.Progress.prototype._createElement = function() {
    if(this._element === undefined) {
      this._element = document.createElement('div');
      
      this._bar._element = document.createElement('div');
      this._bar._element.style.display = 'block';
      this._element.style.zIndex = 1;
      
      this._element.appendChild(this._bar._element);

      this.setStyle({margin:0,padding:1,width:200,height:10,backgroundColor:'#fff',border:{color:"#999",width:1}});
      this.setBarStyle({width:0,height:"100%",backgroundColor:'#3875d7'});
      
      // set layout related styles
      this._setLayout();
      // insert the element into the parent
      this._insertIntoParent(this._element);      
    } else {
      if('_bar' in this) {
        this.setBarStyle(this.getBarStyle());
        this.setBarStyle({width:((this._fraction*100).toString()+'%')});
      }
      this.setStyle(this.getStyle());
    }
    return this._element;
  };
  
  Socks.Element.Control.Progress.prototype.getBarStyle = function() {
    if('_style' in this._bar) {
      return this._bar._style;
    }
    return {};
  };
  
  Socks.Element.Control.Progress.prototype.setBarStyle = function(style) {    
    if(!('_style' in this._bar)) {
      this._bar._style = new Socks.Style();
    }
    this._bar._style.setStyle(style,this._bar);
    
    return this;
  };
  
  Socks.Element.Control.Progress.prototype.getFraction = function() {
    return this._fraction;
  };
  
  Socks.Element.Control.Progress.prototype.setFraction = function(fraction) {
    if(type(fraction) === 'Number') {
      if(fraction < 0) {
        fraction = 0;
      } else if(fraction > 1) {
        fraction = 1;
      }
      this._fraction = fraction;
      if(this._bar._element !== undefined) {
        this.setBarStyle({width:((this._fraction*100).toString()+'%')});
      }
    }
    return this;
  };
  
  Socks.Element.Control.Progress.prototype.isDisabled = function() {
    return false;
  };
  
  Socks.Element.Control.Progress.prototype.getFunction = function() {
    return null;
  };
  
  Socks.Element.Control.Progress.prototype.setDisabled = 
    Socks.Element.Control.Progress.prototype.focus = 
    Socks.Element.Control.Progress.prototype.blur = 
    Socks.Element.Control.Progress.prototype.setFunction = function() {
    return this;
  };
  
})(window.SOCKS);

