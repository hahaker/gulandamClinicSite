// ============================================================================
// Файл: src/js/modules/BookingModal.js — ИСПРАВЛЕННЫЙ
// ============================================================================

import { DOMUtils } from '../core/DOMUtils.js';

export class BookingModal {
    constructor(eventBus) {
        // НЕ наследуемся от DOMUtils - он утилита, а не базовый класс

        this.eventBus = eventBus;

        this.modal = DOMUtils.qs('#bookingModal');
        this.overlay = DOMUtils.qs('.modal__overlay');
        this.closeBtn = DOMUtils.qs('.modal__close');
        this.form = DOMUtils.qs('#bookingForm');

        this.bookButtons = DOMUtils.qsa('[data-action="book"]');

        this.isOpen = false;

        this.init();
    }

    init() {
        console.log('✓ BookingModal инициализирован');
        this.bindEvents();

        // Слушаем событие от менюшки
        this.eventBus.on('book-click', () => this.open());
    }

    bindEvents() {
        // Клики на все кнопки "Записаться"
        DOMUtils.on(this.bookButtons, 'click', (e) => {
            e.preventDefault();
            this.open();
        });

        // Закрытие по клику на крестик
        DOMUtils.on(this.closeBtn, 'click', () => this.close());

        // Закрытие по клику на оверлей
        DOMUtils.on(this.overlay, 'click', () => this.close());

        // Закрытие на Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Отправка формы
        DOMUtils.on(this.form, 'submit', (e) => this.handleSubmit(e));
    }

    open() {
        this.isOpen = true;

        DOMUtils.addClass(this.modal, 'active');
        document.body.classList.add('no-scroll');

        console.log('📭 Модаль открыта');
    }

    close() {
        this.isOpen = false;

        DOMUtils.removeClass(this.modal, 'active');
        document.body.classList.remove('no-scroll');

        console.log('📭 Модаль закрыта');
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = {
            name: this.form.querySelector('input[type="text"]').value,
            phone: this.form.querySelector('input[type="tel"]').value,
            email: this.form.querySelector('input[type="email"]').value,
            service: this.form.querySelector('select').value,
            message: this.form.querySelector('textarea').value,
        };

        console.log('📧 Данные записи:', data);

        // Здесь можно отправить на сервер
        alert('Спасибо! Мы скоро свяжемся с вами');

        // Очистить форму
        this.form.reset();

        // Закрыть модаль
        this.close();

        // Отправить событие
        this.eventBus.emit('booking-submitted', data);
    }

    destroy() {
        // очистка
    }
}