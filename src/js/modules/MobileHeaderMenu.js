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

        // Клики на ссылки меню (ВАЖНО: работают ссылки и кнопки)
        this.menuLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleMenuClick(e));
        });

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
        const target = e.target;
        const action = DOMUtils.getAttr(target, 'data-action');
        const href = target.getAttribute('href');

        console.log('🔗 Клик на:', action || href);

        // Закрыть меню после клика
        this.closeMenu();

        // Обработка кнопок записи
        if (action === 'book') {
            this.eventBus.emit('book-click');
            console.log('📝 Открыта форма записи');
            return;
        }

        // Обработка якорных ссылок (ссылки на разделы)
        if (href && href.startsWith('#')) {
            e.preventDefault();
            this.scrollToSection(href);
            return;
        }

        // Обработка обычных ссылок (переход на другие страницы)
        if (href && !href.startsWith('#')) {
            window.location.href = href;
        }
    }

    scrollToSection(targetId) {
        // Небольшая задержка для завершения анимации закрытия меню
        setTimeout(() => {
            const element = document.querySelector(targetId);
            if (element) {
                const offset = 100;
                const top = element.offsetTop - offset;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
                console.log('📍 Прокрутка к:', targetId);
            }
        }, 300);
    }

    destroy() {
        DOMUtils.off(this.burger, 'click', () => this.toggleMenu());
        DOMUtils.off(this.overlay, 'click', () => this.closeMenu());
    }
}