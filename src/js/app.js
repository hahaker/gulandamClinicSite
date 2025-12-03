// ============ app.js - ГЛАВНЫЙ ФАЙЛ ============
import { EventBus } from './core/EventBus.js';
import { DOMUtils } from './core/DOMUtils.js';
import { Header } from './modules/Header.js';
import { HeroSlider } from './modules/HeroSlider.js';
import { ServiceCarousel } from './modules/ServiceCarousel.js';
import { ScrollHandler } from './modules/ScrollHandler.js';
import {MobileMenu} from './modules/MobileHeaderMenu.js';
import {BookingModal} from './modules/BookingModal.js';
import {SmoothScroll} from './modules/SmoothScroll.js';

class Application {
    constructor() {
        this.eventBus = new EventBus();
        this.modules = {};

        this.init();
    }

    init() {
        this.registerModules();
        this.setupGlobalListeners();
        console.log('✓ Application initialized');
    }

    registerModules() {
        this.modules.heroSlider = new HeroSlider(this.eventBus);
        this.modules.serviceCarousel = new ServiceCarousel(this.eventBus);
        this.modules.scrollHandler = new ScrollHandler(this.eventBus)
        this.modules.MobileMenu = new MobileMenu(this.eventBus);
        this.modules.BookingModal = new BookingModal(this.eventBus);
        this.modules.SmoothScroll = new SmoothScroll(this.eventBus);
    }

    setupGlobalListeners() {
        this.eventBus.on('book-click', () => {
            console.log('📅 Booking clicked');
            // Можно добавить модальное окно для бронирования
        });

        this.eventBus.on('slide-changed', (data) => {
            console.log('🎬 Slide changed:', data.index);
        });
    }

    destroy() {
        Object.values(this.modules).forEach(module => {
            if (module.destroy) module.destroy();
        });
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    window.app = new Application();
});

// Очистка при выгрузке
window.addEventListener('beforeunload', () => {
    window.app?.destroy();
});