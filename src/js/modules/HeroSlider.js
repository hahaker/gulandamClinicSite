// ============ HeroSlider.js ============
import {DOMUtils} from "../core/DOMUtils.js";
export class HeroSlider {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.currentSlide = 0;
        this.slides = DOMUtils.qsa('.hero__slide');
        this.texts = DOMUtils.qsa('.hero__text');
        this.controlsContainer = DOMUtils.qs('#controls');
        this.prevBtn = DOMUtils.qs('#prevBtn');
        this.nextBtn = DOMUtils.qs('#nextBtn');

        this.totalSlides = this.slides.length;
        this.autoplayInterval = null;

        this.init();
    }

    init() {
        this.createControls();
        this.bindEvents();
        this.startAutoplay();
    }

    createControls() {
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Перейти на слайд ${i + 1}`);
            dot.addEventListener('click', () => this.goToSlide(i));
            this.controlsContainer.appendChild(dot);
        }
    }

    bindEvents() {
        DOMUtils.on(this.prevBtn, 'click', () => this.prevSlide());
        DOMUtils.on(this.nextBtn, 'click', () => this.nextSlide());
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlides();
        this.resetAutoplay();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlides();
        this.resetAutoplay();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlides();
        this.resetAutoplay();
    }

    updateSlides() {
        const slides = DOMUtils.qsa('.hero__slide');
        const texts = DOMUtils.qsa('.hero__text');
        const dots = DOMUtils.qsa('.dot');

        slides.forEach((slide, i) => {
            DOMUtils.toggleClass(slide, 'hero__slide--active', i === this.currentSlide);
        });

        texts.forEach((text, i) => {
            DOMUtils.toggleClass(text, 'hero__text--active', i === this.currentSlide);
        });

        dots.forEach((dot, i) => {
            DOMUtils.toggleClass(dot, 'active', i === this.currentSlide);
        });

        this.eventBus.emit('slide-changed', { index: this.currentSlide });
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => this.nextSlide(), 5000);
    }

    resetAutoplay() {
        clearInterval(this.autoplayInterval);
        this.startAutoplay();
    }

    destroy() {
        clearInterval(this.autoplayInterval);
        DOMUtils.off(this.prevBtn, 'click', () => this.prevSlide());
        DOMUtils.off(this.nextBtn, 'click', () => this.nextSlide());
    }
}