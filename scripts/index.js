const todos = [
  'Сделать проектную работу',
  'Полить цветы',
  'Пройти туториал по Реакту',
  'Сделать фронт для своего проекта',
  'Погулять с собакой',
  'Разобраться в замыканиях',
  'Решить задачу на Codewars'
];

const selectors = {
  form: '.todos__form',
  input: '.todo-form__input',
  list: '.todos__list',
  template: '#todo-item-template',
  item: '.todo-item',
  text: '.todo-item__text',
  buttonDel: '.todo-item__del',
  buttonCopy: '.todo-item__copy',
  buttonEdit: '.todo-item__edit',
  buttonSubmit: '.todo-form__submit-btn'
}

const form = document.querySelector(selectors.form);
const list = document.querySelector(selectors.list);
const template = document.querySelector(selectors.template).content.querySelector(selectors.item);
const input = form.querySelector(selectors.input);
const submitButton = form.querySelector(selectors.buttonSubmit);

function createTodo(name){
  const todoElement = template.cloneNode(true);
  const todoText = todoElement.querySelector(selectors.text);
  const todoButtonDel = todoElement.querySelector(selectors.buttonDel);
  const todoButtonCopy = todoElement.querySelector(selectors.buttonCopy);
  const todoButtonEdit = todoElement.querySelector(selectors.buttonEdit);

  todoButtonDel.addEventListener('click', function(){
    todoElement.remove();
  })
  todoButtonCopy.addEventListener('click', function (){
    renderTodo(name, todoElement, 'after');
  })
  todoButtonEdit.addEventListener('click', function (evt){
    input.value = todoText.textContent;

    submitButton.textContent = 'Изменить';



    function editTodo(evt){
      evt.preventDefault();

      todoText.textContent = input.value;
      submitButton.textContent = 'Добавить';

      input.value = '';

      form.addEventListener('submit', addTodo)
      form.removeEventListener('submit', editTodo)
    }

    form.removeEventListener('submit', addTodo)
    form.addEventListener('submit', editTodo)

  })

  todoText.textContent = name;
  return todoElement;
}

function renderTodo(data, container, position = 'append') {
  const todo = createTodo(data); //node
  switch (position) {
    case "append": return container.append(todo);
    case "prepend": return container.prepend(todo);
    case "before": return container.before(todo);
    case "after": return container.after(todo);
    default: return;
  }
  // container.append(todo)
}

function addTodo(evt){
  evt.preventDefault();
  renderTodo(input.value, list, 'prepend')
  input.value = ""
}

function addEventListener(){
  form.addEventListener('submit', addTodo )
}

function createInitialTodos(){
  todos.forEach((item) => renderTodo(item, list))
}

addEventListener();
createInitialTodos();