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
const projModalTriggers = document.querySelectorAll('.proj-modal-trigger');
const projModalOverlays = document.querySelectorAll('.proj-modal-overlay');
const projModalCloseButtons = document.querySelectorAll('.proj-modal-close');

// Function to open modal
function openModal(modalId) {
  const modalOverlay = document.getElementById(`${modalId}-overlay`);
  modalOverlay.classList.add('active');
}

// Function to close modal
function closeModal(modalId) {
  const modalOverlay = document.getElementById(`${modalId}-overlay`);
  modalOverlay.classList.remove('active');
}

// Function to remove modal event listeners
function removeModalEventListeners() {
  projModalTriggers.forEach(trigger => {
    trigger.removeEventListener('click', openModal);
  });

  projModalCloseButtons.forEach(button => {
    button.removeEventListener('click', closeModal);
  });

  projModalOverlays.forEach(overlay => {
    overlay.removeEventListener('click', closeModal);
  });
}

// Function to switch tabs
function switchTab(tabId) {
  // Remove modal event listeners before switching tabs
  removeModalEventListeners();

  for (let i = 0; i < pages.length; i++) {
    if (tabId === pages[i].dataset.page) {
      pages[i].classList.add("active");
      navigationLinks[i].classList.add("active");
      window.scrollTo(0, 0);
    } else {
      pages[i].classList.remove("active");
      navigationLinks[i].classList.remove("active");
    }
  }

  // Reattach modal event listeners after switching tabs
  projModalTriggers.forEach(trigger => {
    trigger.addEventListener('click', openModal);
  });

  projModalCloseButtons.forEach(button => {
    button.addEventListener('click', closeModal);
  });

  projModalOverlays.forEach(overlay => {
    overlay.addEventListener('click', event => {
      if (event.target === overlay) {
        const modalId = overlay.getAttribute('id').replace('-overlay', '');
        closeModal(modalId);
      }
    });
  });
}

// Add event listeners to navigation links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    switchTab(navigationLinks[i].dataset.navLink);
  });
}

// Call the switchTab function for the initial tab
switchTab('portfolio'); // Assuming "portfolio" is the initial tab

projModalTriggers.forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault(); // Prevent the default link behavior
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
