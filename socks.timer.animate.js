/*
 * Socks .Timer.Animate 
 *
 * Copyright (c) 2009 Peter Jihoon Kim
 * 
 * Licensed under the MIT License (MIT-LICENSE.txt)
 *
 * http://wiki.github.com/petejkim/socks
 *
 */
 
(function(Socks){
  
  Socks.Timer.Animate = function(context, fps, fun) {
    fps = parseFloat(fps) || 1;
    var seconds = 1/fps;
    Socks.Timer.Every.call(this, context, seconds, fun);
    this._socks_type = 'Socks.Timer.Animate';
  };
  
  Socks.Timer.Animate.prototype = new Socks.Timer.Every();
    
})(window.SOCKS);

