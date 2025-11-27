export class DOMUtils {
    static qs(selector, parent = document) {
        return parent.querySelector(selector);
    }

    static qsa(selector, parent = document) {
        return Array.from(parent.querySelectorAll(selector));
    }

    static addClass(el, className) {
        if (Array.isArray(el)) {
            el.forEach(e => e.classList.add(className));
        } else {
            el.classList.add(className);
        }
    }

    static removeClass(el, className) {
        if (Array.isArray(el)) {
            el.forEach(e => e.classList.remove(className));
        } else {
            el.classList.remove(className);
        }
    }

    static toggleClass(el, className, force) {
        if (Array.isArray(el)) {
            el.forEach(e => e.classList.toggle(className, force));
        } else {
            el.classList.toggle(className, force);
        }
    }

    static hasClass(el, className) {
        return el.classList.contains(className);
    }

    static setAttr(el, attrs) {
        Object.entries(attrs).forEach(([key, value]) => {
            el.setAttribute(key, value);
        });
    }

    static on(el, event, handler) {
        if (Array.isArray(el)) {
            el.forEach(e => e.addEventListener(event, handler));
        } else {
            el.addEventListener(event, handler);
        }
    }

    static off(el, event, handler) {
        if (Array.isArray(el)) {
            el.forEach(e => e.removeEventListener(event, handler));
        } else {
            el.removeEventListener(event, handler);
        }
    }
}