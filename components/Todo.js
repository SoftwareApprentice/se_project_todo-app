export class Todo {
  constructor(data, selector) {
    this._id = data.id;
    this._name = data.name;
    this._completed = data.completed;
    this._date = new Date(data.date);
    this._todoTemplate = document.querySelector(selector);
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._todoElement = null;
    });
  }

  _generateCheckBox() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.id = `todo-${this._id}`;
    this._todoCheckboxEl.checked = this._completed;
    this._todoLabel.setAttribute("for", `todo-${this._id}`);
  }

  _generateDueDate() {
    if (!isNaN(this._date)) {
      this._todoDate.textContent = `Due: ${this._date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  getView() {
    this._todoElement = this._todoTemplate.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._todoNameEl.textContent = this._name;

    this._generateDueDate();
    this._generateCheckBox();
    this._setEventListeners();

    return this._todoElement;
  }
}
