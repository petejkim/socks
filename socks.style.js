/*
 * Socks .Style 
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
  
  Socks.Style = function() {
    this._socks_type = 'Socks.Style';
  };
  
  Socks.Style.prototype.setStyle = function(s,obj) {    
    if(s !== undefined) {
      
      var trim = Socks.Common.trim;
      var type = Socks.Common.type;
      var toBoolean = Socks.Common.toBoolean;
      var first = Socks.Common.first;
      var map = Socks.Common.map;
      var removeItems = Socks.Common.removeItems;
      
      var addPx = function(i) {
        switch(type(i)) {
        case 'Number':
          return i.toString() + 'px';
        case 'String':
          if((parseInt(i,10).toString() === i) && (i !== '0')) {
            return i + 'px';
          } 
          return i;
        }
      };
            
      /** dimensions **/
      //width 
      if('width' in s) {
        this.width = s.width;
        
        if(obj._element !== undefined) {
          obj._element.style.width = addPx(s.width);
        }
        if(obj instanceof Socks.Slot.Canvas && obj._canvasElement !== undefined) {
          obj._canvasElement.width = obj._element.clientWidth;
          // obj._canvasElement.style.width = obj._element.clientWidth + 'px';
        }
      }
      
      //height
      if('height' in s) {
        this.height = s.height;
        
        if(obj._element !== undefined) {
          obj._element.style.height = addPx(s.height);
        }
        if(obj instanceof Socks.Slot.Canvas && obj._canvasElement !== undefined) {
          obj._canvasElement.height = obj._element.clientHeight;
          // obj._canvasElement.style.height = obj._element.clientHeight + 'px';
        }
      }
      
      /** absolute positioning **/
      //top
      if('top' in s) {
        this.top = s.top;
        
        if(obj._element !== undefined) {
          obj._element.style.position = 'absolute';
          obj._element.style.top = addPx(s.top);
        }
      }
      
      //bottom
      if('bottom' in s) {
        this.bottom = s.bottom;
        
        if(obj._element !== undefined) {
          obj._element.style.position = 'absolute';
          obj._element.style.bottom = addPx(s.bottom);
        }
      }
        
      //left
      if('left' in s) {
        this.left = s.left;

        if(obj._element !== undefined) {
          obj._element.style.position = 'absolute';
          obj._element.style.left = addPx(s.left);
        }
      }
        
      //right
      if('right' in s) {
        this.right = s.right;

        if(obj._element !== undefined) {
          obj._element.style.position = 'absolute';
          obj._element.style.right = addPx(s.right);
        }
      }
      
      /** relative positioning **/
      //displaceTop
            
      if('displaceTop' in s) {
        this.displaceTop = s.displaceTop;
        
        if(obj._element !== undefined) {
          if(obj._element.style.position === 'absolute') {
            if('top' in this) {
              obj._element.style.top = addPx(parseInt(this.top,10) + parseInt(s.displaceTop,10));
            } else if('bottom' in this) {
              obj._element.style.bottom = addPx(parseInt(this.bottom,10) - parseInt(s.displaceTop,10));
            }
          } else {
            obj._element.style.top = addPx(s.displaceTop);
          }
        }
      }
      
      //displaceLeft
      if('displaceLeft' in s) {
        this.displaceLeft = s.displaceLeft;

        if(obj._element !== undefined) {
          if(obj._element.style.position === 'absolute') {
            if('left' in this) {
              obj._element.style.left = addPx(parseInt(this.left,10) + parseInt(s.displaceLeft,10));
            } else if('right' in this) {
              obj._element.style.right = addPx(parseInt(this.right,10) - parseInt(s.displaceLeft,10));
            }
          } else {
            obj._element.style.left = addPx(s.displaceLeft);
          }
        }
      }
      
      /** margin **/
      //margin
      if('margin' in s && type(s.margin) === 'Object') {
        if('top'    in s.margin) { s.marginTop = s.margin.top; }
        if('right'  in s.margin) { s.marginRight = s.margin.right; }
        if('bottom' in s.margin) { s.marginBottom = s.margin.bottom; }
        if('left'   in s.margin) { s.marginLeft = s.margin.left; }
        delete s.margin;
      } else if('margin' in s) {
        this.margin = s.margin;

        switch(type(s.margin)) {
        case 'Array':
          s.margin = map(first(s.margin,4),(function(x) {return addPx(x);})).join(' ');
          break;
        case 'String':
          s.margin = map(first(trim(s.margin).split(/\ \ */),4),(function(x) {return addPx(x);})).join(' ');
          break;
        case 'Number':
          s.margin = addPx(s.margin);
        }
        
        if(obj._element !== undefined) {
          obj._element.style.margin = s.margin;
        }
      }
      
      //marginTop
      if('marginTop' in s) {  
        this.marginTop = s.marginTop;

        if(obj._element !== undefined) {
          obj._element.style.marginTop = addPx(s.marginTop);
        }
      }
      
      //marginRight
      if('marginRight' in s) {  
        this.marginRight = s.marginRight;

        if(obj._element !== undefined) {
          obj._element.style.marginRight = addPx(s.marginRight);
        }
      }
      
      //marginBottom
      if('marginBottom' in s) {  
        this.marginBottom = s.marginBottom;

        if(obj._element !== undefined) {
          obj._element.style.marginBottom = addPx(s.marginBottom);
        }
      }
      
      //marginLeft
      if('marginLeft' in s) {  
        this.marginLeft = s.marginLeft;

        if(obj._element !== undefined) {
          obj._element.style.marginLeft = addPx(s.marginLeft);
        }
      }
      
      /** padding **/
      //padding
      if('padding' in s && type(s.padding) === 'Object') {
        if('top'    in s.padding) { s.paddingTop = s.padding.top; }
        if('right'  in s.padding) { s.paddingRight = s.padding.right; }
        if('bottom' in s.padding) { s.paddingBottom = s.padding.bottom; }
        if('left'   in s.padding) { s.paddingLeft = s.padding.left; }
        delete s.padding;
      } else if('padding' in s) {
        this.padding = s.padding;
        
        switch(type(s.padding)) {
        case 'Array':
          s.padding = map(first(s.padding,4),function(x) {return addPx(x);}).join(' ');
          break;
        case 'String':
          s.padding = map(first(trim(s.padding).split(/\ \ */),4),function(x) {return addPx(x);}).join(' ');
          break;
        case 'Number':
          s.padding = addPx(s.padding);
        }

        if(obj._element !== undefined) {
          obj._element.style.padding = s.padding;
        }
      }

      //paddingTop
      if('paddingTop' in s) {  
        this.paddingTop = s.paddingTop;

        if(obj._element !== undefined) {
          obj._element.style.paddingTop = addPx(s.paddingTop);
        }
      }

      //paddingRight
      if('paddingRight' in s) {  
        this.paddingRight = s.paddingRight;

        if(obj._element !== undefined) {
          obj._element.style.paddingRight = addPx(s.paddingRight);
        }
      }

      //paddingBottom
      if('paddingBottom' in s) {  
        this.paddingBottom = s.paddingBottom;

        if(obj._element !== undefined) {
          obj._element.style.paddingBottom = addPx(s.paddingBottom);
        }
      }

      //paddingLeft
      if('paddingLeft' in s) {  
        this.paddingLeft = s.paddingLeft;

        if(obj._element !== undefined) {
          obj._element.style.paddingLeft = addPx(s.paddingLeft);
        }
      }
      
      /** invisible **/
      //invisible
      if('invisible' in s) {
        s.invisible = toBoolean(s.invisible);
        
        this.invisible = s.invisible;

        if(obj._element !== undefined) {
          if(s.invisible) {
            obj._element.style.visibility = 'hidden';
          } else {
            obj._element.style.visibility = 'visible';
          }
        }
      }
      
      /** hidden **/
      //hidden  
      if('hidden' in s) {
        s.hidden = toBoolean(s.hidden);
        
        this.hidden = s.hidden;

        if(obj._element !== undefined) {
          if(obj._element.style.display !== 'none') {
            this._display = obj._element.style.display;
          }
          
          if(s.hidden) {
            obj._element.style.display = 'none';
          } else {
            if('_display' in this) {
              obj._element.style.display = this._display;
            } else {
              obj._element.style.display = (obj instanceof Socks.Element.TextFragment ? 'inline' : 'block');
            }
          }
        } 
      }
      
      /** scrollable **/
      //scrollable
      if('scrollable' in s) {
        s.scrollable = toBoolean(s.scrollable);

        this.scrollable = s.scrollable;

        if(obj._element !== undefined) {
          if(s.scrollable) {
            obj._element.style.overflow = 'auto';
          } else {
            obj._element.style.overflow = ('overflow' in this ? (this.overflow ? 'visible' : 'hidden') : 'visible');
          }
        }
      }
      
      /** overflow **/
      //overflow
      if('overflow' in s) {
        s.overflow = toBoolean(s.overflow);

        this.overflow = s.overflow;

        if(obj._element !== undefined) {
          if(s.overflow) {
            obj._element.style.overflow = ('scrollable' in this ? (this.scrollable ? 'auto' : 'visible') : 'visible');
          } else {
            obj._element.style.overflow = ('scrollable' in this ? (this.scrollable ? 'auto' : 'hidden') : 'hidden');
          }
        }
      }
      
      /** opacity **/
      //opacity
      if('opacity' in s) {  
        s.opacity = parseFloat(s.opacity);
        if(!isNaN(s.opacity)) {
          if(s.opacity < 0) {
            s.opacity = 0;
          } else if(s.opacity > 0) {
            s.opacity = 1;
          }
          
          this.opacity = s.opacity;
          
          if(obj._element !== undefined) {
            if('opacity' in obj._element.style) {
              obj._element.style.opacity = s.opacity;
            } else if('filter' in obj._element.style) {
              obj._element.style.filter = 'alpha(opacity=' + parseInt((s.opacity * 100),10).toString() + ')'; //MSIE
            }
          }
        }
      }
      
      /** boxShadow **/
      //boxShadow
      //color, top, left, blur
      if('boxShadow' in s) {
        if(type(s.boxShadow) === 'Object') {
          if('color' in s.boxShadow || 'top' in s.boxShadow || 'left' in s.boxShadow || 'blur' in s.boxShadow) {
            if(!('color' in s.boxShadow)) { s.boxShadow.color = '#000'; }
            if(!('top'   in s.boxShadow)) { s.boxShadow.top = 0; }
            if(!('left'  in s.boxShadow)) { s.boxShadow.left = 0; }
            if(!('blur'  in s.boxShadow)) { s.boxShadow.blur = 2; }
            
            this.boxShadow = s.boxShadow;
            
            var boxShadow = [s.boxShadow.color, addPx(s.boxShadow.left), addPx(s.boxShadow.top), addPx(s.boxShadow.blur)].join(' ');

            if(obj._element !== undefined) {
              if('boxShadow' in obj._element.style) {
                obj._element.style.boxShadow = boxShadow;
              } else if('WebkitBoxShadow' in obj._element.style) {
                obj._element.style.WebkitBoxShadow = boxShadow;
              } else if('MozBoxShadow' in obj._element.style) {
                obj._element.style.MozBoxShadow = boxShadow;
              }
            }
          }
        }
      }
      
      /** border **/
      //border
      if('border' in s && type(s.border) === 'Object') {
        if('width'  in s.border) { s.borderWidth = s.border.width; }
        if('color'  in s.border) { s.borderColor = s.border.color; }
        if('style'  in s.border) { s.borderStyle = s.border.style; }
        if('top'    in s.border) { s.borderTop = s.border.top; }
        if('right'  in s.border) { s.borderRight = s.border.right; }
        if('bottom' in s.border) { s.borderBottom = s.border.bottom; }
        if('left'   in s.border) { s.borderLeft = s.border.left; }
        if('radius' in s.border) { s.borderRadius = s.border.radius; }
        delete s.border;
      }
            
      //borderWidth
      if('borderWidth' in s) {  
        this.borderWidth = s.borderWidth;

        if(obj._element !== undefined) {
          obj._element.style.borderWidth = addPx(s.borderWidth);
        }
      }
      
      //borderColor
      if('borderColor' in s) {  
        this.borderColor = s.borderColor;

        if(obj._element !== undefined) {
          obj._element.style.borderColor = s.borderColor;
        }
      }
      
      //borderStyle
      if('borderStyle' in s) {  
        this.borderStyle = s.borderStyle;
        

        if(obj._element !== undefined) {
          obj._element.style.borderStyle = s.borderStyle;
        }
      }
      
      if('borderWidth' in s && !('borderStyle' in this)) {
        this.borderStyle = 'solid';

        if(obj._element !== undefined) {
          obj._element.style.borderStyle = 'solid';
        }
      }
      
      /** borderTop **/
      //borderTop
      if('borderTop' in s && type(s.borderTop) === 'Object') {
        if('width' in s.borderTop) { s.borderTopWidth = s.borderTop.width; }
        if('color' in s.borderTop) { s.borderTopColor = s.borderTop.color; }
        if('style' in s.borderTop) { s.borderTopStyle = s.borderTop.style; }

        delete s.borderTop;
      }

      //borderTopWidth
      if('borderTopWidth' in s) {  
        this.borderTopWidth = s.borderTopWidth;

        if(obj._element !== undefined) {
          obj._element.style.borderTopWidth = addPx(this.borderTopWidth);
        }
      }

      //borderTopColor
      if('borderTopColor' in s) {  
        this.borderTopColor = s.borderTopColor;

        if(obj._element !== undefined) {
          obj._element.style.borderTopColor = s.borderTopColor;
        }
      }

      //borderTopStyle
      if('borderTopStyle' in s) {  
        this.borderTopStyle = s.borderTopStyle;

        if(obj._element !== undefined) {
          obj._element.style.borderTopStyle = s.borderTopStyle;
        }
      }

      if('borderTopWidth' in s && !('borderTopStyle' in this)) {
        this.borderTopStyle = 'solid';

        if(obj._element !== undefined) {
          obj._element.style.borderTopStyle = 'solid';
        }
      }
      
      /** borderRight **/
      //borderRight
      if('borderRight' in s && type(s.borderRight) === 'Object') {
        if('width' in s.borderRight) { s.borderRightWidth = s.borderRight.width; }
        if('color' in s.borderRight) { s.borderRightColor = s.borderRight.color; }
        if('style' in s.borderRight) { s.borderRightStyle = s.borderRight.style; }

        delete s.borderRight;
      }

      //borderRightWidth
      if('borderRightWidth' in s) {  
        this.borderRightWidth = s.borderRightWidth;

        if(obj._element !== undefined) {
          obj._element.style.borderRightWidth = addPx(this.borderRightWidth);
        }
      }

      //borderRightColor
      if('borderRightColor' in s) {  
        this.borderRightColor = s.borderRightColor;

        if(obj._element !== undefined) {
          obj._element.style.borderRightColor = s.borderRightColor;
        }
      }

      //borderRightStyle
      if('borderRightStyle' in s) {  
        this.borderRightStyle = s.borderRightStyle;

        if(obj._element !== undefined) {
          obj._element.style.borderRightStyle = s.borderRightStyle;
        }
      }

      if('borderRightWidth' in s && !('borderRightStyle' in this)) {
        this.borderRightStyle = 'solid';

        if(obj._element !== undefined) {
          obj._element.style.borderRightStyle = 'solid';        
        }
      }
      
      /** borderBottom **/
      //borderBottom
      if('borderBottom' in s && type(s.borderBottom) === 'Object') {
        if('width' in s.borderBottom) { s.borderBottomWidth = s.borderBottom.width; }
        if('color' in s.borderBottom) { s.borderBottomColor = s.borderBottom.color; }
        if('style' in s.borderBottom) { s.borderBottomStyle = s.borderBottom.style; }

        delete s.borderBottom;
      }

      //borderBottomWidth
      if('borderBottomWidth' in s) {  
        this.borderBottomWidth = s.borderBottomWidth;

        if(obj._element !== undefined) {
          obj._element.style.borderBottomWidth = addPx(this.borderBottomWidth);
        }
      }

      //borderBottomColor
      if('borderBottomColor' in s) {  
        this.borderBottomColor = s.borderBottomColor;

        if(obj._element !== undefined) {
          obj._element.style.borderBottomColor = s.borderBottomColor;
        }
      }

      //borderBottomStyle
      if('borderBottomStyle' in s) {  
        this.borderBottomStyle = s.borderBottomStyle;

        if(obj._element !== undefined) {
          obj._element.style.borderBottomStyle = s.borderBottomStyle;
        }
      }

      if('borderBottomWidth' in s && !('borderBottomStyle' in this)) {
        this.borderBottomStyle = 'solid';

        if(obj._element !== undefined) {
          obj._element.style.borderBottomStyle = 'solid';
        }
      }
      
      /** borderLeft **/
      //borderLeft
      if('borderLeft' in s && type(s.borderLeft) === 'Object') {
        if('width' in s.borderLeft) { s.borderLeftWidth = s.borderLeft.width; }
        if('color' in s.borderLeft) { s.borderLeftColor = s.borderLeft.color; }
        if('style' in s.borderLeft) { s.borderLeftStyle = s.borderLeft.style; }
        delete s.borderLeft;
      }

      //borderLeftWidth
      if('borderLeftWidth' in s) {  
        this.borderLeftWidth = s.borderLeftWidth;

        if(obj._element !== undefined) {
          obj._element.style.borderLeftWidth = addPx(this.borderLeftWidth);
        }
      }

      //borderLeftColor
      if('borderLeftColor' in s) {  
        this.borderLeftColor = s.borderLeftColor;

        if(obj._element !== undefined) {
          obj._element.style.borderLeftColor = s.borderLeftColor;
        }
      }

      //borderLeftStyle
      if('borderLeftStyle' in s) {  
        this.borderLeftStyle = s.borderLeftStyle;

        if(obj._element !== undefined) {
          obj._element.style.borderLeftStyle = s.borderLeftStyle;
        }
      }

      if('borderLeftWidth' in s && !('borderLeftStyle' in this)) {
        this.borderLeftStyle = 'solid';

        if(obj._element !== undefined) {
          obj._element.style.borderLeftStyle = 'solid';
        }
      }
      
      /** borderRadius **/
      //borderRadius
      if('borderRadius' in s && type(s.borderRadius) === 'Object') {
        if('topLeft'     in s.borderRadius) { s.borderRadiusTopLeft = s.borderRadius.topLeft; }
        if('topRight'    in s.borderRadius) { s.borderRadiusTopRight = s.borderRadius.topRight; }
        if('bottomRight' in s.borderRadius) { s.borderRadiusBottomRight = s.borderRadius.bottomRight; }
        if('bottomLeft'  in s.borderRadius) { s.borderRadiusBottomLeft = s.borderRadius.bottomLeft; }
        delete s.borderRadius;
      } else if('borderRadius' in s) {
        this.borderRadius = addPx(trim(s.borderRadius.toString()));

        if(obj._element !== undefined) {
          if('borderRadius' in obj._element.style) {
            obj._element.style.borderRadius = this.borderRadius;
          } else if('WebkitBorderRadius' in obj._element.style) {
            obj._element.style.WebkitBorderRadius = this.borderRadius;
          } else if('MozBorderRadius' in obj._element.style) {
            obj._element.style.MozBorderRadius = this.borderRadius;
          }
        }
      }

      //borderRadiusTopLeft
      if('borderRadiusTopLeft' in s) {        
        this.borderRadiusTopLeft = addPx(s.borderRadiusTopLeft);

        if(obj._element !== undefined) {
          if('borderRadiusTopLeft' in obj._element.style) {
            obj._element.style.borderTopLeftRadius = this.borderRadiusTopLeft;
          } else if('WebkitBorderTopLeftRadius' in obj._element.style) {
            obj._element.style.WebkitBorderTopLeftRadius = this.borderRadiusTopLeft;
          } else if('MozBorderRadiusTopleft' in obj._element.style) {
            obj._element.style.MozBorderRadiusTopleft = this.borderRadiusTopLeft;
          }
        }
      }

      //borderRadiusTopRight
      if('borderRadiusTopRight' in s) {
        this.borderRadiusTopRight = addPx(s.borderRadiusTopRight);

        if(obj._element !== undefined) {
          if('borderRadiusTopRight' in obj._element.style) {
            obj._element.style.borderTopRightRadius = this.borderRadiusTopRight;
          } else if('WebkitBorderTopRightRadius' in obj._element.style) {
            obj._element.style.WebkitBorderTopRightRadius = this.borderRadiusTopRight;
          } else if('MozBorderRadiusTopright' in obj._element.style) {
            obj._element.style.MozBorderRadiusTopright = this.borderRadiusTopRight;
          }
        }
      }
      //borderRadiusBottomRight
      if('borderRadiusBottomRight' in s) {
        this.borderRadiusBottomRight = addPx(s.borderRadiusBottomRight);

        if(obj._element !== undefined) {
          if('borderRadiusBottomRight' in obj._element.style) {
            obj._element.style.borderBottomRightRadius = this.borderRadiusBottomRight;
          } else if('WebkitBorderBottomRightRadius' in obj._element.style) {
            obj._element.style.WebkitBorderBottomRightRadius = this.borderRadiusBottomRight;
          } else if('MozBorderRadiusBottomright' in obj._element.style) {
            obj._element.style.MozBorderRadiusBottomright = this.borderRadiusBottomRight;
          }
        }
      }

      //borderRadiusBottomLeft
      if('borderRadiusBottomLeft' in s) {
        this.borderRadiusBottomLeft = addPx(s.borderRadiusBottomLeft);

        if(obj._element !== undefined) {
          if('borderRadiusBottomLeft' in obj._element.style) {
            obj._element.style.borderBottomLeftRadius = this.borderRadiusBottomLeft;
          } else if('WebkitBorderBottomLeftRadius' in obj._element.style) {
            obj._element.style.WebkitBorderBottomLeftRadius = this.borderRadiusBottomLeft;
          } else if('MozBorderRadiusBottomleft' in obj._element.style) {
            obj._element.style.MozBorderRadiusBottomleft = this.borderRadiusBottomLeft;
          }
        }
      }
      
      /** outline **/
      /** outline **/
      //outline
      if('outline' in s && type(s.outline) === 'Object') {
          if('color'  in s.outline) { s.outlineColor = s.outline.color; }
          if('offset' in s.outline) { s.outlineOffset = s.outline.offset; }
          if('style'  in s.outline) { s.outlineStyle = s.outline.style; }
          if('width'  in s.outline) { s.outlineWidth = s.outline.width; }
          delete s.outline;
      }

      //outlineWidth
      if('outlineWidth' in s) {  
        this.outlineWidth = addPx(s.outlineWidth);

        if(obj._element !== undefined) {
          obj._element.style.outlineWidth = this.outlineWidth;
        }
      }

      //outlineColor
      if('outlineColor' in s) {  
        this.outlineColor = s.outlineColor;

        if(obj._element !== undefined) {
          obj._element.style.outlineColor = s.outlineColor;
        }
      }

      //outlineOffset
      if('outlineOffset' in s) {  
        this.outlineOffset = s.outlineOffset;

        if(obj._element !== undefined) {
          obj._element.style.outlineOffset = s.outlineOffset;
        }
      }

      //outlineStyle
      if('outlineStyle' in s) {  
        this.outlineStyle = s.outlineStyle;

        if(obj._element !== undefined) {
          obj._element.style.outlineStyle = s.outlineStyle;
        }
      }

      if('outlineWidth' in s && !('outlineStyle' in this)) {
        this.outlineStyle = 'solid';

        if(obj._element !== undefined) {
          obj._element.style.outlineStyle = 'solid';
        }
      }
      
      /** verticalAlign **/
      //verticalAlign
      if('verticalAlign' in s) {
        s.verticalAlign = trim(s.verticalAlign.toString());

        if(s.verticalAlign === 'textTop') {
          s.verticalAlign = 'text-top';
        } else if(s.verticalAlign === 'textBottom') {
          s.verticalAlign = 'text-bottom';
        }

        this.verticalAlign = addPx(s.verticalAlign);

        if(obj._element !== undefined) {
          obj._element.style.verticalAlign = this.verticalAlign; 
        }
      }
      
      /** background **/
      //background
      if('background' in s && type(s.background === 'Object')) {
        if('fixed'    in s.background) { s.backgroundFixed = s.background.fixed; }
        if('color'    in s.background) { s.backgroundColor = s.background.color; }
        if('image'    in s.background) { s.backgroundImage = s.background.image; }
        if('position' in s.background) { s.backgroundPosition = s.background.position; }
        if('repeat'   in s.background) { s.backgroundRepeat = s.background.repeat; }
        delete s.background;
      }
      
      //backgroundFixed
      if('backgroundFixed' in s) {
        s.backgroundFixed = toBoolean(s.backgroundFixed);

        this.backgroundFixed = s.backgroundFixed;

        if(obj._element !== undefined) {
          if(s.backgroundFixed) {
            obj._element.style.backgroundAttachment = 'fixed';
          } else {
            obj._element.style.backgroundAttachment = 'scroll';
          }
        }
      }
      
      
      //backgroundColor
      if('backgroundColor' in s) {  
        this.backgroundColor = s.backgroundColor;

        if(obj._element !== undefined) {
          obj._element.style.backgroundColor = s.backgroundColor;
        }
      }
      
      //backgroundImage
      if('backgroundImage' in s) {
        var backgroundImageUrl;
        if(((backgroundImageUrl = /url\("[^"]*"\)/.exec(s.backgroundImage)) !== null) || ((backgroundImageUrl = /url\('[^']*'\)/.exec(s.backgroundImage)) !== null)) {
          backgroundImageUrl = backgroundImageUrl[0].substring(5,backgroundImageUrl[0].length-2);
        } else if((backgroundImageUrl = /url\([^\)]*\)/.exec(s.backgroundImage)) !== null) {
          backgroundImageUrl = backgroundImageUrl[0].substring(4,backgroundImageUrl[0].length-1);
        } else {
          backgroundImageUrl = s.backgroundImage;
        }

        this.backgroundImage = backgroundImageUrl;

        if(obj._element !== undefined) {
          obj._element.style.backgroundImage = 'url('+backgroundImageUrl+')';
        }
      }
      
      //backgroundPosition
      if('backgroundPosition' in s) {
        s.backgroundPosition = map(first(trim(s.backgroundPosition),2),function(x) { return addPx(x); }).join(' ');
        
        this.backgroundPosition = s.backgroundPosition;

        if(obj._element !== undefined) {
          obj._element.style.backgroundPosition = s.backgroundPosition;
        }
      }
      
      //backgroundRepeat
      if('backgroundRepeat' in s) {
        s.backgroundRepeat = trim(s.backgroundRepeat);

        if(s.backgroundRepeat === 'repeatX' || s.backgroundRepeat === 'x') {
          s.backgroundRepeat = 'repeat-x';
        } else if(s.backgroundRepeat === 'repeatY' || s.backgroundRepeat === 'y') {
          s.backgroundRepeat = 'repeat-y';
        } else if(s.backgroundRepeat === 'noRepeat' || s.backgroundRepeat === 'no') {
          s.backgroundRepeat = 'no-repeat';
        } else {
          s.backgroundRepeat = 'repeat';
        } 
        if(s.backgroundRepeat === 'repeat' || s.backgroundRepeat === 'repeat-x' || s.backgroundRepeat === 'repeat-y' || s.backgroundRepeat === 'no-repeat') {
          this.backgroundRepeat = s.backgroundRepeat;
          if(obj._element !== undefined) {
            obj._element.style.backgroundRepeat = s.backgroundRepeat;
          }
        }
      }
      
      
      /** text **/
      //text
      if('text' in s && type(s.text) === 'Object') {
        if('color'              in s.text) { s.textColor = s.text.color; }
        if('align'              in s.text) { s.textAlign = s.text.align; }
        if('underline'          in s.text) { s.textUnderline = s.text.underline; }
        if('overline'           in s.text) { s.textOverline = s.text.overline; }
        if('strikethrough'      in s.text) { s.textStrikethrough = s.text.strikethrough; }
        if('indent'             in s.text) { s.textIndent = s.text.indent; }
        if('shadow'             in s.text) { s.textShadow = s.text.shadow; }
        if('transform'          in s.text) { s.textTransform = s.text.transform; }
        if('leading'            in s.text) { s.textLeading = s.text.leading; }
        if('kerning'            in s.text) { s.textKerning = s.text.kerning; }
        if('wordSpacing'        in s.text) { s.textWordSpacing = s.text.wordSpacing; }
        if('preserveWhitespace' in s.text) { s.textPreserveWhitespace = s.text.preserveWhitespace; }
        if('noWrap'             in s.text) { s.textNoWrap = s.text.noWrap; }
        delete s.text;
      }
      
      //textColor
      if('textColor' in s) {
        this.textColor = s.textColor;

        if(obj._element !== undefined) {
          obj._element.style.color = this.textColor;
        }
      }
      
      //textAlign
      //left, right, center, justify
      if('textAlign' in s) {
        s.textAlign = trim(s.textAlign);
                    
        if(s.textAlign === 'left' || s.textAlign === 'right' || s.textAlign === 'center' || s.textAlign === 'justify') {
          this.textAlign = s.textAlign;

          if(obj._element !== undefined) {
            obj._element.style.textAlign = s.textAlign;
          }
        }
      }
      
      //textUnderline
      if('textUnderline' in s) {
        s.textUnderline = toBoolean(s.textUnderline);
        this.textUnderline = s.textUnderline;
      }
      
      //textOverline
      if('textOverline' in s) {
        s.textOverline = toBoolean(s.textOverline);
        this.textOverline = s.textOverline;
      }
      
      //textStrikethrough
      if('textStrikethrough' in s) {
        s.textStrikethrough = toBoolean(s.textStrikethrough);
        this.textStrikethrough = s.textStrikethrough;
      }
      
      if('textUnderline' in this || 'textOverline' in this || 'textStrikethrough' in this) {
        if(obj._element !== undefined) {
          var textDecoration = [];
          if(this.textUnderline) {
            textDecoration.push('underline');
          }
          if(this.textOverline) {
            textDecoration.push('overline');
          }
          if(this.textStrikethrough) {
            textDecoration.push('line-through');
          }
          obj._element.style.textDecoration = textDecoration.join(' ');
        }
      }
      
      //textIndent
      if('textIndent' in s) {  
        this.textIndent = addPx(s.textIndent);

        if(obj._element !== undefined) {
          obj._element.style.textIndent = this.textIndent;
        }
      }
      
      //textShadow
      //color, x, y, blur
      if('textShadow' in s) {
        if(type(s.textShadow) === 'Object') {
          if(typeof s.textShadow.color === 'undefined') {
            s.textShadow.color = '#000';
          }
          if(typeof s.textShadow.top === 'undefined') {
            s.textShadow.top = 0;
          }
          if(typeof s.textShadow.left === 'undefined') {
            s.textShadow.left = 0;
          }
          if(typeof s.textShadow.blur === 'undefined') {
            s.textShadow.blur = '2px';
          }
          this.textShadow = [s.textShadow.color, addPx(s.textShadow.left), addPx(s.textShadow.top), addPx(s.textShadow.blur)].join(' ');
          
        } else {
          s.textShadow = map(first(trim(s.textShadow).split(/\ \ */),4),function(x) { return addPx(x); }).join(' ');

          this.textShadow = s.textShadow;
        }
        
        if('textShadow' in this) {
          if(obj._element !== undefined) {
            if('textShadow' in obj._element.style) {
              obj._element.style.textShadow = this.textShadow;
            }
          }
        }
      }
      
      //textTransform
      //capitalize, uppercase, lowercase
      if('textTransform' in s) {
        s.textTransform = trim(s.textTransform);
          
        if(s.textTransform === 'capitalize' || s.textTransform === 'uppercase' || s.textTransform === 'lowercase') {
          this.textTransform = s.textTransform;

          if(obj._element !== undefined) {
            obj._element.style.textTransform = this.textTransform;
          }
        }
      }
      
      //textLeading
      //=line-height
      if('textLeading' in s) {  
        this.textLeading = addPx(s.textLeading);

        if(obj._element !== undefined) {
          obj._element.style.lineHeight = this.textLeading;
        }
      }
      
      //textKerning
      //=letter-spacing
      if('textKerning' in s) {  
        this.textKerning = addPx(s.textKerning);

        if(obj._element !== undefined) {
          obj._element.style.letterSpacing = this.textKerning;
        }
      }
      
      //textWordSpacing
      if('textWordSpacing' in s) {
        this.textWordSpacing = addPx(s.textWordSpacing);

        if(obj._element !== undefined) {
          obj._element.style.wordSpacing = this.textWordSpacing;
        }
      }
      
      //textPreserveWhitespace
      if('textPreserveWhitespace' in s) {
        s.textPreserveWhitespace = toBoolean(s.textPreserveWhitespace);
        this.textPreserveWhitespace = s.textPreserveWhitespace;
      }
      
      //textNoWrap
      if('textNoWrap' in s) {
        s.textNoWrap = toBoolean(s.textNoWrap);
        this.textNoWrap = s.textNoWrap;
      }
      
      if('textPreserveWhitespace' in this || 'textNoWrap' in this) {
        if(obj._element !== undefined) {
          if(this.textNoWrap) {
            obj._element.style.whiteSpace = 'nowrap';
          } else if(this.textPreserveWhitespace) {
            obj._element.style.whiteSpace = 'pre';
          }
        }
      }      
      
      /** font **/
      //font
      if('font' in s && type(s.font) === 'Object') {
        if('size'    in s.font) { s.fontSize = s.font.size; }
        if('family'  in s.font) { s.fontFamily = s.font.family; }
        if('style'   in s.font) { s.fontStyle = s.font.style; }
        if('variant' in s.font) { s.fontVariant = s.font.variant; }
        if('weight'  in s.font) { s.fontWeight = s.font.weight; }
        delete s.font;
      }
      
      //fontSize
      if('fontSize' in s) {
        s.fontSize = trim(s.fontSize.toString());

        if(s.fontSize === 'xxSmall' || s.fontSize === 'xxs') {
          s.fontSize = 'xx-small';
        } else if(s.fontSize === 'xSmall' || s.fontSize === 'xs') {
          s.fontSize = 'x-small';
        } else if(s.fontSize === 's') {
          s.fontSize = 'small';
        } else if(s.fontSize === 'm') {
          s.fontSize = 'medium';
        } else if(s.fontSize === 'l') {
          s.fontSize = 'large';
        } else if(s.fontSize === 'xLarge' || s.fontSize === 'xl') {
          s.fontSize = 'x-large';
        } else if(s.fontSize === 'xxLarge' || s.fontSize === 'xxl') {
          s.fontSize = 'xx-large';
        } else if(s.fontSize === 'sr') {
          s.fontSize = 'smaller';
        } else if(s.fontSize === 'lr') {
          s.fontSize = 'larger';
        }
      
        this.fontSize = addPx(s.fontSize);

        if(obj._element !== undefined) {
          obj._element.style.fontSize = this.fontSize;
        }
      }
      
      //fontFamily
      if('fontFamily' in s) {
        this.fontFamily = s.fontFamily;

        if(obj._element !== undefined) {
          obj._element.style.fontFamily = this.fontFamily;
        }
      }
      
      //fontStyle
      if('fontStyle' in s) {
        s.fontStyle = trim(s.fontStyle);

        if(s.fontStyle === 'normal' || s.fontStyle === 'italic' || s.fontStyle === 'oblique') {
          this.fontStyle = s.fontStyle;

          if(obj._element !== undefined) {
            obj._element.style.fontStyle = this.fontStyle;
          }
        }
      }
      
      //fontVariant
      if('fontVariant' in s) {
        s.fontVariant = trim(s.fontVariant);

        if(s.fontVariant === 'smallCaps') {
          s.fontVariant = 'small-caps';
        }

        if(s.fontVariant === 'normal' || s.fontVariant === 'small-caps') {
          this.fontVariant = s.fontVariant;

          if(obj._element !== undefined) {
            obj._element.style.fontVariant = this.fontVariant;
          }
        }
      }
      
      //fontWeight
      if('fontWeight' in s) {
        
        s.fontWeight = trim(s.fontWeight.toString());

        if(s.fontWeight === 'normal' || s.fontWeight === 'bold' || s.fontWeight === 'bolder' || s.fontWeight === 'lighter') {
          this.fontWeight = s.fontWeight;

          if(obj._element !== undefined) {
            obj._element.style.fontWeight = this.fontWeight;
          }
        }
      }
    }
  };

})(window.SOCKS);

