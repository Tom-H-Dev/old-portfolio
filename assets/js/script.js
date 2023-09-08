'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}









const projModalTriggers = document.querySelectorAll('.proj-modal-trigger');
const projModalOverlays = document.querySelectorAll('.proj-modal-overlay');
const projModalCloseButtons = document.querySelectorAll('.proj-modal-close');
const projModalContents = document.querySelectorAll('.proj-modal-content');

projModalTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const modalId = trigger.getAttribute('data-proj-modal-id');
    const modalOverlay = document.getElementById(`${modalId}-overlay`);
    modalOverlay.classList.add('active');
  });
});

projModalCloseButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modalId = button.getAttribute('data-proj-modal-id');
    const modalOverlay = document.getElementById(`${modalId}-overlay`);
    modalOverlay.classList.remove('active');
  });
});

projModalOverlays.forEach(overlay => {
  overlay.addEventListener('click', event => {
    if (event.target === overlay) {
      overlay.classList.remove('active');
    }
  });
});

projModalContents.forEach(content => {
  content.addEventListener('click', event => {
    event.stopPropagation();
  });
});

// Get the scroll-down arrow element for the main page
const scrollDownArrow = document.querySelector('.scroll-down-arrow');

// Function to toggle the arrow's visibility based on scroll position for the main page
function toggleScrollArrow() {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;

  if (scrollY + windowHeight >= document.body.scrollHeight) {
    // Reached the bottom of the page, hide the arrow
    scrollDownArrow.style.opacity = '0';
  } else {
    // Not at the bottom, show the arrow
    scrollDownArrow.style.opacity = '1';
  }
}

// Add a scroll event listener to toggle the arrow's visibility for the main page
window.addEventListener('scroll', toggleScrollArrow);

// Initial call to set the arrow's visibility when the page loads
toggleScrollArrow();

// Additional code for the modal's scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
const projModalContent = document.querySelector('.proj-modal-content');

projModalContent.addEventListener('scroll', () => {
  // Check the scroll position within the modal
  if (projModalContent.scrollTop > 0) {
    scrollIndicator.style.opacity = '0';
  } else {
    scrollIndicator.style.opacity = '1';
  }
});
