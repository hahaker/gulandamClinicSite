// ============ Header.js ============

import {DOMUtils} from "../core/DOMUtils.js";
export class Header {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.header = DOMUtils.qs('.header');
        this.links = DOMUtils.qsa('.header__link');
        this.scrollThreshold = 50;

        this.init();
    }

    init() {
        this.bindEvents();
        this.setupScrollListener();
    }

    bindEvents() {
        DOMUtils.on(this.links, 'click', (e) => this.handleNavClick(e));
    }

    handleNavClick(e) {
        const action = e.target.getAttribute('data-action');
        if (action === 'book') {
            this.eventBus.emit('book-click');
        }
    }

    setupScrollListener() {
        window.addEventListener('scroll', () => this.onScroll());
    }

    onScroll() {
        const isScrolled = window.scrollY > this.scrollThreshold;
        DOMUtils.toggleClass(this.header, 'scrolled', isScrolled);
    }
}