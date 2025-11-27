// ============ ScrollHandler.js ============
import {DOMUtils} from "../core/DOMUtils.js";

export class ScrollHandler {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.setupObserver();
        }
    }

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-enter');
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        DOMUtils.qsa('.service-card, .collage__item').forEach(el => {
            observer.observe(el);
        });
    }
}