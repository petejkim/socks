/*
 * Socks .Element 
 *
 * Copyright (c) 2009 Peter Jihoon Kim
 * 
 * Licensed under the MIT License (MIT-LICENSE.txt)
 *
 * http://wiki.github.com/petejkim/socks
 *
 */
 
(function(Socks){
  
  var trim = Socks.Common.trim;
  var type = Socks.Common.type;
  
  Socks.Element = function() {
    this._socks_type = 'Socks.Element';
  };
  
  Socks.Element.prototype._insertIntoParent = function(el) {
    if(this._parent !== undefined) {
      var i;
      if(this._parent._insertElement.firstChild === null) {
        // if it's an empty slot, just insert the new element in.
        // this really should not happen.
        this._parent._insertElement.appendChild(el);
      } else {
        switch(this._parent._insertPolicy || 'append') {
        case 'append':
          // insert it before the last element (last element is the clearfix div)
          this._parent._insertElement.insertBefore(el, this._parent._insertElement.lastChild);
          break;
        case 'prepend':
          // insert it at the beginning
          this._parent._insertElement.insertBefore(el, this._parent._insertElement.firstChild);
          break;
        case 'before':
          for(i=0; i<this._parent._insertElement.childNodes.length; i++) {
            // look for the other element
            if(this._parent._insertElement.childNodes[i] === this._parent._insertPosition._element) {
              // if the other element exists, insert the new element before the other element
              this._parent._insertElement.insertBefore(el, this._parent._insertPosition._element);
              break;
            }
          }
          break;
        case 'after':
          for(i=0; i<this._parent._insertElement.childNodes.length; i++) {
            // look for the other element
            if(this._parent._insertElement.childNodes[i] === this._parent._insertPosition._element) {
              // if the other element exists, insert the new element before the other element
              this._parent._insertElement.insertBefore(el, this._parent._insertPosition._element.nextSibling);
              break;
            }
          }
        }
      }
    }
    return this;
  };
  
  Socks.Element.prototype._setLayout = function() {
    if(this._element !== undefined) {
      this._element.style.display = 'block';
      this._element.style.position = 'relative';
      this._element.style.overflow = 'visible';
      
      if(this._parent !== undefined) {
        if(this._parent._slotType === 'flow') {
          if('cssFloat' in this._element.style) {
            this._element.style.cssFloat = 'left';
          } else if('styleFloat' in this._element.style) {
            this._element.style.styleFloat = 'left'; // MSIE
          }
        } else {
          if('cssFloat' in this._element.style) {
            this._element.style.cssFloat = 'none';
          } else if('styleFloat' in this._element.style) {
            this._element.style.styleFloat = 'none'; // MSIE
          }
          this._element.clear = 'both';
        }
      }
    }
    return this;
  };
  
  //------------------------------------------------------
  // Events
  
  // returns SOCKS.Event object
  Socks.Element.prototype.addEvent = function() {
    if(this._events === undefined) {
      this._events = {};
    }
    
    if(arguments.length > 0) {
      var eventType = 'click';
      var preventDefault = false;
      var stopPropagation = true;
      var fun;
      
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
			    if('preventDefault' in arg) {
			      preventDefault = arg.preventDefault;
			    }
			    if('stopPropagation' in arg) {
			      stopPropagation = arg.stopPropagation;
			    }
  				break;
  			case 'Function':
  			  fun = arg;
  			}
			}
			
			var event = new Socks.Event(this, this._element, eventType, preventDefault, stopPropagation, fun);
			if(this._events[eventType] !== undefined) {
			  this.removeEvent(this._events[eventType]);
			}
      this._events[eventType] = event;
      return event;
  	}
  	return null;
  };
  
  Socks.Element.prototype.removeEvent = function(event) {
    event.remove();
    if(this._events !== undefined) {
      // erase this event from the events object
      var type = event.getType();
      if(type in this._events) {
        delete this._events[type];
      }
    }
    return this;
  };
  
  Socks.Element.prototype.clearEvents = function() {
    if(this._events !== undefined) {
      // remove events
      for(var eventType in this._events) {
        if(this._events.hasOwnProperty(eventType)) {
          this._events[eventType].remove();
          delete this._events[eventType];
        }
      }
    }
    return this;
  };
  
  Socks.Element.prototype.getEvents = function() {
    if(this._events === undefined) {
      this._events = {};
    }
    return this._events;
  };
  
  Socks.Element.prototype._onAction = function(eventType, args) {
    var preventDefault = false;
    var stopPropagation = true;
    var fun;
    eventType = eventType || 'click';
    
		for(var i=0; i<args.length; i++) {
		  var arg = args[i];
			switch(type(arg)) {
			case 'Object':
		    if('preventDefault' in arg) {
		      preventDefault = arg.preventDefault;
		    }
		    if('stopPropagation' in arg) {
		      stopPropagation = arg.stopPropagation;
		    }
				break;
			case 'Function':
			  fun = arg;
			}
		}
		
		if(fun !== undefined) {      
      return this.addEvent({type:eventType, preventDefault:preventDefault, stopPropagation:stopPropagation}, fun);
		}	
		return null;
  };
  
  Socks.Element.prototype._onMouseAction = function(eventType, args) {
    var preventDefault = false;
    var stopPropagation = true;
    var fun;
    eventType = eventType || 'click';
    
		for(var i=0; i<args.length; i++) {
		  var arg = args[i];
			switch(type(arg)) {
			case 'Object':
		    if('preventDefault' in arg) {
		      preventDefault = arg.preventDefault;
		    }
		    if('stopPropagation' in arg) {
		      stopPropagation = arg.stopPropagation;
		    }
				break;
			case 'Function':
			  fun = arg;
			}
		}
		
		if(fun !== undefined) {
      var funWrapper = function(e) {
        // get left and top coordinates
        // http://www.quirksmode.org/js/events_properties.html#position
        var left = 0, top = 0;
        if(e.pageX || e.pageY) {
          left = e.pageX;
          top = e.pageY;
        } else
         if(e.clientX || e.clientY) {
          left = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
          top = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        fun.call(this, left, top, e);
      };
      
      return this.addEvent({type:eventType, preventDefault:preventDefault, stopPropagation:stopPropagation}, funWrapper);
		}	
		return null;
  };
  
  Socks.Element.prototype.onClick = function() {
    // onClick { |left, top, e| }
    return this._onMouseAction('click',arguments);
  };
  
  Socks.Element.prototype.onContextMenu = function() {
    // onContextMenu { |left, top, e| }
    var addPreventDefault = true;
    var args=[];
    for(var i=0; i<arguments.length; i++) {
		  var arg = arguments[i];
			if(type(arg) === 'Object') {
		    if(!('preventDefault' in arg)) {
		      arg.preventDefault = true;
		    }
		    addPreventDefault = false;
			}
			args.push(arg);
		}
		
		if(addPreventDefault) {
		  args.push({preventDefault:true});
		}
    return this._onMouseAction('contextmenu',args);
  };
  
  Socks.Element.prototype.onMouseDown = function() {
    // onMouseDown { |left, top, e| }
    return this._onMouseAction('mousedown',arguments);
  };
  
  Socks.Element.prototype.onMouseMove = function() {
    // onMouseMove { |left, top, e| }
    return this._onMouseAction('mousemove',arguments);
  };
  
  Socks.Element.prototype.onMouseUp = function() {
    // onMouseUp { |left, top, e| }
    return this._onMouseAction('mouseup',arguments);
  };
  
  Socks.Element.prototype.onMouseOut = function() {
    // onMouseOut { |e| }
    return this._onMouseOut('mouseout',arguments);
  };
  
  Socks.Element.prototype.onMouseOver = function() {
    // onMouseOver { |e| }
    return this._onMouseOver('mouseover',arguments);
  };
  
  //------------------------------------------------------
  // Common
  
  Socks.Element.prototype.getStyle = function() {
    if('_style' in this) {
      return this._style;
    }
    return {};
  };
  
  Socks.Element.prototype.setStyle = function(style) {    
    if(!('_style' in this)) {
      this._style = new Socks.Style();
    }
    this._style.setStyle(style,this);
    
    return this;
  };
  
  Socks.Element.prototype.getTooltip = function() {
    if('_tooltip' in this) {
      return this._tooltip;
    }
    return false;
  };
  
  Socks.Element.prototype.setTooltip = function(tooltip) {
    this._tooltip = tooltip.toString();
    
    if(this._element !== undefined) {
      this._element.title = this._tooltip;
    }
    return this;
  };
  
  Socks.Element.prototype.getContents = function() {
    if(this._contents !== undefined) {
      return this._contents;
    }
    return [];
  };
  
  Socks.Element.prototype.getParent = function() {
    if(this._parent !== undefined) {
      return this._parent;
    }
    return null;
  };
  
  Socks.Element.prototype.getApp = function() {
    var e = this;
    while(true) {
      if('_appId' in e) {
        break;
      }
      e = e._parent;
    } 
    return e;
  };
  
  Socks.Element.prototype.getId = function() {
    if(this._element !== undefined) {
      return this._element.id;
    }
    return '';
  };
  
  Socks.Element.prototype.setId = function(id) {
    id=id.toString();
    
    if(this._element !== undefined) {
      this._element.id=id;
    }
    return this;
  };
  
  Socks.Element.prototype.getClassNames = function(className) {
    if(this._element !== undefined) {
      if(this._element.className !== '') {
        this._element.className = trim(this._element.className);
        return this._element.className.split(/\ \ */);
      }
    }
    return [];
  };
  
  Socks.Element.prototype.setClassName = function(className) {
    className=className.toString();
    
    if(this._element !== undefined) {
      this._element.className = className;
    }
    return this;
  };
  
  Socks.Element.prototype.addClassName = function(className) {
    className=className.toString();
    
    if(this._element !== undefined) {
      if(this._element.className === '') {
        this._element.className=className;
      } else {
        var tempClassName = this.getClassNames();
        for(var i=0; i<tempClassName.length; i++) {
          if(tempClassName[i] === className) {
            return;
          }
        }
        tempClassName.push(className);
        this._element.className = tempClassName.join(' ');
      }
    }
    return this;
  };
    
  Socks.Element.prototype.removeClassName = function(className) {
    className=className.toString();
    
    if(this._element !== undefined) {
      if(this._element.className !== '') {
        var tempClassName = this.getClassNames();
        for(var i=0; i<tempClassName.length; i++) {
          if(tempClassName[i] === className) {
            tempClassName.splice(i,1);
            i--;
          }
        }
        this._element.className = tempClassName.join(' ');
      }
    }
    return this;
  };
  
  Socks.Element.prototype.getOffsetWidth = function() {
    if(this._element !== undefined) {
      return this._element.offsetWidth;
    }
    return 0;
  };
  
  Socks.Element.prototype.getOffsetHeight = function() {
    if(this._element !== undefined) {
      return this._element.offsetHeight;
    }
    return 0;
  };

  Socks.Element.prototype.getOffsetLeft = function() {
    if(this._element !== undefined) {
      return this._element.offsetLeft;
    }
    return 0;
  };
  
  Socks.Element.prototype.getOffsetTop = function() {
    if(this._element !== undefined) {
      return this._element.offsetTop;
    }
    return 0;
  };
  
  Socks.Element.prototype.getClientWidth = function() {
    if(this._element !== undefined) {
      return this._element.clientWidth;
    }
    return 0;
  };
  
  Socks.Element.prototype.getClientHeight = function() {
    if(this._element !== undefined) {
      return this._element.clientHeight;
    }
    return 0;
  };

  Socks.Element.prototype.getClientLeft = function() {
    if(this._element !== undefined) {
      return this._element.clientLeft;
    }
    return 0;
  };
  
  Socks.Element.prototype.getClientTop = function() {
    if(this._element !== undefined) {
      return this._element.clientTop;
    }
    return 0;
  };
  
  Socks.Element.prototype.getScrollWidth = function() {
    if(this._element !== undefined) {
      return this._element.scrollWidth;
    }
    return 0;
  };

  Socks.Element.prototype.getScrollHeight = function() {
    if(this._element !== undefined) {
      return this._element.scrollHeight;
    }
    return 0;
  };

  Socks.Element.prototype.getScrollLeft = function() {
    if(this._element !== undefined) {
      return this._element.scrollLeft;
    }
    return 0;
  };
  
  Socks.Element.prototype.getScrollTop = function() {
    if(this._element !== undefined) {
      return this._element.scrollTop;
    }
    return 0;
  };
  
  Socks.Element.prototype.setScrollLeft = function(scrollLeft) {
    scrollLeft=parseInt(scrollLeft,10);
    if(this._element !== undefined) {
      this._element.scrollLeft = scrollLeft;
    }
    return this;
  };
  
  Socks.Element.prototype.setScrollTop = function(scrollTop) {
    scrollTop=parseInt(scrollTop,10);
    if(this._element !== undefined) {
      this._element.scrollTop = scrollTop;
    }
    return this;
  };
  
  Socks.Element.prototype.getScrollLeftMax = function() {
    if(this._element !== undefined) {
      return this._element.scrollWidth - this._element.clientWidth;
    }
    return 0;
  };
  
  Socks.Element.prototype.getScrollTopMax = function() {
    if(this._element !== undefined) {
      return this._element.scrollHeight - this._element.clientHeight;
    }
    return 0;
  };
  
  Socks.Element.prototype.move = function(left, top) {
    this.setStyle({left:left, top:top});
    return this;
  };
  
  Socks.Element.prototype.displace = function(left, top) {
    this.setStyle({displaceLeft:left, displaceTop:top});
    return this;
  };
  
  Socks.Element.prototype.getGutterRight = function() {
    if(this._element !== undefined) {
      var curStyle = this.getStyle();
      var borderWidth = ('borderWidth' in curStyle ? curStyle.borderWidth : 0);
      var borderSize = ('borderLeftWidth' in curStyle ? curStyle.borderLeftWidth : borderWidth) + ('borderRightWidth' in curStyle ? curStyle.borderRightWidth : borderWidth);
      // offsetwidth - borderleft - borderright - clientwidth      
      return this._element.offsetWidth - borderSize - this._element.clientWidth;
    }
    return 0;
  };
  
  Socks.Element.prototype.getGutterBottom = function() {
    if(this._element !== undefined) {
      var curStyle = this.getStyle();
      var borderWidth = ('borderWidth' in curStyle ? curStyle.borderWidth : 0);
      var borderSize = ('borderTopWidth' in curStyle ? curStyle.borderTopWidth : borderWidth) + ('borderBottomWidth' in curStyle ? curStyle.borderBottomWidth : borderWidth);
      // offsetheight - bordertop - borderbottom - clientheight
      return this._element.offsetHeight - borderSize - this._element.clientHeight;
    }
    return 0;
  };
  
  Socks.Element.prototype.isScrollable = function() {
    if('scrollable' in this.getStyle()) {
      return this.getStyle().scrollable;
    }
    return false;
  };
  
  Socks.Element.prototype.show = function() {
    this.setStyle({hidden:false});
    return this;
  };
  
  Socks.Element.prototype.hide = function() {
    this.setStyle({hidden:true});
    return this;    
  };
  
  Socks.Element.prototype.toggle = function() {
    if('hidden' in this.getStyle() && this.getStyle().hidden === true) {
      this.show();
    } else {
      this.hide();
    } 
    return this;
  };
  
  Socks.Element.prototype.visible = function() {
    this.setStyle({invisible:false});
    return this;
  };
  
  Socks.Element.prototype.invisible = function() {
    this.setStyle({invisible:true});
    return this;    
  };
  
  Socks.Element.prototype.toggleVisibility = function() {
    if('invisible' in this.getStyle() && this.getStyle().invisible === true) {
      this.visible();
    } else {
      this.invisible();
    } 
    return this;
  };
  
  Socks.Element.prototype.remove = function(dontRemoveItselfFromParent) {
    //remove all children
    if(this._contents) {
      while(this._contents[0] !== undefined) {
        if(this._contents[0] instanceof Socks.Element || this._contents[0] instanceof Socks.Slot) {
          this._contents[0].remove(true);
        } 
        this._contents.splice(0,1);
      }
      delete this._contents;
    }
    
    if(this._parent) {
      if(!dontRemoveItselfFromParent && this._parent._contents !== undefined) {
        for(var i=0; i<this._parent._contents.length; i++) {
          if(this._parent._contents[i] === this) {
            this._parent._contents.splice(i,1);
            i--;
          }
        }
      }
      delete this._parent;
    }
    
    //remove events
    if(this._events) {
      this.clearEvents();
      delete this._events;
    }
    
    //remove style
    if(this._style) {
      delete this._style;
    }
    
    //remove fun
    if(this._fun) {
      delete this._fun;
    }
    
    //remove elements
    if(this._element) {
      while(this._element.firstChild) {
        this._element.removeChild(this._element.firstChild);
      }
      if(this._element.parentNode !== null) {
        this._element.parentNode.removeChild(this._element);
      }
      delete this._element;
    }
    
    if(this instanceof Socks.Slot) {
      if(this instanceof Socks.Slot.Canvas && this._canvasElement) {
        while(this._canvasElement.firstChild) {
          this._canvasElement.removeChild(this._canvasElement.firstChild);
        }
        if(this._canvasElement.parentNode !== null) {
          this._canvasElement.parentNode.removeChild(this._canvasElement);
        }
        delete this._canvasElement;
      }
      if(this._insertElement) {
        while(this._insertElement.firstChild) {
          this._insertElement.removeChild(this._insertElement.firstChild);
        }
        if(this._insertElement.parentNode !== null) {
          this._insertElement.parentNode.removeChild(this._insertElement);
        }
        delete this._insertElement;
      }
    }
    
    return this;
  };
  
})(window.SOCKS);

