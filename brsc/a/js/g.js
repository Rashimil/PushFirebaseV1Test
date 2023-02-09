/*! perfect-scrollbar - v0.5.8
 * http://noraesae.github.com/perfect-scrollbar/
 * Copyright (c) 2014 Hyunje Alex Jun; Licensed MIT */
(function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)})(function(e){"use strict";function t(e){return"string"==typeof e?parseInt(e,10):~~e}var o={wheelSpeed:1,wheelPropagation:!1,swipePropagation:!0,minScrollbarLength:null,maxScrollbarLength:null,useBothWheelAxes:!1,useKeyboard:!0,suppressScrollX:!1,suppressScrollY:!1,scrollXMarginOffset:0,scrollYMarginOffset:0,includePadding:!1},n=0,r=function(){var e=n++;return function(t){var o=".perfect-scrollbar-"+e;return t===void 0?o:t+o}},l="WebkitAppearance"in document.documentElement.style;e.fn.perfectScrollbar=function(n,i){return this.each(function(){function a(e,o){var n=e+o,r=D-R;j=0>n?0:n>r?r:n;var l=t(j*(Y-D)/(D-R));M.scrollTop(l)}function s(e,o){var n=e+o,r=E-k;W=0>n?0:n>r?r:n;var l=t(W*(C-E)/(E-k));M.scrollLeft(l)}function c(e){return P.minScrollbarLength&&(e=Math.max(e,P.minScrollbarLength)),P.maxScrollbarLength&&(e=Math.min(e,P.maxScrollbarLength)),e}function u(){var e={width:I};e.left=B?M.scrollLeft()+E-C:M.scrollLeft(),N?e.bottom=_-M.scrollTop():e.top=Q+M.scrollTop(),H.css(e);var t={top:M.scrollTop(),height:A};Z?t.right=B?C-M.scrollLeft()-V-J.outerWidth():V-M.scrollLeft():t.left=B?M.scrollLeft()+2*E-C-$-J.outerWidth():$+M.scrollLeft(),G.css(t),U.css({left:W,width:k-z}),J.css({top:j,height:R-et})}function d(){M.removeClass("ps-active-x"),M.removeClass("ps-active-y"),E=P.includePadding?M.innerWidth():M.width(),D=P.includePadding?M.innerHeight():M.height(),C=M.prop("scrollWidth"),Y=M.prop("scrollHeight"),!P.suppressScrollX&&C>E+P.scrollXMarginOffset?(X=!0,I=E-F,k=c(t(I*E/C)),W=t(M.scrollLeft()*(I-k)/(C-E))):(X=!1,k=0,W=0,M.scrollLeft(0)),!P.suppressScrollY&&Y>D+P.scrollYMarginOffset?(O=!0,A=D-tt,R=c(t(A*D/Y)),j=t(M.scrollTop()*(A-R)/(Y-D))):(O=!1,R=0,j=0,M.scrollTop(0)),W>=I-k&&(W=I-k),j>=A-R&&(j=A-R),u(),X&&M.addClass("ps-active-x"),O&&M.addClass("ps-active-y")}function p(){var t,o,n=function(e){s(t,e.pageX-o),d(),e.stopPropagation(),e.preventDefault()},r=function(){H.removeClass("in-scrolling"),e(q).unbind(K("mousemove"),n)};U.bind(K("mousedown"),function(l){o=l.pageX,t=U.position().left,H.addClass("in-scrolling"),e(q).bind(K("mousemove"),n),e(q).one(K("mouseup"),r),l.stopPropagation(),l.preventDefault()}),t=o=null}function f(){var t,o,n=function(e){a(t,e.pageY-o),d(),e.stopPropagation(),e.preventDefault()},r=function(){G.removeClass("in-scrolling"),e(q).unbind(K("mousemove"),n)};J.bind(K("mousedown"),function(l){o=l.pageY,t=J.position().top,G.addClass("in-scrolling"),e(q).bind(K("mousemove"),n),e(q).one(K("mouseup"),r),l.stopPropagation(),l.preventDefault()}),t=o=null}function v(e,t){var o=M.scrollTop();if(0===e){if(!O)return!1;if(0===o&&t>0||o>=Y-D&&0>t)return!P.wheelPropagation}var n=M.scrollLeft();if(0===t){if(!X)return!1;if(0===n&&0>e||n>=C-E&&e>0)return!P.wheelPropagation}return!0}function g(e,t){var o=M.scrollTop(),n=M.scrollLeft(),r=Math.abs(e),l=Math.abs(t);if(l>r){if(0>t&&o===Y-D||t>0&&0===o)return!P.swipePropagation}else if(r>l&&(0>e&&n===C-E||e>0&&0===n))return!P.swipePropagation;return!0}function b(){function e(e){var t=e.originalEvent.deltaX,o=-1*e.originalEvent.deltaY;return(t===void 0||o===void 0)&&(t=-1*e.originalEvent.wheelDeltaX/6,o=e.originalEvent.wheelDeltaY/6),e.originalEvent.deltaMode&&1===e.originalEvent.deltaMode&&(t*=10,o*=10),t!==t&&o!==o&&(t=0,o=e.originalEvent.wheelDelta),[t,o]}function t(t){if(l||!(M.find("select:focus").length>0)){var n=e(t),r=n[0],i=n[1];o=!1,P.useBothWheelAxes?O&&!X?(i?M.scrollTop(M.scrollTop()-i*P.wheelSpeed):M.scrollTop(M.scrollTop()+r*P.wheelSpeed),o=!0):X&&!O&&(r?M.scrollLeft(M.scrollLeft()+r*P.wheelSpeed):M.scrollLeft(M.scrollLeft()-i*P.wheelSpeed),o=!0):(M.scrollTop(M.scrollTop()-i*P.wheelSpeed),M.scrollLeft(M.scrollLeft()+r*P.wheelSpeed)),d(),o=o||v(r,i),o&&(t.stopPropagation(),t.preventDefault())}}var o=!1;window.onwheel!==void 0?M.bind(K("wheel"),t):window.onmousewheel!==void 0&&M.bind(K("mousewheel"),t)}function h(){var t=!1;M.bind(K("mouseenter"),function(){t=!0}),M.bind(K("mouseleave"),function(){t=!1});var o=!1;e(q).bind(K("keydown"),function(n){if((!n.isDefaultPrevented||!n.isDefaultPrevented())&&t){for(var r=document.activeElement?document.activeElement:q.activeElement;r.shadowRoot;)r=r.shadowRoot.activeElement;if(!e(r).is(":input,[contenteditable]")){var l=0,i=0;switch(n.which){case 37:l=-30;break;case 38:i=30;break;case 39:l=30;break;case 40:i=-30;break;case 33:i=90;break;case 32:case 34:i=-90;break;case 35:i=n.ctrlKey?-Y:-D;break;case 36:i=n.ctrlKey?M.scrollTop():D;break;default:return}M.scrollTop(M.scrollTop()-i),M.scrollLeft(M.scrollLeft()+l),o=v(l,i),o&&n.preventDefault()}}})}function w(){function e(e){e.stopPropagation()}J.bind(K("click"),e),G.bind(K("click"),function(e){var o=t(R/2),n=e.pageY-G.offset().top-o,r=D-R,l=n/r;0>l?l=0:l>1&&(l=1),M.scrollTop((Y-D)*l)}),U.bind(K("click"),e),H.bind(K("click"),function(e){var o=t(k/2),n=e.pageX-H.offset().left-o,r=E-k,l=n/r;0>l?l=0:l>1&&(l=1),M.scrollLeft((C-E)*l)})}function m(){function t(){var e=window.getSelection?window.getSelection():document.getSlection?document.getSlection():{rangeCount:0};return 0===e.rangeCount?null:e.getRangeAt(0).commonAncestorContainer}function o(){r||(r=setInterval(function(){return x()?(M.scrollTop(M.scrollTop()+l.top),M.scrollLeft(M.scrollLeft()+l.left),d(),void 0):(clearInterval(r),void 0)},50))}function n(){r&&(clearInterval(r),r=null),H.removeClass("in-scrolling"),G.removeClass("in-scrolling")}var r=null,l={top:0,left:0},i=!1;e(q).bind(K("selectionchange"),function(){e.contains(M[0],t())?i=!0:(i=!1,n())}),e(window).bind(K("mouseup"),function(){i&&(i=!1,n())}),e(window).bind(K("mousemove"),function(e){if(i){var t={x:e.pageX,y:e.pageY},r=M.offset(),a={left:r.left,right:r.left+M.outerWidth(),top:r.top,bottom:r.top+M.outerHeight()};t.x<a.left+3?(l.left=-5,H.addClass("in-scrolling")):t.x>a.right-3?(l.left=5,H.addClass("in-scrolling")):l.left=0,t.y<a.top+3?(l.top=5>a.top+3-t.y?-5:-20,G.addClass("in-scrolling")):t.y>a.bottom-3?(l.top=5>t.y-a.bottom+3?5:20,G.addClass("in-scrolling")):l.top=0,0===l.top&&0===l.left?n():o()}})}function T(t,o){function n(e,t){M.scrollTop(M.scrollTop()-t),M.scrollLeft(M.scrollLeft()-e),d()}function r(){h=!0}function l(){h=!1}function i(e){return e.originalEvent.targetTouches?e.originalEvent.targetTouches[0]:e.originalEvent}function a(e){var t=e.originalEvent;return t.targetTouches&&1===t.targetTouches.length?!0:t.pointerType&&"mouse"!==t.pointerType&&t.pointerType!==t.MSPOINTER_TYPE_MOUSE?!0:!1}function s(e){if(a(e)){w=!0;var t=i(e);p.pageX=t.pageX,p.pageY=t.pageY,f=(new Date).getTime(),null!==b&&clearInterval(b),e.stopPropagation()}}function c(e){if(!h&&w&&a(e)){var t=i(e),o={pageX:t.pageX,pageY:t.pageY},r=o.pageX-p.pageX,l=o.pageY-p.pageY;n(r,l),p=o;var s=(new Date).getTime(),c=s-f;c>0&&(v.x=r/c,v.y=l/c,f=s),g(r,l)&&(e.stopPropagation(),e.preventDefault())}}function u(){!h&&w&&(w=!1,clearInterval(b),b=setInterval(function(){return x()?.01>Math.abs(v.x)&&.01>Math.abs(v.y)?(clearInterval(b),void 0):(n(30*v.x,30*v.y),v.x*=.8,v.y*=.8,void 0):(clearInterval(b),void 0)},10))}var p={},f=0,v={},b=null,h=!1,w=!1;t&&(e(window).bind(K("touchstart"),r),e(window).bind(K("touchend"),l),M.bind(K("touchstart"),s),M.bind(K("touchmove"),c),M.bind(K("touchend"),u)),o&&(window.PointerEvent?(e(window).bind(K("pointerdown"),r),e(window).bind(K("pointerup"),l),M.bind(K("pointerdown"),s),M.bind(K("pointermove"),c),M.bind(K("pointerup"),u)):window.MSPointerEvent&&(e(window).bind(K("MSPointerDown"),r),e(window).bind(K("MSPointerUp"),l),M.bind(K("MSPointerDown"),s),M.bind(K("MSPointerMove"),c),M.bind(K("MSPointerUp"),u)))}function y(){M.bind(K("scroll"),function(){d()})}function L(){M.unbind(K()),e(window).unbind(K()),e(q).unbind(K()),M.data("perfect-scrollbar",null),M.data("perfect-scrollbar-update",null),M.data("perfect-scrollbar-destroy",null),U.remove(),J.remove(),H.remove(),G.remove(),M=H=G=U=J=X=O=E=D=C=Y=k=W=_=N=Q=R=j=V=Z=$=B=K=null}function S(){d(),y(),p(),f(),w(),m(),b(),(ot||nt)&&T(ot,nt),P.useKeyboard&&h(),M.data("perfect-scrollbar",M),M.data("perfect-scrollbar-update",d),M.data("perfect-scrollbar-destroy",L)}var P=e.extend(!0,{},o),M=e(this),x=function(){return!!M};if("object"==typeof n?e.extend(!0,P,n):i=n,"update"===i)return M.data("perfect-scrollbar-update")&&M.data("perfect-scrollbar-update")(),M;if("destroy"===i)return M.data("perfect-scrollbar-destroy")&&M.data("perfect-scrollbar-destroy")(),M;if(M.data("perfect-scrollbar"))return M.data("perfect-scrollbar");M.addClass("ps-container");var E,D,C,Y,X,k,W,I,O,R,j,A,B="rtl"===M.css("direction"),K=r(),q=this.ownerDocument||document,H=e("<div class='ps-scrollbar-x-rail'>").appendTo(M),U=e("<div class='ps-scrollbar-x'>").appendTo(H),_=t(H.css("bottom")),N=_===_,Q=N?null:t(H.css("top")),z=t(H.css("borderLeftWidth"))+t(H.css("borderRightWidth")),F=t(H.css("marginLeft"))+t(H.css("marginRight")),G=e("<div class='ps-scrollbar-y-rail'>").appendTo(M),J=e("<div class='ps-scrollbar-y'>").appendTo(G),V=t(G.css("right")),Z=V===V,$=Z?null:t(G.css("left")),et=t(G.css("borderTopWidth"))+t(G.css("borderBottomWidth")),tt=t(G.css("marginTop"))+t(G.css("marginBottom")),ot="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,nt=null!==window.navigator.msMaxTouchPoints;return S(),M})}});

/*!
 Autosize textarea 3.0.20
 license: MIT
 http://www.jacklmoore.com/autosize
 */
!function(e,t){if("function"==typeof define&&define.amd)define(["exports","module"],t);else if("undefined"!=typeof exports&&"undefined"!=typeof module)t(exports,module);else{var n={exports:{}};t(n.exports,n),e.autosize=n.exports}}(this,function(e,t){"use strict";function n(e){function t(){var t=window.getComputedStyle(e,null);"vertical"===t.resize?e.style.resize="none":"both"===t.resize&&(e.style.resize="horizontal"),s="content-box"===t.boxSizing?-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)):parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth),isNaN(s)&&(s=0),l()}function n(t){var n=e.style.width;e.style.width="0px",e.offsetWidth,e.style.width=n,e.style.overflowY=t}function o(e){for(var t=[];e&&e.parentNode&&e.parentNode instanceof Element;)e.parentNode.scrollTop&&t.push({node:e.parentNode,scrollTop:e.parentNode.scrollTop}),e=e.parentNode;return t}function r(){var t=e.style.height,n=o(e),r=document.documentElement&&document.documentElement.scrollTop;e.style.height="auto";var i=e.scrollHeight+s;return 0===e.scrollHeight?void(e.style.height=t):(e.style.height=i+"px",u=e.clientWidth,n.forEach(function(e){e.node.scrollTop=e.scrollTop}),void(r&&(document.documentElement.scrollTop=r)))}function l(){r();var t=Math.round(parseFloat(e.style.height)),o=window.getComputedStyle(e,null),i=Math.round(parseFloat(o.height));if(i!==t?"visible"!==o.overflowY&&(n("visible"),r(),i=Math.round(parseFloat(window.getComputedStyle(e,null).height))):"hidden"!==o.overflowY&&(n("hidden"),r(),i=Math.round(parseFloat(window.getComputedStyle(e,null).height))),a!==i){a=i;var l=d("autosize:resized");try{e.dispatchEvent(l)}catch(e){}}}if(e&&e.nodeName&&"TEXTAREA"===e.nodeName&&!i.has(e)){var s=null,u=e.clientWidth,a=null,p=function(){e.clientWidth!==u&&l()},c=function(t){window.removeEventListener("resize",p,!1),e.removeEventListener("input",l,!1),e.removeEventListener("keyup",l,!1),e.removeEventListener("autosize:destroy",c,!1),e.removeEventListener("autosize:update",l,!1),Object.keys(t).forEach(function(n){e.style[n]=t[n]}),i.delete(e)}.bind(e,{height:e.style.height,resize:e.style.resize,overflowY:e.style.overflowY,overflowX:e.style.overflowX,wordWrap:e.style.wordWrap});e.addEventListener("autosize:destroy",c,!1),"onpropertychange"in e&&"oninput"in e&&e.addEventListener("keyup",l,!1),window.addEventListener("resize",p,!1),e.addEventListener("input",l,!1),e.addEventListener("autosize:update",l,!1),e.style.overflowX="hidden",e.style.wordWrap="break-word",i.set(e,{destroy:c,update:l}),t()}}function o(e){var t=i.get(e);t&&t.destroy()}function r(e){var t=i.get(e);t&&t.update()}var i="function"==typeof Map?new Map:function(){var e=[],t=[];return{has:function(t){return e.indexOf(t)>-1},get:function(n){return t[e.indexOf(n)]},set:function(n,o){e.indexOf(n)===-1&&(e.push(n),t.push(o))},delete:function(n){var o=e.indexOf(n);o>-1&&(e.splice(o,1),t.splice(o,1))}}}(),d=function(e){return new Event(e,{bubbles:!0})};try{new Event("test")}catch(e){d=function(e){var t=document.createEvent("Event");return t.initEvent(e,!0,!1),t}}var l=null;"undefined"==typeof window||"function"!=typeof window.getComputedStyle?(l=function(e){return e},l.destroy=function(e){return e},l.update=function(e){return e}):(l=function(e,t){return e&&Array.prototype.forEach.call(e.length?e:[e],function(e){return n(e,t)}),e},l.destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],o),e},l.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],r),e}),t.exports=l});




/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */

(function($) {

    var types = ['DOMMouseScroll', 'mousewheel'];

    if ($.event.fixHooks) {
        for ( var i=types.length; i; ) {
            $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup: function() {
            if ( this.addEventListener ) {
                for ( var i=types.length; i; ) {
                    this.addEventListener( types[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i=types.length; i; ) {
                    this.removeEventListener( types[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },

        unmousewheel: function(fn) {
            return this.unbind("mousewheel", fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";

        // Old school scrollwheel delta
        if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
        if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }

        // New school multidimensional scroll (touchpads) deltas
        deltaY = delta;

        // Gecko
        if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaY = 0;
            deltaX = -1*delta;
        }

        // Webkit
        if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
        if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

})(jQuery);

;(function($){

    var D = $(document),
        AP = false,
        pickers = {},
        picker_active = false,
        pknum = 0;


    var spconfig = function () {

        this.defaults = {
            yearRange: [1901,2030],
            lang: ''
        };

        this.regional = [];

        this.regional[''] = {
            closeText: 'Done',
            prevText: 'Prev',
            nextText: 'Next',
            currentText: 'Today',
            monthNames: ['January','February','March','April','May','June',
                'July','August','September','October','November','December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
            weekHeader: 'Wk',
            dateFormat: 'mm/dd/yy',
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        };



        this.regional['ru'] = {
            closeText: 'Закрыть',
            prevText: '&#x3c;Пред',
            nextText: 'След&#x3e;',
            currentText: 'Сегодня',
            monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
            monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
            dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
            dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
            dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
            weekHeader: 'Не',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        };


        this.set = function (_options) {
            var options = $.extend(this.defaults,_options);
            if (this.regional[options.lang]) {
                options.regional = this.regional[options.lang];
            }
            return options;
        }

    };

    var spinpicker = function () {

        this.attach = function (el, _options) {

            pknum++;

            var sp = this;
            var pkid = new Date().getTime()+pknum+Math.floor(Math.random()*1000);

            var pck = {
                options: _options,
                pkid: pkid,
                date: new Date(),
                elem: el,
                state: {
                    cal_height: 0,
                    cal_visible: 0,
                    active: false,
                    mns: 11,
                    drag_month_max: 242,
                    cal_visible_p: 1,
                    scr_height: 22,
                    lih: 22,
                    drag_month: false,
                    drag_start_m: 0,
                    drag_year: false,
                    drag_start_y: 0,
                    block_year_click: false,
                    scroll_start: 0
                },
                div: {}
            }

            pickers[pkid] = pck;

            pck.elem.bind("focus",function(ev){
                SP.show (pck);
            });

            pck.elem.bind("blur",function(ev){
                SP.hide (pck);
            });

            pck.elem.keydown(function(e){
                SP.doKeyDown (e,pck);
            });

            pck.elem.keyup(function(e){
                SP.doKeyUp (e,pck);
            });

        }







        this.month_mouse_down = function (picker, e, el) {

            AP = picker.pkid;

            if (!picker.state.drag_month) {
                document.body.onselectstart = function () { return false }
                document.ondragstart = function () { return false }
                var spos = picker.div.months.offset();
                var pos = picker.div.main.find(".spinpicker-month-slider-hit").position();
                var sptop = false;
                if (el.hasClass("spinpicker-months")) {
                    sptop = e.pageY-spos.top-(picker.div.month_hit.height()/2);
                    picker.div.month_hit.css({top: sptop });
                    picker.div.month_slider.css({top: sptop});
                    pos = picker.div.month_hit.position();
                }
                picker.state.drag_start_m = e.pageY - pos.top;
                var crd = e.pageY - picker.state.drag_start_m;
                mousemove_month (picker.pkid,crd);
                picker.state.drag_month = true;
            }

            e.preventDefault();
        }

        var month_mouse_down = this.month_mouse_down;


        this.mousemove_month = function ( pkid, coord ) {

            if (isNaN(coord)) {return false;}


            var picker = pickers[pkid]
            var tableHeight = picker.state.cal_height;
            var visible = picker.state.cal_visible / tableHeight;
            var scroll = coord / picker.state.drag_month_max * (1-visible);
            var scrollTop = scroll * tableHeight
            if (coord > picker.state.drag_month_max - 1) { coord = picker.state.drag_month_max - 1 }
            if (coord < 1) { coord = 1 }

            picker.div.month_hit.css({top:coord});
            picker.div.month_slider.css({top:coord});
            picker.div.days.scrollTop(scrollTop);
        }

        var mousemove_month = this.mousemove_month;



        this.mousemove_year = function ( pkid, pageY ) {

            var pck = pickers[pkid];

            var distance = pageY;
            if (distance<0){distance=distance*-1}

            var scr = pck.div.main.find(".spinpicker-year-scroll");
            var coord = (pck.state.scroll_start - pageY);
            if (distance>2) {
                pck.state.block_year_click = true;
            }
            scr.scrollTop(coord);

        }

        var mousemove_year = this.mousemove_year;


        this.month_mouse_up = function ( picker, e ) {
            picker.state.drag_month = false;
            picker.state.drag_start_m = 0;
            document.body.onselectstart = null;
            document.ondragstart = null;
            e.preventDefault();
        }



        this.selectYear = function (picker, strictYear) {


            var scr = picker.div.main.find(".spinpicker-year-scroll");




            if (strictYear) {
                var nyear = strictYear;
                var index = picker.div.main.find(".spinpicker-years a[rel='"+nyear+"']").parent().index();
            } else {
                var index = Math.round((scr.scrollTop()/picker.state.lih)-0.5);
                var nyear = Number(picker.div.main.find(".spinpicker-years ul li").eq(index).find("a").text());
            }

            var accurate = picker.state.lih*index+(picker.state.lih/2);
            var nd = new Date (picker.state.date);
            nd.setFullYear(nyear);


            picker.div.main.find(".spinpicker-days-table").html(picker.calend.year(nd));
            scrollheight(picker);

            scr.scrollTop(accurate);


            if (picker.state.date.getFullYear() == nd.getFullYear()) {
                var actiived = picker.div.days.find('a[rel="'+nd.getFullYear()+'/'+nd.getMonth()+'/'+nd.getDate()+'"]');
                if (actiived.length>0) {
                    actiived.addClass("spinpicker-day-active");
                }
            }
        }

        var selectYear = this.selectYear;

        this.selectDay = function (picker, dt, noScroll) {
            if (!picker.state.lastYear) {picker.state.lastYear = dt.getFullYear();}

            var nyear = dt.getFullYear();
            if (nyear != picker.state.lastYear) {
                selectYear (picker, nyear);
            }
            var gocoord = dt.getMonth() * (picker.state.month_height/12);

            if (!noScroll) {
                mousemove_month (picker.pkid, gocoord-picker.state.lih/2);
            }

            picker.state.lastYear = picker.state.date.getFullYear();

            picker.div.days.find(".spinpicker-day-active").removeClass("spinpicker-day-active");

            var actiived = picker.div.days.find('a[rel="'+nyear+'/'+dt.getMonth()+'/'+dt.getDate()+'"]');
            actiived.addClass("spinpicker-day-active");
            picker.state.date = dt;
        }

        var selectDay = this.selectDay;


        D.delegate(".spinpicker-month-slider-hit, .spinpicker-months", "mousedown touchstart", function(ev){
            AP = false;
            var e = ev.originalEvent;
            var pkid = $(this).parents('.spinpicker').data('pkid');
            var pck = pickers[pkid];
            month_mouse_down (pck, e, $(this));
        });



        D.delegate("body","mousemove touchmove", function(ev){
            if (AP && pickers[AP]) {
                var e = ev.originalEvent;
                var pck = pickers[AP];

                if (pck.state.drag_month) {
                    pck.state.drag_year = false;
                    var crd = e.pageY - pck.state.drag_start_m;
                    mousemove_month(AP,crd);
                }

                if (pck.state.drag_year) {
                    pck.state.drag_month = false;
                    var crd = e.pageY - pck.state.drag_start_y;
                    mousemove_year(AP,crd);
                }
            }
        });




        D.delegate(".spinpicker-months","mouseleave",function(e){
            document.body.onselectstart = null;
            document.ondragstart = null;
        });




        D.delegate(".spinpicker-days, .spinpicker-months", "mousewheel", function(e, delta){
            var pkid = $(this).parents(".spinpicker").data("pkid");
            var picker = pickers[pkid];
            var pos = picker.div.main.find(".spinpicker-month-slider-hit").position();
            var crd = pos.top+(11*-delta);
            mousemove_month (pkid, crd);
            return false;
        });





        D.delegate(".spinpicker-year-slider-hit, .spinpicker-years", "mousedown touchstart", function(ev){

            var pkid = $(this).parents('.spinpicker').data('pkid');
            var pck = pickers[pkid];
            pck.state.drag_month = false;

            var e = ev.originalEvent;

            if (!pck.state.drag_year) {
                AP = pck.pkid;
                pck.state.block_year_click = false;
                var pos = pck.div.main.find(".spinpicker-year-slider-hit").position();
                pck.state.drag_start_y = e.pageY;
                pck.state.scroll_start = pck.div.main.find(".spinpicker-year-scroll").scrollTop();
                pck.state.drag_year = true;
                document.body.onselectstart = function () { return false }
                document.ondragstart = function () { return false }
            }
            ev.preventDefault();
        });



        /*
         D.delegate(".spinpicker-years a","click",function(e){

         var pkid = $(this).parents('.spinpicker').data('pkid');
         var pck = pickers[pkid];

         if (!pck.state.block_year_click) {
         var scr = $(".spinpicker-year-scroll", pck.div.main);
         var pos = $(this).position();
         var coord = pos.top - $(".spinpicker-year-slider-hit", pck.div.main).position().top;
         $(".spinpicker-days-table",pck.div.main).html(pck.calend.year(Number($(this).text())));
         scrollheight(pck);
         scr.scrollTop(coord);
         } else {
         block_year_click = false;
         }

         e.preventDefault();
         return false;
         });
         */




        D.delegate(".spinpicker-years","mousewheel",function(e,delta){
            var pkid = $(this).parents('.spinpicker').data('pkid');
            var pck = pickers[pkid];

            var scr = pck.div.main.find(".spinpicker-year-scroll");
            var scrollTop = scr.scrollTop();

            var nscroll = scrollTop+(delta*-pck.state.lih);
            if (nscroll < pck.state.lih/2) {
                nscroll = pck.state.lih/2;
            }
            scr.scrollTop(nscroll);
            selectYear(pck);
            return false;
        });


        D.delegate(".spinpicker-days a", "click", function(e) {
            var pkid = $(this).parents('.spinpicker').data('pkid');
            var pck = pickers[pkid];
            var spd = $(this).attr("rel").split("/");
            var d = new Date (spd[0],spd[1],spd[2]);
            var formattedDate = SP.formatDate (pck.options.regional.dateFormat, d, pck.options.regional);

            selectDay (pck, d, true);
            pck.elem.val(formattedDate).focus().change();

        });



        D.bind("mouseup touchend",function(){
            if (AP) {
                if (pickers[AP]) {
                    var pck = pickers[AP];
                    if (pck.state.drag_year) {
                        selectYear(pck);
                    }
                    pck.state.drag_month = false;
                    pck.state.drag_year = false;
                }
                AP = false;
            }

        });


        this.doKeyDown = function (e, pck) {
            switch (e.keyCode) {
                case 9: {
                    pck.state.hover = false;
                    SP.hide(pck);
                }
                case 27: {
                    pck.state.hover = false;
                    SP.hide(pck);
                }
            }
        }


        this.doKeyUp = function (e, pck) {
            var d = parseDate (pck.options.regional.dateFormat, pck.elem.val(), pck.options.regional);
            if (d) {

                selectDay (pck, d);
            }
        }




        this.show = function (pck) {

            if (!pck.state.active) {


                pck.state.D = {
                    yy: this.formatDate( 'yy', pck.date, pck.options.regional )
                }

                var offset = pck.elem.offset();




                pck.div.main = $('<div>',{
                    "id": "spinpicker-"+pck.pkid,
                    "class": "spinpicker"
                }).css({
                    top: offset.top+pck.elem.outerHeight(),
                    left: offset.left
                }).data({'pkid':pck.pkid});

                pck.div.days = $('<div>',{
                    "id": "spinpicker-days-"+pck.pkid,
                    "class": "spinpicker-days"
                });

                pck.div.months = $('<div>',{
                    "id": "spinpicker-months-"+pck.pkid,
                    "class": "spinpicker-months"
                });

                pck.div.years = $('<div>',{
                    "id": "spinpicker-years-"+pck.pkid,
                    "class": "spinpicker-years"
                });


                pck.calend = new this.calend(pck.options);
                pck.state.date = parseDate (pck.options.regional.dateFormat, pck.elem.val(), pck.options.regional);




                if (pck.state.date) {

                } else {
                    pck.state.date = new Date();
                }


                pck.div.days.html('<div id="spinpicker-days-table" class="spinpicker-days-table">'+pck.calend.year(pck.state.date)+'</div>');

                var ml = '<div id="spinpicker-month-slider" class="spinpicker-month-slider"><div></div></div><ul>';
                for (var m=0;m<=11;m++) {
                    ml += '<li><a rel="'+m+'">'+pck.options.regional.monthNames[m]+'</a></li>'
                }
                ml += '</ul><div class="spinpicker-month-over"></div><div id="spinpicker-month-slider-hit" class="spinpicker-month-slider-hit"></div>';
                var monthList = ml;

                pck.div.months.html(monthList);

                var years_slider = '<div id="spinpicker-year-slider" class="spinpicker-year-slider"><div></div></div><div id="spinpicker-year-scroll" class="spinpicker-year-scroll"><ul style="padding: 121px 0px 140px 0px;">';
                for (var y = pck.options.yearRange[0]; y<=pck.options.yearRange[1]; y++) {
                    years_slider += '<li><a rel="'+y+'">'+y+'</a></li>';
                }
                years_slider += '</ul></div><div class="spinpicker-year-over"></div><div id="spinpicker-year-slider-hit" class="spinpicker-year-slider-hit"><div>';

                pck.div.years.html(years_slider);

                var weekDaysRaw = '<table class="spinpicker-weekdays"><tbody><tr>';
                for (var i = 0; i < 7; i++ ) {
                    var j = i;
                    if (pck.options.regional.firstDay) {
                        j += pck.options.regional.firstDay;

                        if (j >= 7) {
                            var fstwks = pck.options.regional.firstDay/7;
                            j = j-Math.floor(fstwks)*7-7;
                        }
                    }
                    weekDaysRaw+= '<td>'+pck.options.regional.dayNamesMin[j]+'</td>';
                }
                weekDaysRaw += '</tr></tbody></table>';

                pck.div.weekDays = $(weekDaysRaw);
                pck.div.main.append(pck.div.weekDays, pck.div.days, pck.div.months, pck.div.years);
                $("body").append(pck.div.main);

                pck.div.main.bind("mouseenter", function(){
                    pck.state.hover = true;
                });

                pck.div.main.bind("mouseleave", function(){
                    pck.state.hover = false;
                });

                pck.div.main.bind ("click", function(e) {
                    pck.elem.focus();
                })


                pck.div.month_hit = pck.div.main.find(".spinpicker-month-slider-hit");
                pck.div.month_slider = pck.div.main.find(".spinpicker-month-slider");
                pck.div.months = pck.div.main.find(".spinpicker-months");

                this.scrollheight (pck);

                pck.state.month_height = pck.div.months.height();
                pck.state.drag_month_max = pck.state.month_height - pck.div.month_hit.height();
                pck.div.yearcroll = pck.div.main.find(".spinpicker-year-scroll");
                pck.state.lih = pck.div.main.find(".spinpicker-year-scroll li").height();
                var index = pck.div.main.find(".spinpicker-years a[rel='"+pck.state.date.getFullYear()+"']").parent().index();
                pck.div.yearcroll.scrollTop (pck.state.lih*index+(pck.state.lih/2));
                this.selectDay (pck, pck.state.date);

                pck.state.active = true;
                pck.div.main.show();
            }
        }

        var show = this.show;

        this.hide = function (picker) {
            if (!picker.state.hover) {
                picker.state.active = false;
                picker.div.main.hide()
                picker.div.main.remove();
            }
        }

        var hide = this.hide;


        this.scrollheight = function (picker) {
            picker.state.cal_height = picker.div.main.find(".spinpicker-days-table").height();
            picker.state.cal_visible = picker.div.days.height();
            picker.state.cal_visible_p = picker.state.cal_visible/picker.state.cal_height;
            picker.state.scr_height = Math.floor(picker.div.months.height()*picker.state.cal_visible_p);
            picker.state.drag_month_max = picker.div.months.height() - picker.state.scr_height;
            var coord = $(picker.div.month_hit).position().top;
            if (coord > picker.state.drag_month_max - 1) { coord = picker.state.drag_month_max - 1 }
            picker.div.month_hit.css({
                height:picker.state.scr_height,
                top:coord
            });
            picker.div.month_slider.css({
                height:picker.state.scr_height,
                top:coord
            });

        }

        var scrollheight = this.scrollheight;







        this.calend =  function (options) {

            var start_day;

            return {

                isLeap: function (year) {
                    if(year%4 == 0) {
                        if(year%100 == 0) {
                            if(year%400 == 0) {
                                return true;
                            }
                            else
                                return false;
                        }
                        else
                            return true;
                    }
                    return false;
                },


                month: function (index, year) {
                    var dim = [31,28,31,30,31,30,31,31,30,31,30,31]



                    if (this.isLeap(year)) { dim[1]=29 }

                    var m = dim[index];
                    var day = 1;
                    var table = '';
                    var mtop = '';
                    var cropping = (options.regional.monthNames[index].length - start_day);

                    if ((start_day > 3 || (cropping>-2 && cropping <2)) && start_day < 8) {
                        mtop = 'spinpicker-month-top';
                    }
                    table += '<h3><b>'+options.regional.monthNames[index]+'</b></h3><table id="spinpicker-month-'+(index+1)+'" class="spinpicker-month spinpicker-month-'+(index+1)+' '+mtop+'"><tbody><tr>';
                    for (var i=1; i<start_day; i++){
                        table += "<td></td>";
                    }
                    for (var i=start_day; i<8; i++){
                        table += '<td><a rel="'+year+'/'+index+'/'+day+'">'+day+'</a></td>';
                        day++;
                    }

                    table += "<tr>";
                    while (day <= m) {
                        for (var i=1; i<=7 && day<=m; i++){
                            table += '<td><a rel="'+year+'/'+index+'/'+day+'">'+day+'</a></td>';
                            day++;
                        }
                        table += "</tr><tr>";
                        start_day = i;
                    }
                    table += "</tr></tbody></table>";
                    return table;
                },

                year: function (dt) {

                    var st = new Date ('January 1, '+dt.getFullYear());
                    var year = st.getFullYear();
                    start_day = st.getDay()+1;
                    if (options.regional.firstDay) {
                        start_day = start_day-options.regional.firstDay;
                    }
                    if (start_day<=0) {
                        start_day+=7;
                    }
                    var calend = '';
                    for (var f=0;f<=11;f++) {
                        calend += this.month(f, year);
                    }
                    return calend;
                }
            }
        }





        this.parseDate = function (format, value, settings) {

            var shortYearCutoff = 0;
            this._daylightSavingAdjust = function(date) {
                if (!date) return null;
                date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
                return date;
            }

            if (format == null || value == null)
                return false;
            value = (typeof value == 'object' ? value.toString() : value + '');
            if (value == '')
                return null;

            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var year = -1;
            var month = -1;
            var day = -1;
            var doy = -1;
            var literal = false;
            // Check whether a format character is doubled
            var lookAhead = function(match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches)
                    iFormat++;
                return matches;
            };
            // Extract a number from the string value
            var getNumber = function(match) {
                var isDoubled = lookAhead(match);
                var size = (match == '@' ? 14 : (match == '!' ? 20 :
                    (match == 'y' && isDoubled ? 4 : (match == 'o' ? 3 : 2))));
                var digits = new RegExp('^\\d{1,' + size + '}');
                var num = value.substring(iValue).match(digits);
                if (!num)
                    return false
                iValue += num[0].length;
                return parseInt(num[0], 10);
            };
            // Extract a name from the string value and convert to an index
            var getName = function(match, shortNames, longNames) {
                var names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
                    return [ [k, v] ];
                }).sort(function (a, b) {
                    return -(a[1].length - b[1].length);
                });
                var index = -1;
                $.each(names, function (i, pair) {
                    var name = pair[1];
                    if (value.substr(iValue, name.length).toLowerCase() == name.toLowerCase()) {
                        index = pair[0];
                        iValue += name.length;
                        return false;
                    }
                });
                if (index != -1)
                    return index + 1;
                else
                    throw 'Unknown name at position ' + iValue;
            };
            // Confirm that a literal character matches the string value
            var checkLiteral = function() {
                if (value.charAt(iValue) != format.charAt(iFormat))
                    return false
                iValue++;
            };
            var iValue = 0;
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal)
                    if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                        literal = false;
                    else
                        checkLiteral();
                else
                    switch (format.charAt(iFormat)) {
                        case 'd':
                            day = getNumber('d');
                            break;
                        case 'D':
                            getName('D', dayNamesShort, dayNames);
                            break;
                        case 'o':
                            doy = getNumber('o');
                            break;
                        case 'm':
                            month = getNumber('m');
                            break;
                        case 'M':
                            month = getName('M', monthNamesShort, monthNames);
                            break;
                        case 'y':
                            year = getNumber('y');
                            break;
                        case '@':
                            var date = new Date(getNumber('@'));
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case '!':
                            var date = new Date((getNumber('!') - this._ticksTo1970) / 10000);
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case "'":
                            if (lookAhead("'"))
                                checkLiteral();
                            else
                                literal = true;
                            break;
                        default:
                            checkLiteral();
                    }
            }
            if (year == -1)
                year = new Date().getFullYear();
            else if (year < 100)
                year += new Date().getFullYear() - new Date().getFullYear() % 100 +
                    (year <= shortYearCutoff ? 0 : -100);
            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    var dim = this._getDaysInMonth(year, month - 1);
                    if (day <= dim)
                        break;
                    month++;
                    day -= dim;
                } while (true);
            }
            var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
            if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
                return false
            return date;
        }

        var parseDate = this.parseDate;



        this.defaultFormats = {
            ATOM: 'yy-mm-dd',
            COOKIE: 'D, dd M yy',
            ISO_8601: 'yy-mm-dd',
            RFC_822: 'D, d M y',
            RFC_850: 'DD, dd-M-y',
            RFC_1036: 'D, d M y',
            RFC_1123: 'D, d M yy',
            RFC_2822: 'D, d M yy',
            RSS: 'D, d M y',
            TICKS: '!',
            TIMESTAMP: '@',
            W3C: 'yy-mm-dd'
        }

        this._ticksTo1970 = (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
        Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),


            this.formatDate = function (format, date, settings) {
                if (!date)
                    return '';
                var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
                var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
                var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
                var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;

                var lookAhead = function(match) {
                    var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                    if (matches)
                        iFormat++;
                    return matches;
                };

                var formatNumber = function(match, value, len) {
                    var num = '' + value;
                    if (lookAhead(match))
                        while (num.length < len)
                            num = '0' + num;
                    return num;
                };

                var formatName = function(match, value, shortNames, longNames) {
                    return (lookAhead(match) ? longNames[value] : shortNames[value]);
                };
                var output = '';
                var literal = false;
                if (date)
                    for (var iFormat = 0; iFormat < format.length; iFormat++) {
                        if (literal)
                            if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                                literal = false;
                            else
                                output += format.charAt(iFormat);
                        else
                            switch (format.charAt(iFormat)) {
                                case 'd':
                                    output += formatNumber('d', date.getDate(), 2);
                                    break;
                                case 'D':
                                    output += formatName('D', date.getDay(), dayNamesShort, dayNames);
                                    break;
                                case 'o':
                                    output += formatNumber('o',
                                        (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000, 3);
                                    break;
                                case 'm':
                                    output += formatNumber('m', date.getMonth() + 1, 2);
                                    break;
                                case 'M':
                                    output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
                                    break;
                                case 'y':
                                    output += (lookAhead('y') ? date.getFullYear() :
                                    (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
                                    break;
                                case '@':
                                    output += date.getTime();
                                    break;
                                case '!':
                                    output += date.getTime() * 10000 + this._ticksTo1970;
                                    break;
                                case "'":
                                    if (lookAhead("'"))
                                        output += "'";
                                    else
                                        literal = true;
                                    break;
                                default:
                                    output += format.charAt(iFormat);
                            }
                    }
                return output;
            }

        var formatDate = this.formatDate;

    }

    var SP = new spinpicker();

    $.fn.spinpicker = function(options){

        var config = new spconfig (options);

        var _options = config.set (options);

        return this.each(function(i,el){
            SP.attach($(el),_options);
        });

    }

    $.spinpicker = SP;

})(jQuery);

/*
 * jquery.mask.js
 */
'use strict';(function(a,b,c){if(typeof define==='function'&&define.amd){define(['jquery'],a)}else if(typeof exports==='object'){module.exports=a(require('jquery'))}else{a(b||c)}}(function(f){var z=function(i,m,o){var d={invalid:[],getCaret:function(){try{var a,b=0,c=i.get(0),h=document.selection,g=c.selectionStart;if(h&&navigator.appVersion.indexOf('MSIE 10')===-1){a=h.createRange();a.moveStart('character',-d.val().length);b=a.text.length}else if(g||g==='0'){b=g}return b}catch(e){}},setCaret:function(a){try{if(i.is(':focus')){var b,c=i.get(0);if(c.setSelectionRange){c.focus();c.setSelectionRange(a,a)}else{b=c.createTextRange();b.collapse(true);b.moveEnd('character',a);b.moveStart('character',a);b.select()}}}catch(e){}},events:function(){i.on('keydown.mask',function(a){i.data('mask-keycode',a.keyCode||a.which)}).on(f.jMaskGlobals.useInput?'input.mask':'keyup.mask',d.behaviour).on('paste.mask drop.mask',function(){setTimeout(function(){i.keydown().keyup()},100)}).on('change.mask',function(){i.data('changed',true)}).on('blur.mask',function(){if(w!==d.val()&&!i.data('changed')){i.trigger('change')}i.data('changed',false)}).on('blur.mask',function(){w=d.val()}).on('focus.mask',function(a){if(o.selectOnFocus===true){f(a.target).select()}}).on('focusout.mask',function(){if(o.clearIfNotMatch&&!A.test(d.val())){d.val('')}})},getRegexMask:function(){var a=[],b,c,h,g,k,j;for(var n=0;n<m.length;n++){b=l.translation[m.charAt(n)];if(b){c=b.pattern.toString().replace(/.{1}$|^.{1}/g,'');h=b.optional;g=b.recursive;if(g){a.push(m.charAt(n));k={digit:m.charAt(n),pattern:c}}else{a.push(!h&&!g?c:(c+'?'))}}else{a.push(m.charAt(n).replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&'))}}j=a.join('');if(k){j=j.replace(new RegExp('('+k.digit+'(.*'+k.digit+')?)'),'($1)?').replace(new RegExp(k.digit,'g'),k.pattern)}return new RegExp(j)},destroyEvents:function(){i.off(['input','keydown','keyup','paste','drop','blur','focusout',''].join('.mask '))},val:function(a){var b=i.is('input'),c=b?'val':'text',h;if(arguments.length>0){if(i[c]()!==a){i[c](a)}h=i}else{h=i[c]()}return h},getMCharsBeforeCount:function(a,b){for(var c=0,h=0,g=m.length;h<g&&h<a;h++){if(!l.translation[m.charAt(h)]){a=b?a+1:a;c++}}return c},caretPos:function(a,b,c,h){var g=l.translation[m.charAt(Math.min(a-1,m.length-1))];return!g?d.caretPos(a+1,b,c,h):Math.min(a+c-b-h,c)},behaviour:function(a){a=a||window.event;d.invalid=[];var b=i.data('mask-keycode');if(f.inArray(b,l.byPassKeys)===-1){var c=d.getCaret(),h=d.val(),g=h.length,k=d.getMasked(),j=k.length,n=d.getMCharsBeforeCount(j-1)-d.getMCharsBeforeCount(g-1),p=c<g;d.val(k);if(p){if(!(b===8||b===46)){c=d.caretPos(c,g,j,n)}d.setCaret(c)}return d.callbacks(a)}},getMasked:function(a,b){var c=[],h=b===undefined?d.val():b+'',g=0,k=m.length,j=0,n=h.length,p=1,s='push',t=-1,r,x;if(o.reverse){s='unshift';p=-1;r=0;g=k-1;j=n-1;x=function(){return g>-1&&j>-1}}else{r=k-1;x=function(){return g<k&&j<n}}while(x()){var y=m.charAt(g),u=h.charAt(j),q=l.translation[y];if(q){if(u.match(q.pattern)){c[s](u);if(q.recursive){if(t===-1){t=g}else if(g===r){g=t-p}if(r===t){g-=p}}g+=p}else if(q.optional){g+=p;j-=p}else if(q.fallback){c[s](q.fallback);g+=p;j-=p}else{d.invalid.push({p:j,v:u,e:q.pattern})}j+=p}else{if(!a){c[s](y)}if(u===y){j+=p}g+=p}}var B=m.charAt(r);if(k===n+1&&!l.translation[B]){c.push(B)}return c.join('')},callbacks:function(h){var g=d.val(),k=g!==w,j=[g,h,i,o],n=function(a,b,c){if(typeof o[a]==='function'&&b){o[a].apply(this,c)}};n('onChange',k===true,j);n('onKeyPress',k===true,j);n('onComplete',g.length===m.length,j);n('onInvalid',d.invalid.length>0,[g,h,i,d.invalid,o])}};i=f(i);var l=this,w=d.val(),A;m=typeof m==='function'?m(d.val(),undefined,i,o):m;l.mask=m;l.options=o;l.remove=function(){var a=d.getCaret();d.destroyEvents();d.val(l.getCleanVal());d.setCaret(a-d.getMCharsBeforeCount(a));return i};l.getCleanVal=function(){return d.getMasked(true)};l.getMaskedVal=function(a){return d.getMasked(false,a)};l.init=function(a){a=a||false;o=o||{};l.clearIfNotMatch=f.jMaskGlobals.clearIfNotMatch;l.byPassKeys=f.jMaskGlobals.byPassKeys;l.translation=f.extend({},f.jMaskGlobals.translation,o.translation);l=f.extend(true,{},l,o);A=d.getRegexMask();if(a===false){if(o.placeholder){i.attr('placeholder',o.placeholder)}if(i.data('mask')){i.attr('autocomplete','off')}d.destroyEvents();d.events();var b=d.getCaret();d.val(d.getMasked());d.setCaret(b+d.getMCharsBeforeCount(b,true))}else{d.events();d.val(d.getMasked())}};l.init(!i.is('input'))};f.maskWatchers={};var D=function(){var a=f(this),b={},c='data-mask-',h=a.attr('data-mask');if(a.attr(c+'reverse')){b.reverse=true}if(a.attr(c+'clearifnotmatch')){b.clearIfNotMatch=true}if(a.attr(c+'selectonfocus')==='true'){b.selectOnFocus=true}if(C(a,h,b)){return a.data('mask',new z(this,h,b))}},C=function(a,b,c){c=c||{};var h=f(a).data('mask'),g=JSON.stringify,k=f(a).val()||f(a).text();try{if(typeof b==='function'){b=b(k)}return typeof h!=='object'||g(h.options)!==g(c)||h.mask!==b}catch(e){}},E=function(a){var b=document.createElement('div'),c;a='on'+a;c=(a in b);if(!c){b.setAttribute(a,'return;');c=typeof b[a]==='function'}b=null;return c};f.fn.mask=function(a,b){b=b||{};var c=this.selector,h=f.jMaskGlobals,g=h.watchInterval,k=b.watchInputs||h.watchInputs,j=function(){if(C(this,a,b)){return f(this).data('mask',new z(this,a,b))}};f(this).each(j);if(c&&c!==''&&k){clearInterval(f.maskWatchers[c]);f.maskWatchers[c]=setInterval(function(){f(document).find(c).each(j)},g)}return this};f.fn.masked=function(a){return this.data('mask').getMaskedVal(a)};f.fn.unmask=function(){clearInterval(f.maskWatchers[this.selector]);delete f.maskWatchers[this.selector];return this.each(function(){var a=f(this).data('mask');if(a){a.remove().removeData('mask')}})};f.fn.cleanVal=function(){return this.data('mask').getCleanVal()};f.applyDataMask=function(a){a=a||f.jMaskGlobals.maskElements;var b=(a instanceof f)?a:f(a);b.filter(f.jMaskGlobals.dataMaskAttr).each(D)};var v={maskElements:'input,td,span,div',dataMaskAttr:'*[data-mask]',dataMask:true,watchInterval:300,watchInputs:true,useInput:E('input'),watchDataMask:false,byPassKeys:[9,16,17,18,36,37,38,39,40,91],translation:{'0':{pattern:/\d/},'9':{pattern:/\d/,optional:true},'#':{pattern:/\d/,recursive:true},'A':{pattern:/[a-zA-Z0-9]/},'S':{pattern:/[a-zA-Z]/}}};f.jMaskGlobals=f.jMaskGlobals||{};v=f.jMaskGlobals=f.extend(true,{},v,f.jMaskGlobals);if(v.dataMask){f.applyDataMask()}setInterval(function(){if(f.jMaskGlobals.watchDataMask){f.applyDataMask()}},v.watchInterval)},window.jQuery,window.Zepto));


/* liteUploader v2.1.1 | https://github.com/burt202/lite-uploader | Aaron Burtnyk (http://www.burtdev.net) */
$.fn.liteUploader = function (options) {
    var defaults = {
        script: null,
        rules: {
            allowedFileTypes: null,
            maxSize: null
        },
        params: {},
        changeHandler: true,
        clickElement: null
    };

    return this.each(function () {
        $.data(this, 'liteUploader', new LiteUploader(this, $.extend(defaults, options)));
    });
};

function LiteUploader (element, options) {
    this.el = $(element);
    this.options = options;
    this.params = options.params;
    this.xhr = this._buildXhrObject();

    this._init();
}

LiteUploader.prototype = {
    _init: function () {
        if (this.options.changeHandler) {
            this.el.change(function () {
                this._start();
            }.bind(this));
        }

        if (this.options.clickElement) {
            this.options.clickElement.click(function () {
                this._start();
            }.bind(this));
        }
    },

    _buildXhrObject: function () {
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', this._onProgress.bind(this), false);
        return xhr;
    },

    _onProgress: function (evt) {
        if (evt.lengthComputable) {
            this.el.trigger('lu:progress', Math.floor((evt.loaded / evt.total) * 100));
        }
    },

    _start: function () {
        var files = this.el.get(0).files;

        if (this._validateInput(files)) {
            this._resetInput();
            return;
        }

        if (this._validateFiles(files)) {
            this._resetInput();
            return;
        }

        this.el.trigger('lu:before', [files]);
        this._performUpload(this._collateFormData(files));
    },

    _resetInput: function () {
        this.el.val('');
    },

    _validateInput: function (files) {
        var errors = [];

        if (!this.el.attr('name')) {
            errors.push('the file input element must have a name attribute');
        }

        if (!this.options.script) {
            errors.push('the script option is required');
        }

        if (files.length === 0) {
            errors.push('at least one file must be selected');
        }

        this.el.trigger('lu:errors', [[{
            name: 'liteUploader_input',
            errors: errors
        }]]);

        if (errors.length > 0) {
            return true;
        }
        return false;
    },

    _validateFiles: function (files) {
        var errorsPresent = false,
            errorReporter = [];

        $.each(files, function (i) {
            var errorsFound = this._findErrors(files[i]);

            errorReporter.push({
                name: files[i].name,
                errors: errorsFound
            });

            if (errorsFound.length > 0) {
                errorsPresent = true;
            }
        }.bind(this));

        this.el.trigger('lu:errors', [errorReporter]);
        return errorsPresent;
    },

    _findErrors: function (file) {
        var errorsArray = [];

        $.each(this.options.rules, function (key, value) {
            if (key === 'allowedFileTypes' && value && $.inArray(file.type, value.split(',')) === -1) {
                errorsArray.push({'type': 'type', 'rule': value, 'given': file.type});
            }

            if (key === 'maxSize' && value && file.size > value) {
                errorsArray.push({'type': 'size', 'rule': value, 'given': file.size});
            }
        });

        return errorsArray;
    },

    _getFormDataObject: function () {
        return new FormData();
    },

    _collateFormData: function (files) {
        var formData = this._getFormDataObject();

        if (this.el.attr('id')) {
            formData.append('liteUploader_id', this.el.attr('id'));
        }

        $.each(this.params, function (key, value) {
            formData.append(key, value);
        });

        $.each(files, function (i) {
            formData.append(this.el.attr('name'), files[i]);
        }.bind(this));

        return formData;
    },

    _performUpload: function (formData) {
        $.ajax({
            xhr: function () {
                return this.xhr;
            }.bind(this),
            url: this.options.script,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false
        })
            .done(function(response){
                this.el.trigger('lu:success', response);
            }.bind(this))
            .fail(function(jqXHR) {
                this.el.trigger('lu:fail', jqXHR);
            }.bind(this))
            .always(function() {
                this._resetInput();
            }.bind(this));
    },

    addParam: function (key, value) {
        this.params[key] = value;
    },

    removeParam: function (key) {
        delete this.params[key];
    },

    cancelUpload: function () {
        this.xhr.abort();
        this.el.trigger('lu:cancelled');
        this._resetInput();
    }
};


(function ($) {
    $.fn.customizeForm = function () {
        this.each(function () {
            var input = $(this);
            if (!input.data('initialized')) {
                do_customInput(input);
            }
        });

        return this;
    };
    var do_customInput = function (input) {
        if (input.is('input')) {
            var type = input.attr('type');
            if (type == 'radio' || type == 'checkbox') {

                if (input.parent().is('label')) {
                    input.parent().addClass('custom_input_label');
                }
                input.addClass('custom_input');
                input.after($('<span class="custom_input custom_input_' + type + '"></span>'));
            }
        }
        input.data('initialized', '1')
    }
})(jQuery);



/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + (options.path) : '; path=/';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

var preloader = {
    temp: function(text){
        var temp = '<div class="a_preloader_wrap" onclick="event.stopPropagation();"><div class="a_preloader">' + text + '</div></div>';
        return temp;
    },
    _show: function(clName, moreStyles, text){
        var _this = this;
        var styles = {};
        var elem = typeof clName == 'object' ? clName : $(clName);
        var text = text != undefined ? text : 'Пожалуйста, подождите...';
        _this._hide();

        if(elem.length == 0){return $('<div />');}

        if(clName != undefined){
            styles['top'] = elem.position().top + 'px';
            styles['left'] = elem.position().left + 'px';
            styles['height'] = elem.outerHeight() + 'px';
            styles['width'] = elem.outerWidth(true) + 'px';
            styles['border-radius'] =  '4px';
        }else{
            elem = $('body');
            styles['position'] = 'fixed';
            styles['top'] = '0';
            styles['left'] = '0';
            styles['width'] = '100%';
            styles['height'] = '100%';
        }

        var preloaderEl = $(_this.temp(text));
        if (moreStyles != undefined && typeof moreStyles == 'object'){
            styles = $.extend(styles, moreStyles);
        }
        preloaderEl.css(styles);
        elem.after(preloaderEl);
        return preloaderEl;
    },

    _hide: function(){
        $('.a_preloader_wrap').remove();
    }
};