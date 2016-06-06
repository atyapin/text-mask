!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.textMask=t(require("react")):e.textMask=t(e.React)}(this,function(e){return function(e){function t(n){if(r[n])return r[n].exports;var a=r[n]={exports:{},id:n,loaded:!1};return e[n].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.convertMaskToPlaceholder=t.conformToMask=t.MaskedInput=void 0;var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o=r(2);Object.defineProperty(t,"conformToMask",{enumerable:!0,get:function(){return n(o).default}});var i=r(1);Object.defineProperty(t,"convertMaskToPlaceholder",{enumerable:!0,get:function(){return i.convertMaskToPlaceholder}});var s=r(6),u=n(s),l=r(5),c=t.MaskedInput=u.default.createClass({displayName:"MaskedInput",propTypes:{mask:s.PropTypes.string.isRequired,guide:s.PropTypes.bool,value:s.PropTypes.oneOfType([s.PropTypes.string,s.PropTypes.number])},getInitialState:function(){var e=this.props,t=e.value,r=e.mask,n=e.guide,a=e.placeholderCharacter,o=e.validator;return(0,l.getComponentInitialState)({inputValue:t,mask:r,validator:o,guide:n,placeholderChar:a})},componentDidUpdate:function(){(0,l.safeSetSelection)(this.inputElement,this.adjustedCaretPosition)},render:function(){var e=this,t=this.props,r=this.onChange,n=this.state,o=n.componentPlaceholder,i=n.value,s=this.conformedInput,c=t.placeholder,d=void 0===c?o:c,p=t.type,h=void 0===p?"text":p,f=t.value,v=void 0===f?"":f,g=t.mask,m=t.validator,C=t.guide,k=t.placeholderCharacter,y=(0,l.processComponentChanges)({userInput:v||i,placeholder:o,previousConformedInput:s,mask:g,validator:m,guide:C,placeholderChar:k,currentCaretPosition:void 0!==this.inputElement?this.inputElement.selectionStart:0}),b=y.conformedInput,P=y.adjustedCaretPosition;return this.adjustedCaretPosition=P,this.conformedInput=b,u.default.createElement("input",a({},t,{type:h,onChange:r,value:b,placeholder:d,ref:function(t){return e.inputElement=t}}))},onChange:function(e){"string"!=typeof this.props.value&&this.setState({value:e.target.value}),"function"==typeof this.props.onChange&&this.props.onChange(e)}});t.default=c},function(e,t,r){"use strict";function n(e){var t=e.mask,r=void 0===t?"":t,n=e.placeholderChar,a=void 0===n?h.placeholderCharacter:n;if(-1!==r.indexOf(a))throw console.log("Text Mask received placeholder character: ",a),console.log("Text Mask received mask: ",r),new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.");for(var o=!1,i="",s=0;s<r.length;s++){var u=r[s];"\\"!==u||o===!0?o!==!0?i+=-1!==h.maskingCharacters.indexOf(u)?a:u:(o=!1,i+=u):(o=!0,i+="")}return i}function a(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];return e.replace(/\\./g," ")}function o(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];return e.split("")}function i(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=arguments[1];switch(t){case h.maskingCharactersEnums.numeric:return u(e);case h.maskingCharactersEnums.uppercase:case h.maskingCharactersEnums.lowercase:case h.maskingCharactersEnums.alphabetic:return l(e);case h.maskingCharactersEnums.alphanumeric:return u(e)||l(e);case h.maskingCharactersEnums.any:return!0;default:return!1}}function s(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=arguments[1];switch(t){case h.maskingCharactersEnums.uppercase:return e.toUpperCase();case h.maskingCharactersEnums.lowercase:return e.toLowerCase();default:return e}}function u(e){return!isNaN(e)&&" "!==e}function l(e){return/^[a-zA-Z]+$/.test(e)}function c(e,t){for(var r=e.length>t.length?e.length:t.length,n=0;r>n;n++)if(e[n]!==t[n])return n;return null}function d(e){return"string"==typeof e||e instanceof String}function p(e){return e&&void 0===e.length&&!isNaN(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.convertMaskToPlaceholder=n,t.unescapeMask=a,t.tokenize=o,t.isAcceptableCharacter=i,t.potentiallyTransformCharacter=s,t.getIndexOfFirstChange=c,t.isString=d,t.isNumber=p;var h=r(3)},function(e,t,r){"use strict";function n(){for(var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=arguments.length<=1||void 0===arguments[1]?"":arguments[1],r=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],n=r.guide,s=void 0===n?!0:n,u=r.previousConformedInput,l=void 0===u?"":u,c=r.placeholderChar,d=void 0===c?i.placeholderCharacter:c,p=r.validator,h=void 0===p?a:p,f=(0,o.convertMaskToPlaceholder)({mask:t,placeholderChar:d}),v=s===!1&&void 0!==l,g=(0,o.getIndexOfFirstChange)(l,e),m=e.length-l.length,C=(0,o.tokenize)(e),k=v&&!(e.length<l.length),y=(0,o.unescapeMask)(t),b=0,P=0;P<f.length&&C.length>0;P++){var M=P>=g&&""!==l,T=(M?P+m:P)-b;f[P]===C[T]&&C[T]!==d&&(C.splice(T,1),b++)}var I="";e:for(var x=0;x<f.length;x++){var j=f[x];if(j===d){if(C.length>0)for(;C.length>0;){var E=C.shift();if(E===d&&v!==!0){I+=d;continue e}if((0,o.isAcceptableCharacter)(E,y[x])){I+=(0,o.potentiallyTransformCharacter)(E,y[x]);continue e}}v===!1&&(I+=f.substr(x,f.length));break}I+=j}if(v&&k===!1){for(var O=null,_=0;_<I.length;_++)f[_]===d&&(O=_);I=null!==O?I.substr(0,O+1):""}return{output:h(I)?I:l,meta:{input:e,mask:t,guide:s,placeholderChar:d,placeholder:f}}}function a(){return!0}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n;var o=r(1),i=r(3)},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.maskingCharactersEnums={numeric:"1",alphabetic:"A",alphanumeric:"?",uppercase:"U",lowercase:"L",any:"*"},t.maskingCharactersWithDescription={1:"Any number",A:"Any letter","?":"Any number or letter",U:"Any letter (will be transformed to uppercase)",L:"Any letter (will be transformed to lowercase)","*":"Any character"},t.maskingCharacters=["1","A","?","U","L","*"],t.placeholderCharacter="_"},function(e,t,r){"use strict";function n(e){var t=e.previousConformedInput,r=void 0===t?"":t,n=e.conformToMaskResults,o=void 0===n?{}:n,i=e.currentCaretPosition,s=void 0===i?0:i;if(0===s)return 0;var u=o.output,l=void 0===u?"":u,c=o.meta,d=void 0===c?{}:c,p=d.input,h=void 0===p?"":p,f=d.placeholderChar,v=d.placeholder,g=(0,a.getIndexOfFirstChange)(r,h),m=g-s>1;if(m)return s;var C=!(h.length<r.length),k=Math.abs(r.length-h.length)>1,y=1===h.length,b=k&&!C&&!y,P=C&&(r===l||l===v),M=""===r&&l===v,T=k||y?l:v,I=v[g]!==f,x=s;if(b)return s;if(k||y)x=0;else if(P)x--;else if(C)for(var j=s;j<v.length;j++){var E=I&&!M;if(v[j]===f){x=j+(E?1:0);break}}if(C||y){for(var O=x;O<=T.length;O++)if(T[O]===f||O===T.length)return O>l.length?l.length:O}else for(var _=x;_>=0;_--)if(T[_-1]===f||0===_)return _}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n;var a=r(1)},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e){var t=e.userInput,r=void 0===t?"":t,n=(e.placeholder,e.previousConformedInput),a=void 0===n?"":n,o=e.mask,i=void 0===o?"":o,s=e.guide,u=void 0===s?"":s,c=e.validator,p=e.currentCaretPosition,h=void 0===p?0:p,f=e.placeholderChar,v=(0,d.default)(r,i,{previousConformedInput:a,guide:u,placeholderChar:f,validator:c}),g=v.output,m=(0,l.default)({previousConformedInput:a,conformToMaskResults:v,currentCaretPosition:h,placeholderChar:f}),C=0===m&&""===r,k=C?"":g;return{conformedInput:k,adjustedCaretPosition:m}}function o(e){var t=e.inputValue,r=e.mask,n=e.validator,a=e.guide,o=e.placeholderChar,i=s(t),u=i.length>0,l={validator:n,guide:a,previousConformedInput:"",placeholderChar:o},c=u?(0,d.default)(i,r,l):{output:""},h=c.output;return{conformedInput:h,adjustedCaretPosition:0,componentPlaceholder:(0,p.convertMaskToPlaceholder)({mask:r,placeholderChar:o})}}function i(e,t){document.activeElement===e&&e.setSelectionRange(t,t,"none")}function s(e){if((0,p.isString)(e))return e;if((0,p.isNumber)(e))return String(e);if(void 0===e||null===e)return"";throw console.log("Text Mask received",e),new Error("The `value` provided to Text Mask needs to be a string or a number.")}Object.defineProperty(t,"__esModule",{value:!0}),t.processComponentChanges=a,t.getComponentInitialState=o,t.safeSetSelection=i;var u=r(4),l=n(u),c=r(2),d=n(c),p=r(1)},function(t,r){t.exports=e}])});