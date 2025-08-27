document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome!!!");

  // Initial set of cards to be displayed in the gallery
  const cards = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9HHbB4UPotNwjpZrjKSbTYKArDSRVNlgjag&s.jpg",
      description: "lovelove",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_aej-pcDaVJV6TQowmEqftpdves7egWbRA&s.jpg",
      description: "mhmm",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQflu3TVnbTPSqIejyxOMpM1nvZO9jnP0T8drJSkeqNk49KzqDqbypUk1eQ1Q_21Z3TWFc&usqp=CAU.jpg",
      description: "stuudy",
    },
  ];

  // CONSTs
  const placeGalleryList = document.querySelector(".places-gallery__list");
  const template = document.querySelector("#template-place-card");

  const modalNewPlace = document.getElementById("modal-add-place");
  const modalEditProfile = document.getElementById("modal-edit-profile");

  const travelerProfileAddPlaceBtn = document.querySelector(
    ".traveler-profile__add-place-btn"
  );
  const travelerProfileName = document.querySelector(".traveler-profile__name");
  const travelerProfileBio = document.querySelector(".traveler-profile__bio");
  const buttonEdit = document.querySelector("#button-edit");

  const modalsClose = document.querySelectorAll(".modal__close");
  const modalForms = Array.from(document.querySelectorAll(".modal__form"));

  // Functions

  /**
   * Validate if any input inside a modal form is invalid
   * @param {Array} modalInputs - Array of input elements
   * @returns {boolean} true if any input is invalid, otherwise false
   */
  const validateButton = (modalInputs) => {
    return modalInputs.some((inputElement) => !inputElement.validity.valid);
  };

  /**
   * Create a new card element and append it to the gallery list
   * @param {Object} card - Object containing image and description
   */
  const createCard = (card) => {
    const placeElement = template.content.cloneNode(true);

    // Fill card data
    placeElement.querySelector(".place-card__image").src = card.image;
    placeElement.querySelector(".place-card__image").alt = card.description;
    placeElement.querySelector(".place-card__title").textContent =
      card.description;

    // Like button event
    placeElement
      .querySelector(".place-card__like-button")
      .addEventListener("click", (e) => {
        e.target.classList.toggle("place-card__like-button_active");
      });

    // Delete button event
    placeElement
      .querySelector(".place-card__delete-button")
      .addEventListener("click", (evt) => {
        evt.target.closest(".place-card").remove();
      });

    placeGalleryList.appendChild(placeElement);
  };

  /**
   * Show modal by adding open class
   * @param {HTMLElement} modal - The modal element to be opened
   */
  const openModal = (modal) => {
    modal.classList.add("modal_is-opened");
  };

  /**
   * Hide modal by removing open class
   * @param {HTMLElement} modal - The modal element to be closed
   */
  const closeModal = (modal) => {
    modal.classList.remove("modal_is-opened");
  };

  // Form validation
  modalForms.forEach((modalForm) => {
    const modalInputs = Array.from(modalForm.querySelectorAll(".modal__input"));
    const modalButton = modalForm.querySelector(".modal__button");

    // Initial state of button
    modalButton.disabled = validateButton(modalInputs);

    // Input validation on typing
    modalInputs.forEach((modalInput) => {
      modalInput.addEventListener("input", () => {
        const modalError = modalForm.querySelector(`#${modalInput.id}-error`);

        if (!modalInput.validity.valid) {
          modalError.textContent = "There is an error";
          modalError.classList.add("modal__error_visible");
          modalButton.disabled = true;
        } else {
          modalError.textContent = "";
          modalError.classList.remove("modal__error_visible");

          if (!validateButton(modalInputs)) {
            modalButton.disabled = false;
          }
        }
      });
    });
  });

  // Initial render
  cards.forEach(createCard);

  // Event listeners

  // Open modal to add a new place
  travelerProfileAddPlaceBtn.addEventListener("click", () => {
    openModal(modalNewPlace);
  });

  // Open modal to edit profile and pre-fill values
  buttonEdit.addEventListener("click", () => {
    openModal(modalEditProfile);
    document.getElementById("edit-name").value =
      travelerProfileName.textContent;
    document.getElementById("edit-bio").value = travelerProfileBio.textContent;
  });

  // Close modals when clicking close buttons
  modalsClose.forEach((modalClose) => {
    modalClose.addEventListener("click", (evt) => {
      const modal = evt.target.closest(".modal");
      closeModal(modal);
    });
  });

  // Add new card from form
  modalNewPlace.querySelector("form").addEventListener("submit", (evt) => {
    evt.preventDefault();

    const imageInput = document.getElementById("place-image-url").value;
    const titleInput = document.getElementById("place-title").value;

    if (!imageInput || !titleInput) {
      alert("Please complete all fields.");
      return;
    }

    createCard({ image: imageInput, description: titleInput });
    evt.target.reset();
    closeModal(modalNewPlace);
  });

  // Save changes to profile
  modalEditProfile.querySelector("form").addEventListener("submit", (evt) => {
    evt.preventDefault();

    travelerProfileName.textContent =
      document.getElementById("edit-name").value;
    travelerProfileBio.textContent = document.getElementById("edit-bio").value;

    closeModal(modalEditProfile);
  });
});
