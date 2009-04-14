/*
 * Socks .Slot 
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
  var findFunction = Socks.Common.findFunction;
  var findElement = Socks.Common.findElement;
  var insertClearDiv = Socks.Common.insertClearDiv;
  
  Socks.Slot = function(parentElement, style, fun) {
    this._socks_type = 'Socks.Slot';
    if(parentElement !== undefined) {
      this._slotId = window.Socks._nextSlotId++;

      if(this._parent === undefined){
        this._parent = {_element:parentElement, _insertElement:parentElement};
      }
      
      this._contents = [];
      this._timers = [];
      this._events = {};
      
      // default insertion policy
      this._insertPolicy = 'append';
      this._insertPosition = '';
    
      // default layout type is flow
      if(this._slotType === undefined) {
        this._slotType = 'flow';
      }
      // create style object
      this._style = new Socks.Style();
        
      // create element in the DOM
      this._createElement();
    
      //set styles
      this.setStyle(style);
      
      if(fun !== undefined) {
        this._fun = fun;
      } 
      if(this._fun !== undefined) {
        this._fun.call(this);
      }      
      delete this._fun;
    }
  };
  
  Socks.Slot.prototype._insertIntoParent = Socks.Element.prototype._insertIntoParent;
  Socks.Slot.prototype._setLayout = Socks.Element.prototype._setLayout;
  
  Socks.Slot.prototype._createElement = function() {
    if(this._parent._element !== undefined) {
      if(this._element === undefined) {
        this._element = document.createElement('div');

        insertClearDiv(this._element);
        
        this.setStyle({margin:0,padding:0,borderWidth:0,scrollable:true});
        // set layout related styles
        this._setLayout();
        // insert the element into the parent
        this._insertIntoParent(this._element);

        this._insertElement = this._element;
      }       
    }
    return this._element;
  };
  
  // copy some functions from Socks.Element
  Socks.Slot.prototype.addEvent = Socks.Element.prototype.addEvent;
  Socks.Slot.prototype.removeEvent = Socks.Element.prototype.removeEvent;
  Socks.Slot.prototype.clearEvents = Socks.Element.prototype.clearEvents;  
  Socks.Slot.prototype.getEvents = Socks.Element.prototype.getEvents;
  
  Socks.Slot.prototype._onAction = Socks.Element.prototype._onAction;
  Socks.Slot.prototype._onMouseAction = Socks.Element.prototype._onMouseAction;
  Socks.Slot.prototype.onClick = Socks.Element.prototype.onClick;
  Socks.Slot.prototype.onContextMenu = Socks.Element.prototype.onContextMenu;
  Socks.Slot.prototype.onMouseDown = Socks.Element.prototype.onMouseDown;
  Socks.Slot.prototype.onMouseMove = Socks.Element.prototype.onMouseMove;
  Socks.Slot.prototype.onMouseUp = Socks.Element.prototype.onMouseUp;
  Socks.Slot.prototype.onMouseOut = Socks.Element.prototype.onMouseOut;
  Socks.Slot.prototype.onMouseOver = Socks.Element.prototype.onMouseOver;
  
  Socks.Slot.prototype.getStyle = Socks.Element.prototype.getStyle;
  Socks.Slot.prototype.setStyle = Socks.Element.prototype.setStyle;
  Socks.Slot.prototype.getTooltip = Socks.Element.prototype.getTooltip;
  Socks.Slot.prototype.setTooltip = Socks.Element.prototype.setTooltip;
  Socks.Slot.prototype.getContents = Socks.Element.prototype.getContents;
  Socks.Slot.prototype.getParent = Socks.Element.prototype.getParent;
  Socks.Slot.prototype.getApp = Socks.Element.prototype.getApp;
  Socks.Slot.prototype.getId = Socks.Element.prototype.getId;
  Socks.Slot.prototype.setId = Socks.Element.prototype.setId;  
  Socks.Slot.prototype.getClassNames = Socks.Element.prototype.getClassNames;
  Socks.Slot.prototype.setClassName = Socks.Element.prototype.setClassName;
  Socks.Slot.prototype.addClassName = Socks.Element.prototype.addClassName;
  Socks.Slot.prototype.removeClassName = Socks.Element.prototype.removeClassName;
  Socks.Slot.prototype.getOffsetWidth = Socks.Element.prototype.getOffsetWidth;
  Socks.Slot.prototype.getOffsetHeight = Socks.Element.prototype.getOffsetHeight;
  Socks.Slot.prototype.getOffsetLeft = Socks.Element.prototype.getOffsetLeft;
  Socks.Slot.prototype.getOffsetTop = Socks.Element.prototype.getOffsetTop;
  Socks.Slot.prototype.getClientWidth = Socks.Element.prototype.getClientWidth;
  Socks.Slot.prototype.getClientHeight = Socks.Element.prototype.getClientHeight;
  Socks.Slot.prototype.getClientLeft = Socks.Element.prototype.getClientLeft;
  Socks.Slot.prototype.getClientTop = Socks.Element.prototype.getClientTop;
  Socks.Slot.prototype.getScrollWidth = Socks.Element.prototype.getScrollWidth;
  Socks.Slot.prototype.getScrollHeight = Socks.Element.prototype.getScrollHeight;
  Socks.Slot.prototype.getScrollLeft = Socks.Element.prototype.getScrollLeft;
  Socks.Slot.prototype.getScrollTop = Socks.Element.prototype.getScrollTop;
  Socks.Slot.prototype.setScrollLeft = Socks.Element.prototype.setScrollLeft;
  Socks.Slot.prototype.setScrollTop = Socks.Element.prototype.setScrollTop;
  Socks.Slot.prototype.getScrollLeftMax = Socks.Element.prototype.getScrollLeftMax;
  Socks.Slot.prototype.getScrollTopMax = Socks.Element.prototype.getScrollTopMax;
  Socks.Slot.prototype.getGutterBottom = Socks.Element.prototype.getGutterBottom;
  Socks.Slot.prototype.getGutterRight = Socks.Element.prototype.getGutterRight;
  Socks.Slot.prototype.isScrollable = Socks.Element.prototype.isScrollable;
  Socks.Slot.prototype.move = Socks.Element.prototype.move;
  Socks.Slot.prototype.displace = Socks.Element.prototype.displace;
  Socks.Slot.prototype.show = Socks.Element.prototype.show;
  Socks.Slot.prototype.hide = Socks.Element.prototype.hide;
  Socks.Slot.prototype.toggle = Socks.Element.prototype.toggle;
  Socks.Slot.prototype.visible = Socks.Element.prototype.visible;
  Socks.Slot.prototype.invisible = Socks.Element.prototype.invisible;
  Socks.Slot.prototype.toggleVisibility = Socks.Element.prototype.toggleVisibility;
  Socks.Slot.prototype.remove = Socks.Element.prototype.remove;
  
  //------------------------------------------------------
  // Events
  
  Socks.Slot.prototype.addGlobalEvent = function() {
    if(this._events === undefined) {
      this._events = {};
    }
    
    if(arguments.length > 0) {
      var eventType = 'click';
      var fun;
      var onWindow = false;
      
			for(var i=0; i<arguments.length; i++) {
			  var arg = arguments[i];
  			switch(type(arg)) {
  			case 'String':
  			  eventType = arg;
  			  break;
  			case 'Object':
			    if('type' in arg) {
			      eventType = arg.type;
			    }
			    if('window' in arg) {
			      onWindow = arg.window;
			    }
  				break;
  			case 'Function':
  			  fun = arg;
  			}
			}
			
			var event = new Socks.Event(this, (onWindow ? window : document), eventType, false, false, fun);
			if(this._events[eventType] !== undefined) {
			  this.removeEvent(this._events[eventType]);
			}
      this._events[eventType] = event;
      return event;
  	}
  	return null;
  };
  
  Socks.Slot.prototype._onKeyAction = function(eventType, args) {
    var preventDefault = false;
    var stopPropagation = true;
    var fun;
    eventType = eventType || 'keydown';
    
		for(var i=0; i<args.length; i++) {
		  var arg = args[i];
			if(type(arg) === 'Function') {
			  fun = arg;
			}
		}
		
		if(fun !== undefined) {
      var funWrapper = function(e) {
        var key = Socks.Common.keyCodeToString(e.keyCode);
        fun.call(this, key, e);
      };
      
      return this.addGlobalEvent(eventType, funWrapper);
		}	
		return null;
  };
  
  Socks.Slot.prototype.onKeyDown = function() {
    // onKeyDown { |key, e| }
    return this._onKeyAction('keydown',arguments);
  };
  
  Socks.Slot.prototype.onKeyUp = function() {
    // onKeyUp { |key, e| }
    return this._onKeyAction('keyup',arguments);
  };
  
  Socks.Slot.prototype.onResize = function() {
    // onResize { |e| }
    var fun;
    
		for(var i=0; i<arguments.length; i++) {
		  var arg = arguments[i];
			if(type(arg) === 'Function') {
			  fun = arg;
			}
		}
		
		if(fun !== undefined) {      
      return this.addGlobalEvent({type:'resize', window:true}, fun);
		}	
		return null;
  };
  
  Socks.Slot.prototype.onScroll = function() {
    // onScroll { |e| }
    return this._onAction('scroll',arguments);
  };
  
  
  //------------------------------------------------------
  // Manipulation
  
  // clears slot
  Socks.Slot.prototype._clearSlot = function() {
    //remove all children
    if(this._contents !== undefined) {
      while(this._contents[0] !== undefined) {
        if(this._contents[0] instanceof Socks.Element || this._contents[0] instanceof Socks.Slot) {
          this._contents[0].remove(true);
        } 
        this._contents.splice(0,1);
      }
    }
    
    //remove events
    if(this._events) {
      this.clearEvents();
    }
        
    //clear elements
    if(this._insertElement !== undefined) {
      while(this._insertElement.firstChild) {
        this._element.removeChild(this._insertElement.firstChild);
      }
      insertClearDiv(this._insertElement);
    }
    return this;
  };
  
  // manipulates slot
  Socks.Slot.prototype._manipulate = function(fun, policy, el) {
    // back up previous insertion policy and position
  	var prevInsertionPolicy = this._insertPolicy || 'append';
  	var prevInsertionPosition = this._insertPosition;
  	
  	// set the insertion policy to prepend
  	this._insertPolicy = policy || prevInsertionPolicy;
  	
  	// set the insertion position
	  this._insertPosition = el || prevInsertionPosition;
  	
  	// run the function
  	if(fun !== undefined) {
  	  fun.call(this);
	  }
  	
  	// restore the previous insertion policy and position
  	this._insertPolicy = prevInsertionPolicy;
  	this._insertPosition = prevInsertionPosition;
  	
  	return this;
  };
  
  // prepends elements to the slot
  Socks.Slot.prototype.prepend = function() {
  	return this._manipulate(findFunction(arguments),'prepend');
  };
  
  // appends elements to the slot
  Socks.Slot.prototype.append = function() {
  	return this._manipulate(findFunction(arguments),'append');
  };
  
  // adds elements before a specific element
  Socks.Slot.prototype.before = function() {
    return this._manipulate(findFunction(arguments),'before',findElement(arguments));
  };

  // adds elements after a specific element  
  Socks.Slot.prototype.after = function() {
    return this._manipulate(findFunction(arguments),'after',findElement(arguments));
  };
  
  // clears slot and adds elements
  Socks.Slot.prototype.clear = function() {
    this._clearSlot();
    var fun = findFunction(arguments);
    return (fun !== undefined ? this._manipulate(fun) : this);
  };
  
  //------------------------------------------------------
  // Slots

  Socks.Slot.prototype.stack = function() {
    if(arguments.length > 0) {
      var style, fun;
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
    var newSlot = new Socks.Slot.Stack(this, style, fun);
    this._contents.push(newSlot);
    return newSlot;
  };
    
  Socks.Slot.prototype.flow = function() {
    if(arguments.length > 0) {
      var style, fun;
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

    var newSlot = new Socks.Slot.Flow(this, style, fun);
    this._contents.push(newSlot);
    return newSlot;
  };
  
  Socks.Slot.prototype.canvas = function() {
    if(arguments.length > 0) {
      var style, fun;
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

    var newSlot = new Socks.Slot.Canvas(this, style, fun);
    this._contents.push(newSlot);
    return newSlot;
  };
  
  //------------------------------------------------------
  // Elements
    
  var newElementWithStyle = function(elementFunc,args) {
    if(args.length > 0) {
      var style;
			for(var i=0; i<args.length; i++) {
  			switch(type(args[i])) {
  			case 'Object':
  			case 'Socks.Style':
			    style=args[i];
  				break;
  			}
			}
  	}
    var newElement = new elementFunc(this, style);
    this._contents.push(newElement);
    return newElement;
  };
  
  var newElementWithStyleAndFunction = function(elementFunc,args) {
    if(args.length > 0) {
      var style,fun;
			for(var i=0; i<args.length; i++) {
  			switch(type(args[i])) {
  			case 'Object':
  			case 'Socks.Style':
			    style=args[i];
  				break;
  			case 'Function':
  				fun=args[i];
  			}
			}
  	}
    var newElement = new elementFunc(this, style, fun);
    this._contents.push(newElement);
    return newElement;
  };
  
  var newElementWithStyleAndText = function(elementFunc,args) {
    if(args.length > 0) {
      var text,style;
			for(var i=0; i<args.length; i++) {
  			switch(type(args[i])) {
			  case 'Number':
  		  case 'Boolean':
  			case 'String':
  			  text=args[i].toString();
  			  break;
  			case 'Object':
  			case 'Socks.Style':
			    style=args[i];
  				break;
  			}
			}
  	}
    var newElement = new elementFunc(this, style, text);
    this._contents.push(newElement);
    return newElement;
  };
  
  var newElementWithStyleTextAndFunction = function(elementFunc,args) {
    if(args.length > 0) {
      var text,style,fun;
			for(var i=0; i<args.length; i++) {
  			switch(type(args[i])) {
			  case 'Number':
  		  case 'Boolean':
  			case 'String':
  			  text=args[i].toString();
  			  break;
  			case 'Object':
  		  case 'Socks.Style':
			    style=args[i];
  				break;
  			case 'Function':
  				fun=args[i];
  			}
			}
  	}
    var newElement = new elementFunc(this, style, text, fun);
    this._contents.push(newElement);
    return newElement;
  };
  
  var newElementWithStyleArrayTextAndFunction = function(elementFunc,args) {
    if(args.length > 0) {
      var array,style,text,fun;
			for(var i=0; i<args.length; i++) {
  			switch(type(args[i])) {
			  case 'Number':
  		  case 'Boolean':
  			case 'String':
  			  text=args[i].toString();
  			  break;
  			case 'Array':
  			  array=args[i];
  			  break;
  			case 'Object':
  		  case 'Socks.Style':
			    style=args[i];
  				break;
  			case 'Function':
  				fun=args[i];
  			}
			}
  	}
    var newElement = new elementFunc(this, style, array, text, fun);
    this._contents.push(newElement);
    return newElement;
  };
  
  var newElementWithStyleTwoTextsAndFunction = function(elementFunc,args) {
    if(args.length > 0) {
      var style,text=[],fun;
			for(var i=0; i<args.length; i++) {
  			switch(type(args[i])) {
			  case 'Number':
  		  case 'Boolean':
  			case 'String':
  			  if(text.length < 2) {
  			    text.push(args[i].toString());
  			  }
  			  break;
  			case 'Object':
  		  case 'Socks.Style':
			    style=args[i];
  				break;
  			case 'Function':
  				fun=args[i];
  			}
			}
  	}
    var newElement = new elementFunc(this, style, text[0], text[1], fun);
    this._contents.push(newElement);
    return newElement;
  };
  
  var newTextBlockElement = function(elementFunc,args) {
    if(args.length > 0) {
      var array=[],style;
			for(var i=0; i<args.length; i++) {
  			switch(type(args[i])) {
  			case 'Number':
  		  case 'Boolean':
  			case 'String':
  			  array.push(args[i].toString());
  			  break;
  			case 'Function':
  			  if(args[i] === Socks.Slot.prototype.br) {
  			    var newBrElement = new Socks.Element.TextFragment.Br(this);
  			    //this._contents.push(newBrElement);
  			    array.push(newBrElement);
  			  }
  			  break;
  			case 'Object':
  			case 'Socks.Style':
			    style=args[i];
  				break;
  			default:
  			  if(args[i] instanceof Socks.Element.TextFragment) {
  			    array.push(args[i]);
			    }
  			}
			}
  	}
  	
    var newElement = new elementFunc(this, style, array);
    this._contents.push(newElement);
    return newElement;
  };
  
  var newTextFragmentElement = function(elementFunc,args) {
    if(args.length > 0) {
      var array=[],style;
			for(var i=0; i<args.length; i++) {
  			switch(type(args[i])) {
				case 'Number':
  		  case 'Boolean':
  			case 'String':
  			  array.push(args[i].toString());
  			  break;
  			case 'Function':
  			  if(args[i] === Socks.Slot.prototype.br) {
  			    var newBrElement = new Socks.Element.TextFragment.Br(this);
  			    //this._contents.push(newBrElement);
  			    array.push(newBrElement);
  			  }
  			  break;
  			case 'Object':
  			case 'Socks.Style':
			    style=args[i];
  				break;
  			default:
  			  if(args[i] instanceof Socks.Element.TextFragment) {
  			    array.push(args[i]);
			    }
  			}
			}
  	}
  	
    var newElement = new elementFunc(this, style, array);
    //this._contents.push(newElement);
    return newElement;
  };
  
  var newLinkElement = function(elementFunc,args) {
    if(args.length > 0) {
      var array=[],style,fun;
			for(var i=0; i<args.length; i++) {
  			switch(type(args[i])) {
  			case 'Array':
  			  array=array.concat(args[i]);
  			  break;
				case 'Number':
  		  case 'Boolean':
  			case 'String':
  			  array.push(args[i].toString());
  			  break;
  			case 'Function':
  			  if(args[i] === Socks.Slot.prototype.br) {
  			    var newBrElement = new Socks.Element.TextFragment.Br(this);
  			    //this._contents.push(newBrElement);
  			    array.push(newBrElement);
  			  } else {
  			    fun = args[i];
			    }
  			  break;
  			case 'Object':
  			case 'Socks.Style':
			    style=args[i];
  				break;
  			default:
  			  if(args[i] instanceof Socks.Element.TextFragment) {
  			    array.push(args[i]);
			    }
  			}
			}
  	}
  	
    var newElement = new elementFunc(this, style, array, fun);
    //this._contents.push(newElement);
    return newElement;
  };
  
  var newBrElement = function(elementFunc) {
    var newElement = new elementFunc(this);
    return newElement;
  };
  
  Socks.Slot.prototype.h1 = Socks.Slot.prototype.banner = function() {
    return newTextBlockElement.call(this, Socks.Element.TextBlock.Banner, arguments);
  };

  Socks.Slot.prototype.h2 = Socks.Slot.prototype.title = function() {
    return newTextBlockElement.call(this, Socks.Element.TextBlock.Title, arguments);
  };
  
  Socks.Slot.prototype.h3 = Socks.Slot.prototype.subtitle = function() {
    return newTextBlockElement.call(this, Socks.Element.TextBlock.Subtitle, arguments);
  };
  
  Socks.Slot.prototype.h4 = Socks.Slot.prototype.tagline = function() {
    return newTextBlockElement.call(this, Socks.Element.TextBlock.Tagline, arguments);
  };
  
  Socks.Slot.prototype.h5 = Socks.Slot.prototype.caption = function() {
    return newTextBlockElement.call(this, Socks.Element.TextBlock.Caption, arguments);
  };
  
  Socks.Slot.prototype.h6 = Socks.Slot.prototype.inscription = function() {
    return newTextBlockElement.call(this, Socks.Element.TextBlock.Inscription, arguments);
  };
   
  Socks.Slot.prototype.para = function() {
    return newTextBlockElement.call(this, Socks.Element.TextBlock.Para, arguments);
  };
  
  Socks.Slot.prototype.span = function() {
    return newTextFragmentElement.call(this, Socks.Element.TextFragment.Span, arguments);
  };

  Socks.Slot.prototype.link = function() {
    return newLinkElement.call(this, Socks.Element.TextFragment.Link, arguments);
  };

  Socks.Slot.prototype.ins = function() {
    return newTextFragmentElement.call(this, Socks.Element.TextFragment.Ins, arguments);
  };
  
  Socks.Slot.prototype.del = function() {
    return newTextFragmentElement.call(this, Socks.Element.TextFragment.Del, arguments);
  };
  
  Socks.Slot.prototype.strong = function() {
    return newTextFragmentElement.call(this, Socks.Element.TextFragment.Strong, arguments);
  };
  
  Socks.Slot.prototype.em = function() {
    return newTextFragmentElement.call(this, Socks.Element.TextFragment.Em, arguments);
  };
  
  Socks.Slot.prototype.sub = function() {
    return newTextFragmentElement.call(this, Socks.Element.TextFragment.Sub, arguments);
  };
  
  Socks.Slot.prototype.sup = function() {
    return newTextFragmentElement.call(this, Socks.Element.TextFragment.Sup, arguments);
  };
  
  Socks.Slot.prototype.code = function() {
    return newTextFragmentElement.call(this, Socks.Element.TextFragment.Code, arguments);
  };
  
  Socks.Slot.prototype.br = function() {
    return newBrElement.call(this, Socks.Element.TextFragment.Br, arguments);
  };
    
  Socks.Slot.prototype.button = function() {
    return newElementWithStyleTextAndFunction.call(this, Socks.Element.Control.Button, arguments);
  };
  
  Socks.Slot.prototype.editLine = function() {
    return newElementWithStyleTextAndFunction.call(this, Socks.Element.Control.EditLine, arguments);
  };

  Socks.Slot.prototype.editBox = function() {
    return newElementWithStyleTextAndFunction.call(this, Socks.Element.Control.EditBox, arguments);
  };
  
  Socks.Slot.prototype.listBox = function() {
    return newElementWithStyleArrayTextAndFunction.call(this, Socks.Element.Control.ListBox, arguments);
  };
  
  Socks.Slot.prototype.image = function() {
    return newElementWithStyleTwoTextsAndFunction.call(this, Socks.Element.Control.Image, arguments);
  };
  
  Socks.Slot.prototype.check = function() {
    return newElementWithStyleAndFunction.call(this, Socks.Element.Control.Check, arguments);
  };
  
  Socks.Slot.prototype.radio = function() {
    return newElementWithStyleTextAndFunction.call(this, Socks.Element.Control.Radio, arguments);
  };
  
  Socks.Slot.prototype.progress = function() {
    return newElementWithStyle.call(this, Socks.Element.Control.Progress, arguments);
  };
  
  Socks.Slot.prototype.html = function() {
    return newElementWithStyleAndText.call(this, Socks.Element.HTML, arguments);
  };
  
  //------------------------------------------------------
  // Timer
  
  var newTimer = function(timerFunc, args) {
    var num,fun;
    if(args.length > 0) {
			for(var i=0; i<args.length; i++) {
  			switch(type(args[i])) {
			  case 'Number':
  			case 'String':
  			  num=parseFloat(args[i]);
  			  break;
  			case 'Function':
  				fun=args[i];
  			}
			}
  	}
    var timer = new timerFunc(this, num, fun);
    this._timers.push(timer);
    return timer;
  };
  
  Socks.Slot.prototype.timer = function() {
    return newTimer.call(this, Socks.Timer, arguments);
  };
  
  Socks.Slot.prototype.every = function() {
    return newTimer.call(this, Socks.Timer.Every, arguments);
  };
  
  Socks.Slot.prototype.animate = function() {
    return newTimer.call(this, Socks.Timer.Animate, arguments);
  };
  
  //------------------------------------------------------
  // Miscellaneous
  
  Socks.Slot.prototype.abort = function() {
    // get current appId
    var appId = this.getApp()._appId;

    // look for the app with the matching appId and remove it.
    for(var i=0; i<window.Socks.APPS.length; i++) {
      if(window.Socks.APPS[i]._appId === appId) {
        window.Socks.APPS[i].remove();
        break;
      }
    }
    return this;
  };
  
  Socks.Slot.prototype.redirect = function(uri) {
    // remove all apps
    for(var i=0; i<window.Socks.APPS.length; i++) {
      window.Socks.APPS[i].remove();
    }
    // redirect
    window.location=uri.toString();
  };
  
})(window.SOCKS);


