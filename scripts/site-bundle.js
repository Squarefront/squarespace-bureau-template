/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * All template-level Javascript is namespaced
	 * onto the Template namespace.
	 *
	 * @namespace
	 */
	window.Template = window.Template || {};

	/**
	 * Template.Constants holds all constants, such
	 * as breakpoints, timeouts, etc.
	 *
	 * @memberof Template
	 * @inner
	 */
	window.Template.Constants = {

	  BREAKPOINT_MOBILE: 640,
	  BREAKPOINT_TABLETS: 768,
	  DEBUG: false

	};

	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(6);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(22);
	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);
	__webpack_require__(27);
	__webpack_require__(28);


/***/ },
/* 2 */
/***/ function(module, exports) {

	(function () {

	  /* globals console */

	  'use strict';

	  window.Template.Util = {

	    debounce: function(event, callback, duration) {
	      var _duration = duration || 200;
	      var _timeout;

	      addEventListener(event, function() {
	        if (_timeout) {
	          window.clearTimeout(_timeout);
	        }
	        _timeout = window.setTimeout(callback, _duration);
	      });
	    },

	    throttle: function (fn, wait) {
	      var hold = false;

	      return function () {
	        var context = this, args = arguments;
	        if (!hold) {
	          fn.apply(context, args);
	          hold = true;
	          setTimeout(function () {
	            hold = false;
	          }, wait);
	        }
	      };
	    },

	    // returns (height/width) * 100
	    // 100 = square
	    // < 100 = landscape
	    // > 100 = portrait
	    getImageRatio: function (img) {
	      var dimensions = img.attr('data-image-dimensions').split('x');
	      return (parseInt(dimensions[1], 10) / parseInt(dimensions[0], 10)) * 100;
	    },

	    /**
	     * Triggers responsiveness if the root node overlaps with a given target node.
	     *
	     * @method areOverlapping
	     * return {Boolean} Whether or not the root node and target node are overlapping,
	     *    also taking a given padding into account.
	     */
	    areOverlapping: function (rootNode, targetNode, padding) {
	      var rootNodeArea = rootNode.getBoundingClientRect();
	      var targetNodeArea = targetNode.getBoundingClientRect();

	      var rootNodeTop = rootNodeArea.top - padding;
	      var targetNodeTop = targetNodeArea.top;

	      var rootNodeLeft = rootNodeArea.left - padding;
	      var targetNodeLeft = targetNodeArea.left;

	      var rootNodeBottom = rootNodeArea.top + rootNodeArea.height + padding;
	      var targetNodeBottom = targetNodeArea.top + targetNodeArea.height;

	      var rootNodeRight = rootNodeArea.left + rootNodeArea.width + padding;
	      var targetNodeRight = targetNodeArea.left + targetNodeArea.width;

	      if (rootNodeBottom < targetNodeTop || // root is above target
	          rootNodeTop > targetNodeBottom || // root is below target
	          rootNodeRight < targetNodeLeft || // root is left of target
	          rootNodeLeft > targetNodeRight)   // root is right of target
	      {
	        return false;
	      }

	      return true;
	    },

	    /**
	     * Triggers responsiveness when the root node extends beyond the current
	     * height boundary node.
	     *
	     * @method isTooTall
	     * return {Boolean} Whether or not the root node is too tall for its height
	     *    boundary node.
	     */
	    isTooTall: function (rootNode, heightBoundaryNode, heightRatio, padding) {
	      heightBoundaryNode = heightBoundaryNode || rootNode.parentNode;
	      var rootNodeHeight = rootNode.clientHeight;
	      var heightBoundaryNodeHeight = heightBoundaryNode.clientHeight;

	      if (rootNodeHeight > ((heightBoundaryNodeHeight - (padding * 2)) * heightRatio)) {
	        return true;
	      }

	      return false;
	    },

	    /**
	     * Triggers responsiveness when the root node extends beyond the current
	     * width boundary node.
	     *
	     * @method isTooWide
	     * return {Boolean} Whether or not the root node is too wide for its width
	     *    boundary node.
	     */
	    isTooWide: function (rootNode, widthBoundaryNode, widthRatio, padding) {
	      widthBoundaryNode = widthBoundaryNode || rootNode.parentNode;
	      var rootNodeWidth = rootNode.clientWidth;
	      var widthBoundaryNodeWidth = widthBoundaryNode.clientWidth;

	      if (rootNodeWidth > ((widthBoundaryNodeWidth - (padding * 2)) * widthRatio)) {
	        return true;
	      }

	      return false;
	    }

	  };
	})();


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use-strict';

	var DEBUG = false;

	var controller = __webpack_require__(4);
	var $ = __webpack_require__(5);

	/*
	 * Adds 'scrolling' class to body while scrolling;
	 * to turn off hover effects and increase performance.
	 */

	function AddScrollingClass () {

	  if (DEBUG) {
	    console.log('AddScrollingClass');
	  }

	  var _scrolling = false;

	  $(window).on('scroll', function () {
	    if (_scrolling === true) {
	      return;
	    }

	    _scrolling = true;
	    $(this).addClass('scrolling');
	  });

	  Template.Util.debounce('scroll', function() {
	    $(this).removeClass('scrolling');
	    _scrolling = false;
	  }, 200);

	} 

	controller.registerController('AddScrollingClass', AddScrollingClass);


/***/ },
/* 4 */
/***/ function(module, exports) {

	var DEBUG = false;

	/**
	 * Cached array of live controllers.
	 *
	 * @name _liveControllers
	 * @type {Array}
	 */
	var _liveControllers = [];

	/**
	 * Given a controller object, run its
	 * function with its element as the
	 * context, and return whatever its
	 * return is (lifecycle methods).
	 *
	 * @method process
	 * @return {Object} The response object of the controller
	 */
	function process(controller) {

	  if (!controller.fn || !controller.element) {
	    return null;
	  }

	  return controller.fn.apply(controller.element);

	}

	/**
	 * Compare two controller objects and
	 * returns whether they are equal
	 *
	 * @method isEqualController
	 */
	function isEqualController(a, b) {

	  if (!a.element || !b.element || !a.fn || !b.fn) {
	    return false;
	  }

	  return a.element === b.element && a.fn === b.fn;

	}

	var CONTROLLERS_BY_NAME = {};

	/**
	 * Registers a controller with a given name and function body.
	 *
	 * @method registerController
	 * @param String name
	 * @param Function handler
	 */
	function registerController(name, controller) {
	  CONTROLLERS_BY_NAME[name] = controller;
	}

	/**
	 * Get a controller by a given name.
	 *
	 * @method getControllerByName
	 * @param String name
	 * @return Function the controller
	 */
	function getControllerByName(name) {
	  var registeredController = CONTROLLERS_BY_NAME[name];
	  if (registeredController) {
	    return registeredController;
	  }

	  console.error('Could not find controller: ' + name);
	}

	/**
	 * Sychronize all controllers. Process
	 * new controllers, destroy controllers
	 * whose elements are no longer on the
	 * DOM, and sync others.
	 *
	 * @method synchronizeControllers
	 */
	function synchronizeControllers() {

	  // Get all nodes with controllers and convert to array
	  var nodesWithControllers = Array.prototype.slice.call(document.querySelectorAll('[sqs-controller]'), 0);

	  // Create array to house new controller objects
	  var newControllers = [];

	  // Convert found nodes to controller objects
	  // so we can do comparisons later
	  nodesWithControllers.forEach(function(node) {

	    // Get controller names on node
	    var controllerNames = node.getAttribute('sqs-controller').split(',');

	    // Loop
	    controllerNames.forEach(function(controllerName) {

	      controllerName = controllerName.trim();

	      var controller = getControllerByName(controllerName);

	      if (!controller) {
	        return;
	      }

	      // Add to new controller array
	      newControllers.push({
	        namespace: controllerName,
	        element: node,
	        fn: controller
	      });

	    });

	  });

	  // Loop through live controllers and
	  // find ones that need to be destroyed
	  // or synced
	  _liveControllers = _liveControllers.filter(function(liveController) {

	    // Boolean to indicate whether one of
	    // new controllers matches current
	    // live controller.
	    var isControllerActive = newControllers.some(function(newController) {
	      return isEqualController(liveController, newController);
	    });

	    if (isControllerActive) {

	      if (DEBUG) {
	        console.log('Sync controller: ' + liveController.namespace);
	      }

	      // Controller element is still in the
	      // DOM, run sync method of controller.
	      if (liveController.methods && liveController.methods.sync) {
	        liveController.methods.sync.apply(liveController.element, null);
	      }

	      // Remove existing controllers from new
	      // controllers array, so they are not
	      // reinitialized.
	      newControllers = newControllers.filter(function(newController) {
	        return !isEqualController(liveController, newController);
	      });

	    } else {

	      if (DEBUG) {
	        console.log('Destroy controller: ' + liveController.namespace);
	      }

	      // Controller element is no longer in
	      // the DOM, call destructor method of
	      // controller.
	      if (liveController.methods && liveController.methods.destroy) {
	        liveController.methods.destroy.apply(liveController.element, null);
	      }

	    }

	    // Filter condition
	    return isControllerActive;

	  });


	  // Process new controllers for the first time
	  newControllers.forEach(function(controller) {

	    if (DEBUG) {
	      console.log('New controller: ' + controller.namespace);
	    }

	    // Process controller
	    controller.methods = process(controller);

	    // Push to live controllers array
	    _liveControllers.push(controller);

	    // Add controller binded info
	    var bindedControllersName = [];
	    if (controller.element.hasAttribute('sqs-controllers-binded')) {
	      var existingControllers = controller.element.getAttribute('sqs-controllers-binded').split(', ');
	      bindedControllersName = bindedControllersName.concat(existingControllers);
	    }

	    bindedControllersName.push(controller.namespace);

	    controller.element.setAttribute('sqs-controllers-binded', bindedControllersName.join(', '));

	  });

	}

	document.addEventListener('DOMContentLoaded', synchronizeControllers);

	module.exports = {
	  synchronizeControllers: synchronizeControllers,
	  registerController: registerController
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	/* Zepto v1.1.6 - zepto event ajax form ie - zeptojs.com/license */

	var Zepto = module.exports = (function() {
	  var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,
	    document = window.document,
	    elementDisplay = {}, classCache = {},
	    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
	    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
	    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	    rootNodeRE = /^(?:body|html)$/i,
	    capitalRE = /([A-Z])/g,

	    // special attributes that should be get/set via method calls
	    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

	    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
	    table = document.createElement('table'),
	    tableRow = document.createElement('tr'),
	    containers = {
	      'tr': document.createElement('tbody'),
	      'tbody': table, 'thead': table, 'tfoot': table,
	      'td': tableRow, 'th': tableRow,
	      '*': document.createElement('div')
	    },
	    readyRE = /complete|loaded|interactive/,
	    simpleSelectorRE = /^[\w-]*$/,
	    class2type = {},
	    toString = class2type.toString,
	    zepto = {},
	    camelize, uniq,
	    tempParent = document.createElement('div'),
	    propMap = {
	      'tabindex': 'tabIndex',
	      'readonly': 'readOnly',
	      'for': 'htmlFor',
	      'class': 'className',
	      'maxlength': 'maxLength',
	      'cellspacing': 'cellSpacing',
	      'cellpadding': 'cellPadding',
	      'rowspan': 'rowSpan',
	      'colspan': 'colSpan',
	      'usemap': 'useMap',
	      'frameborder': 'frameBorder',
	      'contenteditable': 'contentEditable'
	    },
	    isArray = Array.isArray ||
	      function(object){ return object instanceof Array }

	  zepto.matches = function(element, selector) {
	    if (!selector || !element || element.nodeType !== 1) return false
	    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
	                          element.oMatchesSelector || element.matchesSelector
	    if (matchesSelector) return matchesSelector.call(element, selector)
	    // fall back to performing a selector:
	    var match, parent = element.parentNode, temp = !parent
	    if (temp) (parent = tempParent).appendChild(element)
	    match = ~zepto.qsa(parent, selector).indexOf(element)
	    temp && tempParent.removeChild(element)
	    return match
	  }

	  function type(obj) {
	    return obj == null ? String(obj) :
	      class2type[toString.call(obj)] || "object"
	  }

	  function isFunction(value) { return type(value) == "function" }
	  function isWindow(obj)     { return obj != null && obj == obj.window }
	  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
	  function isObject(obj)     { return type(obj) == "object" }
	  function isPlainObject(obj) {
	    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
	  }
	  function likeArray(obj) { return typeof obj.length == 'number' }

	  function compact(array) { return filter.call(array, function(item){ return item != null }) }
	  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
	  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
	  function dasherize(str) {
	    return str.replace(/::/g, '/')
	           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
	           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
	           .replace(/_/g, '-')
	           .toLowerCase()
	  }
	  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

	  function classRE(name) {
	    return name in classCache ?
	      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
	  }

	  function maybeAddPx(name, value) {
	    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
	  }

	  function defaultDisplay(nodeName) {
	    var element, display
	    if (!elementDisplay[nodeName]) {
	      element = document.createElement(nodeName)
	      document.body.appendChild(element)
	      display = getComputedStyle(element, '').getPropertyValue("display")
	      element.parentNode.removeChild(element)
	      display == "none" && (display = "block")
	      elementDisplay[nodeName] = display
	    }
	    return elementDisplay[nodeName]
	  }

	  function children(element) {
	    return 'children' in element ?
	      slice.call(element.children) :
	      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
	  }

	  // `$.zepto.fragment` takes a html string and an optional tag name
	  // to generate DOM nodes nodes from the given html string.
	  // The generated DOM nodes are returned as an array.
	  // This function can be overriden in plugins for example to make
	  // it compatible with browsers that don't support the DOM fully.
	  zepto.fragment = function(html, name, properties) {
	    var dom, nodes, container

	    // A special case optimization for a single tag
	    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

	    if (!dom) {
	      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
	      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
	      if (!(name in containers)) name = '*'

	      container = containers[name]
	      container.innerHTML = '' + html
	      dom = $.each(slice.call(container.childNodes), function(){
	        container.removeChild(this)
	      })
	    }

	    if (isPlainObject(properties)) {
	      nodes = $(dom)
	      $.each(properties, function(key, value) {
	        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
	        else nodes.attr(key, value)
	      })
	    }

	    return dom
	  }

	  // `$.zepto.Z` swaps out the prototype of the given `dom` array
	  // of nodes with `$.fn` and thus supplying all the Zepto functions
	  // to the array. Note that `__proto__` is not supported on Internet
	  // Explorer. This method can be overriden in plugins.
	  zepto.Z = function(dom, selector) {
	    dom = dom || []
	    dom.__proto__ = $.fn
	    dom.selector = selector || ''
	    return dom
	  }

	  // `$.zepto.isZ` should return `true` if the given object is a Zepto
	  // collection. This method can be overriden in plugins.
	  zepto.isZ = function(object) {
	    return object instanceof zepto.Z
	  }

	  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
	  // takes a CSS selector and an optional context (and handles various
	  // special cases).
	  // This method can be overriden in plugins.
	  zepto.init = function(selector, context) {
	    var dom
	    // If nothing given, return an empty Zepto collection
	    if (!selector) return zepto.Z()
	    // Optimize for string selectors
	    else if (typeof selector == 'string') {
	      selector = selector.trim()
	      // If it's a html fragment, create nodes from it
	      // Note: In both Chrome 21 and Firefox 15, DOM error 12
	      // is thrown if the fragment doesn't begin with <
	      if (selector[0] == '<' && fragmentRE.test(selector))
	        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
	      // If there's a context, create a collection on that context first, and select
	      // nodes from there
	      else if (context !== undefined) return $(context).find(selector)
	      // If it's a CSS selector, use it to select nodes.
	      else dom = zepto.qsa(document, selector)
	    }
	    // If a function is given, call it when the DOM is ready
	    else if (isFunction(selector)) return $(document).ready(selector)
	    // If a Zepto collection is given, just return it
	    else if (zepto.isZ(selector)) return selector
	    else {
	      // normalize array if an array of nodes is given
	      if (isArray(selector)) dom = compact(selector)
	      // Wrap DOM nodes.
	      else if (isObject(selector))
	        dom = [selector], selector = null
	      // If it's a html fragment, create nodes from it
	      else if (fragmentRE.test(selector))
	        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
	      // If there's a context, create a collection on that context first, and select
	      // nodes from there
	      else if (context !== undefined) return $(context).find(selector)
	      // And last but no least, if it's a CSS selector, use it to select nodes.
	      else dom = zepto.qsa(document, selector)
	    }
	    // create a new Zepto collection from the nodes found
	    return zepto.Z(dom, selector)
	  }

	  // `$` will be the base `Zepto` object. When calling this
	  // function just call `$.zepto.init, which makes the implementation
	  // details of selecting nodes and creating Zepto collections
	  // patchable in plugins.
	  $ = function(selector, context){
	    return zepto.init(selector, context)
	  }

	  function extend(target, source, deep) {
	    for (key in source)
	      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
	          target[key] = {}
	        if (isArray(source[key]) && !isArray(target[key]))
	          target[key] = []
	        extend(target[key], source[key], deep)
	      }
	      else if (source[key] !== undefined) target[key] = source[key]
	  }

	  // Copy all but undefined properties from one or more
	  // objects to the `target` object.
	  $.extend = function(target){
	    var deep, args = slice.call(arguments, 1)
	    if (typeof target == 'boolean') {
	      deep = target
	      target = args.shift()
	    }
	    args.forEach(function(arg){ extend(target, arg, deep) })
	    return target
	  }

	  // `$.zepto.qsa` is Zepto's CSS selector implementation which
	  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
	  // This method can be overriden in plugins.
	  zepto.qsa = function(element, selector){
	    var found,
	        maybeID = selector[0] == '#',
	        maybeClass = !maybeID && selector[0] == '.',
	        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
	        isSimple = simpleSelectorRE.test(nameOnly)
	    return (isDocument(element) && isSimple && maybeID) ?
	      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
	      (element.nodeType !== 1 && element.nodeType !== 9) ? [] :
	      slice.call(
	        isSimple && !maybeID ?
	          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
	          element.getElementsByTagName(selector) : // Or a tag
	          element.querySelectorAll(selector) // Or it's not simple, and we need to query all
	      )
	  }

	  function filtered(nodes, selector) {
	    return selector == null ? $(nodes) : $(nodes).filter(selector)
	  }

	  $.contains = document.documentElement.contains ?
	    function(parent, node) {
	      return parent !== node && parent.contains(node)
	    } :
	    function(parent, node) {
	      while (node && (node = node.parentNode))
	        if (node === parent) return true
	      return false
	    }

	  function funcArg(context, arg, idx, payload) {
	    return isFunction(arg) ? arg.call(context, idx, payload) : arg
	  }

	  function setAttribute(node, name, value) {
	    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
	  }

	  // access className property while respecting SVGAnimatedString
	  function className(node, value){
	    var klass = node.className || '',
	        svg   = klass && klass.baseVal !== undefined

	    if (value === undefined) return svg ? klass.baseVal : klass
	    svg ? (klass.baseVal = value) : (node.className = value)
	  }

	  // "true"  => true
	  // "false" => false
	  // "null"  => null
	  // "42"    => 42
	  // "42.5"  => 42.5
	  // "08"    => "08"
	  // JSON    => parse if valid
	  // String  => self
	  function deserializeValue(value) {
	    try {
	      return value ?
	        value == "true" ||
	        ( value == "false" ? false :
	          value == "null" ? null :
	          +value + "" == value ? +value :
	          /^[\[\{]/.test(value) ? $.parseJSON(value) :
	          value )
	        : value
	    } catch(e) {
	      return value
	    }
	  }

	  $.type = type
	  $.isFunction = isFunction
	  $.isWindow = isWindow
	  $.isArray = isArray
	  $.isPlainObject = isPlainObject

	  $.isEmptyObject = function(obj) {
	    var name
	    for (name in obj) return false
	    return true
	  }

	  $.inArray = function(elem, array, i){
	    return emptyArray.indexOf.call(array, elem, i)
	  }

	  $.camelCase = camelize
	  $.trim = function(str) {
	    return str == null ? "" : String.prototype.trim.call(str)
	  }

	  // plugin compatibility
	  $.uuid = 0
	  $.support = { }
	  $.expr = { }

	  $.map = function(elements, callback){
	    var value, values = [], i, key
	    if (likeArray(elements))
	      for (i = 0; i < elements.length; i++) {
	        value = callback(elements[i], i)
	        if (value != null) values.push(value)
	      }
	    else
	      for (key in elements) {
	        value = callback(elements[key], key)
	        if (value != null) values.push(value)
	      }
	    return flatten(values)
	  }

	  $.each = function(elements, callback){
	    var i, key
	    if (likeArray(elements)) {
	      for (i = 0; i < elements.length; i++)
	        if (callback.call(elements[i], i, elements[i]) === false) return elements
	    } else {
	      for (key in elements)
	        if (callback.call(elements[key], key, elements[key]) === false) return elements
	    }

	    return elements
	  }

	  $.grep = function(elements, callback){
	    return filter.call(elements, callback)
	  }

	  if (window.JSON) $.parseJSON = JSON.parse

	  // Populate the class2type map
	  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	    class2type[ "[object " + name + "]" ] = name.toLowerCase()
	  })

	  // Define methods that will be available on all
	  // Zepto collections
	  $.fn = {
	    // Because a collection acts like an array
	    // copy over these useful array functions.
	    forEach: emptyArray.forEach,
	    reduce: emptyArray.reduce,
	    push: emptyArray.push,
	    sort: emptyArray.sort,
	    indexOf: emptyArray.indexOf,
	    concat: emptyArray.concat,

	    // `map` and `slice` in the jQuery API work differently
	    // from their array counterparts
	    map: function(fn){
	      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
	    },
	    slice: function(){
	      return $(slice.apply(this, arguments))
	    },

	    ready: function(callback){
	      // need to check if document.body exists for IE as that browser reports
	      // document ready when it hasn't yet created the body element
	      if (readyRE.test(document.readyState) && document.body) callback($)
	      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
	      return this
	    },
	    get: function(idx){
	      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
	    },
	    toArray: function(){ return this.get() },
	    size: function(){
	      return this.length
	    },
	    remove: function(){
	      return this.each(function(){
	        if (this.parentNode != null)
	          this.parentNode.removeChild(this)
	      })
	    },
	    each: function(callback){
	      emptyArray.every.call(this, function(el, idx){
	        return callback.call(el, idx, el) !== false
	      })
	      return this
	    },
	    filter: function(selector){
	      if (isFunction(selector)) return this.not(this.not(selector))
	      return $(filter.call(this, function(element){
	        return zepto.matches(element, selector)
	      }))
	    },
	    add: function(selector,context){
	      return $(uniq(this.concat($(selector,context))))
	    },
	    is: function(selector){
	      return this.length > 0 && zepto.matches(this[0], selector)
	    },
	    not: function(selector){
	      var nodes=[]
	      if (isFunction(selector) && selector.call !== undefined)
	        this.each(function(idx){
	          if (!selector.call(this,idx)) nodes.push(this)
	        })
	      else {
	        var excludes = typeof selector == 'string' ? this.filter(selector) :
	          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
	        this.forEach(function(el){
	          if (excludes.indexOf(el) < 0) nodes.push(el)
	        })
	      }
	      return $(nodes)
	    },
	    has: function(selector){
	      return this.filter(function(){
	        return isObject(selector) ?
	          $.contains(this, selector) :
	          $(this).find(selector).size()
	      })
	    },
	    eq: function(idx){
	      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
	    },
	    first: function(){
	      var el = this[0]
	      return el && !isObject(el) ? el : $(el)
	    },
	    last: function(){
	      var el = this[this.length - 1]
	      return el && !isObject(el) ? el : $(el)
	    },
	    find: function(selector){
	      var result, $this = this
	      if (!selector) result = $()
	      else if (typeof selector == 'object')
	        result = $(selector).filter(function(){
	          var node = this
	          return emptyArray.some.call($this, function(parent){
	            return $.contains(parent, node)
	          })
	        })
	      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
	      else result = this.map(function(){ return zepto.qsa(this, selector) })
	      return result
	    },
	    closest: function(selector, context){
	      var node = this[0], collection = false
	      if (typeof selector == 'object') collection = $(selector)
	      while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
	        node = node !== context && !isDocument(node) && node.parentNode
	      return $(node)
	    },
	    parents: function(selector){
	      var ancestors = [], nodes = this
	      while (nodes.length > 0)
	        nodes = $.map(nodes, function(node){
	          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
	            ancestors.push(node)
	            return node
	          }
	        })
	      return filtered(ancestors, selector)
	    },
	    parent: function(selector){
	      return filtered(uniq(this.pluck('parentNode')), selector)
	    },
	    children: function(selector){
	      return filtered(this.map(function(){ return children(this) }), selector)
	    },
	    contents: function() {
	      return this.map(function() { return slice.call(this.childNodes) })
	    },
	    siblings: function(selector){
	      return filtered(this.map(function(i, el){
	        return filter.call(children(el.parentNode), function(child){ return child!==el })
	      }), selector)
	    },
	    empty: function(){
	      return this.each(function(){ this.innerHTML = '' })
	    },
	    // `pluck` is borrowed from Prototype.js
	    pluck: function(property){
	      return $.map(this, function(el){ return el[property] })
	    },
	    show: function(){
	      return this.each(function(){
	        this.style.display == "none" && (this.style.display = '')
	        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
	          this.style.display = defaultDisplay(this.nodeName)
	      })
	    },
	    replaceWith: function(newContent){
	      return this.before(newContent).remove()
	    },
	    wrap: function(structure){
	      var func = isFunction(structure)
	      if (this[0] && !func)
	        var dom   = $(structure).get(0),
	            clone = dom.parentNode || this.length > 1

	      return this.each(function(index){
	        $(this).wrapAll(
	          func ? structure.call(this, index) :
	            clone ? dom.cloneNode(true) : dom
	        )
	      })
	    },
	    wrapAll: function(structure){
	      if (this[0]) {
	        $(this[0]).before(structure = $(structure))
	        var children
	        // drill down to the inmost element
	        while ((children = structure.children()).length) structure = children.first()
	        $(structure).append(this)
	      }
	      return this
	    },
	    wrapInner: function(structure){
	      var func = isFunction(structure)
	      return this.each(function(index){
	        var self = $(this), contents = self.contents(),
	            dom  = func ? structure.call(this, index) : structure
	        contents.length ? contents.wrapAll(dom) : self.append(dom)
	      })
	    },
	    unwrap: function(){
	      this.parent().each(function(){
	        $(this).replaceWith($(this).children())
	      })
	      return this
	    },
	    clone: function(){
	      return this.map(function(){ return this.cloneNode(true) })
	    },
	    hide: function(){
	      return this.css("display", "none")
	    },
	    toggle: function(setting){
	      return this.each(function(){
	        var el = $(this)
	        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
	      })
	    },
	    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
	    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
	    html: function(html){
	      return 0 in arguments ?
	        this.each(function(idx){
	          var originHtml = this.innerHTML
	          $(this).empty().append( funcArg(this, html, idx, originHtml) )
	        }) :
	        (0 in this ? this[0].innerHTML : null)
	    },
	    text: function(text){
	      return 0 in arguments ?
	        this.each(function(idx){
	          var newText = funcArg(this, text, idx, this.textContent)
	          this.textContent = newText == null ? '' : ''+newText
	        }) :
	        (0 in this ? this[0].textContent : null)
	    },
	    attr: function(name, value){
	      var result
	      return (typeof name == 'string' && !(1 in arguments)) ?
	        (!this.length || this[0].nodeType !== 1 ? undefined :
	          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
	        ) :
	        this.each(function(idx){
	          if (this.nodeType !== 1) return
	          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
	          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
	        })
	    },
	    removeAttr: function(name){
	      return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){
	        setAttribute(this, attribute)
	      }, this)})
	    },
	    prop: function(name, value){
	      name = propMap[name] || name
	      return (1 in arguments) ?
	        this.each(function(idx){
	          this[name] = funcArg(this, value, idx, this[name])
	        }) :
	        (this[0] && this[0][name])
	    },
	    data: function(name, value){
	      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

	      var data = (1 in arguments) ?
	        this.attr(attrName, value) :
	        this.attr(attrName)

	      return data !== null ? deserializeValue(data) : undefined
	    },
	    val: function(value){
	      return 0 in arguments ?
	        this.each(function(idx){
	          this.value = funcArg(this, value, idx, this.value)
	        }) :
	        (this[0] && (this[0].multiple ?
	           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
	           this[0].value)
	        )
	    },
	    offset: function(coordinates){
	      if (coordinates) return this.each(function(index){
	        var $this = $(this),
	            coords = funcArg(this, coordinates, index, $this.offset()),
	            parentOffset = $this.offsetParent().offset(),
	            props = {
	              top:  coords.top  - parentOffset.top,
	              left: coords.left - parentOffset.left
	            }

	        if ($this.css('position') == 'static') props['position'] = 'relative'
	        $this.css(props)
	      })
	      if (!this.length) return null
	      var obj = this[0].getBoundingClientRect()
	      return {
	        left: obj.left + window.pageXOffset,
	        top: obj.top + window.pageYOffset,
	        width: Math.round(obj.width),
	        height: Math.round(obj.height)
	      }
	    },
	    css: function(property, value){
	      if (arguments.length < 2) {
	        var computedStyle, element = this[0]
	        if(!element) return
	        computedStyle = getComputedStyle(element, '')
	        if (typeof property == 'string')
	          return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
	        else if (isArray(property)) {
	          var props = {}
	          $.each(property, function(_, prop){
	            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
	          })
	          return props
	        }
	      }

	      var css = ''
	      if (type(property) == 'string') {
	        if (!value && value !== 0)
	          this.each(function(){ this.style.removeProperty(dasherize(property)) })
	        else
	          css = dasherize(property) + ":" + maybeAddPx(property, value)
	      } else {
	        for (key in property)
	          if (!property[key] && property[key] !== 0)
	            this.each(function(){ this.style.removeProperty(dasherize(key)) })
	          else
	            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
	      }

	      return this.each(function(){ this.style.cssText += ';' + css })
	    },
	    index: function(element){
	      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
	    },
	    hasClass: function(name){
	      if (!name) return false
	      return emptyArray.some.call(this, function(el){
	        return this.test(className(el))
	      }, classRE(name))
	    },
	    addClass: function(name){
	      if (!name) return this
	      return this.each(function(idx){
	        if (!('className' in this)) return
	        classList = []
	        var cls = className(this), newName = funcArg(this, name, idx, cls)
	        newName.split(/\s+/g).forEach(function(klass){
	          if (!$(this).hasClass(klass)) classList.push(klass)
	        }, this)
	        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
	      })
	    },
	    removeClass: function(name){
	      return this.each(function(idx){
	        if (!('className' in this)) return
	        if (name === undefined) return className(this, '')
	        classList = className(this)
	        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
	          classList = classList.replace(classRE(klass), " ")
	        })
	        className(this, classList.trim())
	      })
	    },
	    toggleClass: function(name, when){
	      if (!name) return this
	      return this.each(function(idx){
	        var $this = $(this), names = funcArg(this, name, idx, className(this))
	        names.split(/\s+/g).forEach(function(klass){
	          (when === undefined ? !$this.hasClass(klass) : when) ?
	            $this.addClass(klass) : $this.removeClass(klass)
	        })
	      })
	    },
	    scrollTop: function(value){
	      if (!this.length) return
	      var hasScrollTop = 'scrollTop' in this[0]
	      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
	      return this.each(hasScrollTop ?
	        function(){ this.scrollTop = value } :
	        function(){ this.scrollTo(this.scrollX, value) })
	    },
	    scrollLeft: function(value){
	      if (!this.length) return
	      var hasScrollLeft = 'scrollLeft' in this[0]
	      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
	      return this.each(hasScrollLeft ?
	        function(){ this.scrollLeft = value } :
	        function(){ this.scrollTo(value, this.scrollY) })
	    },
	    position: function() {
	      if (!this.length) return

	      var elem = this[0],
	        // Get *real* offsetParent
	        offsetParent = this.offsetParent(),
	        // Get correct offsets
	        offset       = this.offset(),
	        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

	      // Subtract element margins
	      // note: when an element has margin: auto the offsetLeft and marginLeft
	      // are the same in Safari causing offset.left to incorrectly be 0
	      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
	      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

	      // Add offsetParent borders
	      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
	      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

	      // Subtract the two offsets
	      return {
	        top:  offset.top  - parentOffset.top,
	        left: offset.left - parentOffset.left
	      }
	    },
	    offsetParent: function() {
	      return this.map(function(){
	        var parent = this.offsetParent || document.body
	        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
	          parent = parent.offsetParent
	        return parent
	      })
	    }
	  }

	  // for now
	  $.fn.detach = $.fn.remove

	  // Generate the `width` and `height` functions
	  ;['width', 'height'].forEach(function(dimension){
	    var dimensionProperty =
	      dimension.replace(/./, function(m){ return m[0].toUpperCase() })

	    $.fn[dimension] = function(value){
	      var offset, el = this[0]
	      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
	        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
	        (offset = this.offset()) && offset[dimension]
	      else return this.each(function(idx){
	        el = $(this)
	        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
	      })
	    }
	  })

	  function traverseNode(node, fun) {
	    fun(node)
	    for (var i = 0, len = node.childNodes.length; i < len; i++)
	      traverseNode(node.childNodes[i], fun)
	  }

	  // Generate the `after`, `prepend`, `before`, `append`,
	  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
	  adjacencyOperators.forEach(function(operator, operatorIndex) {
	    var inside = operatorIndex % 2 //=> prepend, append

	    $.fn[operator] = function(){
	      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
	      var argType, nodes = $.map(arguments, function(arg) {
	            argType = type(arg)
	            return argType == "object" || argType == "array" || arg == null ?
	              arg : zepto.fragment(arg)
	          }),
	          parent, copyByClone = this.length > 1
	      if (nodes.length < 1) return this

	      return this.each(function(_, target){
	        parent = inside ? target : target.parentNode

	        // convert all methods to a "before" operation
	        target = operatorIndex == 0 ? target.nextSibling :
	                 operatorIndex == 1 ? target.firstChild :
	                 operatorIndex == 2 ? target :
	                 null

	        var parentInDocument = $.contains(document.documentElement, parent)

	        nodes.forEach(function(node){
	          if (copyByClone) node = node.cloneNode(true)
	          else if (!parent) return $(node).remove()

	          parent.insertBefore(node, target)
	          if (parentInDocument) traverseNode(node, function(el){
	            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
	               (!el.type || el.type === 'text/javascript') && !el.src)
	              window['eval'].call(window, el.innerHTML)
	          })
	        })
	      })
	    }

	    // after    => insertAfter
	    // prepend  => prependTo
	    // before   => insertBefore
	    // append   => appendTo
	    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
	      $(html)[operator](this)
	      return this
	    }
	  })

	  zepto.Z.prototype = $.fn

	  // Export internal API functions in the `$.zepto` namespace
	  zepto.uniq = uniq
	  zepto.deserializeValue = deserializeValue
	  $.zepto = zepto

	  return $
	})()

	;(function($){
	  var _zid = 1, undefined,
	      slice = Array.prototype.slice,
	      isFunction = $.isFunction,
	      isString = function(obj){ return typeof obj == 'string' },
	      handlers = {},
	      specialEvents={},
	      focusinSupported = 'onfocusin' in window,
	      focus = { focus: 'focusin', blur: 'focusout' },
	      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

	  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

	  function zid(element) {
	    return element._zid || (element._zid = _zid++)
	  }
	  function findHandlers(element, event, fn, selector) {
	    event = parse(event)
	    if (event.ns) var matcher = matcherFor(event.ns)
	    return (handlers[zid(element)] || []).filter(function(handler) {
	      return handler
	        && (!event.e  || handler.e == event.e)
	        && (!event.ns || matcher.test(handler.ns))
	        && (!fn       || zid(handler.fn) === zid(fn))
	        && (!selector || handler.sel == selector)
	    })
	  }
	  function parse(event) {
	    var parts = ('' + event).split('.')
	    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
	  }
	  function matcherFor(ns) {
	    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
	  }

	  function eventCapture(handler, captureSetting) {
	    return handler.del &&
	      (!focusinSupported && (handler.e in focus)) ||
	      !!captureSetting
	  }

	  function realEvent(type) {
	    return hover[type] || (focusinSupported && focus[type]) || type
	  }

	  function add(element, events, fn, data, selector, delegator, capture){
	    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
	    events.split(/\s/).forEach(function(event){
	      if (event == 'ready') return $(document).ready(fn)
	      var handler   = parse(event)
	      handler.fn    = fn
	      handler.sel   = selector
	      // emulate mouseenter, mouseleave
	      if (handler.e in hover) fn = function(e){
	        var related = e.relatedTarget
	        if (!related || (related !== this && !$.contains(this, related)))
	          return handler.fn.apply(this, arguments)
	      }
	      handler.del   = delegator
	      var callback  = delegator || fn
	      handler.proxy = function(e){
	        e = compatible(e)
	        if (e.isImmediatePropagationStopped()) return
	        e.data = data
	        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
	        if (result === false) e.preventDefault(), e.stopPropagation()
	        return result
	      }
	      handler.i = set.length
	      set.push(handler)
	      if ('addEventListener' in element)
	        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
	    })
	  }
	  function remove(element, events, fn, selector, capture){
	    var id = zid(element)
	    ;(events || '').split(/\s/).forEach(function(event){
	      findHandlers(element, event, fn, selector).forEach(function(handler){
	        delete handlers[id][handler.i]
	      if ('removeEventListener' in element)
	        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
	      })
	    })
	  }

	  $.event = { add: add, remove: remove }

	  $.proxy = function(fn, context) {
	    var args = (2 in arguments) && slice.call(arguments, 2)
	    if (isFunction(fn)) {
	      var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
	      proxyFn._zid = zid(fn)
	      return proxyFn
	    } else if (isString(context)) {
	      if (args) {
	        args.unshift(fn[context], fn)
	        return $.proxy.apply(null, args)
	      } else {
	        return $.proxy(fn[context], fn)
	      }
	    } else {
	      throw new TypeError("expected function")
	    }
	  }

	  $.fn.bind = function(event, data, callback){
	    return this.on(event, data, callback)
	  }
	  $.fn.unbind = function(event, callback){
	    return this.off(event, callback)
	  }
	  $.fn.one = function(event, selector, data, callback){
	    return this.on(event, selector, data, callback, 1)
	  }

	  var returnTrue = function(){return true},
	      returnFalse = function(){return false},
	      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
	      eventMethods = {
	        preventDefault: 'isDefaultPrevented',
	        stopImmediatePropagation: 'isImmediatePropagationStopped',
	        stopPropagation: 'isPropagationStopped'
	      }

	  function compatible(event, source) {
	    if (source || !event.isDefaultPrevented) {
	      source || (source = event)

	      $.each(eventMethods, function(name, predicate) {
	        var sourceMethod = source[name]
	        event[name] = function(){
	          this[predicate] = returnTrue
	          return sourceMethod && sourceMethod.apply(source, arguments)
	        }
	        event[predicate] = returnFalse
	      })

	      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
	          'returnValue' in source ? source.returnValue === false :
	          source.getPreventDefault && source.getPreventDefault())
	        event.isDefaultPrevented = returnTrue
	    }
	    return event
	  }

	  function createProxy(event) {
	    var key, proxy = { originalEvent: event }
	    for (key in event)
	      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

	    return compatible(proxy, event)
	  }

	  $.fn.delegate = function(selector, event, callback){
	    return this.on(event, selector, callback)
	  }
	  $.fn.undelegate = function(selector, event, callback){
	    return this.off(event, selector, callback)
	  }

	  $.fn.live = function(event, callback){
	    $(document.body).delegate(this.selector, event, callback)
	    return this
	  }
	  $.fn.die = function(event, callback){
	    $(document.body).undelegate(this.selector, event, callback)
	    return this
	  }

	  $.fn.on = function(event, selector, data, callback, one){
	    var autoRemove, delegator, $this = this
	    if (event && !isString(event)) {
	      $.each(event, function(type, fn){
	        $this.on(type, selector, data, fn, one)
	      })
	      return $this
	    }

	    if (!isString(selector) && !isFunction(callback) && callback !== false)
	      callback = data, data = selector, selector = undefined
	    if (isFunction(data) || data === false)
	      callback = data, data = undefined

	    if (callback === false) callback = returnFalse

	    return $this.each(function(_, element){
	      if (one) autoRemove = function(e){
	        remove(element, e.type, callback)
	        return callback.apply(this, arguments)
	      }

	      if (selector) delegator = function(e){
	        var evt, match = $(e.target).closest(selector, element).get(0)
	        if (match && match !== element) {
	          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
	          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
	        }
	      }

	      add(element, event, callback, data, selector, delegator || autoRemove)
	    })
	  }
	  $.fn.off = function(event, selector, callback){
	    var $this = this
	    if (event && !isString(event)) {
	      $.each(event, function(type, fn){
	        $this.off(type, selector, fn)
	      })
	      return $this
	    }

	    if (!isString(selector) && !isFunction(callback) && callback !== false)
	      callback = selector, selector = undefined

	    if (callback === false) callback = returnFalse

	    return $this.each(function(){
	      remove(this, event, callback, selector)
	    })
	  }

	  $.fn.trigger = function(event, args){
	    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
	    event._args = args
	    return this.each(function(){
	      // handle focus(), blur() by calling them directly
	      if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
	      // items in the collection might not be DOM elements
	      else if ('dispatchEvent' in this) this.dispatchEvent(event)
	      else $(this).triggerHandler(event, args)
	    })
	  }

	  // triggers event handlers on current element just as if an event occurred,
	  // doesn't trigger an actual event, doesn't bubble
	  $.fn.triggerHandler = function(event, args){
	    var e, result
	    this.each(function(i, element){
	      e = createProxy(isString(event) ? $.Event(event) : event)
	      e._args = args
	      e.target = element
	      $.each(findHandlers(element, event.type || event), function(i, handler){
	        result = handler.proxy(e)
	        if (e.isImmediatePropagationStopped()) return false
	      })
	    })
	    return result
	  }

	  // shortcut methods for `.bind(event, fn)` for each event type
	  ;('focusin focusout focus blur load resize scroll unload click dblclick '+
	  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
	  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
	    $.fn[event] = function(callback) {
	      return (0 in arguments) ?
	        this.bind(event, callback) :
	        this.trigger(event)
	    }
	  })

	  $.Event = function(type, props) {
	    if (!isString(type)) props = type, type = props.type
	    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
	    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
	    event.initEvent(type, bubbles, true)
	    return compatible(event)
	  }

	})(Zepto)

	;(function($){
	  var jsonpID = 0,
	      document = window.document,
	      key,
	      name,
	      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	      scriptTypeRE = /^(?:text|application)\/javascript/i,
	      xmlTypeRE = /^(?:text|application)\/xml/i,
	      jsonType = 'application/json',
	      htmlType = 'text/html',
	      blankRE = /^\s*$/,
	      originAnchor = document.createElement('a')

	  originAnchor.href = window.location.href

	  // trigger a custom event and return false if it was cancelled
	  function triggerAndReturn(context, eventName, data) {
	    var event = $.Event(eventName)
	    $(context).trigger(event, data)
	    return !event.isDefaultPrevented()
	  }

	  // trigger an Ajax "global" event
	  function triggerGlobal(settings, context, eventName, data) {
	    if (settings.global) return triggerAndReturn(context || document, eventName, data)
	  }

	  // Number of active Ajax requests
	  $.active = 0

	  function ajaxStart(settings) {
	    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
	  }
	  function ajaxStop(settings) {
	    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
	  }

	  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
	  function ajaxBeforeSend(xhr, settings) {
	    var context = settings.context
	    if (settings.beforeSend.call(context, xhr, settings) === false ||
	        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
	      return false

	    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
	  }
	  function ajaxSuccess(data, xhr, settings, deferred) {
	    var context = settings.context, status = 'success'
	    settings.success.call(context, data, status, xhr)
	    if (deferred) deferred.resolveWith(context, [data, status, xhr])
	    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
	    ajaxComplete(status, xhr, settings)
	  }
	  // type: "timeout", "error", "abort", "parsererror"
	  function ajaxError(error, type, xhr, settings, deferred) {
	    var context = settings.context
	    settings.error.call(context, xhr, type, error)
	    if (deferred) deferred.rejectWith(context, [xhr, type, error])
	    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
	    ajaxComplete(type, xhr, settings)
	  }
	  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
	  function ajaxComplete(status, xhr, settings) {
	    var context = settings.context
	    settings.complete.call(context, xhr, status)
	    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
	    ajaxStop(settings)
	  }

	  // Empty function, used as default callback
	  function empty() {}

	  $.ajaxJSONP = function(options, deferred){
	    if (!('type' in options)) return $.ajax(options)

	    var _callbackName = options.jsonpCallback,
	      callbackName = ($.isFunction(_callbackName) ?
	        _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
	      script = document.createElement('script'),
	      originalCallback = window[callbackName],
	      responseData,
	      abort = function(errorType) {
	        $(script).triggerHandler('error', errorType || 'abort')
	      },
	      xhr = { abort: abort }, abortTimeout

	    if (deferred) deferred.promise(xhr)

	    $(script).on('load error', function(e, errorType){
	      clearTimeout(abortTimeout)
	      $(script).off().remove()

	      if (e.type == 'error' || !responseData) {
	        ajaxError(null, errorType || 'error', xhr, options, deferred)
	      } else {
	        ajaxSuccess(responseData[0], xhr, options, deferred)
	      }

	      window[callbackName] = originalCallback
	      if (responseData && $.isFunction(originalCallback))
	        originalCallback(responseData[0])

	      originalCallback = responseData = undefined
	    })

	    if (ajaxBeforeSend(xhr, options) === false) {
	      abort('abort')
	      return xhr
	    }

	    window[callbackName] = function(){
	      responseData = arguments
	    }

	    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
	    document.head.appendChild(script)

	    if (options.timeout > 0) abortTimeout = setTimeout(function(){
	      abort('timeout')
	    }, options.timeout)

	    return xhr
	  }

	  $.ajaxSettings = {
	    // Default type of request
	    type: 'GET',
	    // Callback that is executed before request
	    beforeSend: empty,
	    // Callback that is executed if the request succeeds
	    success: empty,
	    // Callback that is executed the the server drops error
	    error: empty,
	    // Callback that is executed on request complete (both: error and success)
	    complete: empty,
	    // The context for the callbacks
	    context: null,
	    // Whether to trigger "global" Ajax events
	    global: true,
	    // Transport
	    xhr: function () {
	      return new window.XMLHttpRequest()
	    },
	    // MIME types mapping
	    // IIS returns Javascript as "application/x-javascript"
	    accepts: {
	      script: 'text/javascript, application/javascript, application/x-javascript',
	      json:   jsonType,
	      xml:    'application/xml, text/xml',
	      html:   htmlType,
	      text:   'text/plain'
	    },
	    // Whether the request is to another domain
	    crossDomain: false,
	    // Default timeout
	    timeout: 0,
	    // Whether data should be serialized to string
	    processData: true,
	    // Whether the browser should be allowed to cache GET responses
	    cache: true
	  }

	  function mimeToDataType(mime) {
	    if (mime) mime = mime.split(';', 2)[0]
	    return mime && ( mime == htmlType ? 'html' :
	      mime == jsonType ? 'json' :
	      scriptTypeRE.test(mime) ? 'script' :
	      xmlTypeRE.test(mime) && 'xml' ) || 'text'
	  }

	  function appendQuery(url, query) {
	    if (query == '') return url
	    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
	  }

	  // serialize payload and append it to the URL for GET requests
	  function serializeData(options) {
	    if (options.processData && options.data && $.type(options.data) != "string")
	      options.data = $.param(options.data, options.traditional)
	    if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
	      options.url = appendQuery(options.url, options.data), options.data = undefined
	  }

	  $.ajax = function(options){
	    var settings = $.extend({}, options || {}),
	        deferred = $.Deferred && $.Deferred(),
	        urlAnchor
	    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

	    ajaxStart(settings)

	    if (!settings.crossDomain) {
	      urlAnchor = document.createElement('a')
	      urlAnchor.href = settings.url
	      urlAnchor.href = urlAnchor.href
	      settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)
	    }

	    if (!settings.url) settings.url = window.location.toString()
	    serializeData(settings)

	    var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
	    if (hasPlaceholder) dataType = 'jsonp'

	    if (settings.cache === false || (
	         (!options || options.cache !== true) &&
	         ('script' == dataType || 'jsonp' == dataType)
	        ))
	      settings.url = appendQuery(settings.url, '_=' + Date.now())

	    if ('jsonp' == dataType) {
	      if (!hasPlaceholder)
	        settings.url = appendQuery(settings.url,
	          settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
	      return $.ajaxJSONP(settings, deferred)
	    }

	    var mime = settings.accepts[dataType],
	        headers = { },
	        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
	        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
	        xhr = settings.xhr(),
	        nativeSetHeader = xhr.setRequestHeader,
	        abortTimeout

	    if (deferred) deferred.promise(xhr)

	    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
	    setHeader('Accept', mime || '*/*')
	    if (mime = settings.mimeType || mime) {
	      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
	      xhr.overrideMimeType && xhr.overrideMimeType(mime)
	    }
	    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
	      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

	    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
	    xhr.setRequestHeader = setHeader

	    xhr.onreadystatechange = function(){
	      if (xhr.readyState == 4) {
	        xhr.onreadystatechange = empty
	        clearTimeout(abortTimeout)
	        var result, error = false
	        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
	          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))
	          result = xhr.responseText

	          try {
	            // http://perfectionkills.com/global-eval-what-are-the-options/
	            if (dataType == 'script')    (1,eval)(result)
	            else if (dataType == 'xml')  result = xhr.responseXML
	            else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
	          } catch (e) { error = e }

	          if (error) ajaxError(error, 'parsererror', xhr, settings, deferred)
	          else ajaxSuccess(result, xhr, settings, deferred)
	        } else {
	          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
	        }
	      }
	    }

	    if (ajaxBeforeSend(xhr, settings) === false) {
	      xhr.abort()
	      ajaxError(null, 'abort', xhr, settings, deferred)
	      return xhr
	    }

	    if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

	    var async = 'async' in settings ? settings.async : true
	    xhr.open(settings.type, settings.url, async, settings.username, settings.password)

	    for (name in headers) nativeSetHeader.apply(xhr, headers[name])

	    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
	        xhr.onreadystatechange = empty
	        xhr.abort()
	        ajaxError(null, 'timeout', xhr, settings, deferred)
	      }, settings.timeout)

	    // avoid sending empty string (#319)
	    xhr.send(settings.data ? settings.data : null)
	    return xhr
	  }

	  // handle optional data/success arguments
	  function parseArguments(url, data, success, dataType) {
	    if ($.isFunction(data)) dataType = success, success = data, data = undefined
	    if (!$.isFunction(success)) dataType = success, success = undefined
	    return {
	      url: url
	    , data: data
	    , success: success
	    , dataType: dataType
	    }
	  }

	  $.get = function(/* url, data, success, dataType */){
	    return $.ajax(parseArguments.apply(null, arguments))
	  }

	  $.post = function(/* url, data, success, dataType */){
	    var options = parseArguments.apply(null, arguments)
	    options.type = 'POST'
	    return $.ajax(options)
	  }

	  $.getJSON = function(/* url, data, success */){
	    var options = parseArguments.apply(null, arguments)
	    options.dataType = 'json'
	    return $.ajax(options)
	  }

	  $.fn.load = function(url, data, success){
	    if (!this.length) return this
	    var self = this, parts = url.split(/\s/), selector,
	        options = parseArguments(url, data, success),
	        callback = options.success
	    if (parts.length > 1) options.url = parts[0], selector = parts[1]
	    options.success = function(response){
	      self.html(selector ?
	        $('<div>').html(response.replace(rscript, "")).find(selector)
	        : response)
	      callback && callback.apply(self, arguments)
	    }
	    $.ajax(options)
	    return this
	  }

	  var escape = encodeURIComponent

	  function serialize(params, obj, traditional, scope){
	    var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
	    $.each(obj, function(key, value) {
	      type = $.type(value)
	      if (scope) key = traditional ? scope :
	        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
	      // handle data in serializeArray() format
	      if (!scope && array) params.add(value.name, value.value)
	      // recurse into nested objects
	      else if (type == "array" || (!traditional && type == "object"))
	        serialize(params, value, traditional, key)
	      else params.add(key, value)
	    })
	  }

	  $.param = function(obj, traditional){
	    var params = []
	    params.add = function(key, value) {
	      if ($.isFunction(value)) value = value()
	      if (value == null) value = ""
	      this.push(escape(key) + '=' + escape(value))
	    }
	    serialize(params, obj, traditional)
	    return params.join('&').replace(/%20/g, '+')
	  }
	})(Zepto)

	;(function($){
	  $.fn.serializeArray = function() {
	    var name, type, result = [],
	      add = function(value) {
	        if (value.forEach) return value.forEach(add)
	        result.push({ name: name, value: value })
	      }
	    if (this[0]) $.each(this[0].elements, function(_, field){
	      type = field.type, name = field.name
	      if (name && field.nodeName.toLowerCase() != 'fieldset' &&
	        !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' &&
	        ((type != 'radio' && type != 'checkbox') || field.checked))
	          add($(field).val())
	    })
	    return result
	  }

	  $.fn.serialize = function(){
	    var result = []
	    this.serializeArray().forEach(function(elm){
	      result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
	    })
	    return result.join('&')
	  }

	  $.fn.submit = function(callback) {
	    if (0 in arguments) this.bind('submit', callback)
	    else if (this.length) {
	      var event = $.Event('submit')
	      this.eq(0).trigger(event)
	      if (!event.isDefaultPrevented()) this.get(0).submit()
	    }
	    return this
	  }

	})(Zepto)

	;(function($){
	  // __proto__ doesn't exist on IE<11, so redefine
	  // the Z function to use object extension instead
	  if (!('__proto__' in {})) {
	    $.extend($.zepto, {
	      Z: function(dom, selector){
	        dom = dom || []
	        $.extend(dom, $.fn)
	        dom.selector = selector || ''
	        dom.__Z = true
	        return dom
	      },
	      // this is a kludge but works
	      isZ: function(object){
	        return $.type(object) === 'array' && '__Z' in object
	      }
	    })
	  }

	  // getComputedStyle shouldn't freak out when called
	  // without a valid element as argument
	  try {
	    getComputedStyle(undefined)
	  } catch(e) {
	    var nativeGetComputedStyle = getComputedStyle;
	    window.getComputedStyle = function(element){
	      try {
	        return nativeGetComputedStyle(element)
	      } catch(e) {
	        return null
	      }
	    }
	  }
	})(Zepto)

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DEBUG = false;

	var controller = __webpack_require__(4);
	var buildMasonryGridModule = __webpack_require__(7);
	var buildBaselineGridModule = __webpack_require__(12);
	var jqajax = __webpack_require__(13);
	var fontCheck = __webpack_require__(14);
	var Core = __webpack_require__(8);
	var $ = __webpack_require__(5);

	function BlogGrid () {

	  if (DEBUG) {
	    console.log('BlogGrid');
	  }

	  var $body = $('body');
	  var masonryGrid = null;
	  var baselineGrid = null;
	  var isMasonryLayout = $body.hasClass('tweak-blog-list-grid-alignment-masonry');
	  var isInfiniteScrollEnabled = $body.hasClass('tweak-infinite-scroll');
	  var windowWidth;
	  var tweaksToWatch = [
	    'tweak-blog-list-max-width',
	    'tweak-cards',
	    'tweak-crop-images',
	    'tweak-blog-list-grid-narrow-columns',
	    'tweak-show-excerpt-on-blog-list',
	    'tweak-blog-promoted-meta',
	    'tweak-blog-show-divider',
	    'tweak-blog-date-style',
	    'minColumnWidth',
	    'tweak-blog-list-grid-alignment'
	  ];

	  var getMinColWidth = function () {
	    return Core.Tweak.getValue('minColumnWidth');
	  }

	  /**
	   * Returns a adjusted grid gutter value based on window width and
	   * whether the user has selected the narrow column layout in Style Editor.
	   *
	   * Gutter is based on a % of the minColWidth tweak.
	   *
	   * @method getGutter
	   * @return {Number}
	   */
	  var getGutter = function () {
	    if (window.innerWidth <= Template.Constants.BREAKPOINT_MOBILE) {
	      return 0.1 * getMinColWidth();
	    }

	    return 0.25 * getMinColWidth();
	  };

	  /**
	   * If enabled in tweak, loads more posts when user scrolls to the bottom of
	   * the page.
	   *
	   * @method infiniteScrollHandler
	   */

	  function infiniteScrollHandler() {
	    var windowHeight = parseInt(window.innerHeight, 10);
	    var footerStart;
	    var scrollY;

	    Template.Util.debounce('scroll', function () {
	      footerStart = parseInt($('#footer').offset().top, 10);
	      scrollY = $(window).scrollTop();
	      if (scrollY + windowHeight >= footerStart && $('article[data-last-page]').length === 0) {
	        jqajax();
	      }
	    }, 200);
	  }

	  /**
	   * If infinite scroll is disabled, users can click this button to manually
	   * load more posts at the bottom of the page.
	   *
	   * @method loadMorePostsButtonClickHandler
	   */
	  function loadMorePostsButtonClickHandler() {
	    $('.load-more').click(function (e) {
	      e.preventDefault();
	      jqajax();
	    });
	  }

	  function destroyMasonryGrid() {
	    buildMasonryGridModule.masonryReset();
	    $body.removeClass('absolute-articles');
	    masonryGrid = null;
	  }

	  function destroyBaselineGrid() {
	    buildBaselineGridModule.resetBaselineGrid();
	    baselineGrid = null;
	  }

	  function instantiateMasonryGrid() {
	    buildMasonryGridModule.masonryInit({
	      wrapper: '#blogList',
	      brick: 'article.entry--list',
	      gutter: getGutter()
	    });

	    masonryGrid = true;
	  }

	  function instantiateBaselineGrid() {
	    buildBaselineGridModule.baselineInit({
	      wrapper: '#blogList',
	      article: 'article.entry--list',
	      gutter: getGutter()
	    });

	    baselineGrid = true;
	  }

	  /**
	   * Constructs the masonry-/autocolumns-style blog list layout.
	   *
	   * @method buildMasonryGrid
	   */
	  function buildMasonryGrid() {
	    if (baselineGrid) {
	      destroyBaselineGrid();
	    }

	    $body.addClass('absolute-articles');
	    instantiateMasonryGrid();
	  }

	  function refreshMasonryGrid(e) {
	    if (e !== undefined || windowWidth !== window.innerWidth) {
	      buildMasonryGridModule.masonryReset();
	      instantiateMasonryGrid();
	      windowWidth = window.innerWidth;
	    }
	  }

	  /**
	   * Constructs a blog list grid wherein the tiles are aligned to the bottom,
	   * or baseline, of a row
	   *
	   * @method buildBaselineGrid
	   */
	  function buildBaselineGrid() {
	    if (masonryGrid) {
	      destroyMasonryGrid();
	    }

	    instantiateBaselineGrid();
	  }

	  function refreshBaselineGrid(e) {
	    if (e !== undefined) {
	      destroyBaselineGrid();
	      instantiateBaselineGrid();
	    } else if (windowWidth !== window.innerWidth) {
	      buildBaselineGridModule.resizeRespondBaselineGrid();
	      windowWidth = window.innerWidth;
	    }
	  }

	  function syncUI(e) {
	    if (masonryGrid) {
	      refreshMasonryGrid(e);
	    } else {
	      refreshBaselineGrid(e);
	    }
	  }

	  function tweakChangeHandler(tweak) {
	    if (tweak.name === 'tweak-blog-list-grid-alignment') {
	      if (tweak.value.toLowerCase() === 'masonry') {
	        buildBaselineGridModule.resetBaselineGrid();
	        buildMasonryGrid();
	      } else {
	        buildMasonryGridModule.masonryReset();
	        buildBaselineGridModule.resetBaselineGrid();
	        buildBaselineGrid();
	      }
	    } else {
	      syncUI(tweak);
	    }
	  }

	  function bindUI() {
	    if (isInfiniteScrollEnabled) {
	      infiniteScrollHandler();
	    } else {
	      loadMorePostsButtonClickHandler();
	    }

	    Template.Util.debounce('resize', syncUI, 100);

	    Core.Tweak.watch(tweaksToWatch, tweakChangeHandler);
	  }

	  function init() {
	    windowWidth = window.innerWidth;

	    if (isMasonryLayout) {
	      // don't build masonry until slow-loading typekit fonts
	      // are (hopefully) loaded.
	      fontCheck('#blogList h2.entry-title', buildMasonryGrid);
	    } else {
	      buildBaselineGrid();
	    }

	    bindUI();
	  }

	  init();

	}

	controller.registerController('BlogGrid', BlogGrid);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	  var Core = __webpack_require__(8);
	  var $ = __webpack_require__(5);

	  var _leftPos;
	  var _topPos;
	  var _coords;
	  var _wrapperHeight;
	  var _wrapper;
	  var _brick;
	  var _gutter;
	  var _loadingSpinner = $('.loading-spinner');
	  var LOADED_CLASS = 'grid-loaded';
	  var HIDDEN_CLASS = 'grid-hidden';

	  // set intrinsic padding on thumbnail wrappers
	  var _setIntrinsicValues = function (img) {
	    if (img[0]) {
	      var imgRatio = window.Template.Util.getImageRatio(img);

	      img.parent().css('padding-bottom', imgRatio + '%');

	      Core.ImageLoader.load(img[0], {
	        mode: 'fill',
	        load: true,
	        fixedRatio: true
	      });
	    }
	  };

	  var _getNumberOfColumns = function () {
	    var wrapperWidth = _wrapper.width();
	    var _minColWidth = parseInt(Core.Tweak.getValue('minColumnWidth'), 10);
	    // adding the gutter to the container width before dividing accounts for
	    // the fact that there are only (cols - 1) gutters.
	    return Math.floor((wrapperWidth + _gutter) / (_minColWidth + _gutter));
	  };

	  var _getFinalColumnWidth = function () {
	    var cols = _getNumberOfColumns();
	    var wrapperWidth = _wrapper.width();
	    return (wrapperWidth - ((cols - 1) * _gutter)) / cols;
	  };

	  var _setColumnWidths = function (index, brick) {
	    $(brick).css({
	      'width': _getFinalColumnWidth() + 'px'
	    });
	  };

	  var _placeBrick = function (brick) {
	    $(brick).css({
	      'top': _topPos + 'px',
	      'left': _leftPos + 'px'
	    });
	  };

	  var masonryReveal = function (bricks) {
	    var i = 0;
	    var interval = setInterval(function () {
	      $(bricks[i]).removeClass(HIDDEN_CLASS);
	      i++;
	      if (i >= bricks.length) {
	        clearInterval(interval);
	      }
	    }, 100);
	  };

	  var layout = function () {
	    var cols = _getNumberOfColumns();
	    var wrapperEdge = _wrapper.width();

	    $(_wrapper).addClass('col-' + cols + '-grid');

	    $(_brick + ':not(.' + LOADED_CLASS + ')').each(function (index) {
	      _setColumnWidths(index, this);
	      _setIntrinsicValues($(this).find('img'));

	      // this accounts for the first row
	      if (wrapperEdge - _leftPos > 0 && _topPos === 0) {
	        _placeBrick(this);
	        // _coords will be an array of arrays, tracking the left/top
	        // coordinate of the current bottom of each row
	        _coords.push([_leftPos, $(this).position().top + $(this)[0].offsetHeight]);
	        _leftPos += _getFinalColumnWidth() + _gutter;
	      // now fill in gaps
	      } else {
	        // sort the _coords array so that the shortest column is always first
	        _coords.sort(function (a, b) {
	          if (a[1] < b[1]) {
	            return -1;
	          } else if (a[1] > b[1]) {
	            return 1;
	          }

	          return 0;
	        });

	        // set the position to the first array in the sorted _coords array
	        if (cols !== 1) {
	          _topPos = _coords[0][1] + _gutter;
	        } else {
	          _topPos = _coords[0][1] + 2 * _gutter;
	        }
	        _leftPos = _coords[0][0];

	        _placeBrick(this);

	        // clip off the array you just used and add the new left/bottom of the
	        // current column to the array
	        _coords.splice(0, 1);
	        _coords.push([_leftPos, $(this).position().top + $(this)[0].offsetHeight]);
	      }

	      // add loaded class to the item and set the height of the wrapper
	      // to the greater of the last brick's bottom or the current wrapper height
	      $(this).addClass(LOADED_CLASS);
	      _wrapperHeight = Math.max(_wrapperHeight,
	        $(this).position().top + $(this)[0].offsetHeight);
	    });

	    // after placing all the bricks:
	    // - set the height on the wrapper
	    // - reveal the bricks that are hidden
	    $(_wrapper).css('height', _wrapperHeight + 'px');
	    masonryReveal($(_brick + '.' + HIDDEN_CLASS));
	    _loadingSpinner.addClass('hidden');
	    // hide the footer in masonry until the whole grid is loaded
	    // so that it doesn't snap into place after
	    if ($('.site-footer').length) {
	      $('.site-footer').addClass(LOADED_CLASS);
	    }
	  };

	  var masonryReset = function() {
	    if ($(_brick).length) {
	      $(_brick).addClass(HIDDEN_CLASS).removeClass(LOADED_CLASS);

	      var wrapperClassArray = $(_wrapper)[0].className.split(/col-.-grid/g).join('');
	      $(_wrapper)[0].className = wrapperClassArray;

	      $(_brick).css({
	        'top': '',
	        'left': ''
	      });

	      _wrapper.css('height', '');
	    }
	  };

	  var masonryInit = function(config) {
	    _leftPos = 0;
	    _topPos = 0;
	    _coords = [];
	    _wrapperHeight = 0;

	    _wrapper = $(config.wrapper);
	    _brick = config.brick;
	    _gutter = config.gutter;

	    layout();
	  };

	  module.exports = {
	    masonryInit: masonryInit,
	    masonryReveal: masonryReveal,
	    masonryReset: masonryReset,
	    layout: layout
	  };


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var ImageLoader = __webpack_require__(9);
	var Tweak = __webpack_require__(10);
	var Lifecycle = __webpack_require__(11);

	/**
	 * The public JavaScript API for Squarespace template developers.
	 * @namespace Space
	 */
	var SQS = {
	  ImageLoader: ImageLoader,
	  Tweak: Tweak,
	  Lifecycle: Lifecycle
	};

	module.exports = SQS;

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * @namespace ImageLoader
	 */
	var ImageLoader = {

	  /**
	   * @method load
	   * @param {Node} img
	   * @param {Object} config
	   */
	  load: function(img, config) {
	    return window.ImageLoader.load(img, config);
	  }
	};

	/**
	 * @exports {Object} ImageLoader
	 */
	module.exports = ImageLoader;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * @var {Object} tweaksToWatch
	 */
	var tweaksToWatch = { all: { callbacks: [] } };

	/**
	 * Tweaks are items in the Squarespace Style Editor. You can get a tweak
	 * value to use in your JavaScript or watch a tweak for a changing value.
	 *
	 * @namespace Tweak
	 * @memberof Squarespace
	 */
	var Tweak = {

	  /**
	   * Gets the value of one of the style editor tweaks.
	   *
	   * @method getValue
	   * @param {String} name
	   * @returns {*} The tweak value, can be any type.
	   */
	  getValue: function (name) {
	    if (!name || typeof name !== 'string') {
	      return null;
	    }

	    return Y.Squarespace.Template.getTweakValue(name);
	  },

	  /**
	   * Listen for changes on a tweak item.
	   *
	   * @method watch
	   * @param {String} Optional: the tweak name.
	   * @param {Callback}
	   */
	  watch: function () {

	    var args = arguments;

	    if (args.length === 0) {
	      return;
	    }

	    if (args.length === 1) {
	      // Only callback passed in, no tweak name
	      // string or tweaks array passed in.

	      if (typeof args[0] === 'function') {
	        tweaksToWatch.all.callbacks.push(args[0]);
	      } else {
	        return;
	      }
	    } else {
	      // Multiple arguments
	      if (typeof args[0] === 'string') {

	        // Specific tweak name passed in

	        var tweakName = args[0];
	        if (!tweaksToWatch[tweakName]) {
	          tweaksToWatch[tweakName] = { callbacks: [] };
	        }

	        tweaksToWatch[tweakName].callbacks.push(args[1]);
	      }

	      if (args[0].constructor === Array) {

	        // Multiple tweak names passed in
	        // as array

	        var tweakNames = args[0];
	        tweakNames.forEach(function (tweak) {
	          if (!tweaksToWatch[tweak]) {
	            tweaksToWatch[tweak] = { callbacks: [] };
	          }

	          tweaksToWatch[tweak].callbacks.push(args[1]);
	        });
	      }
	    }
	  }
	};

	if (Y.Global) {
	  // If Y.Global is present on the page, set up the
	  // tweak event listener.
	  Y.Global.on('tweak:change', function (e) {
	    var tweakName = e.getName();
	    var callbackSignature = {
	      name: tweakName,
	      value: e.config && e.config.value
	    };

	    if (tweaksToWatch[tweakName]) {
	      tweaksToWatch[tweakName].callbacks.forEach(function (callback) {
	        try {
	          callback(callbackSignature);
	        } catch (err) {
	          console.error(err);
	        }
	      });
	    }

	    if (tweaksToWatch.all.callbacks.length > 0) {
	      tweaksToWatch.all.callbacks.forEach(function (callback) {
	        try {
	          callback(callbackSignature);
	        } catch (err) {
	          console.error(err);
	        }
	      });
	    }
	  });
	}

	/**
	 * @exports {Object} Tweak
	 */
	module.exports = Tweak;



/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 *
	 * @namespace Lifecycle
	 * @memberof Squarespace
	 */
	var Lifecycle = {

	  init: function () {

	    // Squarespace.afterBodyLoad() trigger loads
	    // scripts and calls onInitialize, which 
	    // individual modules' init functions are
	    // bound to.

	    window.Squarespace.AFTER_BODY_LOADED = false;
	    window.Squarespace.afterBodyLoad();

	  },

	  destroy: function () {

	    // Squarespace.globalDestroy calls onDestroy
	    // for each destructor

	    window.Squarespace.globalDestroy(Y);

	  }

	};

	/**
	 * @exports {Object} Lifecycle
	 */
	module.exports = Lifecycle;



/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Core = __webpack_require__(8);
	var $ = __webpack_require__(5);

	var _wrapper;
	var _article;
	var _gutter;
	var _loadingSpinner = $('.loading-spinner');
	var LOADED_CLASS = 'grid-loaded';
	var HIDDEN_CLASS = 'grid-hidden';
	var _isAlignTop;

	var _getImageRatio = function (img) {
	  var _cropImagesSetting = Core.Tweak.getValue('tweak-crop-images').toLowerCase();
	  if (_cropImagesSetting === 'none') {
	    return window.Template.Util.getImageRatio(img);
	  } else if (_cropImagesSetting === 'square') {
	    return 100;
	  } else if (_cropImagesSetting === 'vertical') {
	    return 133;
	  } else if (_cropImagesSetting === 'horizontal') {
	    return 75;
	  }
	};

	// sets image wrapper dimensions based on various tweak options.
	var _setIntrinsicValues = function (imgs) {
	  var _imagesAreFixedRatio = (Core.Tweak.getValue('tweak-crop-images').toLowerCase() === 'none') ? true : false;

	  $(imgs).each(function () {
	    var imgRatio = _getImageRatio($(this));
	    $(this).attr('data-image-ratio', imgRatio);
	    $(this).parent().css('padding-bottom', imgRatio + '%');

	    Core.ImageLoader.load(this, {
	      mode: 'fill',
	      load: true,
	      fixedRatio: _imagesAreFixedRatio
	    });
	  });
	};

	var _getNumberOfColumns = function () {
	  var containerWidth = $(_wrapper).width();
	  var _minColWidth = parseInt(Core.Tweak.getValue('minColumnWidth'), 10);
	  // adding the gutter to the container width before dividing accounts for
	  // the fact that there are only (_cols - 1) gutters.
	  // Math.max makes sure there are never 0 columns
	  // (i.e., when min col width is bigger than container width).
	  return Math.max(Math.floor((containerWidth + _gutter) / (_minColWidth + _gutter)), 1);
	};

	var _getFinalColumnWidth = function () {
	  var containerWidth = $(_wrapper).width();
	  var cols = _getNumberOfColumns();
	  return (containerWidth - ((cols - 1) * _gutter)) / cols;
	};

	var _setColumnWidths = function (item) {
	  var colWidth = _getFinalColumnWidth();
	  $(item).each(function () {
	    $(this).css({
	      'width': colWidth + 'px'
	    });
	  });
	};

	/*
	 * Gets the height of either the tallest image or title in a row.
	 *
	 * Allows us to then set the margins on the other
	 * images/titles and get a baseline alignment.
	 */
	var _getTallestInRow = function (row) {
	  var _tallest = 0;

	  row.find('.thumbnail-title-wrapper').each(function () {
	    _tallest = Math.max(parseInt($(this)[0].offsetHeight, 10), _tallest);
	  });

	  return _tallest;
	};

	/*
	 * sets the margins on individual items to get a baseline alignment
	 * then adds the loaded class to the item
	 */
	var _setGridMargins = function (row, tallest) {
	  var marginTop = 0;
	  var _cropImagesSetting = Core.Tweak.getValue('tweak-crop-images').toLowerCase();
	  var cols = _getNumberOfColumns();

	  row.each(function() {
	    // find the difference in height between this element and the tallest in the row
	    marginTop = tallest - parseInt($(this).find('.thumbnail-title-wrapper')[0].offsetHeight);

	    // use that to set the margin on thumbnail images to push them down
	    // into a baseline alignment
	    $(this).find('.excerpt-thumb').css('margin-top', marginTop + 'px');

	    // for posts without a thumbnail, set the padding on the title wrapper
	    // to be the tallest element in the row, since it's absolutely positioned.
	    $(this).find('.entry-title-wrapper').css('padding-top', tallest + 'px');

	    // only absolutely position the title if > 1 columns
	    if (_cropImagesSetting === 'none' || cols !== 1) {
	      $(this).find('.title-bg-wrapper').addClass('absolute');
	    }

	    $(this).parent(_article).addClass(LOADED_CLASS);
	  });
	};

	// remove the hidden class every 130ms so they tile in
	var baselineGridReveal = function () {
	  var blogList = $(_article + '.' + HIDDEN_CLASS);
	  var i = 0;
	  var interval = setInterval(function () {
	    $(blogList[i]).removeClass(HIDDEN_CLASS);
	    i++;
	    if (i >= blogList.length) {
	      clearInterval(interval);
	    }
	  }, 100);
	};

	var buildBaselineGrid = function () {
	  var cols = _getNumberOfColumns();
	  _setColumnWidths($(_article + ':not(' + LOADED_CLASS + ')'));
	  _setIntrinsicValues($(_article).find('img:not([data-image-ratio])'));

	  // body class to set nth-child to remove margin from last column
	  $(_wrapper).addClass('col-' + cols + '-grid');

	  // don't run if grid is aligned top or if there is only 1 column
	  // since it's just display: inline-block
	  _isAlignTop = Core.Tweak.getValue('tweak-blog-list-grid-alignment').toLowerCase() === 'top';

	  if (_isAlignTop || cols === 1) {
	    baselineGridReveal();
	    _loadingSpinner.addClass('hidden');
	    return false;
	  }

	  var start = 0;
	  var end = cols;
	  var totalRows = Math.ceil($(_article).length / cols);
	  var row = $(_article).slice(start, cols);
	  var tallest;

	  for (var currentRow = 0; currentRow < totalRows; currentRow++) {
	    tallest = _getTallestInRow(row);
	    _setGridMargins(row, tallest);

	    // reset for next row
	    start = start + cols;
	    end = end + cols;
	    tallest = 0;
	    row = $(_article).slice(start, end);
	  }

	  baselineGridReveal();
	  _loadingSpinner.addClass('hidden');
	};

	var resetBaselineGrid = function () {
	  if ($(_article).length) {
	    $(_article).addClass(HIDDEN_CLASS).removeClass(LOADED_CLASS);
	    var wrapperClassArray = $(_wrapper)[0].className.split(/col-.-grid/g).join('');
	    $(_wrapper)[0].className = wrapperClassArray;

	    $(_article).css({
	      'width': '',
	      'margin-right': ''
	    });
	    $('.excerpt-thumb').css('margin-top', '');
	    $('.thumbnail-title-wrapper img').removeAttr('data-image-ratio');
	    $('.entry-title-wrapper').css({
	      'padding-top': '',
	      'height': ''
	    });
	    $('.title-bg-wrapper').removeClass('absolute');
	  }
	};

	// re-hide, then rebuild grid on window resize
	var resizeRespondBaselineGrid = function () {
	  resetBaselineGrid();
	  buildBaselineGrid();
	};

	var baselineInit = function(config) {
	  _wrapper = config.wrapper;
	  _article = config.article;
	  _gutter = config.gutter;

	  buildBaselineGrid();
	};

	module.exports = {
	  baselineInit: baselineInit,
	  resetBaselineGrid: resetBaselineGrid,
	  resizeRespondBaselineGrid: resizeRespondBaselineGrid,
	  buildBaselineGrid: buildBaselineGrid,
	  baselineGridReveal: baselineGridReveal
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var buildMasonryGridModule = __webpack_require__(7);
	var buildBaselineGridModule = __webpack_require__(12);
	var $ = __webpack_require__(5);

	module.exports = function () {
	  var wrapper = $('.blog-list');
	  var offset = wrapper.find('article').last().attr('data-offset');
	  var location = window.location.href;
	  // are you filtering by category, author, or tag?
	  var filteredLocation = location.toString().indexOf('?category') !== -1 ||
	                         location.toString().indexOf('?author') !== -1 ||
	                         location.toString().indexOf('?tag') !== -1;

	  var request = location + '?offset=' + offset + '&format=main-content';
	  // if filtered, set request to "&offset..." instead of "?offset..."
	  if (filteredLocation) {
	    request = location + '&offset=' + offset + '&format=main-content';
	  }

	  $.ajax({
	    url: request,
	    crossDomain: true,
	    context: window.Site,
	    dataType: 'html',
	    success: function(data) {
	      // get all the returned posts
	      wrapper.append($(data).filter('.blog-list').children());

	      if ($('body').hasClass('tweak-blog-list-grid-alignment-masonry')) {
	        buildMasonryGridModule.layout();
	      } else {
	        buildBaselineGridModule.buildBaselineGrid();
	      }

	      // set the new offset and the new load more link
	      offset = wrapper.find('article.entry').last().attr('data-offset');
	      $('.load-more').attr('href', '?offset=' + offset);

	      // no more pages?
	      if ($('article.entry:last-child[data-last-page]').length === 1) {
	        wrapper.addClass('last-page');
	      }
	    }
	  });
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);

	module.exports = function (element, callback) {
	  var fontFamily = $(element).css('font-family');
	  var fontLoaded;

	  if (fontLoaded === undefined) {

	    // Set attribute to false
	    fontLoaded = false;

	    // Create element
	    var tester = $('<div></div>');

	    // interval handle
	    var intervalHandle = null;

	    // Set element html to a string that changes with different fonts
	    tester.html('giItT1WQy@!-/#');
	    tester.css({
	      'position': 'fixed',
	      'z-index': '-1000',
	      'top': '-99999px',
	      'left': '-99999px',
	      'height': 0,
	      'overflow': 'hidden',
	      'font-size': '300px',
	      'white-space': 'nowrap',
	      'font-family': fontFamily
	    });

	    $('body').append(tester);

	    // Get original offset width
	    var originalWidth = tester[0].offsetWidth;

	    // Set limit for checks
	    var count = 0;

	    // Check font function
	    var checkFont = function () {
	      // If EITHER count has incremented more than 20 times OR the width has changed
	      if (count > 20 || tester[0].offsetWidth !== originalWidth) {

	        // Remove tester node
	        tester.remove();

	        // Set loaded attribute to true
	        fontLoaded = true;

	        if (callback) {
	          callback();
	        }

	        // Clear interval
	        if (intervalHandle !== null) {
	          clearInterval(intervalHandle);
	          intervalHandle = null;
	        }
	      } else {
	        count++;
	      }
	    };

	    // Run check function initially and on interval
	    checkFont();
	    intervalHandle = setInterval(function() {
	      checkFont();
	    }, 100);

	  }

	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use-strict';

	var DEBUG = false;

	var controller = __webpack_require__(4);
	var $ = __webpack_require__(5);

	/*
	 * Behavior for the reading position indicator on blog posts.
	  */
	function BlogProgressBar () {
	  if (DEBUG) {
	    console.log('BlogProgressBar');
	  }

	  var $progressPie = $(this).find('#pieWrapper');
	  var isProgressIndicatorOn = $('.tweak-show-progress-indicator').length;

	  var init = function () {

	    var windowHeight = window.innerHeight;
	    var pageLength;
	    var distance;
	    var pos = 0;
	    var rotation = 0;

	    if (isProgressIndicatorOn) {
	      $(window).on('scroll', function () {
	        $progressPie.addClass('show');

	        // Pixel length of the post.
	        pageLength = $(this).offset().top + $(this).height();

	        // Total distance need to travel to "read" the whole post
	        distance = pageLength - windowHeight;
	        pos = $(window).scrollTop();

	        // Are we to the end of the post yet? No, ok...
	        if ((pos / distance) <= 1) {
	          // Degrees of rotation
	          rotation = (pos / distance) * 360;
	          // Less than halfway, rotate the left half into the right side
	          if ((pos / distance) < 0.5) {
	            $('#pieLeft').css('transform', 'rotate(' + rotation + 'deg)');
	            $('#maskLeft').removeClass('hide');
	            $('#pieRight').addClass('hide');
	            $('#pieMask').addClass('hide');
	          // More than halfway, show the whole left half on the right,
	          // rotate the right half into the left side.
	          } else {
	            $('#pieLeft').css('transform', 'rotate(180deg)');
	            $('#maskLeft').addClass('hide');
	            $('#pieRight').removeClass('hide').css('transform', 'rotate(' + rotation + 'deg)');
	            $('#pieMask').removeClass('hide');
	          }
	        // Post is completely scrolled thru, so show everything.
	        } else {
	          $('#pieLeft').css('transform', 'rotate(180deg)');
	          $('#maskLeft').addClass('hide');
	          $('#pieRight').removeClass('hide').css('transform', 'rotate(360deg)');
	          $('#pieMask').removeClass('hide');
	        }
	      }.bind(this));
	    }
	  }.bind(this);

	  init();

	  Template.Util.debounce('resize', init);

	  // Hides after not scrolling for 1.5 seconds.
	  Template.Util.debounce('scroll', function() {
	    $progressPie.removeClass('show');
	  }, 1500);
	}

	controller.registerController('BlogProgressBar', BlogProgressBar);


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use-strict';

	var DEBUG = false;

	var controller = __webpack_require__(4);
	var $ = __webpack_require__(5);

	/*
	 * If the body is not as tall as the window, adds a min-height.
	 * This fixes weird overflow and zoom issues on short pages
	 *  when the nav is opened in iOS safari.
	 */

	function BodyMinHeight () {

	  if (DEBUG) {
	    console.log('BodyMinHeight');
	  }

	  var sync = function () {
	    if ($(this)[0].offsetHeight < window.innerHeight) {
	      $(this).css('min-height', window.innerHeight);
	    } else {
	      $(this).css('min-height', '');
	    }
	  }.bind(this);

	  sync();

	  Template.Util.debounce('resize', sync);

	}

	controller.registerController('BodyMinHeight', BodyMinHeight);


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use-strict';

	var DEBUG = false;

	var controller = __webpack_require__(4);
	var $ = __webpack_require__(5);

	function FadeInContent () {

	  if (DEBUG) {
	    console.log('FadeInContent');
	  }

	  var fadeInTimeout;

	  var delayedFade = function () {
	    fadeInTimeout = window.setTimeout(removeLoadingClass, 200);
	  }.bind(this);

	  var removeLoadingClass = function () {
	    if ($(this).hasClass('loading')) {
	      $(this).removeClass('loading');
	    }
	  }.bind(this);

	  delayedFade();

	}

	controller.registerController('FadeInContent', FadeInContent);


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DEBUG = false;

	var controller = __webpack_require__(4);
	var $ = __webpack_require__(5);

	/*
	 * Shrinks the header as you scroll down the page
	 */
	function HeaderScroll () {

	  if (DEBUG) {
	    console.log('HeaderScroll');
	  }

	  var sync = function () {

	    if (window.innerWidth <= window.Template.Constants.BREAKPOINT_TABLETS) {
	      return;
	    }

	    var $header = $(this).find('.header-announcement-wrapper');
	    var $closeToggle = $(this).find('.nav-close-toggle-wrapper');
	    var headerPadding = parseInt($(this).find('#header').css('padding-top'), 10) - 20;
	    var pos = 0;

	    $(window).on('scroll', function() {
	      pos = $(window).scrollTop();

	      if (pos > 0 && pos < headerPadding) {
	        $header.css('transform', 'translateY(' + (-1 * pos) + 'px)');
	        $closeToggle.css('transform', 'translateY(' + (-1 * pos) + 'px)');
	      } else if (pos >= headerPadding) {
	        $header.css('transform', 'translateY(' + (-1 * headerPadding) + 'px)');
	        $closeToggle.css('transform', 'translateY(' + (-1 * headerPadding) + 'px)');
	        $(this).addClass('header-tucked');
	      } else {
	        $header.css('transform', 'translateY(0)');
	        $closeToggle.css('transform', 'translateY(0)');
	        $(this).removeClass('header-tucked');
	      }
	    }.bind(this));
	  }.bind(this);

	  sync();

	  Template.Util.debounce('resize', function() {
	    sync();
	  }, 100);

	}

	controller.registerController('HeaderScroll', HeaderScroll);


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	  'use strict';

	  var DEBUG = false;

	  var controller = __webpack_require__(4);
	  var $ = __webpack_require__(5);

	  /*
	   * Is the nav overflowing it's fixed-position container?
	   * If so, add a class to make it overflow: scroll.
	   */
	  function MobileOffset () {

	    if (DEBUG) {
	      console.log('MobileOffset');
	    }

	    var mobileInfoBar = $('.sqs-mobile-info-bar');
	    var mobileBarHeight = $(this)[0].offsetHeight;

	    var sync = function () {
	      if (mobileInfoBar.length) {
	        mobileInfoBar.css('bottom', mobileBarHeight + 'px');
	      }
	    }.bind(this);

	    sync();

	    Template.Util.debounce('resize', function() {
	      sync();
	    }, 100);

	  }

	controller.registerController('MobileOffset', MobileOffset);


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DEBUG = false;

	var controller = __webpack_require__(4);
	var $ = __webpack_require__(5);

	/*
	 * Is the nav overflowing it's fixed-position container?
	 * If so, add a class to make it overflow: scroll.
	 */
	function NavOverflow () {

	  if (DEBUG) {
	    console.log('NavOverflow');
	  }
	  var $heightBoundaryNode = $(this);
	  var $rootNode = $heightBoundaryNode.find('.nav-blocks-wrapper');
	  var HEIGHT_RATIO = 1;
	  var NAV_PADDING = 140;

	  var sync = function () {
	    $heightBoundaryNode.removeClass('scroll');
	    if (Template.Util.isTooTall($rootNode[0], $heightBoundaryNode[0], HEIGHT_RATIO, NAV_PADDING)) {
	      $heightBoundaryNode.addClass('scroll');
	    }
	  }.bind(this);

	  sync();

	  Template.Util.debounce('resize', function() {
	    sync();
	  }, 100);

	}

	controller.registerController('NavOverflow', NavOverflow);


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DEBUG = false;

	var controller = __webpack_require__(4);
	var $ = __webpack_require__(5);

	function NavToggle () {

	  if (DEBUG) {
	    console.log('NavToggle');
	  }

	  $(this).each(function () {
	    $(this).on('click', function () {
	      // remove the show-search class, i.e.,
	      // hide the search form if it's open.
	      $('body').toggleClass('show-search', false);
	      $('body').toggleClass('show-social', false);
	      $('body').toggleClass('nav-open');
	    });
	  }.bind(this));

	  $('.nav-close-overlay').on('click', function () {
	    $('body').removeClass('nav-open');
	  });

	}

	controller.registerController('NavToggle', NavToggle);


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use-strict';

	var DEBUG = false;

	var controller = __webpack_require__(4);
	var Core = __webpack_require__(8);
	var $ = __webpack_require__(5);

	/*
	 *
	 */
	function RelatedPostImages () {
	  if (DEBUG) {
	    console.log('RelatedPostImages');
	  }

	  var setImagePadding = function () {
	    var $images = $(this).find('.thumbnail-title-wrapper img');

	    $images.each(function() {
	    	var imgRatio = window.Template.Util.getImageRatio($(this));
	    	$(this).parent().css('padding-bottom', imgRatio + '%');

	    	Core.ImageLoader.load(this, {
	        mode: 'fill',
	        load: true,
	        fixedRatio: true
	      });
	    });
	  }.bind(this);

	  if (Core.Tweak.getValue('tweak-crop-images').toLowerCase() === 'none') {
	  	setImagePadding();
	  }
	}

	controller.registerController('RelatedPostImages', RelatedPostImages);


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DEBUG = false;

	var controller = __webpack_require__(4);
	var $ = __webpack_require__(5);

	function SearchToggle () {

	  if (DEBUG) {
	    console.log('SearchToggle');
	  }

	  var $searchToggle = $(this).find('.header-search');
	  var $searchForm = $(this).find('.header-search-form');

	  $searchToggle.each(function (index, element) {
	    $(element).on('click', function (e) {
	      e.preventDefault();
	      $('body').toggleClass('nav-open', false);
	      $('body').toggleClass('show-social', false);
	      $('body').toggleClass('show-search');

	      if ($('.show-search').length) {
	        $searchForm.find('.header-search-form-input').focus();
	      } else {
	        $searchForm.find('.header-search-form-input').blur();
	      }
	    });
	  }.bind(this));

	}

	controller.registerController('SearchToggle', SearchToggle);


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DEBUG = false;

	var controller = __webpack_require__(4);
	var Core = __webpack_require__(8);
	var $ = __webpack_require__(5);

	function SetUpBannerImage () {

	  if (DEBUG) {
	    console.log('Set Up Banner Image');
	  }

	  var isBannerWidthNormal = $('body').hasClass('tweak-blog-item-banner-image-width-normal');
	  var imgRatio = window.Template.Util.getImageRatio($(this).find('img'));

	  // Sets a max-width on portrait and square-ish images so they don't get huge.
	  var addBodyClass = function () {
	    if (isBannerWidthNormal) {
	      if (imgRatio <= 100 && imgRatio >= 75) {
	        $('body').addClass('constrain-banner--mid');
	      } else if (imgRatio > 100) {
	        $('body').addClass('constrain-banner--narrow');
	      }
	    }
	  }.bind(this);

	  var sync = function () {
	    addBodyClass();
	    Core.ImageLoader.load($(this).find('img')[0], {
	      mode: 'fill',
	      load: true,
	      fixedRatio: true
	    });
	  }.bind(this);

	  sync();

	  Core.Tweak.watch('tweak-blog-item-banner-image-width', sync);

	};

	controller.registerController('SetUpBannerImage', SetUpBannerImage);


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DEBUG = false;

	var controller = __webpack_require__(4);
	var $ = __webpack_require__(5);

	/*
	 * Is the sidetray panel overflowing it's fixed-position container?
	 * If so, add a class to make it overflow: scroll.
	 */
	function SidetrayBlocksOverflow () {

	  if (DEBUG) {
	    console.log('SidetrayBlocksOverflow');
	  }

	  var $heightBoundaryNode = $(this);
	  var $rootNode = $heightBoundaryNode.find('.sidetray-blocks-wrapper');
	  var $heightRatio = 1;
	  var $padding = 140;

	  var init = function () {
	    if (Template.Util.isTooTall($rootNode[0], $heightBoundaryNode[0], $heightRatio, $padding)) {
	      $heightBoundaryNode.addClass('scroll');
	    } else {
	      $heightBoundaryNode.removeClass('scroll');
	    }
	  }.bind(this);

	  init();

	  Template.Util.debounce('resize', function() {
	    init();
	  }, 100);

	}

	controller.registerController('SidetrayBlocksOverflow', SidetrayBlocksOverflow);


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DEBUG = false;

	var controller = __webpack_require__(4);
	var Core = __webpack_require__(8);
	var $ = __webpack_require__(5);

	function SimpleImageLoad () {

	  var load = function () {

	    if (this.querySelector('img[data-src]')) {

	      var images = this.querySelectorAll('img[data-src]');

	      for (var i = 0; i < images.length; i++) {

	        var image = images[i];
	        var imageWrapper = image.parentNode;
	        var mode = null;

	        if (imageWrapper.classList.contains('content-fill')) {
	          mode = 'fill';
	        } else if (imageWrapper.classList.contains('content-fit')) {
	          mode = 'fit';
	        }

	        Core.ImageLoader.load(images[i], {
	          load: true,
	          mode: mode
	        });

	      }

	    }


	  }.bind(this);

	  // Bind resize handler
	  Template.Util.debounce('resize', load);

	  // Tweak handler
	  var tweaksFromDOM = this.getAttribute('data-tweaks');

	  if (tweaksFromDOM && tweaksFromDOM.length > 0) {

	    var tweaks = tweaksFromDOM.split(',').map(function (tweakName) {
	      return tweakName.trim();
	    });

	    Core.Tweak.watch(tweaks, load);

	  }

	  // Init
	  load();

	};

	controller.registerController('SimpleImageLoad', SimpleImageLoad);


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use-strict';

	var DEBUG = false;

	var controller = __webpack_require__(4);
	var $ = __webpack_require__(5);

	function SocialToggle () {

	  if (DEBUG) {
	    console.log('SocialToggle');
	  }

	  $(this).each(function () {
	    $(this).on('click', function () {
	      $('body').toggleClass('show-search', false);
	      $('body').toggleClass('nav-open', false);
	      $('body').toggleClass('show-social');
	    }).bind(this);
	  }).bind(this);
	}

	controller.registerController('SocialToggle', SocialToggle);


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use-strict';

	var DEBUG = false;

	var controller = __webpack_require__(4);
	var Core = __webpack_require__(8);
	var $ = __webpack_require__(5);

	/*
	 * Positions stuff around the fixed header.
	 * Also handles collisions between elements in the header.
	 * Combined into a single controller to avoid race condition.
	 */
	function SyncHeader () {

	  if (DEBUG) {
	    console.log('SyncHeader');
	  }

	  var headerHeight;
	  var headerWidth;
	  var headerSpecialWidth;
	  var socialSearchWidth;
	  var cartWidth;
	  var brandingWidth;
	  var header = $(this).find('.site-header');
	  var PADDING = 20;

	  // Sets the margin on the page content area to make room for the fixed header.
	  var setMargins = function () {
	    // Header is relative under the tablet breakpoint.
	    // The close icon is outside the header, so it needs to be kept in line separately.
	    if (window.innerWidth <= Template.Constants.BREAKPOINT_TABLETS) {
	      $(this).find('#page').css('margin-top', '');
	      $(this).find('#navCloseToggleWrapper').css({
	        'height': ''
	      });
	      return;
	    }

	    headerHeight = header[0].offsetHeight;
	    $(this).find('#page').css('marginTop', headerHeight);
	    $(this).find('#navCloseToggleWrapper').css({
	      'height': headerHeight
	    });
	  }.bind(this);

	  // Manages the title/tagline wrapping and the social icon overflow.
	  // Also hides the header elements until no-wrap has been resolved.
	  var syncHeaderElements = function () {
	    header.removeClass('collapse').addClass('no-wrap');
	    headerWidth = header[0].offsetWidth;
	    headerSpecialWidth = $(this).find('.header-special')[0].offsetWidth;
	    socialSearchWidth = $(this).find('.social-search-wrapper')[0].offsetWidth;
	    if ($(this).find('.site-title').length) {
	      brandingWidth = $(this).find('.site-title')[0].offsetWidth;
	    } else if ($(this).find('.logo-image').length) {
	      brandingWidth = $(this).find('.logo-image')[0].offsetWidth;
	    }
	    if ($(this).find('.sqs-custom-cart').length) {
	      cartWidth = $(this).find('.sqs-custom-cart')[0].offsetWidth;
	    } else {
	      cartWidth = 0;
	    }

	    // If below the tablet breakpoint (i.e., where the mobile nav bar shows up),
	    // allow the title and tagline to wrap if it's wider than the header + PADDING.
	    if ($(window).width() <= Template.Constants.BREAKPOINT_TABLETS && brandingWidth + PADDING >= headerWidth) {
	      header.removeClass('no-wrap');

	    // Otherwise, see if the elements in the right header section are bigger
	    // than their flex-boxed area. If so, add the collapse class and allow their
	    // title and tagline to wrap.
	    } else if ($(window).width() > Template.Constants.BREAKPOINT_TABLETS && socialSearchWidth + cartWidth + PADDING >= headerSpecialWidth) {
	      header.addClass('collapse').removeClass('no-wrap');
	    }

	    // Show the header.
	    header.removeClass('loading');
	  }.bind(this);

	  syncHeaderElements();
	  setMargins();

	  Core.Tweak.watch(['headerPaddingScale'], function() {
	    setMargins();
	  });

	  Template.Util.debounce('resize', function() {
	    syncHeaderElements();
	    setMargins();
	  }, 100);

	}

	controller.registerController('SyncHeader', SyncHeader);


/***/ }
/******/ ]);