/*
 * Socks .Init 
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
  
  // safari 2.x replace(/regex/,function) fix
  // adapted from Prototype bugtracker. The Prototype JS Library is licensed under MIT-License.
  // https://prototype.lighthouseapp.com/projects/8886/tickets/300-fix-string-replace-to-support-functions-in-safari-2
  if('a'.replace(/a/, function() {return 'b';}) !== 'b') {
    (function(replace){
      String.prototype.replace = function(pattern, replacement) {
        // replacement is not function, use built-in
        if (typeof replacement !== 'function') {
          return replace.apply(this, arguments);
        }
        var str = '' + this;
        var idx, args;
        // pattern string is not RegExp
        if (!(pattern instanceof RegExp)) {
          idx = str.indexOf(pattern);
          return (idx === -1 ? str : replace.apply(str, [pattern, replacement(pattern, idx, str)]));
        }

        var reg = pattern, result = [], lastidx = reg.lastIndex, re;
        while ((re = reg.exec(str)) !== null) {
          idx = re.index;
          args = re.concat(idx, str);
          result.push(str.slice(lastidx, idx), replacement.apply(null, args).toString());
          if (!reg.global) {
            lastidx += RegExp.lastMatch.length;
            break;
          } else {
            lastidx = reg.lastIndex;
          }
        }
        result.push(str.slice(lastidx));
        return result.join('');
      };
    })(String.prototype.replace);
  }
  
  var inComment = function(code, block) {
    var tmpCode = code.substring((block ? 2 : 1),code.length);
    var addIndex = (block ? 2 : 1);
    var index;

    while(true) {
      index = tmpCode.search((block ? (/\*\//) : (/\n/)));
      if(index !== -1) {
        return [(block ? '' : "\n"), code.substring(addIndex+index+(block ? 2 : 1),code.length)];
      } else {
        break;
      }
    }

    return [(block ? '/*' : '//'), code.substring(2,code.length)];
  };
  
  var inQuotes = function(code,doubleQuote) {
    var tmpCode = code.substring(1,code.length);
    var addIndex = 1;
    var index;
    var keywords = /\b(Socks\.app|flow|stack|canvas|append|prepend|before|after|clear|button|editLine|editBox|listBox|check|radio|progress|link|image|timer|every|animate|addEvent|setFunction|onClick|onContextMenu|onMouseDown|onMouseMove|onMouseOut|onMouseOver|onMouseUp|onKeyDown|onKeyUp|onResize|onScroll)\b/g;
    var re;
    var adduFFFF = function(str, name) {
      return name+"\uFFFF"; //add \uFFFF at the end of the keyword (to be removed later)
    };
    if(doubleQuote) {
      re=/\"/;
    } else {
      re=/\'/;
    }

    while(true) {
      index = tmpCode.search(re);
      if(index !== -1) {
        if(tmpCode.charAt(index-1) === "\\") {
          addIndex += index+1;
          tmpCode = tmpCode.substring(index+1,tmpCode.length);
        } else {
          var quoteString = code.substring(0,addIndex+index+1);
          //look for keywords within the quotes and mark them so that they won't confuse the parser later
          quoteString=quoteString.replace(keywords, adduFFFF);
          return [quoteString, code.substring(addIndex+index+1,code.length)];
        }
      } else {
        break;
      }
    }

    return [(doubleQuote ? "\"" : "\'"), code.substring(1,code.length)];
  };
  
  var inBlock = function(code,braces) {
    var tmpCode = code;
    var addIndex = 0;
    var index;
    var arr = [];
    var terminal = (braces ? '}' : ')');
    var re = (braces ? (/(\/\*|\/\/|\"|\'|\{|\}|\()/) : (/(\/\*|\/\/|\"|\'|\{|\(|\))/));
    var res,last;
    while(true) {
      index = tmpCode.search(re);
      if(index !== -1) {
        switch(tmpCode.charAt(index)) {
        case '/':
          res = inComment(code.substring(addIndex+index,code.length), (tmpCode.charAt(index+1) === '*' ? true : false));
          last = arr.pop() || '';
          if(typeof last === 'string') {
            arr.push(last + code.substring(0,addIndex+index) + res[0]);
          } else {
            arr.push(last);
            arr.push(code.substring(0,addIndex+index) + res[0]);
          }
          code = tmpCode = res[1];
          addIndex = 0;
          break;
        case "\'":
        case "\"":
          if(tmpCode.charAt(index-1) !== "\\") {
            res = inQuotes(code.substring(addIndex+index,code.length), (tmpCode.charAt(index) === "\"" ? true : false));
            last = arr.pop() || '';
            if(typeof last === 'string') {
              arr.push(last + code.substring(0,addIndex+index) + res[0]);
            } else {
              arr.push(last);
              arr.push(code.substring(0,addIndex+index) + res[0]);
            }
            code = tmpCode = res[1];
            addIndex = 0;
          } else {
            addIndex += index+1;
            tmpCode = tmpCode.substring(index+1,tmpCode.length);
          }
          break;
        case '{': 
        case '(':
          res = inBlock(code.substring(addIndex+index+1,code.length),(tmpCode.charAt(index) === '{' ? true : false));
          last = arr.pop() || '';
          if(typeof last === 'string') {
            arr.push(last + code.substring(0,addIndex+index+1));
          } else {
            arr.push(last);
            arr.push(code.substring(0,addIndex+index+1));
          }
          arr.push(res[0]);
          code = tmpCode = res[1];
          addIndex = 0;
          break;
        case terminal:
          return [arr.concat(code.substring(0,addIndex+index+1)), code.substring(addIndex+index+1,code.length)];
        }
      } else {
        break;
      }
    }

    return [arr,code];
  };
  
  var inRoot = function(code) {
    var tmpCode = code;  
    var addIndex = 0;
    var index;
    var arr = [];

    var res, last;
    while(true) {
      index = tmpCode.search(/(\/\*|\/\/|\"|\'|\{|\()/);
      if(index !== -1) {
        switch(tmpCode.charAt(index)) {
        case '/':
          res = inComment(code.substring(addIndex+index,code.length), (tmpCode.charAt(index+1) === '*' ? true : false));
          last = arr.pop() || '';
          if(typeof last === 'string') {
            arr.push(last + code.substring(0,addIndex+index) + res[0]);
          } else {
            arr.push(last);
            arr.push(code.substring(0,addIndex+index) + res[0]);
          }
          code = tmpCode = res[1];
          addIndex = 0;
          break;
        case "\"":
        case "\'":
          if(tmpCode.charAt(index-1) !== "\\") {
            res = inQuotes(code.substring(addIndex+index,code.length), (tmpCode.charAt(index) === "\"" ? true : false));
            last = arr.pop() || '';
            if(typeof last === 'string') {
              arr.push(last + code.substring(0,addIndex+index) + res[0]);
            } else {
              arr.push(last);
              arr.push(code.substring(0,addIndex+index) + res[0]);
            }
            code = tmpCode = res[1];
            addIndex = 0;
          } else {
            addIndex += index+1;
            tmpCode = tmpCode.substring(index+1,tmpCode.length);
          }
          break;
        case '{':
        case '(':
          res = inBlock(code.substring(addIndex+index+1,code.length),(tmpCode.charAt(index) === '{' ? true : false));
          last = arr.pop() || '';
          if(typeof last === 'string') {
            arr.push(last + code.substring(0,addIndex+index+1));
          } else {
            arr.push(last);
            arr.push(code.substring(0,addIndex+index+1));
          }
          arr.push(res[0]);
          code = tmpCode = res[1];
          addIndex = 0;
        }
      } else {
        break;
      }
    }

    arr.push(code);
    return arr;
  };

  //flattens the tree to a single string.
  var flattenTree = function(tree) {

    for(var i=0; i<tree.length; i++){
      if(typeof tree[i] !== 'string') {
        tree[i]=flattenTree(tree[i]);
      }
    }
    //get rid of \uFFFF if there's any. new RegExp instead of /\uFFFF/ due to Safari 2.x bug
    return tree.join('').replace(new RegExp("\uFFFF",'g'),''); 
  };

  var transformTree = function(tree) {
    var pattern = /\b(?:Socks\.app|flow|stack|canvas|append|prepend|before|after|clear|button|editLine|editBox|listBox|check|radio|progress|link|image|timer|every|animate|addEvent|setFunction|onClick|onContextMenu|onMouseDown|onMouseMove|onMouseOut|onMouseOver|onMouseUp|onKeyDown|onKeyUp|onResize|onScroll)\s*(\(|\{)$/;
    var lambdaPattern = /^\s*\|\s*([A-Za-z_$,\s][A-Za-z0-9_$,\s]*)\s*\|\s?/;
    var patt,fun,braceBlock,lambdaParams;

    for(var i=0; i<tree.length; i++) {
      if(typeof tree[i] !== 'string') {
        // if it is a subtree, transform it.
        transformTree(tree[i]);
      } else {
        // search for the pattern
        patt = tree[i].match(pattern);
        if(patt !== null) {
          switch(patt[1]) {
          case "(":
            fun = tree[i]; // e.g. flow( | flow{
            var args=tree[i+1]; // e.g. "hello", {margin:10})
            var afterArgs = tree[i+2]; // e.g. {
            // if the start of {} block exists
            if(afterArgs.search(/^\s*\{$/) !== -1) {
              braceBlock = tree[i+3];
              // look for |x|
              lambdaParams = braceBlock[0].match(lambdaPattern);
              lambdaParams = (lambdaParams !== null ? lambdaParams[1] : '');
              // remove |x|
              braceBlock[0] = braceBlock[0].replace(lambdaPattern, '');

              var argsLast = args[args.length-1];
              // remove ) from the end of args
              argsLast = argsLast.substring(0,argsLast.length-1);
              // if args block is not empty
              if(args.length > 1 || (args.length === 1 && args[0].replace(/\s*/g,'') !== ')')) {
                argsLast += ',';
              }
              //add function(x){with(this)
              argsLast += 'function(' + lambdaParams + '){with(this)';
              args[args.length-1]=argsLast;
              //add })
              braceBlock[braceBlock.length-1] += '})';
            }
            break;
          case "{":
            fun = tree[i]; // e.g. flow( | flow{
            braceBlock = tree[i+1];
            // look for |x|
            lambdaParams = braceBlock[0].match(lambdaPattern);
            lambdaParams = (lambdaParams !== null ? lambdaParams[1] : '');
            // remove |x|
            braceBlock[0] = braceBlock[0].replace(lambdaPattern, '');

            //remove { from the end of fun
            fun = fun.substring(0,fun.length-1);
            //add (function(x){with(this){
            fun += '(function(' + lambdaParams + '){with(this){';
            tree[i]=fun;
            //add })
            braceBlock[braceBlock.length-1] += '})';
          }
        }
      }
    }
  };
  
  // transforms socks code into pure js code
  var parse = function(code) {
  	var tree = inRoot(code);
    transformTree(tree);
    return flattenTree(tree);
  };
  
  // Detects browsers
	// Trust me. I really didn't want to do this... returns browser name if detected browser is only partially supported.
  var detectBrowsers = function() {
    // Looks for a bug that is present in IE < 8
	  var ieBug = function() {
      return ('a'[0] === undefined);
	  };
	  
		// Looks for a bug that is present in Safari < 3
		var safariBug = function() {
		  return ('\uFFFF'.replace(/\uFFFF/,'') !== '');
		};
	
		// Looks for a bug that is present in Opera < 9.5
		// http://dev.opera.com/articles/view/a-browser-sniffing-warning-the-trouble/
		var operaBug = function() {
		  if(document.implementation.createDocument) {
  		  var doc = document.implementation.createDocument( '', 'c', null);
      	doc.documentElement.appendChild( doc.createTextNode( ' c' ) );
      	var r=doc.createRange();
      	r.selectNodeContents( doc.documentElement );
      	r.insertNode( doc.createTextNode( ' b') );
      	r.insertNode( doc.createTextNode( 'a') );
      	// range should cover both what was selected previously and the inserted bits
        var has_range_collapse_bug1 = r.toString() !== 'a b c';
      	// content should be inserted at start of node, so what we inserted last is .firstChild
        var has_range_collapse_bug2 = doc.documentElement.firstChild.data !== 'a';
      	return (has_range_collapse_bug1 || has_range_collapse_bug2);
  	  } else {
  	    return false;
	    }
		};
		
    var version;
    var userAgent=navigator.userAgent;
    var browserKind;
    // detects internet explorer by checking for IE bug, document.all and the presence of 'MSIE' in user-agent string
    if(ieBug() && document.all !== undefined && userAgent.indexOf('MSIE') !== -1 && userAgent.indexOf('Opera') === -1) {
      version = userAgent.indexOf('MSIE');
      version = parseFloat(userAgent.substring(version+5,version+9));
      if(version < 8) { // if IE version is less than 8
        browserKind='ie';
        window.Socks.msie = true; // this variable is used to apply various IE hacks
      }
    } else if(safariBug() && userAgent.indexOf('AppleWebKit') !== -1) {
      // detects safari 2.x by checking for regex unicode bug and the presence of 'AppleWebkit' in user-agent string.
      version = userAgent.indexOf('AppleWebKit');
      version = parseFloat(userAgent.substring(version+12,version+17));
      if(version < 522) { // if webkit < 522
        browserKind='safari';
      }
    } else if(operaBug() && userAgent.indexOf('Opera') !== -1) {
      // detects opera < 9.5 by checking for range collapse bug and the presence of 'Opera' in the user-agent string.
      version = userAgent.indexOf('Opera');
      version = parseFloat(userAgent.substring(version+6,version+11));
      if(version < 9.2) { // if opera < 9.2
        browserKind='opera';
      }
    } else if({}.__proto__ !== undefined && userAgent.indexOf('Gecko') !== -1 && userAgent.indexOf('rv:') !== -1) {
      // detects gecko browsers by checking for __proto__ and the presence of 'Gecko' as well as 'rv:' in the user-agent string.
      version = userAgent.indexOf('rv:');
      version = userAgent.substring(version+3,version+8);
      if((parseFloat(version) < 1.8) && (version.search(/\d\.\d\./) !== -1)) { // if gecko < 1.8
        browserKind='gecko';
      }
    }
    return browserKind;
  };
  
  var showBrowserWarning = function(browserKind) {
    var userAgent = navigator.userAgent;
    
    // displays a warning to the user, urging browser upgrade		
		var displayWarning = function(content,iframe) {
		  iframe = iframe || false;
		  var html = document.getElementsByTagName('html')[0];
      var body = document.getElementsByTagName('body')[0];
  
      // hide scrollbar
      var overflow = html.style.overflow;
      html.style.overflow = 'hidden';
      
      var height = body.style.height;
      body.style.height='100%';
      // needs iframe to block IE windowed controls - http://dotnetjunkies.com/WebLog/jking/archive/category/139.aspx
      var browserWarningDiv = document.createElement('div');
      browserWarningDiv.id = "_socks_browser_warning";
      browserWarningDiv.style.width = '100%';
      browserWarningDiv.style.height = '100%';
      browserWarningDiv.style.position = 'absolute';
      browserWarningDiv.style.top = '0';
      browserWarningDiv.style.left = '0';
      browserWarningDiv.style.zIndex = '9999';
      browserWarningDiv.innerHTML = (iframe ? "<iframe style='width:100%;height:100%;position:absolute;top:0;left:0;opacity:0;filter:alpha(opacity=0)'></iframe>" : '') +
        "<div style='width:100%;height:100%;position:absolute;top:0;left:0;background:#000;opacity:0.8;filter:alpha(opacity=80)'></div>" +
        "<div style='font-family:Arial,Helvetica,Sans,Albany,\"Bitstream Vera Sans\",sans-serif;width:420px;height:340px;background:#cce3e9;position:absolute;top:50%;left:50%;border:5px solid #94bdc7;margin-top:-175px;margin-left:-215px'>" +
        "<h3 style='margin:10px 0px;font-size:22px;color:#1e4262;font-weight:bold;text-align:center'>" + 
        "Consider Upgrading Your Browser</h3>" + content +
        "<p style='margin:10px;font-size:16px;font-weight:normal;text-align:center'>" +
        "You may continue without upgrading, but some features of this application may not work as intended and you may also encounter performance problems or errors.</p>" +
        "<a id='_socks_browser_warning_ignore' style='text-decoration:none;margin:10px;text-align:center;font-weight:bold;display:block;padding:10px;border:1px solid #de421b;background-color:#e25734;color:#fff;' href='#'>" +
        "Ignore and Continue</a></div>";
      body.appendChild(browserWarningDiv);
      var ignoreLink = document.getElementById('_socks_browser_warning_ignore');
  
      var removeBrowserWarning = function(e) {
        // IE sets global window.event
        e = e || window.event;
      
        // prevent default
        e.returnValue = false;
        if(e.preventDefault) {
          e.preventDefault();
        }
        // prevent bubbling
        e.cancelBubble = true;
        if(e.stopPropagation) {
          e.stopPropagation();
        }
      
        // remove event handler
        if(ignoreLink.addEventListener) {
        	ignoreLink.addEventListener('click', removeBrowserWarning, false);
        } else if(ignoreLink.attachEvent){ // MSIE
          ignoreLink.attachEvent('onclick', removeBrowserWarning);
        }
      
        // remove all childnodes
        while(browserWarningDiv.firstChild) {
          browserWarningDiv.removeChild(browserWarningDiv.firstChild);
        }
        browserWarningDiv.parentNode.removeChild(browserWarningDiv);
        html.style.overflow = overflow;
        body.style.height = height;
      };
    
      if(ignoreLink.addEventListener) {
      	ignoreLink.addEventListener('click', removeBrowserWarning, false);
      } else if(ignoreLink.attachEvent){ // MSIE
        ignoreLink.attachEvent('onclick', removeBrowserWarning);
      }
		};
	
		// Displays warning messages if an unsupported browser is used
		switch(browserKind) {
	  case "ie":
  	  displayWarning("<p style='margin:10px;font-size:16px;font-weight:normal;text-align:center'>" +
        "Your web browser is not standards-compliant and therefore only partially supported by this application.<br /><br />" +
        "We recommend upgrading to modern standards- compliant web browsers such as "+
        "<a style='color:#cf1f00' href='http://www.mozilla.com/firefox?from=sfx&uid=14419'>Firefox</a>.</p>" +
        "<a style='text-decoration:none;margin:10px;text-align:center;font-weight:bold;display:block;padding:10px;border:1px solid #97cf67;background-color:#e1ffa9;color:#09700b;' href='http://www.mozilla.com/firefox?from=sfx&uid=14419'>" +
        "Click Here To Learn More...</a>",true);
      break;
	  case "safari":
	    displayWarning("<p style='margin:10px;font-size:16px;font-weight:normal;text-align:center'>" +
        "You are using an outdated version of Safari browser that is only partially supported by this application.<br /><br />" +
        "We recommend upgrading to <a style='color:#cf1f00' href='http://www.apple.com/safari/'>latest version of Safari</a> or other modern web browsers such as "+
        "<a style='color:#cf1f00' href='http://www.mozilla.com/firefox?from=sfx&uid=14419'>Firefox</a>.</p>" +
        "<a style='text-decoration:none;margin:10px;text-align:center;font-weight:bold;display:block;padding:5px;margin-bottom:5px;border:1px solid #97cf67;background-color:#e1ffa9;color:#09700b;' href='http://www.apple.com/safari/'>" +
        "Click Here To Download Latest Safari...</a>"+
        "<a style='text-decoration:none;margin:10px;text-align:center;font-weight:bold;display:block;padding:5px;border:1px solid #97cf67;background-color:#e1ffa9;color:#09700b;' href='http://www.mozilla.com/firefox?from=sfx&uid=14419'>" +
        "Click Here To Download Firefox...</a>");
      break;
	  case "opera":
	    displayWarning("<p style='margin:10px;font-size:16px;font-weight:normal;text-align:center'>" +
        "You are using an outdated version of Opera browser that is only partially supported by this application.<br /><br />" +
        "We recommend upgrading to <a style='color:#cf1f00' href='http://www.opera.com/'>latest version of Opera</a> or other modern web browsers such as "+
        "<a style='color:#cf1f00' href='http://www.mozilla.com/firefox?from=sfx&uid=14419'>Firefox</a>.</p>" +
        "<a style='text-decoration:none;margin:10px;text-align:center;font-weight:bold;display:block;padding:5px;margin-bottom:5px;border:1px solid #97cf67;background-color:#e1ffa9;color:#09700b;' href='http://www.opera.com/'>" +
        "Click Here To Download Latest Opera...</a>"+
        "<a style='text-decoration:none;margin:10px;text-align:center;font-weight:bold;display:block;padding:5px;border:1px solid #97cf67;background-color:#e1ffa9;color:#09700b;' href='http://www.mozilla.com/firefox?from=sfx&uid=14419'>" +
        "Click Here To Download Firefox...</a>");
      break;
	  case "gecko":
	    var browser = (userAgent.indexOf('SeaMonkey') !== -1 ? 'SeaMonkey' :
                      (userAgent.indexOf('Camino') !== -1 ? 'Camino' :
                        (userAgent.indexOf('Epiphany') !== -1 ? 'Epiphany' :
                          (userAgent.indexOf('Netscape') !== -1 ? 'Netscape' :
                            (userAgent.indexOf('Navigator') !== -1 ? 'Netscape' :
                              (userAgent.indexOf('Firefox') !== -1 ? 'Firefox' : 'Mozilla'))))));
      var url = (userAgent.indexOf('SeaMonkey') !== -1 ? 'http://www.seamonkey-project.org/' :
                  (userAgent.indexOf('Camino') !== -1 ? 'http://caminobrowser.org/' :
                    (userAgent.indexOf('Epiphany') !== -1 ? 'http://projects.gnome.org/epiphany/' :
                      (userAgent.indexOf('Netscape') !== -1 ? 'http://www.mozilla.com/firefox?from=sfx&uid=14419' :
                        (userAgent.indexOf('Navigator') !== -1 ? 'http://www.mozilla.com/firefox?from=sfx&uid=14419' :
                          (userAgent.indexOf('Firefox') !== -1 ? 'http://www.mozilla.com/firefox?from=sfx&uid=14419' : 'http://www.mozilla.com/firefox?from=sfx&uid=14419'))))));
                          
      var recommendSwitchToFirefox = ((url === 'http://www.mozilla.com/firefox?from=sfx&uid=14419' && browser !== 'Firefox') ? true : false);
      displayWarning("<p style='margin:10px;font-size:16px;font-weight:normal;text-align:center'>" +
        "You are using an outdated version of " + browser + " browser that is only partially supported by this application.<br /><br />" +
        (recommendSwitchToFirefox ? "We recommend upgrading to modern standards- compliant web browsers such as " +
        "<a style='color:#cf1f00' href='http://www.mozilla.com/firefox?from=sfx&uid=14419'>Firefox</a>." :
        (browser === 'Firefox' ? "We recommend upgrading to <a style='color:#cf1f00' href='http://www.mozilla.com/firefox?from=sfx&uid=14419'>latest version of Firefox</a>" : 
        "We recommend upgrading to <a style='color:#cf1f00' href='" + url + "'>latest version of " + browser + "</a>")) + "</p>" +
        (recommendSwitchToFirefox ? "<a style='text-decoration:none;margin:10px;text-align:center;font-weight:bold;display:block;padding:5px;margin-bottom:5px;border:1px solid #97cf67;background-color:#e1ffa9;color:#09700b;' href='http://www.mozilla.com/firefox?from=sfx&uid=14419'>" +
        "Click Here To Download Firefox...</a>" :
        (browser === 'Firefox' ? "<a style='text-decoration:none;margin:10px;text-align:center;font-weight:bold;display:block;padding:5px;margin-bottom:5px;border:1px solid #97cf67;background-color:#e1ffa9;color:#09700b;' href='http://www.mozilla.com/firefox?from=sfx&uid=14419'>" +
        "Click Here To Download Latest Firefox...</a>" :
        "<a style='text-decoration:none;margin:10px;text-align:center;font-weight:bold;display:block;padding:5px;margin-bottom:5px;border:1px solid #97cf67;background-color:#e1ffa9;color:#09700b;' href='" + url + "'>" +
        "Click Here To Download Latest " + browser + "...</a><a style='text-decoration:none;margin:10px;text-align:center;font-weight:bold;display:block;padding:5px;border:1px solid #97cf67;background-color:#e1ffa9;color:#09700b;' href='http://www.mozilla.com/firefox?from=sfx&uid=14419'>" +
        "Click Here To Download Firefox...</a>")));
		}  
  };
  
  // parses and runs socks code
  var run = function(code) {
    var unsupportedBrowser = detectBrowsers();
    
    // run Socks code
		// begin parsing
		var transformedCode = parse(code);
		
		// create a script tag
		var newScript = document.createElement('script');
		newScript.type = 'text/javascript'; // application/javascript is not recognized by older browsers
	  
		// insert the transformed code into the newly created script tag
    try {
      newScript.appendChild(document.createTextNode(transformedCode));
    } catch (e) {
      newScript.text = transformedCode; // IE
    }
  	
		// insert the new script tag
		var head = document.getElementsByTagName('head')[0];
    head.appendChild(newScript);
		
		// if the user is using unsupported browser and the warning hasn't been shown, show warning
    if(unsupportedBrowser !== undefined && !window.Socks.warningShown) {
      showBrowserWarning(unsupportedBrowser);
      window.Socks.warningShown = true;
    }
	};
	
	window.Socks.startApps = function() {
	  // IE 5,6 - http://en.wikipedia.org/wiki/XMLHttpRequest
	  var XHR = window.XMLHttpRequest || (function() {
        try { return new window.ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch(e1) {}
        try { return new window.ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch(e2) {}
        try { return new window.ActiveXObject("Msxml2.XMLHTTP"); } catch(e3) {}
        try { return new window.ActiveXObject("Microsoft.XMLHTTP"); } catch(e4) {}
        throw new Error( "This browser does not support XMLHttpRequest." );
      })();
    
    // look for any socks code and parse it if present
    var scripts = document.getElementsByTagName('script');
		for(var i=0; i<scripts.length; i++) {
		  var script = scripts[i];
	    // look for text/javascript-socks
			if(script.type === 'text/javascript-socks' || script.type === 'application/javascript-socks') {
			  var code = '';
			  
			  var scriptSrc = script.src;
			  if(scriptSrc !== undefined && trim(scriptSrc) !== '') {
          scriptSrc = trim(script.src);
			    
			    // load socks code from an external resource
          var req = new XHR();
		      var checkStatus = false;
			    
			    if(scriptSrc.search(/https?:\/\//) === 0) {
		        checkStatus = true;
			    } else if(scriptSrc.search('file://') !== 0 && scriptSrc.search('ftp://') !== 0 && document.URL.search(/https?:\/\//) === 0) {
			      checkStatus = true;
			    }
			    
			    // do a get request
			    req.open('GET', scriptSrc, true);
			    if(req.overrideMimeType) {
			      req.overrideMimeType('text/plain');
  		    }
			    req.onreadystatechange = function () {
			      if(req.readyState === 4) {
			        if(!checkStatus || (checkStatus && req.status === 200)) {
  			        run(req.responseText);  //code obtained, run it
  			      }
			      }
			    };
			    req.send(null);
			  } else {
			    // the code is inline
          // get socks code
          var scriptChildNodes = script.childNodes;
          if(script.textContent) {
  			    code = script.textContent;
  			  } else if(scriptChildNodes && scriptChildNodes.length > 0) {
  			    // somehow in firefox, if the text is too long, there are more than one child nodes...
  			    for(var j=0; j < scriptChildNodes.length; j++) { 
  			      code += scriptChildNodes[j].nodeValue;
  			    }
  			  } else if(script.text && script.text !== '') {
  			    code = script.text; // IE
  			  } 
  			  run(code);
  		  }
  		  // remove the script tag containing original code
    		script.parentNode.removeChild(script);
			}
		}
  };
  
	
  var init = function() {
    if(window.addEventListener) {
    	window.addEventListener('load', function() { window.Socks.startApps(); } ,false);
    } else if(window.attachEvent){
      window.attachEvent('onload', function() { window.Socks.startApps(); });
    }
  };
  
  //do it!
  init();

})(window.SOCKS);

