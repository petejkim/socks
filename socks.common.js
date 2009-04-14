/*
 * Socks .Common 
 *
 * Copyright (c) 2009 Peter Jihoon Kim
 * 
 * Licensed under the MIT License (MIT-LICENSE.txt)
 *
 * http://wiki.github.com/petejkim/socks
 *
 */

(function(Socks){

  Socks.Common = (function(){
    return {
      // transforms keycode to string
      keyCodeToString : function(keyCode) {
        switch(keyCode) {
        case 8:   return 'backspace';
        case 9:   return 'tab';
        case 13:  return 'enter';
        case 16:  return 'shift';
        case 17:  return 'control';
        case 18:  return 'alt';
        case 19:  return 'break';
        case 20:  return 'capslock';
        case 27:  return 'escape';
        case 33:  return 'pageup';
        case 34:  return 'pagedown';
        case 35:  return 'end';
        case 36:  return 'home';
        case 37:  return 'left';
        case 38:  return 'up';
        case 39:  return 'right';
        case 40:  return 'down';
        case 45:  return 'insert';
        case 46:  return 'delete';
        case 48:  return '0';
        case 49:  return '1';
        case 50:  return '2';
        case 51:  return '3';
        case 52:  return '4';
        case 53:  return '5';
        case 54:  return '6';
        case 55:  return '7';
        case 56:  return '8';
        case 57:  return '9';
        case 61:  return '=';
        case 65:  return 'a';
        case 66:  return 'b';
        case 67:  return 'c';
        case 68:  return 'd';
        case 69:  return 'e';
        case 70:  return 'f';
        case 71:  return 'g';
        case 72:  return 'h';
        case 73:  return 'i';
        case 74:  return 'j';
        case 75:  return 'k';
        case 76:  return 'l';
        case 77:  return 'm';
        case 78:  return 'n';
        case 79:  return 'o';
        case 80:  return 'p';
        case 81:  return 'q';
        case 82:  return 'r';
        case 83:  return 's';
        case 84:  return 't';
        case 85:  return 'u';
        case 86:  return 'v';
        case 87:  return 'w';
        case 88:  return 'x';
        case 89:  return 'y';
        case 90:  return 'z';
        case 96:  return 'numpad0';
        case 97:  return 'numpad1';
        case 98:  return 'numpad2';
        case 99:  return 'numpad3';
        case 100: return 'numpad4';
        case 101: return 'numpad5';
        case 102: return 'numpad6';
        case 103: return 'numpad7';
        case 104: return 'numpad8';
        case 105: return 'numpad9';
        case 106: return '*';
        case 107: return '+';
        case 109: return '-';
        case 110: return '.';
        case 111: return '/';
        case 112: return 'f1';
        case 113: return 'f2';
        case 114: return 'f3';
        case 115: return 'f4';
        case 116: return 'f5';
        case 117: return 'f6';
        case 118: return 'f7';
        case 119: return 'f8';
        case 120: return 'f9';
        case 121: return 'f10';
        case 122: return 'f11';
        case 123: return 'f12';
        case 144: return 'numlock';
        case 145:  return 'scrolllock';
        case 186:  return ';';
        case 187:  return '=';
        case 188:  return ',';
        case 189:  return '-';
        case 190:  return '.';
        case 191:  return '/';
        case 192:  return '`';
        case 219:  return '[';
        case 220:  return "\\";
        case 221:  return ']';
        case 222:  return "'";
        }
        return String.fromCharCode(keyCode).toLowerCase();
      },
      
      // gets rid of whitespaces in the beginning and the end of the string
      trim : function(str) {
        return str.replace(/^\s\s*/,'').replace(/\s\s*$/,'');
      },
      
      // create clearfix div at the end of the element
      insertClearDiv : function(el) {
        var clearDiv = document.createElement('div');
        clearDiv.style.clear = 'both';
        el.appendChild(clearDiv);
        return el;
      },
      
      // look for socks element in the array
      findElement : function(arr) {
        var el;
        if(arr.length > 0) {
          for(var i=0; i<arr.length; i++) {
      			if(arr[i] instanceof Socks.Element || arr[i] instanceof Socks.Slot) {
      			  el=arr[i];
      			  break;
      			}
    			}
      	}
      	return el;
      },
      
      // look for function in the array
      findFunction : function(arr) {
        var fun;
        if(arr.length > 0) {
          for(var i=0; i<arr.length; i++) {
      			if(Socks.Common.type(arr[i]) === 'Function') {
      			  fun=arr[i];
      			  break;
      			}
    			}
      	}
      	return fun;
      },
      
      // get type of an object
      type : function(obj) {
        var t;
        if(typeof obj === 'object') {
          Array.prototype._socks_type = 'Array';
          Boolean.prototype._socks_type = 'Boolean';
          Date.prototype._socks_type = 'Date';
          Function.prototype._socks_type = 'Function';
          Number.prototype._socks_type = 'Number';
          RegExp.prototype._socks_type = 'RegExp';
          String.prototype._socks_type = 'String';
          
          if(obj._socks_type !== undefined) {
            t = obj._socks_type;
          } else {
            t = 'Object';
          }

          delete Array.prototype._socks_type;
          delete Boolean.prototype._socks_type;
          delete Date.prototype._socks_type;
          delete Function.prototype._socks_type;
          delete Number.prototype._socks_type;
          delete RegExp.prototype._socks_type;
          delete String.prototype._socks_type;

          return t;
        } else {
          t = typeof obj;
          return t.charAt(0).toUpperCase()+t.substring(1);
        }
      },
      
      toBoolean : function(obj) {
        var b;
        if(typeof obj === 'boolean') {
          return obj;
        } else {
          Boolean.prototype._socks_to_b = function() { return this.valueOf(); };
          Number.prototype._socks_to_b = function() { return (this.valueOf() !== 0 ? true : false); };
          String.prototype._socks_to_b = function() { return (this.toLowerCase() === 'true' ? true : false); };
        
          if(obj._socks_to_b !== undefined) {
            b = obj._socks_to_b();
          } else {
            b = false;
          }
        
          delete Boolean.prototype._socks_to_b;
          delete Number.prototype._socks_to_b;
          delete String.prototype._socks_to_b;
        
          return b;
        }
      },
      
      first : function(arr,num) {
        if(num === undefined || num === 1) {
          return arr[0];
        }

        var newArray=[];

        for(var i=0; i<num; i++){
          if(arr[i] === undefined) {
            break;
          } else {
            newArray.push(arr[i]);
          }
        }

        return newArray;
      },
      
      map : function(arr,fun) {
        var newArray=[];

        for(var i=0; i<arr.length; i++) {
          newArray.push(fun(arr[i]));
        }

        return newArray;
      },
      
      removeItems : function(arr,item) {
        var newArray=[];
        for(var i=0; i<arr.length; i++) {
          if(arr[i] !== item) {
            newArray.push(arr[i]);
          }
        }
        return newArray;
      }
    };
  })();

})(window.SOCKS);

