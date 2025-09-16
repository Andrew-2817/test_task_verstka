// index.js
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
`;

const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu';
mobileMenu.innerHTML = `
    <div class = "mobile_start"><p>Loren ipsum</p><button class="mobile-menu-close">×</button></div>
    <ul class="mobile-menu__items">
        <li class="mobile-menu__item">Loren ipsum</li>
        <li class="mobile-menu__item">Loren ipsum</li>
        <li class="mobile-menu__item">Loren ipsum</li>
        <div class="header__link__mobile">
                <p class="header__link_text">Loren ipsum</p>
                <div class="">
                    <p class="arrow">→</p>
                </div>
            </div>
    </ul>
`;

// Добавляем кнопку бургера в шапку
document.querySelector('.header').appendChild(mobileMenuBtn);
document.body.appendChild(mobileMenu);

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

document.querySelector('.mobile-menu-close').addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
});

// Закрытие меню при клике на пункт
document.querySelectorAll('.mobile-menu__item').forEach(item => {
    item.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});
// Slider functionality
let sliderInitialized = false;

function initSlider() {
    if (window.innerWidth > 900 || sliderInitialized) return;
    
    const mainItemsBlock = document.querySelector('.main__items_block');
    const items = mainItemsBlock.querySelectorAll('.main__item');
    
    // Сохраняем оригинальный HTML для восстановления
    const originalHTML = mainItemsBlock.innerHTML;
    mainItemsBlock.setAttribute('data-original', originalHTML);
    
    // Создаем контейнер слайдера
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'slider-container';
    
    // Переносим элементы в слайдер
    items.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'slider-item';
        slide.appendChild(item.cloneNode(true));
        sliderContainer.appendChild(slide);
    });
    
    // Очищаем и добавляем слайдер
    mainItemsBlock.innerHTML = '';
    mainItemsBlock.appendChild(sliderContainer);
    
    // Добавляем контролы
    const controls = document.createElement('div');
    controls.className = 'slider-controls';
    controls.innerHTML = `
        <p class="slider-prev">← Loren ipsum</p>
        <p class="slider-next">Loren ipsum →</p>
    `;
    
    mainItemsBlock.after(controls);
    
    // Инициализация слайдера
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slider-item');
    
    function updateSlider() {
        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        // dots.forEach((dot, index) => {
        //     dot.classList.toggle('active', index === currentSlide);
        // });
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }
    
    // Event listeners
    document.querySelector('.slider-next').addEventListener('click', nextSlide);
    document.querySelector('.slider-prev').addEventListener('click', prevSlide);
    
    // Touch support
    let startX = 0;
    let currentX = 0;
    
    sliderContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    sliderContainer.addEventListener('touchmove', (e) => {
        currentX = e.touches[0].clientX;
    });
    
    sliderContainer.addEventListener('touchend', () => {
        const diff = startX - currentX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
    
    sliderInitialized = true;
}

function restoreOriginalLayout() {
    if (window.innerWidth <= 900 || !sliderInitialized) return;
    
    const mainItemsBlock = document.querySelector('.main__items_block');
    const originalHTML = mainItemsBlock.getAttribute('data-original');
    
    if (originalHTML) {
        mainItemsBlock.innerHTML = originalHTML;
        
        // Удаляем контролы слайдера
        const controls = document.querySelector('.slider-controls');
        if (controls) {
            controls.remove();
        }
    }
    
    sliderInitialized = false;
}

// Проверяем размер экрана
function checkScreenSize() {
    if (window.innerWidth <= 900) {
        initSlider();
    } else {
        restoreOriginalLayout();
    }
}

// Инициализация
window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);

// Modal functionality
const infoButton = document.querySelector('.info_button');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

infoButton.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});


// заметки на утро
// - разобраться с пунктиром