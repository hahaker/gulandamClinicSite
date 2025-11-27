// ============ ServiceCarousel.js ============
import {DOMUtils} from "../core/DOMUtils.js";
export class ServiceCarousel {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.container = DOMUtils.qs('.services__container');
        this.prevBtn = DOMUtils.qs('.services__arrow--prev');
        this.nextBtn = DOMUtils.qs('.services__arrow--next');
        this.cardWidth = 280 + 30; // width + gap
        this.scrollAmount = this.cardWidth * 1;

        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        DOMUtils.on(this.prevBtn, 'click', () => this.scroll(-this.scrollAmount));
        DOMUtils.on(this.nextBtn, 'click', () => this.scroll(this.scrollAmount));
    }

    scroll(amount) {
        this.container.scrollBy({
            left: amount,
            behavior: 'smooth'
        });
    }
}