export function elementResizeEvents(element, fn) {
    var document = window.document;
  
    var attachEvent = (document as any).attachEvent;
    if (typeof navigator !== "undefined") {
      var isIE = navigator.userAgent.match(/Trident/);
    }
  
    var requestFrame = (function() {
        var raf = window.requestAnimationFrame || (window as any).mozRequestAnimationFrame || (window as any).webkitRequestAnimationFrame || function(fn) {
            return window.setTimeout(fn, 20);
        };
        return function(fn) {
            return raf(fn);
        };
    })();
  
    var cancelFrame = (function() {
        var cancel = window.cancelAnimationFrame || (window as any).mozCancelAnimationFrame || (window as any).webkitCancelAnimationFrame ||
            window.clearTimeout;
        return function(id) {
            return cancel(id);
        };
    })();
  
    function resizeListener(e) {
        var win = e.target || e.srcElement;
        if (win.__resizeRAF__) {
            cancelFrame(win.__resizeRAF__);
        }
        win.__resizeRAF__ = requestFrame(function() {
            var trigger = win.__resizeTrigger__;
            trigger.__resizeListeners__.forEach(function(fn) {
                fn.call(trigger, e);
            });
        });
    }
  
    function objectLoad(this: any, e) {
        this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__;
        this.contentDocument.defaultView.addEventListener('resize', resizeListener);
    }
  
    if (!element.__resizeListeners__) {
        element.__resizeListeners__ = [];
        if (attachEvent) {
            element.__resizeTrigger__ = element;
            element.attachEvent('onresize', resizeListener);
        } else {
            if (getComputedStyle(element).position == 'static') {
                element.style.position = 'relative';
            }
            var obj: any = element.__resizeTrigger__ = document.createElement('object');
            obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');
            obj.setAttribute('class', 'resize-sensor');
            obj.__resizeElement__ = element;
            obj.onload = objectLoad;
            obj.type = 'text/html';
            if (isIE) {
                element.appendChild(obj);
            }
            obj.data = 'about:blank';
            if (!isIE) {
                element.appendChild(obj);
            }
        }
    }
    element.__resizeListeners__.push(fn);
};