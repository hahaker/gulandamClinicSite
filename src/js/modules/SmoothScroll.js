import { DOMUtils } from '../core/DOMUtils.js';

export class SmoothScroll {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.init();
    }

    init() {
        console.log('✓ SmoothScroll инициализирован');
        this.bindEvents();
    }

    bindEvents() {
        // Все ссылки с href="#"
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                this.scrollToSection(e.target.getAttribute('href'));
            }
        });
    }

    scrollToSection(targetId) {
        const element = DOMUtils.qs(targetId);

        if (!element) return;

        // Получить расстояние с учетом высоты header (100px)
        const offset = 100;
        const top = element.offsetTop - offset;

        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });

        console.log('📍 Прокрутка к:', targetId);
    }

    destroy() {
        // очистка
    }
}

