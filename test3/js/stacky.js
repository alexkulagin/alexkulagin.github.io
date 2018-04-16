!function(t){var i={};function s(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=i,s.d=function(t,i,e){s.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:e})},s.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},s.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(i,"a",i),i},s.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},s.p="",s(s.s=2)}([
/*!****************************!*\
  !*** external "EvEmitter" ***!
  \****************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(t,i){t.exports=EvEmitter},
/*!******************************!*\
  !*** external "Draggabilly" ***!
  \******************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(t,i){t.exports=Draggabilly},
/*!*******************************!*\
  !*** ./Stacky.js + 9 modules ***!
  \*******************************/
/*! no exports provided */
/*! all exports used */
/*! ModuleConcatenation bailout: Cannot concat with external "Draggabilly" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "EvEmitter" (<- Module is not an ECMAScript module) */function(t,i,s){"use strict";s.r(i);var e=s(0),n=s.n(e);const o=console.log,a=console.warn,h=(console.error,console.group,console.groupEnd,console.time,console.timeEnd,function(t,i){return t*i}),r=function(t,i,s,e){return 0===t?s:e+(s-e)/(i-1)*(i-1-t)},l=function(t,i){return Math.abs(t.x)>i||Math.abs(t.y)>i},d="drag:start",p="drag:away",u="drag:end",c="controller:setup",g="model:change",f=function(t,i,s){var e;s.styleUID&&t.classList.add("stid"+(Date.now().toString(36)+Math.random().toString(36).substr(2,9)).toUpperCase().substr(13).toLowerCase()),this.container=t,this.sheet=Stacky.sheet=Stacky.sheet||((e=document.createElement("style")).appendChild(document.createTextNode(""))&&document.head.appendChild(e),e.sheet),this.$container=function(t){return(""!==t.id?"#"+t.id:""===t.className?t.tagName:t.tagName+"."+t.className.split(" ").join(".")).toLowerCase()}(t),this.$child=this.$container+" > *",this.$prefix=this.$container+" > ",this.size,this.perspective,this.originX,this.originY,this.endDepth,this.show,this.hide,this.move,this.back,this.away,this.rotateFX=null,this.depth=null,this.depthStep=null,this.opacity=null,this.delay={show:null,hide:null,move:null},this.enter=null,this.base=null,this.exit=null,this.changeOptions=this._onChangeOptionsHandler.bind(this),this.dispatcher=i,this.dispatcher.on(c,this.changeOptions),this._refreshStyles(s),this._refreshValues(s)},y=f.prototype;y.dispose=function(){this.dispatcher.off(c,this.changeOptions)},y._onChangeOptionsHandler=function(t){this._refreshStyles(t),this._refreshValues(t)},y._refreshStyles=function(t){var i=function(t){for(var i,s=t.cssRules,e={},n=0;n<s.length;)(i=s[n].selectorText)&&(e[i.toLowerCase()]=n),n++;return e}(this.sheet),s=[],e=[];this._containerRule(t,i,s,e),this._itemRule(t,i,s,e),this._animateRule("show",t,i,s,e),this._animateRule("hide",t,i,s,e),this._animateRule("move",t,i,s,e),this._animateRule("back",t,i,s,e),this._animateRule("away",t,i,s,e),s.length>0&&function(t,i){i=i.sort(function(t,i){return i-t});for(var s=0;s<i.length;)t.deleteRule(i[s]),s++}(this.sheet,s),e.length>0&&function(t,i){i=i;for(var s=void 0,e=0;e<i.length;)s=i[e],t.insertRule(s[0]+"{"+s[1]+"}",0),e++}(this.sheet,e)},y._containerRule=function(t,i,s,e){if(this.perspective!==t.perspective||this.originX!==t.originX||this.originY!==t.originY){var n=this.$container,o=i[n];void 0!==o&&s.push(o),e.push([n,["perspective: "+t.perspective+"px;","perspective-origin: "+t.originX+" "+t.originY+";"].join(" ")]),this.perspective=t.perspective,this.originX=t.originX,this.originY=t.originY}},y._itemRule=function(t,i,s,e){if(this.size!==t.size||this.endDepth!==t.endDepth){var n=this.$child,o=i[n],a=null===t.endDepth||0===t.endDepth||t.size<2?0:t.endDepth+t.endDepth/(t.size-1);void 0!==o&&s.push(o),e.push([n,["position: absolute;","display: none;","z-index: -1;","opacity: 0;","transform-style: preserve-3d;","transform: translate3d(0, 0, "+a+"px);"].join(" ")]),this.size=t.size,this.endDepth=t.endDepth}},y._animateRule=function(t,i,s,e,n){var o,a=this[t]||null,h=i[t],r=a&&(this.$prefix+"."+a.id).toLowerCase()||null,l=(this.$prefix+"."+h.id).toLowerCase();a&&a.id===h.id&&a.duration===h.duration&&a.ease===h.ease||(void 0!==(o=s[r])&&e.push(o),n.push([l,["transition-property: all;","transition-duration: "+h.duration+"ms;","transition-timing-function: "+h.ease+";"].join(" ")]),this[t]=i[t])},y._refreshValues=function(t){var i=t.size,s=t.endDepth,e=t.endOpacity,n=t.rotate,o=t.boundAway,a=t.show.delay,l=t.hide.delay,d=t.move.delay,p=t.enter,u=t.exit,c=0;for(this.rotateFX=n&&n>0?o*n:null,this.depth=s<0?[]:null,this.depthStep=s<0?s/(i-1):null,this.opacity=null!==e?[]:null,this.delay.show=null!==a?[]:null,this.delay.hide=null!==l?[]:null,this.delay.move=null!==d?[]:null,this.enter={transform:p.transform.join(" "),opacity:p.opacity||0},this.exit={transform:u.transform.join(" "),opacity:u.opacity||0},this.base=[];c<i;)null!==this.depth&&(this.depth[c]=h(c,this.depthStep)),null!==this.opacity&&(this.opacity[c]=r(c,i,1,e)),null!==this.delay.show&&(this.delay.show[c]=h(c,a)),null!==this.delay.hide&&(this.delay.hide[c]=h(c,l)),null!==this.delay.move&&(this.delay.move[c]=h(c,d)),this.base[c]={transform:"translate3d(0px, 0px, "+(null===this.depth?0:this.depth[c])+"px)",opacity:null===this.opacity?1:this.opacity[c]},c++};var v=f;const m=function(t,i){this.dispatcher=t,this.size=i.size,this.loop=i.loop,this.pinned=i.pinned,this.queue=[],this.start=0,this.end=0,this.total=0,this.changeOptions=this._onChangeOptionsHandler.bind(this),this.dispatcher.on(c,this.changeOptions)},w=m.prototype;w.next=function(){var t,i=this.start,s=this.end;if(this.loop)this.queue.push(this.queue.shift());else if(++i>=(t=this.pinned?this.queue.length:this.queue.length+1))return i=t,a("end of stack!"),!1;return this.update(i,s)},w.prev=function(){var t=this.start,i=this.end;if(this.loop)this.queue.unshift(this.queue.pop());else if(--t<0)return t=0,a("start of stack!"),!1;return this.update(t,i)},w.update=function(t,i){return this.loop?(t=0,i=this.size-1):(i=t+this.size-1)>=this.queue.length&&(i=this.queue.length-1),!(!this.loop&&t===this.start&&i===this.end||(this.start=t,this.end=i,this.dispatcher.send(g,[this.queue,t,i]),0))},w.addIndex=function(){this.queue.push(this.queue.length),this.total=this.queue.length},w.reset=function(){this.queue=[],this.start=0,this.end=0},w.dispose=function(){this.dispatcher.off(c,this.changeOptions),this.queue=void 0,this.start=void 0,this.end=void 0,this.changeOptions=void 0,this.size=void 0,this.loop=void 0,this.dispatcher=void 0},w._onChangeOptionsHandler=function(t){this.size=t.size,this.loop=t.loop};var x=m,b=s(1),D=s.n(b);const _=function(t,i,s,e){this.el=t,this.dispatcher=i,this.values=s,this.options=e,this.style=this.el.style,this.classList=this.el.classList,this.depth=null,this.waketick=null,this.followers=null,this.transition=null,this.transitionID=null,this.state=null,this.draggie=null,this.axisValues=null,this.isTargeted=!1,this.isFollowed=!1,this.isDisplayed=!1,this.isAnimated=!1,this.isPinned=!1,this.isMoved=!1,this.isAwayed=!1,this.isDraggable=!1,this.transitionEnd=this._onTransitionEndHandler.bind(this),this.dragStart=this._onDragStartHandler.bind(this),this.dragMove=this._onDragMoveHandler.bind(this),this.dragEnd=this._onDragEndHandler.bind(this)},k=_.prototype;k.animateFrom=function(t,i){this.isDisplayed?(null!==this.waketick&&(clearTimeout(this.waketick),this.waketick=null),this.setTransition(i),this.state="base",Object.assign(this.style,this.values.base[this.depth]),null!==this.values.delay[i]&&(this.style.transitionDelay=this.values.delay[i][this.depth]+"ms")):this._wakeup(t,i)},k.animateTo=function(t,i){this.setTransition(i),this.state=t,Object.assign(this.style,this.values[t]),null!==this.values.delay[i]&&(this.style.transitionDelay=this.values.delay[i][this.depth]+"ms")},k.setTransition=function(t){this.transition&&this.transition!==t&&this.classList.remove(this.transitionID),this.transition=t,this.transitionID=this.options[t].id,this.classList.add(this.transitionID),this.isAnimated=!0},k.setDepth=function(t){this.style.zIndex=this.options.size-t,this.depth=t},k.activate=function(){this.options.dragging&&!this.isPinned&&(null===this.draggie&&(this.draggie=new D.a(this.el,{handle:this.options.dragHandle}),this.draggie.positionDrag=this._onDragHandler.bind(this.draggie,this)),this.isDraggable||(this.draggie.on("dragStart",this.dragStart),this.draggie.on("dragMove",this.dragMove),this.draggie.on("dragEnd",this.dragEnd),this.draggie.enable(),this.isDraggable=!0))},k.deactivate=function(){this.isDraggable&&(this.draggie.off("dragStart",this.dragStart),this.draggie.off("dragMove",this.dragMove),this.draggie.off("dragEnd",this.dragEnd),this.draggie.disable(),this.isDraggable=!1)},k._wakeup=function(t,i){Object.assign(this.style,this.values[t]),this.style.zIndex=this.isTargeted?1e3:this.options.size-this.depth,this.style.display="block",this.el.addEventListener("transitionend",this.transitionEnd),this.waketick=setTimeout(this.animateFrom.bind(this,t,i),24),this.isDisplayed=!0},k._onTransitionEndHandler=function(t){this.transition&&"transform"===t.propertyName&&("exit"===this.state||"enter"===this.state?(this.el.removeEventListener("transitionend",this.transitionEnd),this.el.removeAttribute("style"),this.isDisplayed=!1):this.style.transitionDelay&&(this.style.transitionDelay=null),this.classList.remove(this.transitionID),this.transitionID=null,this.transition=null,this.state=null,this.isAnimated=!1)},k._onDragStartHandler=function(t,i){var s,e,n,a,h,r,l;o("getDragDirection():"),null!==this.options.dragAxis&&(this.axisValues=(s=function(t){return Math.abs(t.movementX)>Math.abs(t.movementY)?"x":"y"}(i),e=this.options.dragAxis.lock,n=this.options.dragAxis.soft,r="x"===s,l="y"===s,"auto"!==e?(a="x"===e,h="y"===e):n?n&&(a=r||l&&"y"===n,h=l||r&&"x"===n):(a=r,h=l),{horizontal:a,vertical:h})),this.dispatcher.send(d)},k._onDragMoveHandler=function(t,i,s){var e={x:!this.axisValues||this.axisValues.horizontal?this.draggie.position.x:0,y:!this.axisValues||this.axisValues.vertical?this.draggie.position.y:0};this.options.detachable&&l(e,this.options.boundAway)&&this.draggie._pointerUp(t.originalEvent,i)},k._onDragHandler=function(t){var i=null===(t=t).options.resistance?1:t.options.resistance,s=this.dragPoint,e=!t.axisValues||t.axisValues.horizontal?s.x*i:0,n=!t.axisValues||t.axisValues.vertical?s.y*i:0,o=Math.max(Math.abs(e),Math.abs(n))/t.options.boundAway;t.style.transform="translate3d( "+e+"px, "+n+"px, 0)"+(t.options.rotate>0?" rotate("+e/t.options.boundAway*t.options.rotate+"deg)":""),null!==t.options.following&&t.followers&&t.followers.length>0&&t._onFollowHandler(e,n,o)},k._onFollowHandler=function(t,i,s){for(var e,n,o=this.followers,a=this.options,h=this.values,r=a.following,l=a.boundAway,d=a.rotate,p=r.step,u=r.factor,c=r.translate,g=r.rotate,f=r.depth,y=r.opacity,v=(t=t,i=i,s*=.9,0);v<o.length;)e=o[v],f?(n=null===h.depth?0:h.depth[e.depth]+(h.depth[e.depth-1]-h.depth[e.depth])*s,e.style.transform="translate3d(0, 0, "+n+"px)"):(n=null===h.depth?0:h.depth[e.depth],e.style.transform=(c?"translate3d("+t*p+"px, "+i*p+"px, "+n+"px)":"translate3d(0, 0, "+n+"px)")+(g&&d>0?" rotate("+t/l*d*p+"deg)":"")),y&&null!==a.endOpacity&&(e.style.opacity=null===h.opacity?1:h.opacity[e.depth]+(h.opacity[e.depth-1]-h.opacity[e.depth])*s),p*=u,v++},k._onFollowBackHandler=function(){for(var t,i,s=this.followers,e=(this.options,this.values),n=0;n<s.length;)t=s[n],i=null===e.depth?0:e.depth[t.depth],t.setTransition("back"),t.style.transform="translate3d(0px, 0px, "+i+"px)",n++},k._onDragEndHandler=function(t,i){var s={x:!this.axisValues||this.axisValues.horizontal?this.draggie.position.x:0,y:!this.axisValues||this.axisValues.vertical?this.draggie.position.y:0};l(s,this.options.boundBack)?this._moveAway():this._moveBack(),this.dispatcher.send(u)},k._moveBack=function(){this.style.left="0px",this.style.top="0px",this.setTransition("back"),this.style.transform="translate3d(0px, 0px, 0px)",null!==this.options.following&&this.followers&&this.followers.length>0&&this._onFollowBackHandler()},k._moveAway=function(){var t={x:!this.axisValues||this.axisValues.horizontal?this.draggie.position.x:0,y:!this.axisValues||this.axisValues.vertical?this.draggie.position.y:0},i=function(t,i){var s=t.x,e=t.y,n=Math.PI/180,o=Math.sqrt(Math.pow(s,2)+Math.pow(e,2)),a=Math.asin(Math.abs(e)/o)/n,h=o+i,r=Math.cos(a*n)*h-Math.abs(s),l=Math.sin(a*n)*h-Math.abs(e);return{x:s>0?r:-1*r,y:e>0?l:-1*l}}(t,this.options.distAway);this.style.left="0px",this.style.top="0px",this.setTransition("away"),this.state="exit",this.style.transform="translate3d("+(i.x+t.x)+"px,"+(i.y+t.y)+"px, 0px)"+(this.options.rotate>0?" rotate("+(i.x+t.x)/this.options.boundAway*this.options.rotate+"deg)":""),this.style.opacity=0,this.dispatcher.send(p)};var M=_;const H=function(t,i,s,e){this.container=t,this.dispatcher=i,this.values=s,this.options=e,this.elements=[],this.items=[],this.target=null,this.followers=null,this.isDisplayed=!1,this.isDragged=!1,this.changeOptions=this._onChangeOptionsHandler.bind(this),this.changeModel=this._onChangeModelHandler.bind(this),this.dragStart=this._onDragStartHandler.bind(this),this.dragAway=this._onDragAwayHandler.bind(this),this.dragEnd=this._onDragEndHandler.bind(this),this.dispatcher.on(c,this.changeOptions),this.dispatcher.on(g,this.changeModel),this.dispatcher.on(d,this.dragStart),this.dispatcher.on(p,this.dragAway),this.dispatcher.on(u,this.dragEnd)},S=H.prototype;S.create=function(t){this.elements.push(t),this.items.push(new M(t,this.dispatcher,this.values,this.options))},S.show=function(t,i,s){for(var e,n=this.items,o=0;o<n.length;)((e=n[o]).isTargeted||e.isFollowed)&&e.animateFrom("enter","show"),o++;this.isDisplayed=!0},S.hide=function(t,i,s){for(var e,n=this.items,o=0;o<n.length;)((e=n[o]).isTargeted||e.isFollowed)&&e.animateTo("exit","hide"),o++;this.isDisplayed=!1},S.next=function(t,i,s){for(var e,n=this.items,o=0;o<n.length;)(e=n[o]).isTargeted||e.isFollowed?e.animateFrom("enter","move"):e.isDisplayed&&(!e.isAnimated||e.isAnimated&&"exit"!==e.state)&&e.animateTo("exit","move"),o++},S.prev=function(t,i,s){for(var e,n=this.items,o=0;o<n.length;)(e=n[o]).isTargeted||e.isFollowed?e.animateFrom("exit","move"):e.isDisplayed&&(!e.isAnimated||e.isAnimated&&"enter"!==e.state)&&e.animateTo("enter","move"),o++},S._onChangeOptionsHandler=function(t){},S._onChangeModelHandler=function(t,i,s){var e,n,o=this.options.loop,a=this.options.pinned,h=1,r=0;for(this.target&&this.target.deactivate(),this.followers=[];r<t.length;)n=t[r],(e=this.items[n]).isTargeted=!1,e.isFollowed=!1,e.isPinned=!1,o&&0===r||!o&&n===i?(e.isTargeted=!0,e.setDepth(0),e.followers=this.followers,e.isPinned=!o&&a&&n===t.length-1,this.target=e):(o&&r>0&&r<=s||!o&&r>i&&r<=s)&&(e.isFollowed=!0,e.setDepth(h++),this.followers.push(e)),r++;this.target&&this.target.activate()},S._onDragStartHandler=function(){o("view: on drag start"),this.isDragged=!0},S._onDragAwayHandler=function(){o("view: on drag away"),this.dispatcher.next()},S._onDragEndHandler=function(){o("view: on drag end"),this.isDragged=!1};var O=H;const z=function(t,i){this.options=i,this.values=new v(t,this,this.options),this.model=new x(this,this.options),this.view=new O(t,this,this.values,this.options),this.refresh(),this.model.total<1?a("Stacky: is empty..."):this.options.autostart?this.show():o("Stacky: is waiting...")},A=z.prototype=Object.create(n.a.prototype);n.a.prototype.send=n.a.prototype.emitEvent,A.show=function(t,i,s){this.model.total<1||this.view.isDisplayed?a("Stacky: something went wrong..."):this.view.show(t,i,s)},A.hide=function(t,i,s){this.model.total<1||!this.view.isDisplayed?a("Stacky: something went wrong..."):this.view.hide(t,i,s)},A.next=function(t,i,s){this.model.total<2||!this.view.isDisplayed?a("Stacky: something went wrong..."):this.model.next()&&this.view.next(t,i,s)},A.prev=function(t,i,s){this.model.total<2||!this.view.isDisplayed?a("Stacky: something went wrong..."):this.model.prev()&&this.view.prev(t,i,s)},A.goto=function(t,i,s,e){if(this.model.total<2||!this.view.isDisplayed)a("Stacky: something went wrong...");else{var n,o,h=this.model.queue,r=this.model.start,l=h.indexOf(t-1),d=this.next.bind(this),p=this.prev.bind(this),u=this.options.size;l>=0&&l!=r&&h.length>1&&(this.options.loop?n=(o=l<u||l<.5*h.length?d:p)===d?l:h.length-l:(o=l>r?d:p,n=Math.abs(l-r)),function(t,i,s,e){t=t,i=i,s=s,e=e;var n=0;setTimeout(function o(){n=function(t){return++t}(n),s.apply(null,e),n<t&&setTimeout(o,i)},i)}(n,200,o,[i,s,e]))}},A.refresh=function(){for(var t,i=this.view.container.children,s=this.view.elements,e=0;e<i.length;)t=i[e],s.indexOf(t)<0&&(this.view.create(t),this.model.addIndex()),e++;this.model.total>0&&0===this.model.start&&0===this.model.end&&this.model.update(0,0)},A.setup=function(t){},A.reset=function(){},A.destroy=function(){};var T=z;const E={size:4,loop:!0,pinned:!0,autostart:!0,dragging:!0,resistance:null,detachable:!0,distAway:75,boundAway:250,boundBack:150,rotate:8,rotate3d:null,dragAxis:{lock:"auto",soft:"x"},following:{}};E.following.step=.6,E.following.factor=.5,E.following.translate=!0,E.following.rotate=!0,E.following.depth=!1,E.following.opacity=!1,E.dragHandle=null,E.styleUID=!0,E.perspective="500",E.originX="50%",E.originY="150%",E.endDepth=-160,E.endOpacity=null,E.enter={transform:["translate3d(0px, 0px, -500px)","rotate3d(1, 1, 1, 15deg)"],opacity:0},E.exit={transform:["translate3d(200px, 0px, 40px)","rotate3d(0, 1, 0.1, 48deg)"],opacity:0},E.show={id:"show",duration:300,ease:"ease-out",delay:80},E.hide={id:"hide",duration:300,ease:"ease-out",delay:80},E.move={id:"move",duration:300,ease:"ease-out",delay:null},E.back={id:"back",duration:200,ease:"cubic-bezier(0.260, 0.050, 0.420, 1.400)"},E.away={id:"away",duration:150,ease:"ease-out"},window.Stacky=function(t,i){const s=document.querySelector(t)||function(t){throw new Error(t)}('HTML.. element not found or incorrect selector: "'+t+'"'),e=new T(s,Object.assign({},E,i||{})),n=e.on.bind(e),o=e.off.bind(e),a=e.once.bind(e);this.show=e.show.bind(e),this.hide=e.hide.bind(e),this.next=e.next.bind(e),this.prev=e.prev.bind(e),this.goto=e.goto.bind(e),this.refresh=e.refresh.bind(e),this.setup=e.setup.bind(e),this.reset=e.reset.bind(e),this.destroy=e.destroy.bind(e),this.on=n,this.off=o,this.once=a}}]);