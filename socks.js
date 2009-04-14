/*
 * Socks 
 *
 * Copyright (c) 2009 Peter Jihoon Kim
 * 
 * Licensed under the MIT License (MIT-LICENSE.txt)
 *
 * http://wiki.github.com/petejkim/socks
 *
 */
 
(function(){
  
  window.SOCKS = function() {
    this.CODENAME = 'Armadillo';
    this.VERSION  = '0.7';
    this.APPS = [];
    this._nextAppId = 0;
    this._nextSlotId = 0;
    this._nextElementId = 0;
  };
    
  window.Socks = new window.SOCKS();
  
})();

