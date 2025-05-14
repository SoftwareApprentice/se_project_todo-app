import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
// const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
// const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

const todoSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    todoSection.addItem(todo);
  },
  containerSelector: ".todos__list",
});

todoSection.renderItems();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formInputs) => {
    const todo = generateTodo(formInputs);
    todoSection.addItem(todo);
  },
});

addTodoPopup.setEventListeners();

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".popup_visible");
    closeModal(modal);
  }
}

const openModal = (modal) => {
  document.addEventListener("keydown", handleEscape);
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  document.removeEventListener("keydown", handleEscape);
  modal.classList.remove("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// addTodoCloseBtn.addEventListener("click", () => {
//   addTodoPopup.close();
// });

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();

//   closeModal(addTodoPopupEl);
// });

const formvValidate = new FormValidator(validationConfig, addTodoForm);
formvValidate.enableValidation();
