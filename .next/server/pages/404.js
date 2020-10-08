module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/404.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/layouts/notfoundLayout.js":
/*!**************************************************!*\
  !*** ./src/components/layouts/notfoundLayout.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\nconst notfoundLayout = ({\n  children,\n  pageProps\n}) => __jsx(\"div\", {\n  id: \"layout\",\n  className: \"layout\"\n}, __jsx(\"div\", {\n  id: \"main\",\n  className: \"main\"\n}, children));\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (notfoundLayout);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9sYXlvdXRzL25vdGZvdW5kTGF5b3V0LmpzP2U3NTkiXSwibmFtZXMiOlsibm90Zm91bmRMYXlvdXQiLCJjaGlsZHJlbiIsInBhZ2VQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsTUFBTUEsY0FBYyxHQUFHLENBQUM7QUFBQ0MsVUFBRDtBQUFXQztBQUFYLENBQUQsS0FDdkI7QUFBSyxJQUFFLEVBQUMsUUFBUjtBQUFpQixXQUFTLEVBQUM7QUFBM0IsR0FFSTtBQUFLLElBQUUsRUFBQyxNQUFSO0FBQWUsV0FBUyxFQUFDO0FBQXpCLEdBQ0tELFFBREwsQ0FGSixDQURBOztBQVVlRCw2RUFBZiIsImZpbGUiOiIuL3NyYy9jb21wb25lbnRzL2xheW91dHMvbm90Zm91bmRMYXlvdXQuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuY29uc3Qgbm90Zm91bmRMYXlvdXQgPSAoe2NoaWxkcmVuLCBwYWdlUHJvcHN9KSA9PiAoXG48ZGl2IGlkPVwibGF5b3V0XCIgY2xhc3NOYW1lPVwibGF5b3V0XCI+XG4gICAgXG4gICAgPGRpdiBpZD1cIm1haW5cIiBjbGFzc05hbWU9XCJtYWluXCI+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cblxuPC9kaXY+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IG5vdGZvdW5kTGF5b3V0O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/layouts/notfoundLayout.js\n");

/***/ }),

/***/ "./src/pages/404.js":
/*!**************************!*\
  !*** ./src/pages/404.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_layouts_notfoundLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/layouts/notfoundLayout */ \"./src/components/layouts/notfoundLayout.js\");\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n // pages/404.js\n\nfunction Custom404() {\n  return __jsx(\"h1\", null, \"404 - Page Not Found\");\n}\n\nCustom404.Layout = _components_layouts_notfoundLayout__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n/* harmony default export */ __webpack_exports__[\"default\"] = (Custom404);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvNDA0LmpzP2MzNjkiXSwibmFtZXMiOlsiQ3VzdG9tNDA0IiwiTGF5b3V0Iiwibm90Zm91bmRMYXlvdXQiXSwibWFwcGluZ3MiOiI7Ozs7OztDQUVBOztBQUNDLFNBQVNBLFNBQVQsR0FBcUI7QUFDbEIsU0FBTyx5Q0FBUDtBQUNEOztBQUVEQSxTQUFTLENBQUNDLE1BQVYsR0FBbUJDLDBFQUFuQjtBQUNlRix3RUFBZiIsImZpbGUiOiIuL3NyYy9wYWdlcy80MDQuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbm90Zm91bmRMYXlvdXQgZnJvbSBcIi4uL2NvbXBvbmVudHMvbGF5b3V0cy9ub3Rmb3VuZExheW91dFwiXG5cbi8vIHBhZ2VzLzQwNC5qc1xuIGZ1bmN0aW9uIEN1c3RvbTQwNCgpIHtcbiAgICByZXR1cm4gPGgxPjQwNCAtIFBhZ2UgTm90IEZvdW5kPC9oMT5cbiAgfVxuXG4gIEN1c3RvbTQwNC5MYXlvdXQgPSBub3Rmb3VuZExheW91dFxuICBleHBvcnQgZGVmYXVsdCBDdXN0b200MDQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/404.js\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ })

/******/ });