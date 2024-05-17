//===== ELEMENTS BY ID =====//

let menuToggle = document.getElementById('menu-toggle');
let navSections = document.getElementById('nav-sections');
let navBar = document.getElementById('nav-bar');
let toggle = false;
let navSectionsNodes = []
let homeLink = document.getElementById('home-link');

// ===== NAVBAR ====//

homeLink.addEventListener('click', () => {
    navLinksToggler()
});



for (let i = 0; i < 4; i++) {
    navSectionsNodes[i] = document.getElementById(`link-${i + 1}`);
    navSectionsNodes[i].addEventListener('click', () => {
        navLinksToggler(navSectionsNodes[i])
    });
}

function navLinksToggler(element) {
    for (let i = 0; i < navSectionsNodes.length; i++) {
        navSectionsNodes[i].classList.remove('active-link')
    }
    toggle = false
    navSections.classList.remove('nav-sections-in')
    navSections.classList.add('nav-sections-out')
    navBar.classList.remove('navbar-resize-active');
    navBar.classList.add('navbar-resize-disabled');
    element && element.classList.add('active-link')
};

menuToggle.addEventListener('click', () => {
    if (!toggle) {
        toggle = !toggle
        navSections.classList.remove('nav-sections-out')
        navSections.classList.add('nav-sections-in')
        navBar.classList.remove('navbar-resize-disabled');
        navBar.classList.add('navbar-resize-active');
    } else {
        toggle = !toggle
        navSections.classList.remove('nav-sections-in')
        navSections.classList.add('nav-sections-out')
        navBar.classList.remove('navbar-resize-active');
        navBar.classList.add('navbar-resize-disabled');
    }
})

//==== CAROUSEL ====//

const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        const slides = button
            .closest("[data-carousel]")
            .querySelector("[data-slides]")

        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset
        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
    })
})

// PREGUNTAS FRECUENTES

const accordions = document.querySelectorAll(".accordion");
const openAccordion = (accordion) => {
    const content = accordion.querySelector(".accordion__content");
    const arrowButton = accordion.querySelector(".arrowButton");
    accordion.classList.add("accordion__active");
    arrowButton.classList.add("arrowButton__active");
    content.style.maxHeight = content.scrollHeight + "px";
};

const closeAccordion = (accordion) => {
    const content = accordion.querySelector(".accordion__content");
    const arrowButton = accordion.querySelector(".arrowButton");
    accordion.classList.remove("accordion__active");
    arrowButton.classList.remove("arrowButton__active");
    content.style.maxHeight = null;
};

accordions.forEach((accordion) => {
    const intro = accordion.querySelector(".accordion__intro");
    const content = accordion.querySelector(".accordion__content");

    intro.onclick = () => {
        if (content.style.maxHeight) {
            closeAccordion(accordion);
        } else {
            accordions.forEach((accordion) => closeAccordion(accordion));
            openAccordion(accordion);
        }
    };
});

//Festivales carousel

const track = document.querySelector('.festivales-carousel__track');
const cards = Array.from(track.children);
const nextButton = document.querySelector('.festivales-carousel__button--right');
const prevButton = document.querySelector('.festivales-carousel__button--left');
const indicators = document.querySelectorAll('.festivales-carousel__indicator');

const cardWidth = cards[0].getBoundingClientRect().width;

let currentIndex = 0;

const updateIndicators = () => {
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('festivales-carousel__indicator--active', index === Math.floor(currentIndex / 1));
    });
};

const moveToCard = (currentIndex) => {
    const amountToMove = (-cardWidth - 40) * currentIndex;
    track.style.transform = `translateX(${amountToMove}px)`;
    updateIndicators();
};

nextButton.addEventListener('click', () => {
    if (currentIndex < cards.length - 3) {
        currentIndex++;
        moveToCard(currentIndex);
    }
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        moveToCard(currentIndex);
    }
});

updateIndicators();