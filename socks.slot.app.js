/*
 * Socks .Slot.App 
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
  
  // Socks.Slot.App constructor
  Socks.Slot.App = function(style, fun) {
    this._style = style;
    this._fun = fun;
    this._appId = window.Socks._nextAppId++;
  };
  
  // Socks.Slot.App extends Socks.Slot
  Socks.Slot.App.prototype = new Socks.Slot();
  
  // Sets Title
  Socks.Slot.App.prototype.setTitle = function(title) {
    this._title = title.toString();
    document.title = this._title;
    return this;
  };
  
  // Gets Title
  Socks.Slot.App.prototype.getTitle = function() {
    if('_title' in this) {
      return this._title;
    }
    return null;
  };
   
  // Runs Socks App
  Socks.Slot.App.prototype.run = function() {
    var parentElement;
    if(arguments.length > 0) {
      switch(type(arguments[0])) {
      case 'String':
        parentElement = document.getElementById(arguments[0]);
        break;
      case 'Object':
        parentElement=arguments[0];
      }
	  } else {
	    parentElement=document.body;
    }
	  
    //remove all childnodes
    while(parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
    }
	  
	  if(this._style.title !== undefined) {
      this._title = this._style.title.toString();
      document.title = this._title;
    }
	  	  
	  Socks.Slot.call(this, parentElement, this._style, this._fun);
	  this._socks_type = 'Socks.Slot.App';
	  return this;
  };
  
  Socks.Slot.App.prototype.remove = function() {
    Socks.Slot.prototype.remove.call(this);
    
    delete this._appId;
    delete this._slotId;
    delete this._slotType;
    delete this._socks_type;
    delete this._title;
    
    //remove itself from APPS
    for(var i=0; i<window.Socks.APPS.length; i++) {
      if(window.Socks.APPS[i] === this) {
        window.Socks.APPS.splice(i,1);
        break;
      }
    }
        
    return this;
  };
  
  // Socks.app function
  Socks.prototype.app = function() {
    var style={},fun;
    if(arguments.length > 0) {
			for(var i=0; i<arguments.length; i++) {
  			switch(type(arguments[i])) {
  			case 'Object':
  			case 'Socks.Style':
  				style=arguments[i];
  				break;
  			case 'Function':
  				fun=arguments[i];
  			}
			}
  	}
    
    if(!('fontFamily' in style)) {
  	  style.fontFamily = "sans-serif";
  	}
  	
  	var socksApp = new Socks.Slot.App(style, fun);
  	this.APPS.push(socksApp);
		return socksApp;
  };
  
})(window.SOCKS);

