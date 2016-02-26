/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	var hamToastie = __webpack_require__(4);
	
	{
		var data = hamToastie.randomise.init();
		console.log(data);
	
		var segment = hamToastie.segment.init(data);
		console.log(segment);
	
		var thumbnail = hamToastie.thumbnail.init(segment);
	
		document.body.innerHTML += thumbnail;
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/postcss-loader/index.js?browsers=last 2 versions!./../../node_modules/sass-loader/index.js!./style.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(3)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/postcss-loader/index.js?browsers=last 2 versions!./../../node_modules/sass-loader/index.js!./style.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/postcss-loader/index.js?browsers=last 2 versions!./../../node_modules/sass-loader/index.js!./style.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomise = __webpack_require__(5);
	var segment = __webpack_require__(7);
	var thumbnail = __webpack_require__(8);
	
	module.exports = { randomise: randomise, segment: segment, thumbnail: thumbnail };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var helpers = __webpack_require__(6);
	
	module.exports = function () {
	
		var size = 100,
		    path = [],
		    init = function init() {
	
			console.log('Init...');
	
			var path = buildPath();
			var hue = calcHue();
			var rotation = calcRotation();
	
			return { path: path, hue: hue, rotation: rotation };
		},
		    buildPath = function buildPath() {
	
			var data = [calcStart()];
			var x = data[0].x;
			var y = data[0].y;
	
			while (y < size && x > 0 && x < size) {
	
				x = helpers.boolean() ? x - offsetPath() : x + offsetPath();
				y += offsetPath();
	
				data.push({ x: x, y: y });
			}
	
			return data;
		},
		    offsetPath = function offsetPath() {
	
			return helpers.randomise({ max: 10 });
		},
		    calcStart = function calcStart() {
	
			// const plane = helpers.randomise(4);
			// const variableAxis = helpers.randomise(100);
			// const coordinates = [
			// 	{ // Top.
			// 		x: variableAxis,
			// 		y: 0
			// 	},
			// 	{ // Right.
			// 		x: 100,
			// 		y: variableAxis
			// 	},
			// 	{ // Bottom.
			// 		x: variableAxis,
			// 		y: 100
			// 	},
			// 	{ // Left.
			// 		x: 0,
			// 		y: variableAxis
			// 	}
			// ];
			//
			// return coordinates[plane];
	
			var x = helpers.randomise({ max: 100 });
			var y = 0;
	
			return { x: x, y: y };
		},
		    calcHue = function calcHue() {
	
			return helpers.randomise({ max: 360 });
		},
		    calcRotation = function calcRotation() {
	
			var i = helpers.randomise({ max: 3 });
	
			return 90 * i;
		};
	
		return {
			init: init
		};
	}();

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
	
		var boolean = function boolean() {
	
			return randomise({ max: 1 }) % 2 === 0 ? false : true;
		},
		    randomise = function randomise(_ref) {
			var _ref$min = _ref.min;
			var min = _ref$min === undefined ? 0 : _ref$min;
			var max = _ref.max;
	
	
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};
	
		return {
			boolean: boolean,
			randomise: randomise
		};
	}();

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
	
		var init = function init(data) {
	
			return '<div class="pattern__segment"\n\t\t\t\t  style="background: hsl(' + data.hue + ', 50%, 50%)">\n\t\t\t\t<div class="pattern__flip">\n\t\t\t\t\t<div class="pattern__rotate pattern__rotate--' + data.rotation + '">\n\t\t\t\t\t\t' + compiledSvgs(data.path) + '\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>';
	
			// <line stroke-miterlimit="10" x1="100" y1="100" x2="61.8" y2="0"/>
			// points="100,100 80.9,68 90.5,47 47,38.5 65.5,15.5 64.5,0 "
		},
		    compiledSvgs = function compiledSvgs(path) {
	
			var svg = generateSvg(path);
			var html = '';
	
			for (var i = 0; i < 4; i += 1) {
				html += svg;
			}return html;
		},
		    generateSvg = function generateSvg(path) {
	
			return '<svg class="pattern__svg"\n\t\t\t\t  style="stroke-width:2px;stroke:red;fill:transparent;"\n\t\t\t\t  version="1.0"\n\t\t\t\t  xmlns="http://www.w3.org/2000/svg"\n\t\t\t\t  xmlns:xlink="http://www.w3.org/1999/xlink"\n\t\t\t\t  viewBox="0 0 100 100"\n\t\t\t\t  x="0px"\n\t\t\t\t  y="0px">\n\t\t\t\t  <polyline stroke-miterlimit="10" points="' + calcPoints(path) + '"/>\n\n\t\t\t</svg>';
		},
		    calcPoints = function calcPoints(path) {
	
			var points = '';
	
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;
	
			try {
				for (var _iterator = path[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var coordinates = _step.value;
					points += coordinates.x + ',' + coordinates.y + ' ';
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
	
			return points;
		};
	
		return {
			init: init
		};
	}();

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
	
		var size = 2,
		    init = function init(segment) {
	
			return '<div class="pattern pattern--thumbnail">\n\t\t\t\t' + generateRows(segment) + '\n\t\t\t</div>';
		},
		    generateRows = function generateRows(segment) {
	
			var html = '';
	
			for (var i = 0; i < size; i += 1) {
	
				html += '<div class="pattern__row">\n\t\t\t\t\t' + generateSegments(segment) + '\n\t\t\t\t</div>';
			}
	
			return html;
		},
		    generateSegments = function generateSegments(segment) {
	
			var html = '';
	
			for (var i = 0; i < size; i += 1) {
				html += segment;
			}return html;
		};
	
		return {
			init: init
		};
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map