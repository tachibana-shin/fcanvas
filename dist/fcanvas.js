!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).fcanvas={})}(this,(function(t){"use strict";const e=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(t){return setTimeout(t,100/6)},i=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||function(t){clearTimeout(t)},s="ontouchstart"in window||"onmsgesturechange"in window;let n=!1;function r(){}try{let t=Object.defineProperty({},"passive",{get:()=>(n=!0,!1)});window.addEventListener("testPassive",r,t),window.removeEventListener("testPassive",r,t)}catch{n=!1}const o=n,h={windowWidth:{get:()=>window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth},windowHeight:{get:()=>window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}};function a(t){return null==t?"null":t.replace(/^\s+|\s+$/g,"")}function c(t){const e=t.split(" ");return 2===e.length?{size:parseFloat(e[0]),family:a(e[1]),weight:"normal"}:{size:parseFloat(e[1]),family:a(e[2]),weight:a(e[0])}}function u(t,e,i){if("string"!=typeof t)return parseFloat(t+"");{t=a(t);const s=parseFloat(t);switch(t.match(/[a-z%]+$/i)?.[1]||"px"){case"px":return s;case"em":return(i||0)*s;case"rem":return 16*(i||0);case"vw":return h.windowWidth.get()*s/100;case"vh":return h.windowHeight.get()*s/100;case"vmin":return Math.min(h.windowWidth.get(),h.windowHeight.get())*s/100;case"vmax":return Math.max(h.windowWidth.get(),h.windowHeight.get())*s/100;case"%":return e/100*s;default:return+s}}}function l(t,e){const i=t.getBoundingClientRect(),s=t.scrollWidth/t.width||1,n=t.scrollHeight/t.height||1,r=[],o=e.length;let h,a=0;for(;a<o;)h=e[a++],r.push({x:(h.clientX-i.left)/s,y:(h.clientY-i.top)/n,winX:h.clientX,winY:h.clientY,id:h.identifier});return r}function d(){const t="undefined"==typeof navigator?"":navigator.userAgent||navigator.vendor;return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(t.substr(0,4))}function m(t){return"number"==typeof t?t:parseFloat(`${t}`)}function _(t,e,i){return i.addEventListener(t,e),()=>{i.removeEventListener(t,e)}}class f{constructor(){this.__events=Object.create(null)}on(t,e){return"function"==typeof e&&(t in this.__events?this.__events[t].push(e):this.__events[t]=[e]),()=>{this.off(t,e)}}off(t,e){"function"==typeof e?(this.__events[t]=this.__events[t].filter((t=>t!==e)),0===this.__events[t].length&&delete this.__events[t]):delete this.__events[t]}emit(t,...e){if(t in this.__events)for(let i=this.__events[t].length-1;i>-1;i--)this.__events[t][i](...e)}once(t,e){const i=(...s)=>{e(...s),this.off(t,i)};this.on(t,i)}}function w(t,e,i=[]){if(null!==t&&"object"==typeof t)if(Array.isArray(t))t.__reactive||(["push","pop","shift","unshift","splice"].forEach((s=>{const n=t[s];Object.defineProperty(t,s,{writable:!1,enumerable:!1,configurable:!0,value(){const t=n.apply(this,arguments);return e([...i],this,t),t}})})),Object.defineProperty(t,"__reactive",{writable:!1,enumerable:!1,configurable:!0,value:!0})),t.forEach(((t,s)=>{null!==t&&"object"==typeof t&&w(t,e,[...i,s+""])}));else{t.__reactive?t.__store={...t}:(Object.defineProperty(t,"__store",{writable:!0,enumerable:!1,configurable:!0,value:{...t}}),Object.defineProperty(t,"__reactive",{writable:!1,enumerable:!1,configurable:!0,value:!0}));for(const s in t)Object.defineProperty(t,s,{get:()=>t.__store?.[s],enumerable:!0,set(n){const r=t.__store?.[s];t.__store&&(t.__store[s]=n),w(n,e,[...i,s]),e([...i,s],r,n)}}),w(t[s],e,[...i,s])}}class g{constructor(t){this.__emitter=new f;for(const e in t)this[e]=t[e];w(this,((t,e,i)=>{this.__emitter.emit(t.join("."),e,i)}))}$set(t,e,i){t[e]=i,w(t,((t,e,i)=>{this.__emitter.emit(t.join("."),e,i)})),t[e]=i}$watch(t,e){return this.__emitter.on(t,e)}}function x(t,e,i){return 0!==t&&(i.x=i.x%t),0!==e&&(i.y=i.y%e),i}function p(t,e,i,s){return 0!==t&&(s.x=s.x%t),0!==e&&(s.y=s.y%e),0!==i&&(s.z=s.z%i),s}class v{constructor(t=0,e=0,i=0){[this.x,this.y,this.z]=[t,e,i]}set(t,e,i){return t instanceof v?(this.x=t.x||0,this.y=t.y||0,this.z=t.z||0,this):t instanceof Array?(this.x=t[0]||0,this.y=t[1]||0,this.z=t[2]||0,this):(this.x=t||0,this.y=e||0,this.z=i||0,this)}copy(){return new v(this.x,this.y,this.z)}add(t,e,i){return t instanceof v?(this.x+=t.x||0,this.y+=t.y||0,this.z+=t.z||0,this):t instanceof Array?(this.x+=t[0]||0,this.y+=t[1]||0,this.z+=t[2]||0,this):(this.x+=t||0,this.y+=e||0,this.z+=i||0,this)}rem(t){if(t instanceof v)Number.isFinite(t.x)&&Number.isFinite(t.y)&&Number.isFinite(t.z)&&p(t.x,t.y,t.z,this);else if(t instanceof Array)t.every((function(t){return Number.isFinite(t)}))&&(2===t.length&&x(t[0],t[1],this),3===t.length&&p(t[0],t[1],t[2],this));else if(1===arguments.length)Number.isFinite(arguments[0])&&0!==arguments[0]&&(this.x=this.x%arguments[0],this.y=this.y%arguments[0],this.z=this.z%arguments[0]);else if(2===arguments.length){const t=[].slice.call(arguments);t.every((function(t){return Number.isFinite(t)}))&&2===t.length&&x(t[0],t[1],this)}else if(3===arguments.length){var e=[].slice.call(arguments);e.every((function(t){return Number.isFinite(t)}))&&3===e.length&&p(e[0],e[1],e[2],this)}}sub(t,e,i){return t instanceof v?(this.x-=t.x||0,this.y-=t.y||0,this.z-=t.z||0,this):t instanceof Array?(this.x-=t[0]||0,this.y-=t[1]||0,this.z-=t[2]||0,this):(this.x-=t||0,this.y-=e||0,this.z-=i||0,this)}mult(t){return this.x*=t,this.y*=t,this.z*=t,this}div(t){return 0===t?(console.warn("div:","divide by 0"),this):(this.x/=t,this.y/=t,this.z/=t,this)}mag(){return Math.sqrt(this.magSq())}magSq(){const{x:t,y:e,z:i}=this;return t*t+e*e+i*i}dot(t,e,i){return t instanceof v?this.dot(t.x,t.y,t.z):this.x*(t||0)+this.y*(e||0)+this.z*(i||0)}cross(t){return new v(this.y*t.z-this.z*t.y,this.z*t.x-this.x*t.z,this.x*t.y-this.y*t.x)}normalize(){const t=this.mag();return 0!==t&&this.mult(1/t),this}limit(t){const e=this.magSq();return e>t**2&&this.div(Math.sqrt(e)).mult(t),this}setMag(t){return this.normalize().mult(t)}heading(){return Math.atan2(this.y,this.x)}rotate(t){const e=this.heading()+t,i=this.mag();return this.x=Math.cos(e)*i,this.y=Math.sin(e)*i,this}angleBetween(t){const e=this.dot(t)/(this.mag()*t.mag());return Math.acos(Math.min(1,Math.max(-1,e)))*Math.sign(this.cross(t).z||1)}lerp(t=0,e=0,i=0,s=0){return t instanceof v?this.lerp(t.x,t.y,t.z,e):(this.x+=(t-this.x)*s||0,this.y+=(e-this.y)*s||0,this.z+=(i-this.z)*s||0,this)}reflect(t){return t.normalize(),this.sub(t.mult(2*this.dot(t)))}array(){return[this.x||0,this.y||0,this.z||0]}equals(t,e,i){let s,n,r;return t instanceof v?(s=t.x||0,n=t.y||0,r=t.z||0):t instanceof Array?(s=t[0]||0,n=t[1]||0,r=t[2]||0):(s=t||0,n=e||0,r=i||0),this.x===s&&this.y===n&&this.z===r}toString(){return"Vector: ["+this.array().join(", ")+"]"}}function y(t,e,i,s,n,r=3){return function(t,e,i,s,n,r){switch(t){case"ease":return(e/=n/2)<1?s/2*Math.pow(e,r)+i:(e-=2,s/2*(Math.pow(e,r)+2)+i);case"quadratic":return(e/=n/2)<=1?s/2*e*e+i:s/2*-1*(--e*(e-2)-1)+i;case"sine-ease-in-out":return-s/2*(Math.cos(Math.PI*e/n)-1)+i;case"quintic-ease":return(e/=n/2)<1?s/2*Math.pow(e,5)+i:(e-=2,s/2*(Math.pow(e,5)+2)+i);case"exp-ease-in-out":return(e/=n/2)<1?s/2*Math.pow(2,10*(e-1))+i:(e--,s/2*(2-Math.pow(2,-10*e))+i);case"linear":return i+s/n*e}}(t,s,e,i-e,n,r)}function $(t){if(Array.isArray(t)){let e={};t.forEach(((t,i)=>{e[`${i}`]=t})),t=e}return t}function b(...t){let e,i,s;return"length"in t[0]||null!==t[0]&&"object"==typeof t[0]?(e=t[0],[s,i]=function(t){const e=t.findIndex((t=>"string"==typeof t));return e>-1?[t[e],+t[0===e?1:0]]:[t[1],+t[0]]}(t.slice(1))):e=$(t),[e,i,s]}function M(t,e,i){return null!=e&&null!=i&&(e-t.x)**2+(i-t.y)**2<t.radius**2}function B(t,e,i){return Math.min(Math.max(e,t),i)}function z(t){const e=new Image;return e.src=t,new Promise(((t,i)=>{e.addEventListener("load",(function i(){t(e),e.removeEventListener("load",i)})),e.addEventListener("error",(function t(s){i(s),e.removeEventListener("error",t)}))}))}function E(...t){return 1===t.length?null!==t[0]&&"object"==typeof t[0]&&"length"in t[0]?t[0][Math.floor(Math.random()*t[0].length)]:Math.random()*t[0]:2===t.length?t[0]+Math.random()*(t[1]-t[0]):void 0}function C(t,e,i){return null!=e&&null!=i&&(t.x<e&&t.x+t.width>e&&t.y<i&&t.y+t.height>i)}const N="function"==typeof Math.hypot?Math.hypot:(...t)=>{const e=t.length;let i=0,s=0;for(;i<e;)s+=Math.pow(t[i++],2);return Math.sqrt(s)};let I;function k(t,e=0,i=0,s=m(`${t.width}`),n=m(`${t.height}`),r=0){void 0===I&&(I=document.createElement("canvas").getContext("2d"));const o=r*Math.PI/180,[h,a]=function(t,e,i){return[Math.abs(t*Math.cos(i))+Math.abs(e*Math.sin(i)),Math.abs(t*Math.sin(i))+Math.abs(e*Math.cos(i))]}(s,n,o);I.canvas.width=s,I.canvas.height=n,I.save(),I.translate(s/2,n/2),I.rotate(r*Math.PI/180),I.drawImage(t,e,i,h,a,-h/2,-a/2,h,a),I.restore();const c=new Image;return c.src=I.canvas.toDataURL(),I.clearRect(0,0,s,n),c}class R{constructor(){this.__store=new g}on(t,e){if(this.__store[t])e();else{const i=this.__store.$watch(t,(()=>{e(),i()}))}}emit(t){this.__store.$set(this.__store,t,!0)}}function A(t){const e=t.textContent;let i=t.nextElementSibling;if(null==i)throw new Error("fCanvas<addons/loadResourceImage>: Error because syntax error in file plist.");if("dict"===i.tagName){let t={};return Array.from(i.childNodes).filter((t=>"key"===t.tagName)).forEach((e=>{t={...t,...A(e)}})),{[e]:t}}if("array"===i.tagName){let t=[];return Array.from(i.childNodes).filter((t=>"key"===t.tagName)).forEach((e=>{t.push(A(e))})),{[e]:t}}return"string"===i.tagName?{[e]:i.textContent}:"integer"===i.tagName?{[e]:parseInt(i.textContent)}:"float"===i.tagName?{[e]:parseFloat(i.textContent)}:"true"===i.tagName?{[e]:!0}:"false"===i.tagName?{[e]:!1}:{}}class P{constructor(t,e){this.__caching=Object.create(null),this.image=t,this.plist=e}get(t){const{frame:e,rotated:i,sourceSize:s}=this.plist.frames[t],n=e.replace(/\{|\}|\s/g,"").split(","),r=s.replace(/\{|\}|\s/g,"").split(",");t in this.__caching==!1&&(this.__caching[t]=k(this.image,+n[0],+n[1],+n[2],+n[3],i?-90:0));return Object.assign(this.__caching[t],{image:this.__caching[t],size:{width:+r[0],height:+r[1]}})}has(t){return t in this.plist.frames}}class V{constructor(t){this.__autodraw=!0,this._els=Object.create(null),this._idActiveNow=-1,this._queue=[],t?.constructor!==S&&(t=Y),this.__addEl(t)}__addEl(t){t.id in this._els==!1&&(this._els[t.id]=t)}get $el(){return this.$parent.$el}_run(t){if(this.__addEl(t),this._idActiveNow=t.id,"function"==typeof this.update?(!0===this.__autodraw&&"function"==typeof this.draw&&this.draw(),this.update()):"function"==typeof this.draw&&this.draw(),this._queue.length>0){const{length:t}=this._queue;let e=0;for(;e<t;)this.run(this._queue[e]),e++}this._idActiveNow=-1}addQueue(t){this._queue.push(t)}getQueue(t){return t<0&&(t+=this._queue.length),this._queue[t]}run(t){this.$parent.run(t)}get $parent(){const t=this._els[-1===this._idActiveNow?0:this._idActiveNow];return t?.constructor===S?t:(console.warn("fCanvas: The current referenced version of the fCanvas.run function is incorrect."),this._els[0])}get $context2d(){return this.$parent.$context2d}sin(t){return this.$parent.sin(t)}asin(t){return this.$parent.asin(t)}cos(t){return this.$parent.cos(t)}acos(t){return this.$parent.asin(t)}tan(t){return this.$parent.tan(t)}atan(t){return this.$parent.atan(t)}atan2(t,e){return this.$parent.atan2(t,e)}get mouseX(){return this.$parent.mouseX}get mouseY(){return this.$parent.mouseY}get windowWidth(){return this.$parent.windowWidth}get windowHeight(){return this.$parent.windowHeight}fill(...t){this.$context2d.fillStyle=this.$parent._toRgb(t),this.$context2d.fill()}stroke(...t){this.$context2d.strokeStyle=this.$parent._toRgb(t),this.$context2d.stroke()}noFill(){this.fill(0,0,0,0)}lineWidth(t){if(void 0===t)return this.$context2d.lineWidth;this.$context2d.lineWidth=t}miterLimit(t){if(void 0===t)return this.$context2d.miterLimit;"miter"!==this.lineJoin()&&this.lineJoin("miter"),this.$context2d.miterLimit=t}shadowOffset(t,e){if(0===arguments.length)return{x:this.$context2d.shadowOffsetX,y:this.$context2d.shadowOffsetY};[this.$context2d.shadowOffsetX,this.$context2d.shadowOffsetY]=[t||0,e||0]}measureText(t){return this.$context2d.measureText(t).width}begin(){this.$context2d.beginPath()}close(){this.$context2d.closePath()}save(){this.$parent.save()}restore(){this.$parent.restore()}rotate(t){if(void 0===t)return this.$parent.rotate();this.$parent.rotate(t)}translate(t,e){if(0===arguments.length)return this.$parent.translate();this.$parent.translate(t,e)}arc(t,e,i,s,n,r){this.begin(),this.$context2d.arc(t,e,i,this.$parent._toRadius(s)-Math.PI/2,this.$parent._toRadius(n)-Math.PI/2,r),this.close()}pie(t,e,i,s,n,r){this.begin(),this.move(t,e),this.arc(t,e,i,s,n,r),this.to(t,e),this.close()}line(t,e,i,s){this.begin(),this.move(t,e),this.to(i,s),this.close()}ellipse(t,e,i,s,n,r,o){this.begin(),this.$context2d.ellipse(t,e,i,s,this.$parent._toRadius(n)-Math.PI/2,this.$parent._toRadius(r),o),this.close()}circle(t,e,i){this.arc(t,e,i,0,"degress"===this.$parent.angleMode()?360:2*Math.PI)}point(t,e){this.circle(t,e,1)}triange(t,e,i,s,n,r){this.begin(),this.move(t,e),this.to(i,s),this.to(n,r),this.close()}drawImage(t,...e){this.$context2d.drawImage(t,...e)}rect(t,e,i,s,n,r,o,h){if(this.begin(),[t,e]=this.$parent._figureOffset(t,e,i,s),arguments.length<5)this.$context2d.rect(t,e,i,s);else{const a=this.$parent.fontSize(),c=[u(n,i,a),u(r,s,a),u(o,i,a),u(h,s,a)];this.move(t,e),this.arcTo(t+i,e,t+i,e+s-c[1],c[1]),this.arcTo(t+i,e+s,t+i-c[2],e+s,c[2]),this.arcTo(t,e+s,t,e+s-c[3],c[3]),this.arcTo(t,e,t+i-c[0],e,c[0])}this.close()}quadratic(t,e,i,s){this.$context2d.quadraticCurveTo(t,e,i,s)}bezier(t,e,i,s,n,r){this.$context2d.bezierCurveTo(t,e,i,s,n,r)}move(t,e){this.$context2d.moveTo(t,e)}to(t,e){this.$context2d.lineTo(t,e)}fillText(t,e,i,s){this.$context2d.fillText(t,e,i,s)}strokeText(t,e,i,s){this.$context2d.strokeText(t,e,i,s)}fillRect(t,e,i,s){this.$context2d.fillRect(t,e,i,s)}strokeRect(t,e,i,s){this.$context2d.strokeRect(t,e,i,s)}lineDashOffset(t){if(void 0===t)return this.$context2d.lineDashOffset;this.$context2d.lineDashOffset=t}lineDash(...t){if(0===t.length)return this.$context2d.getLineDash();Array.isArray(t[0])&&this.$context2d.setLineDash(t[0]),this.$context2d.setLineDash(t)}arcTo(t,e,i,s,n){this.$context2d.arcTo(t,e,i,s,n)}isPoint(t,e){return this.$context2d.isPointInPath(t,e)}createImageData(t,e){return e?this.$parent.createImageData(t,e):this.$parent.createImageData(t)}getImageData(t,e,i,s){return this.$parent.getImageData(t,e,i,s)}putImageData(t,e,i,s,n,r,o){7===arguments.length?this.$parent.putImageData(t,e,i,s,n,r,o):this.$parent.putImageData(t,e,i)}createPattern(t,e){return this.$parent.createPattern(t,e)}createRadialGradient(t,e,i,s,n,r){return this.$parent.createRadialGradient(t,e,i,s,n,r)}createLinearGradient(t,e,i,s){return this.$parent.createLinearGradient(t,e,i,s)}lineJoin(t){if(void 0===t)return this.$context2d.lineJoin;this.$context2d.lineJoin=t}lineCap(t){if(void 0===t)return this.$context2d.lineCap;this.$context2d.lineCap=t}shadowBlur(t){if(void 0===t)return this.$context2d.shadowBlur;this.$context2d.shadowBlur=t}shadowColor(...t){this.$context2d.shadowColor=this.$parent._toRgb(t)}drawFocusIfNeeded(t,e){void 0===e?this.$context2d.drawFocusIfNeeded(t):this.$context2d.drawFocusIfNeeded(t,e)}}let D=!1;const L=new f;async function T(t){if("complete"===document.readyState){const e=t();e&&"length"in e&&await e,D=!0,L.emit("load")}else await new Promise((e=>{function i(){document.removeEventListener("DOMContentLoaded",i),window.removeEventListener("load",i),t(),e(),D=!0,L.emit("load")}document.addEventListener("DOMContentLoaded",i),window.addEventListener("load",i)}))}function X(t,i){!0===i.acceptClear&&i.clear(),t(),!0===i.acceptLoop&&e((()=>X(t,i)))}function j(t,e){D?e?X(t,e):t():L.once("load",(()=>{j(t,e)}))}class S{constructor(){this._ENV={angleMode:"degress",rectAlign:"left",rectBaseline:"top",colorMode:"rgb",rotate:0,clear:!0,loop:!0},this._id=S.count++,this._el=document.createElement("canvas"),this._context2dCaching=null,this._stamentReady=new R,this._existsPreload=!1,this.__translate={x:0,y:0,sumX:0,sumY:0},this.__scale={x:0,y:0,sumX:0,sumY:0},this.__idFrame=null,this.__attributeContext={alpha:!0,desynchronized:!1},this.preventTouch=!1,this.stopTouch=!1,this.touches=[],this.changedTouches=[];const t=t=>{try{"mouseout"!==t.type?(this.touches=l(this.$el,t.touches||[t]),this.changedTouches=l(this.$el,t.changedTouches||[t])):this.touches=[],this.preventTouch&&t.preventDefault(),this.stopTouch&&t.stopPropagation()}catch(t){}};this.$el.addEventListener(d()?"touchstart":"mouseover",t),this.$el.addEventListener(d()?"touchmove":"mousemove",t),this.$el.addEventListener(d()?"touchend":"mouseout",t)}get mouseX(){return this.touches[0]?.x||null}get mouseY(){return this.touches[0]?.y||null}get interact(){return this.touches.length>0}get id(){return this._id}get $el(){return this._el}_createNewContext2d(){this._context2dCaching=this.$el.getContext("2d",this.__attributeContext)}acceptBlur(){return this.__attributeContext.alpha}blur(){this.__attributeContext.alpha=!0,this._createNewContext2d()}noBlur(){this.__attributeContext.alpha=!1,this._createNewContext2d()}acceptDesync(){return this.__attributeContext.desynchronized}desync(){this.__attributeContext.desynchronized=!0,this._createNewContext2d()}noDesync(){this.__attributeContext.desynchronized=!1,this._createNewContext2d()}get $context2d(){return null===this._context2dCaching&&this._createNewContext2d(),this._context2dCaching}append(t=document.body){!1===t.contains(this.$el)&&t.appendChild(this.$el)}noClear(){this._ENV.clear=!1}get acceptClear(){return this._ENV.clear}run(t){t._run(this)}get width(){return this.$el.width}set width(t){this.$el.width=t}get height(){return this.$el.height}set height(t){this.$el.height=t}get windowWidth(){return h.windowWidth.get()}get windowHeight(){return h.windowHeight.get()}save(){this.$context2d.save()}restore(){this.$context2d.restore()}_toRadius(t){return"degress"===this._ENV.angleMode?t*Math.PI/180:t}_toDegress(t){return"radial"===this._ENV.angleMode?180*t/Math.PI:t}_toRgb([t=0,e=t,i=e,s=1]){if(Array.isArray(t))return this._toRgb(t);if("string"==typeof t)return t;{const n=this._ENV.colorMode.match(/hsl|hsb/i)?"%":"";return`${this._ENV.colorMode}a(${[t,e+n,i+n,s].join(",")})`}}_figureOffset(t,e,i,s){switch(this._ENV.rectAlign){case"center":t-=i/2;break;case"right":t-=i}switch(this._ENV.rectBaseline){case"middle":e-=s/2;break;case"bottom":e-=s}return[t,e]}angleMode(t){if(void 0===t)return this._ENV.angleMode;this._ENV.angleMode=t}rectAlign(t){if(void 0===t)return this._ENV.rectAlign;this._ENV.rectAlign=t}colorMode(t){if(void 0===t)return this._ENV.colorMode;this._ENV.colorMode=t}rectBaseline(t){if(void 0===t)return this._ENV.rectBaseline;this._ENV.rectBaseline=t}fontSize(t){const{size:e,weight:i,family:s}=c(this.font());if(void 0===t)return e;t=u(t,e,e),this.font([i,`${t}px`,s].join(" "))}fontFamily(t){const{size:e,weight:i,family:s}=c(this.font());if(void 0===t)return s;this.font([i,`${e}px`,t].join(" "))}fontWeight(t){const{size:e,weight:i,family:s}=c(this.font());if(void 0===t)return i;this.font([t,`${e}px`,s].join(" "))}clear(t=0,e=0,i=this.width,s=this.height){this.$context2d.clearRect(t,e,i,s)}background(...t){this.$context2d.fillStyle=this._toRgb(t),this.$context2d.fill(),this.$context2d.fillRect(0,0,this.width,this.height)}backgroundImage(t){this.$context2d.drawImage(t,0,0,this.width,this.height)}createImageData(t,e){return e?this.$context2d.createImageData(t,e):this.$context2d.createImageData(t)}getImageData(t,e,i,s){return this.$context2d.getImageData(t,e,i,s)}putImageData(t,e,i,s,n,r,o){7===arguments.length?this.$context2d.putImageData(t,e,i,s,n,r,o):this.$context2d.putImageData(t,e,i)}createPattern(t,e){return this.$context2d.createPattern(t,e)}createRadialGradient(t,e,i,s,n,r){return this.$context2d.createRadialGradient(t,e,i,s,n,r)}createLinearGradient(t,e,i,s){return this.$context2d.createLinearGradient(t,e,i,s)}toDataURL(t="image/png",e){return this.$el.toDataURL(t,e)}rotate(t){if(void 0===t)return this._ENV.rotate;this.$context2d.rotate(this._ENV.rotate=this._toRadius(t))}resetTransform(){this.setTransform(1,0,0,1,0,0)}createElement(t){return new class extends V{constructor(){super(...arguments),this.draw=t}}}async preload(t){this._existsPreload=!0,await t(),this._stamentReady.emit("preloaded")}async setup(t){this._existsPreload?this._stamentReady.on("preloaded",(async()=>{await T(t),this._stamentReady.emit("setuped")})):(await T(t),this._stamentReady.emit("setuped"))}draw(t){this._stamentReady.on("setuped",(()=>{j(t,this)}))}font(t){if(void 0===t)return this.$context2d.font;this.$context2d.font=t}textAlign(t){if(void 0===t)return this.$context2d.textAlign;this.$context2d.textAlign=t}textBaseline(t){if(void 0===t)return this.$context2d.textBaseline;this.$context2d.textBaseline=t}operation(t){if(void 0===t)return this.$context2d.globalCompositeOperation;this.$context2d.globalCompositeOperation=t}alpha(t){if(void 0===t)return this.$context2d.globalAlpha;this.$context2d.globalAlpha=t}translate(t,e){if(0===arguments.length)return{x:this.__translate.x,y:this.__translate.y};this.$context2d.translate(t,e),this.__translate.sumX+=t||0,this.__translate.sumY+=e||0}resetTranslate(){this.$context2d.translate(-this.__translate.sumX,-this.__translate.sumY)}scale(t,e){if(0===arguments.length)return{x:this.__scale.x,y:this.__scale.y};this.$context2d.scale(t,e),this.__scale.sumX+=t||0,this.__scale.sumY+=e||0}resetScale(){this.$context2d.translate(-this.__translate.sumX,-this.__translate.sumY)}clip(t,e){void 0===e&&this.$context2d.clip(t),this.$context2d.clip(e,t)}transform(t,e,i,s,n,r){if(0===arguments.length)return this.$context2d.getTransform();if(t instanceof DOMMatrix){const{a:e=1,b:i=0,c:s=0,d:n=1,e:r=0,f:o=0}=t;this.$context2d.transform(e,i,s,n,r,o)}else this.$context2d.transform(t,e,i,s,n,r)}setTransform(t,e,i,s,n,r){if(t instanceof DOMMatrix){const{a:e=1,b:i=0,c:s=0,d:n=1,e:r=0,f:o=0}=t;this.$context2d.setTransform(e,i,s,n,r,o)}else this.$context2d.setTransform(t,e,i,s,n,r)}sin(t){return Math.sin(this._toRadius(t))}asin(t){return this._toDegress(Math.asin(t))}cos(t){return Math.cos(this._toRadius(t))}acos(t){return this._toDegress(Math.acos(t))}tan(t){return Math.tan(this._toRadius(t))}atan(t){return this._toDegress(Math.atan(t))}atan2(t,e){return this._toDegress(Math.atan2(t,e))}cursor(){this.$el.style.cursor="auto"}noCursor(){this.$el.style.cursor="none"}loop(){this._ENV.loop=!0,this._stamentReady.emit("setuped")}noLoop(){this._ENV.loop=!1,this.__idFrame&&i(this.__idFrame)}get acceptLoop(){return this._ENV.loop}mouseIn(t){return _("mouseover",t,this.$el)}mouseOut(t){return _("mouseout",t,this.$el)}touchStart(t){return _("touchstart",t,this.$el)}touchMove(t){return _("touchmove",t,this.$el)}touchEnd(t){return _("touchend",t,this.$el)}mouseMove(t){return _("mousemove",t,this.$el)}mouseUp(t){return _("mouseup",t,this.$el)}mouseDown(t){return _("mousedown",t,this.$el)}mouseClicked(t){return _("click",t,this.$el)}}S.Element=V,S.RectElement=class extends V{constructor(t,e,i,s){super(),this.type="rect",this.x=0,this.y=0,this.width=0,this.height=0,[this.x,this.y,this.width,this.height]=[t||0,e||0,i||0,s||0]}get interact(){return C(this,this.mouseX,this.mouseY)}},S.CircleElement=class extends V{constructor(t,e,i){super(),this.type="circle",this.x=0,this.y=0,this.radius=0,[this.x,this.y,this.radius]=[t||0,e||0,i||0]}get interact(){return M(this,this.mouseX,this.mouseY)}},S.Point3D=class extends V{constructor(t,e,i){super(),this.x=0,this.y=0,this.z=0,this.draw=()=>{this.point(this.x,this.y)},[this.x,this.y,this.z]=[t||0,e||0,i||0]}rotateX(t){this.y=this.y*this.$parent.cos(t)+this.z*this.$parent.sin(t),this.z=-this.y*this.$parent.sin(t)+this.z*this.$parent.cos(t)}rotateY(t){this.x=this.x*this.$parent.cos(t)+this.z*this.$parent.sin(t),this.z=-this.x*this.$parent.sin(t)+this.z*this.$parent.cos(t)}rotateZ(t){this.x=this.x*this.$parent.cos(t)-this.y*this.$parent.sin(t),this.y=this.x*this.$parent.sin(t)+this.y*this.$parent.cos(t)}},S.count=0;const Y=new S;t.Animate=class{constructor(...t){this.__data={__observe:{}},this.__fps=1e3/60,this.__eventsStore=Object.create(null),this.__queue=[],this.time=0,this.easing="ease",this.__frame=1;const[e,i,s]=b(...t);this.data=e??this.data,this.time=Number.isNaN(i)?this.time:i??this.time,this.easing=s??this.easing}set data(t){this.__data=function(t,e){delete t.__observe,t=$(t);const i={};for(const s in t)i[s]=[t[s],t[s]],Object.defineProperty(t,s,{get:()=>y(e.easing,i[s][0],i[s][1],e.frame,e.frames),set(t){i[s][1]=t}});return Object.defineProperty(t,"__observe",{writable:!0,enumerable:!1,configurable:!0,value:i}),t}(t,this);for(const t in this.__data)Object.defineProperty(this,t,{get(){return this.__data[t]}})}get(t){return this.__data[t]}get frames(){return Math.max(function(t,e=1e3/60){return t/e}(this.time,this.__fps),1)}get frame(){return Math.min(this.__frame,this.frames)}set frame(t){this.__frame=Math.min(t,this.frames),this.frame===this.frames&&(this.emit("done"),this.__queue.length>0&&(this._to(...this.__queue[0]),this.__queue.splice(0,1)))}on(t,e){t in this.__eventsStore?this.__eventsStore[t].push(e):this.__eventsStore[t]=[e]}off(t,e){e?(this.__eventsStore[t]=this.__eventsStore[t]?.filter((t=>t!==e)),0===this.__eventsStore[t]?.length&&delete this.__eventsStore[t]):delete this.__eventsStore[t]}emit(t,...e){this.__eventsStore[t]?.forEach((t=>{t.call(this,...e)}))}once(t,e){const i=(...s)=>{e.call(this,...s),this.off(t,i)};this.on(t,i)}setFPS(t){this.__fps=t}action(){this.frame++}cancel(t){if(t)t in this.__data&&t in this.__data.__observe&&(this.__data.__observe[t][0]=this.__data[t],this.emit("cancel",t));else for(const t in this.__data)this.cancel(t)}_to(...t){const[e,i,s]=b(...t);for(const t in e)t in this.__data&&t in this.__data.__observe?(this.cancel(t),this.__data.__observe[t][1]=+e[t]):console.error(`fCanvas<animate.ts>: "${t}" is not signed.`);this.frame=0,this.time=Number.isNaN(i)?this.time:i??this.time,this.easing=s??this.easing}to(...t){this._to(...t),this.__queue.splice(0)}get running(){return this.frame<this.frames}add(...t){this.__queue.push(b(...t))}set(...t){this.data=b(...t)[0]}},t.Camera=class{constructor(t,e,i,s,n,r,o,h,a,c){this.viewport={width:0,height:0},this.viewBox={mx:0,my:0,width:0,height:0},this._cx=0,this._cy=0,this.cursor={__camera:this,use:!0,idealX:0,idealY:0,idealRX:0,offsetTop:0,offsetRight:0,offsetBottom:0,offsetLeft:0,width:0,height:0,get x(){if(this.__camera._cx<-this.__camera.viewBox.mx){const t=-this.__camera.viewBox.mx-this.__camera._cx;return this.idealX-t}if(this.__camera._cx>this.__camera.viewport.width-this.__camera.viewBox.width){const t=this.__camera.viewport.width-this.__camera.viewBox.width-this.__camera._cx;return this.idealX-t}return this.idealX},set x(t){t<this.idealX&&(this.__camera._cx=t-this.idealX-this.__camera.viewBox.mx),t>this.idealX+this.idealRX&&(this.__camera._cx=t-this.idealX+this.__camera.viewport.width-this.__camera.viewBox.width-this.width)},get y(){if(this.__camera._cy<-this.__camera.viewBox.my){const t=-this.__camera.viewBox.my-this.__camera._cy;return this.idealY-t}if(this.__camera._cy>this.__camera.viewport.height-this.__camera.viewBox.height){const t=this.__camera.viewport.height-this.__camera.viewBox.height-this.__camera._cy;return this.idealY-t}return this.idealY},set y(t){t<this.idealY&&(this.__camera._cy=t-this.idealY-this.__camera.viewBox.my),t>this.idealY&&(this.__camera._cy=t-this.idealY+this.__camera.viewport.height-this.__camera.viewBox.height-this.height)}},this.setViewport(t||0,e||0),this.setViewBox(i||0,s||0,n||0,r||0),!1===o?this.setCursor(!1):this.setCursor(o,h,a,c)}get cx(){return this._cx}set cx(t){this.cursor.use?this._cx=B(t,-this.cursor.idealX-this.viewBox.mx-this.cursor.offsetLeft,this.viewport.width-this.viewBox.width+(this.viewBox.width-this.cursor.idealX-this.cursor.width)+this.cursor.offsetRight):this._cx=B(t,-this.viewBox.mx,this.viewport.width-this.viewBox.width)}get cy(){return this._cy}set cy(t){this.cursor.use?this._cy=B(t,-this.cursor.idealY-this.viewBox.my-this.cursor.offsetTop,this.viewport.height-this.viewBox.height+(this.viewBox.height-this.cursor.idealY-this.cursor.height)+this.cursor.offsetBottom):this._cy=B(t,-this.viewBox.my,this.viewport.height-this.viewBox.height)}setViewport(t,e){this.viewport.width=t||0,this.viewport.height=e||0}setViewBox(t,e,i,s){this.viewBox.mx=t||0,this.viewBox.my=e||0,this.viewBox.width=i||0,this.viewBox.height=s||0}setCursor(t,e,i,s){1===arguments.length?!1===t&&(this.cursor.use=!1):(this.cursor.idealX=t||0,this.cursor.idealY=e||0,this.cursor.width=i||0,this.cursor.height=s||0)}followX(t,e=1){return t-B(this._cx*e,-this.viewBox.mx,this.viewport.width-this.viewBox.width)}followY(t,e=1){return t-B(this._cy*e,-this.viewBox.my,this.viewport.height-this.viewBox.height)}followVector(t,e=1,i=e){return t.set(this.followX(t.x,e),this.followY(t.y,i))}follow(t,e,i=1,s=i){return{x:this.followX(t,i),y:this.followY(e,s)}}xInViewBox(t,e=0,i=1){return t=this.followX(t,i),this.viewBox.mx<t+e&&this.viewBox.mx+this.viewBox.width>t}yInViewBox(t,e=0,i=1){return t=this.followY(t,i),this.viewBox.my<t+e&&this.viewBox.my+this.viewBox.height>t}inViewBox(t,e,i=0,s=0,n=1,r=n){return this.xInViewBox(t,i,n)&&this.yInViewBox(e,s,r)}xAfterViewBox(t,e=0,i=1){return t=this.followX(t,i),this.viewBox.mx>=t+e}yAfterViewBox(t,e=0,i=1){return t=this.followY(t,i),this.viewBox.my>=t+e}afterViewBox(t,e,i=0,s=0,n=1,r=n){return this.xAfterViewBox(t,i,n)&&this.yAfterViewBox(e,s,r)}xBeforeViewBox(t,e=1){return t=this.followX(t,e),this.viewBox.mx+this.viewBox.width<=t}yBeforeViewBox(t,e=1){return t=this.followY(t,e),this.viewBox.my+this.viewBox.height<=t}beforeViewBox(t,e,i=1,s=i){return this.xBeforeViewBox(t,i)&&this.yBeforeViewBox(e,s)}},t.CircleImpact=function(t,e){return(t.x-e.x)**2+(t.y-e.y)**2<(t.radius+e.radius)**2},t.CircleImpactPoint=M,t.CircleImpactRect=function(t,e){const i=Math.max(e.x,Math.min(t.x,e.x+e.width)),s=Math.max(e.y,Math.min(t.y,e.y+e.height));return(i-t.x)*(i-t.x)+(s-t.y)*(s-t.y)<t.radius**2},t.Emitter=f,t.RectImpact=function(t,e){return t.x<=e.x+e.width&&t.x+t.width>=e.x&&t.y<=e.y+e.height&&t.y+t.height>=e.y},t.RectImpactPoint=C,t.Stament=R,t.Store=g,t.Vector=v,t.aspectRatio=function(t,e,i){const s=t*i;return e<s?[e,e/t]:[s,i]},t.cancelAnimationFrame=i,t.changeSize=function(t,e=window){return _("resize",t,e)},t.constrain=B,t.cutImage=k,t.default=S,t.draw=j,t.hypot=N,t.isMobile=d,t.isTouch=s,t.keyPressed=function(t,e=window){return _("keydown",t,e)},t.keyUp=function(t,e=window){return _("keyup",t,e)},t.lerp=function(t,e,i){return i*(e-t)+t},t.loadAudio=function(t){const e=new Audio;return e.src=t,new Promise(((t,i)=>{e.addEventListener("load",(function i(){t(e),e.removeEventListener("load",i)})),e.addEventListener("error",(function t(s){i(s),e.removeEventListener("error",t)}))}))},t.loadImage=z,t.loadResourceImage=async function(t){null==t.match(/\.plist$/)&&(t+=".plist");const e=await fetch(`${t}`).then((t=>t.text())).then((t=>(new DOMParser).parseFromString(t,"text/xml")));let i={};e.querySelectorAll("plist > dict:first-child > key").forEach((t=>{i={...i,...A(t)}}));const s=await z(function(...t){const e=t[0].replace(/\/$/,"").split("/");return t[0]=e.slice(0,e.length-1).join("/"),t.join("/")}(t,i?.metadata.realTextureFileName||i?.metadata.textureFileName));return new P(s,i)},t.map=function(t,e,i,s,n){return(t-e)*(n-s)/(i-e)+s},t.mouseClicked=function(t,e=window){return _("click",t,e)},t.mouseMoved=function(t,e=window){return _("mousemove",t,e)},t.mousePressed=function(t,e=window){return _("mousedown",t,e)},t.mouseWheel=function(t,e=window){return _("wheel",t,e)},t.odd=function(t,e,i){return t===i?e:t+1},t.off=function(t,e,i){return t===e?i:t-1},t.passive=o,t.random=E,t.randomInt=function(t,e){return void 0===e?Math.round(E(t)):Math.round(E(t,e))},t.range=function(t,e,i){i=i||1;const s=[];let n=!1;if(void 0===e&&(e=t,t=1),"string"==typeof t&&(t=t.charCodeAt(0),e=e.charCodeAt(0),n=!0),t!==e&&Math.abs(e-t)<Math.abs(i))throw new Error("range(): step exceeds the specified range.");if(e>t)for(i<0&&(i*=-1);t<=e;)s.push(n?String.fromCharCode(t):t),t+=i;else for(i>0&&(i*=-1);t>=e;)s.push(n?String.fromCharCode(t):t),t+=i;return s},t.requestAnimationFrame=e,t.setup=T,t.touchEnd=function(t,e=window){return _("touchend",t,e)},t.touchMove=function(t,e=window){return _("touchmove",t,e)},t.touchStart=function(t,e=window){return _("touchstart",t,e)},t.windowSize=h,Object.defineProperty(t,"__esModule",{value:!0})}));
