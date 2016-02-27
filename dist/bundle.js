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
	var hamToastie = __webpack_require__(5);
	
	{
	
	    var thumbnails = document.getElementById('thumbnails');
	
	    for (var i = 0; i < 1; i += 1) {
	
	        var data = hamToastie.randomise.init();
	        var segment = hamToastie.segment.init(data);
	        var thumbnail = hamToastie.layout.init({ segment: segment, x: 20, y: 6, transition: true });
	
	        thumbnails.innerHTML += thumbnail;
	    }
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomise = __webpack_require__(6);
	var segment = __webpack_require__(8);
	var layout = __webpack_require__(9);
	
	module.exports = { randomise: randomise, segment: segment, layout: layout };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var helpers = __webpack_require__(7);
	
	module.exports = function () {
	
		var size = 100,
		    init = function init() {
	
			var path = buildPath();
			var hue = calcHue();
			var saturation = calcPercentage({ min: 60, max: 100, seperate: 40 });
			var luminosity = calcPercentage({ min: 40, max: 60, seperate: 40 });
			var width = calcWidth();
			var rotation = calcRotation();
	
			return { path: path, hue: hue, saturation: saturation, luminosity: luminosity, width: width, rotation: rotation };
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
	
			var x = helpers.randomise({ max: 100 });
			var y = 0;
	
			return { x: x, y: y };
		},
		    calcHue = function calcHue() {
	
			return helpers.randomise({ max: 360 });
		},
		    calcPercentage = function calcPercentage(_ref) {
			var min = _ref.min;
			var max = _ref.max;
			var seperate = _ref.seperate;
	
	
			var one = helpers.randomise({ min: min, max: max - seperate });
			var two = helpers.randomise({ min: one + seperate, max: max });
			var swap = helpers.boolean();
	
			return {
				background: swap ? two : one,
				path: swap ? one : two
			};
		},
		    calcWidth = function calcWidth() {
	
			var min = 2;
			var max = 5;
	
			return helpers.randomise({ min: min, max: max * 10 }) / 10;
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
/* 7 */
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
		},
		    hsl = function hsl(data) {
			var type = arguments.length <= 1 || arguments[1] === undefined ? 'background' : arguments[1];
	
	
			return 'hsl(' + data.hue + ', ' + data.saturation[type] + '%, ' + data.luminosity[type] + '%)';
		};
	
		return {
			boolean: boolean,
			randomise: randomise,
			hsl: hsl
		};
	}();

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var helpers = __webpack_require__(7);
	
	module.exports = function () {
	
		var init = function init(data) {
	
			return '<div class="pattern__segment"\n\t\t\t\t  style=""\n\t\t\t\t  data-background="' + helpers.hsl(data) + '">\n\t\t\t\t<div class="pattern__flip">\n\t\t\t\t\t<div class="pattern__rotate pattern__rotate--' + data.rotation + '">\n\t\t\t\t\t\t' + compiledSvgs(data) + '\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>'
	
			// <script></script>
			// data-json="serialiseJson"
			;
		},
		    compiledSvgs = function compiledSvgs(path) {
	
			var svg = generateSvg(path);
			var html = '';
	
			for (var i = 0; i < 4; i += 1) {
				html += svg;
			}return html;
		},
		    generateSvg = function generateSvg(data) {
	
			return '<svg class="pattern__svg"\n\t\t\t\t  style="stroke-width:' + data.width + 'px; stroke:' + helpers.hsl(data, 'path') + '; fill:transparent;"\n\t\t\t\t  version="1.0"\n\t\t\t\t  xmlns="http://www.w3.org/2000/svg"\n\t\t\t\t  xmlns:xlink="http://www.w3.org/1999/xlink"\n\t\t\t\t  viewBox="0 0 100 100"\n\t\t\t\t  x="0px"\n\t\t\t\t  y="0px">\n\t\t\t\t  <polyline stroke-miterlimit="10" points="' + calcPoints(data.path) + '"/>\n\n\t\t\t</svg>';
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
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
	
		var init = function init(_ref) {
			var segment = _ref.segment;
			var _ref$modifier = _ref.modifier;
			var modifier = _ref$modifier === undefined ? 'thumbnail' : _ref$modifier;
			var _ref$x = _ref.x;
			var x = _ref$x === undefined ? 6 : _ref$x;
			var _ref$y = _ref.y;
			var y = _ref$y === undefined ? 6 : _ref$y;
			var _ref$transition = _ref.transition;
			var transition = _ref$transition === undefined ? false : _ref$transition;
	
	
			return '<div class="pattern pattern--' + modifier + ' pattern--xAxis' + x + ' pattern--yAxis' + y + ' pattern--' + transition + 'Transition"\n\t\t\t\t  style="background: ' + extractBackground(segment) + '; padding-top: ' + calcHeight(x, y) + '%;">\n\t\t\t\t<div class="pattern__wrapper">\n\t\t\t\t\t' + generateRows(calcSegmentSize(segment, x), x, y) + '\n\t\t\t\t</div>\n\t\t\t</div>';
		},
		    extractBackground = function extractBackground(segment) {
	
			var refStart = 'data-background="';
			var refEnd = '"';
	
			var cutStart = segment.indexOf(refStart) + refStart.length;
			segment = segment.substr(cutStart);
			var cutEnd = segment.indexOf(refEnd);
	
			return segment.substr(0, cutEnd).trim();
		},
		    calcHeight = function calcHeight(x, y) {
	
			return y / x * 100;
		},
		    calcSegmentSize = function calcSegmentSize(segment, x) {
	
			var refStart = 'style="';
			var cut = segment.indexOf(refStart) + refStart.length;
			var size = 100 / x;
	
			return segment.substr(0, cut) + 'padding-top:' + size + '%; width:' + size + '%;' + segment.substr(cut + 1);
		},
		    generateRows = function generateRows(segment, x, y) {
	
			var html = '';
	
			for (var i = 0; i < y; i += 1) {
	
				html += '<div class="pattern__row">\n\t\t\t\t\t' + generateSegments(segment, x) + '\n\t\t\t\t</div>';
			}
	
			return html;
		},
		    generateSegments = function generateSegments(segment, x) {
	
			var html = '';
	
			for (var i = 0; i < x; i += 1) {
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