// ============================================================================
// Файл: src/js/modules/MobileMenu.js
// ============================================================================

import { DOMUtils } from '../core/DOMUtils.js';

export class MobileMenu {
    constructor(eventBus) {
        this.eventBus = eventBus;

        this.burger = DOMUtils.qs('#headerBurger');
        this.menu = DOMUtils.qs('#mobileMenu');
        this.overlay = DOMUtils.qs('#menuOverlay');
        this.menuLinks = DOMUtils.qsa('.mobile-menu__link');

        this.isOpen = false;

        this.init();
    }

    init() {
        console.log('✓ MobileMenu инициализирован');
        this.bindEvents();
    }

    bindEvents() {
        // Клик на бургер
        DOMUtils.on(this.burger, 'click', () => this.toggleMenu());

        // Клик на оверлей
        DOMUtils.on(this.overlay, 'click', () => this.closeMenu());

        // Клики на ссылки меню
        DOMUtils.on(this.menuLinks, 'click', (e) => this.handleMenuClick(e));

        // Закрытие при нажатии Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeMenu();
        });
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isOpen = true;

        DOMUtils.addClass(this.burger, 'active');
        DOMUtils.addClass(this.menu, 'active');
        DOMUtils.addClass(this.overlay, 'active');

        // Запретить скролл страницы
        document.body.classList.add('no-scroll');

        console.log('📭 Меню открыто');
    }

    closeMenu() {
        this.isOpen = false;

        DOMUtils.removeClass(this.burger, 'active');
        DOMUtils.removeClass(this.menu, 'active');
        DOMUtils.removeClass(this.overlay, 'active');

        // Разрешить скролл
        document.body.classList.remove('no-scroll');

        console.log('📭 Меню закрыто');
    }

    handleMenuClick(e) {
        const action = DOMUtils.getAttr(e.target, 'data-action');

        console.log('🔗 Клик на:', action);

        // Закрыть меню после клика
        this.closeMenu();

        // Отправить событие
        this.eventBus.emit('menu-link-clicked', { action });

        // Показать alert
        if (action === 'book') {
            alert('Откроется форма записи');
        }
    }

    destroy() {
        DOMUtils.off(this.burger, 'click', () => this.toggleMenu());
        DOMUtils.off(this.overlay, 'click', () => this.closeMenu());
    }
}