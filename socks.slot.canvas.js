/*
 * Socks .Slot.Canvas 
 *
 * Copyright (c) 2009 Peter Jihoon Kim
 * 
 * Licensed under the MIT License (MIT-LICENSE.txt)
 *
 * http://wiki.github.com/petejkim/socks
 *
 */
 
(function(Socks){
  
  var insertClearDiv = Socks.Common.insertClearDiv;
    
  Socks.Slot.Canvas = function(parent, styles, fun) {
    this._slotType = 'flow';
    this._parent = parent;
    
    Socks.Slot.call(this, this._parent._element, styles, fun);
    this._getCanvasContext();
    this._socks_type = 'Socks.Slot.Canvas';
  };
  
  Socks.Slot.Canvas.prototype = new Socks.Slot();
  
  // clears slot
  Socks.Slot.Canvas.prototype._clearSlot = function() {
    Socks.Slot.prototype._clearSlot.call(this);
    
    if(this._canvasElement) {
      while(this._canvasElement.firstChild) {
        this._canvasElement.removeChild(this._canvasElement.firstChild);
      }
      insertClearDiv(this._canvasElement);
      this.clearCanvas();
    }
    return this;
  };
  
  Socks.Slot.Canvas.prototype._createElement = function() {
    if(this._parent._element) {
      if(this._element === undefined) {
        this._element = document.createElement('div');

        insertClearDiv(this._element);
        
        // creates canvas element
        this._createCanvasElement();
        
        this.setStyle({margin:0,padding:0,borderWidth:0,scrollable:true});
        // set layout related styles
        this._setLayout();
        // insert the element into the parent
        this._insertIntoParent(this._element);
      }
    }
    return this._element;
  };
  
  Socks.Slot.Canvas.prototype._getCanvasContext = function() {
    if(this._canvasElement) {
      if(this._canvasContext) {
        return this._canvasContext;
      } else {
        if(this._canvasElement.getContext) {
          this._canvasContext = this._canvasElement.getContext('2d');
          return this._canvasContext;
        } else {
          //attempt to initialize excanvas
          if (window.G_vmlCanvasManager !== undefined) { 
            window.G_vmlCanvasManager.initElement(this._canvasElement);
            if(this._canvasElement.getContext) {
              this._canvasContext = this._canvasElement.getContext('2d');
              return this._canvasContext;
            }
          }
        }
      }
    }
    return null;
  };
  
  Socks.Slot.Canvas.prototype._prepareCanvasAttributes = function() {
    this._canvasAttributes = {};
    // compositing
    this._canvasAttributes.globalAlpha              = this._getCanvasContext().globalAlpha;
    this._canvasAttributes.globalCompositeOperation = this._getCanvasContext().globalCompositeOperation;
    // colors and styles
    this._canvasAttributes.strokeStyle = this._getCanvasContext().strokeStyle;
    this._canvasAttributes.fillStyle   = this._getCanvasContext().fillStyle;
    // line caps/joins
    this._canvasAttributes.lineWidth  = this._getCanvasContext().lineWidth;
    this._canvasAttributes.lineCap    = this._getCanvasContext().lineCap;
    this._canvasAttributes.lineJoin   = this._getCanvasContext().lineJoin;
    this._canvasAttributes.miterLimit = this._getCanvasContext().miterLimit;
    // shadows
    this._canvasAttributes.shadowOffsetX = this._getCanvasContext().shadowOffsetX;
    this._canvasAttributes.shadowOffsetY = this._getCanvasContext().shadowOffsetY;
    this._canvasAttributes.shadowBlur    = this._getCanvasContext().shadowBlur;
    this._canvasAttributes.shadowColor   = this._getCanvasContext().shadowColor;
    // text
    this._canvasAttributes.font         = this._getCanvasContext().font;
    this._canvasAttributes.textAlign    = this._getCanvasContext().textAlign;
    this._canvasAttributes.textBaseline = this._getCanvasContext().textBaseline;
    
  };
  
  Socks.Slot.Canvas.prototype._createCanvasElement = function() {
    // create another div and use that as a 'insert element' so that the canvas won't obstruct it
    this._insertElement = document.createElement('div');
    var insertElementStlye = this._insertElement.style;
    insertElementStlye.display = 'block';
    insertElementStlye.position = 'relative';
    insertElementStlye.overflow = 'visible';

    insertClearDiv(this._insertElement);

    if(this._element.firstChild === null) {
      this._element.appendChild(this._insertElement);
    } else {
      this._element.insertBefore(this._insertElement, this._element.lastChild);
    }
    // create canvas  
    this._canvasElement = document.createElement('canvas');
    var canvasElementStyle = this._canvasElement.style;
    canvasElementStyle.display = 'block';
    canvasElementStyle.position = 'absolute';
    canvasElementStyle.padding = '0';
    canvasElementStyle.margin = '0';
    canvasElementStyle.outline = 'none';
    canvasElementStyle.border = 'none';
    this._element.insertBefore(this._canvasElement, this._insertElement);
    return this;
  };
  
  // canvas attribute getters
  // compositing
  Socks.Slot.Canvas.prototype.getGlobalAlpha = function() {
    return this._getCanvasContext().globalAlpha;
  };

  Socks.Slot.Canvas.prototype.getGlobalCompositeOperation = function() {
    return this._getCanvasContext().globalCompositeOperation;
  };

  // colors and styles
  Socks.Slot.Canvas.prototype.getStrokeStyle = function() {
    return this._getCanvasContext().strokeStyle;
  };

  Socks.Slot.Canvas.prototype.getFillStyle = function() {
    return this._getCanvasContext().fillStyle;
  };

  // line caps/joins
  Socks.Slot.Canvas.prototype.getLineWidth = function() {
    return this._getCanvasContext().lineWidth;
  };

  Socks.Slot.Canvas.prototype.getLineCap = function() {
    return this._getCanvasContext().lineCap;
  };

  Socks.Slot.Canvas.prototype.getLineJoin = function() {
    return this._getCanvasContext().lineJoin;
  };

  Socks.Slot.Canvas.prototype.getMiterLimit = function() { 
    return this._getCanvasContext().miterLimit;
  };

  // shadows
  Socks.Slot.Canvas.prototype.getShadowOffsetX = function() {
    return this._getCanvasContext().shadowOffsetX;
  };

  Socks.Slot.Canvas.prototype.getShadowOffsetY = function() {
    return this._getCanvasContext().shadowOffsetY;
  };

  Socks.Slot.Canvas.prototype.getShadowBlur = function() {
    return this._getCanvasContext().shadowBlur;
  };

  Socks.Slot.Canvas.prototype.getShadowColor = function() {
    return this._getCanvasContext().shadowColor;
  };

  // text
  Socks.Slot.Canvas.prototype.getFont = function() { 
    return this._getCanvasContext().font;
  };

  Socks.Slot.Canvas.prototype.getTextAlign = function() {
    return this._getCanvasContext().textAlign;
  };

  Socks.Slot.Canvas.prototype.getTextBaseline = function() {
    return this._getCanvasContext().textBaseline;
  };

  // canvas attribute setters
  // compositing
  Socks.Slot.Canvas.prototype.setGlobalAlpha = function(val) {
    this._getCanvasContext().globalAlpha = val;
    return this;
  };

  Socks.Slot.Canvas.prototype.setGlobalCompositeOperation = function(val) {
    this._getCanvasContext().globalCompositeOperation = val;
    return this;
  };

  // colors and styles
  Socks.Slot.Canvas.prototype.setStrokeStyle = function(val) {
    this._getCanvasContext().strokeStyle = val;
    return this;
  };

  Socks.Slot.Canvas.prototype.setFillStyle = function(val) {
    this._getCanvasContext().fillStyle = val;
    return this;
  };

  // line caps/joins
  Socks.Slot.Canvas.prototype.setLineWidth = function(val) {
    this._getCanvasContext().lineWidth = val;
    return this;
  };

  Socks.Slot.Canvas.prototype.setLineCap = function(val) {
    this._getCanvasContext().lineCap = val;
    return this;
  };

  Socks.Slot.Canvas.prototype.setLineJoin = function(val) {
    this._getCanvasContext().lineJoin = val;
    return this;
  };

  Socks.Slot.Canvas.prototype.setMiterLimit = function(val) { 
    this._getCanvasContext().miterLimit = val;
    return this;
  };

  // shadows
  Socks.Slot.Canvas.prototype.setShadowOffsetX = function(val) {
    this._getCanvasContext().shadowOffsetX = val;
    return this;
  };

  Socks.Slot.Canvas.prototype.setShadowOffsetY = function(val) {
    this._getCanvasContext().shadowOffsetY = val;
    return this;
  };

  Socks.Slot.Canvas.prototype.setShadowBlur = function(val) {
    this._getCanvasContext().shadowBlur = val;
    return this;
  };

  Socks.Slot.Canvas.prototype.setShadowColor = function(val) {
    this._getCanvasContext().shadowColor = val;
    return this;
  };

  // text
  Socks.Slot.Canvas.prototype.setFont = function(val) { 
    this._getCanvasContext().font = val;
    return this;
  };

  Socks.Slot.Canvas.prototype.setTextAlign = function(val) {
    this._getCanvasContext().textAlign = val;
    return this;
  };

  Socks.Slot.Canvas.prototype.setTextBaseline = function(val) {
    this._getCanvasContext().textBaseline = val;
    return this;
  };

  // canvas methods
  // clear canvas
  Socks.Slot.Canvas.prototype.clearCanvas = function() {
    if(this._canvasElement) {
      var canvasElement = this._canvasElement;
      canvasElement.width=canvasElement.width; // resetting width clears canvas
    }
    return this;
  };
  
  // state
  Socks.Slot.Canvas.prototype.save = function() {
    this._getCanvasContext().save();
    return this;
  };
  
  Socks.Slot.Canvas.prototype.restore = function() {
    this._getCanvasContext().restore();
    return this;
  };
  
  // transformations
  Socks.Slot.Canvas.prototype.scale = function(x,y) {
    this._getCanvasContext().scale(x,y);
    return this;
  };
  
  Socks.Slot.Canvas.prototype.rotate = function(angle) {
    this._getCanvasContext().rotate(angle);
    return this;
  };
  
  Socks.Slot.Canvas.prototype.translate = function(x,y) {
    this._getCanvasContext().translate(x,y);
    return this;
  };
  
  Socks.Slot.Canvas.prototype.transform = function(m11,m12,m21,m22,dx,dy) {
    this._getCanvasContext().transform(m11,m12,m21,m22,dx,dy);
    return this;
  };
  
  Socks.Slot.Canvas.prototype.setTransform = function(m11,m12,m21,m22,dx,dy) {
    this._getCanvasContext().setTransform(m11,m12,m21,m22,dx,dy);
    return this;
  };
  
  // colors and styles
  Socks.Slot.Canvas.prototype.createLinearGradient = function(x0,y0,x1,y1) {
    //returns CanvasGradient
    return this._getCanvasContext().createLinearGradient(x0,y0,x1,y1);
  };
  
  Socks.Slot.Canvas.prototype.createRadialGradient = function(x0,y0,r0,x1,y1,r1) {
    //returns CanvasGradient
    return this._getCanvasContext().createRadialGradient(x0,y0,r0,x1,y1,r1);
  };
  
  Socks.Slot.Canvas.prototype.createPattern = function(image,repetition) {
    //returns CanvasPattern
    return this._getCanvasContext().createPattern(image,repetition);
  };
  
  // rects
  Socks.Slot.Canvas.prototype.clearRect = function(x,y,w,h) {
    this._getCanvasContext().clearRect(x,y,w,h);
    return this;
  };
  
  Socks.Slot.Canvas.prototype.fillRect = function(x,y,w,h) {
    this._getCanvasContext().fillRect(x,y,w,h);
    return this;
  };
  
  Socks.Slot.Canvas.prototype.strokeRect = function(x,y,w,h) {
    this._getCanvasContext().strokeRect(x,y,w,h);
    return this;
  };
  
  //path API
  Socks.Slot.Canvas.prototype.beginPath = function() {
    this._getCanvasContext().beginPath();
    return this;
  };
  
  Socks.Slot.Canvas.prototype.closePath = function() {
    this._getCanvasContext().closePath();
    return this;
  };
  
  Socks.Slot.Canvas.prototype.moveTo = function(x,y) {
    this._getCanvasContext().moveTo(x,y);
    return this;
  };
  
  Socks.Slot.Canvas.prototype.lineTo = function(x,y) {
    this._getCanvasContext().lineTo(x,y);
    return this;
  };
  
  Socks.Slot.Canvas.prototype.quadraticCurveTo = function(cpx,cpy,x,y) {
    this._getCanvasContext().quadraticCurveTo(cpx,cpy,x,y);
    return this;
  };
  
  Socks.Slot.Canvas.prototype.bezierCurveTo = function(cp1x,cp1y,cp2x,cp2y,x,y) {
    this._getCanvasContext().bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
    return this;
  };
  
  Socks.Slot.Canvas.prototype.arcTo = function(x1,y1,x2,y2,radius) {
    this._getCanvasContext().arcTo(x1,y1,x2,y2,radius);
    return this;
  };
  
  Socks.Slot.Canvas.prototype.rect = function(x,y,w,h) {
    this._getCanvasContext().rect(x,y,w,h);
    return this;
  };
  
  Socks.Slot.Canvas.prototype.arc = function(x,y,radius,startAngle,endAngle,anticlockwise) {
    this._getCanvasContext().arc(x,y,radius,startAngle,endAngle,anticlockwise);
    return this;
  };
  
  Socks.Slot.Canvas.prototype.fill = function() {
    this._getCanvasContext().fill();
    return this;
  };
  
  Socks.Slot.Canvas.prototype.stroke = function() {
    this._getCanvasContext().stroke();
    return this;
  };
  
  Socks.Slot.Canvas.prototype.clip = function() {
    this._getCanvasContext().clip();
    return this;
  };
  
  Socks.Slot.Canvas.prototype.isPointInPath = function(x,y) {
    // returns boolean
    return this._getCanvasContext().isPointInPath(x,y);
  };
  
  // text
  Socks.Slot.Canvas.prototype.fillText = function(text,x,y,maxWidth) {
    this._getCanvasContext().fillText(text,x,y,maxWidth);
    return this;
  };
  
  Socks.Slot.Canvas.prototype.strokeText = function(text,x,y,maxWidth) {
    this._getCanvasContext().strokeText(text,x,y,maxWidth);
    return this;
  };
  
  Socks.Slot.Canvas.prototype.measureText = function(text) {
    // returns TextMetrics
    return this._getCanvasContext().measureText(text);
  };
  
  // drawing images
  Socks.Slot.Canvas.prototype.drawImage = function(image,sx,sy,sw,sh,dx,dy,dw,dh) {
    this._getCanvasContext().drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh);
    return this;
  };
  
  // pixel manipulation
  Socks.Slot.Canvas.prototype.createImageData = function(sw,sh) {
    // returns ImageData
    return this._getCanvasContext().createImageData(sw,sh);
  };
  
  Socks.Slot.Canvas.prototype.getImageData = function(sx,sy,sw,sh) {
    // returns ImageData
    return this._getCanvasContext().getImageData(sx,sy,sw,sh);
  };
  
  Socks.Slot.Canvas.prototype.putImageData = function(imagedata,dx,dy,dirtyX,dirtyY,dirtyWidth,dirtyHeight) {
    this._getCanvasContext().putImageData(imagedata,dx,dy,dirtyX,dirtyY,dirtyWidth,dirtyHeight);
    return this;
  };
  
})(window.SOCKS);

