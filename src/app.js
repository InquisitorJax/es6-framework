import TodoItem from './Todo/todoItem';
import TodoPresenter from './Todo/todoPresenter';

const applicationMessages = {
    fillInMessage: 'please fill in this field',
    required: '* required'
};

class Application 
{   
    constructor() 
    {                         
        this.presenter = new TodoPresenter();
        this.setupEvents();
    }

    setupEvents() 
    {
        document.getElementById('btnAdd').addEventListener('click', this.btnAddClicked.bind(this));
        document.getElementById('btnDelete').addEventListener('click', this.btnDeleteClicked.bind(this));
        document.getElementById('btnDeleteAll').addEventListener('click', this.btnDeleteAllClicked.bind(this));
    }
    
    btnDeleteAllClicked()
    {
        this.presenter.deleteAll();
    }
    
    btnDeleteClicked()
    {
        
    }
    
    btnAddClicked() 
    {
        let todoElement = this.todoDomElement;
        let todoDateElement = this.todoDateDomElement;

        let todoText = todoElement.value;
        let dateText = todoDateElement.value;

        let todoItem = new TodoItem(todoText, dateText);        
        this.AddTodoItem(todoItem);                
    }
    
    AddTodoItem(todoItem)
    {
        let todoElement = this.todoDomElement;
        let todoDateElement = this.todoDateDomElement;
                
        this.presenter.add(todoItem);

        todoElement.value = "";
        todoDateElement.value = "";
        todoElement.focus();
    }
    
    loadAllTasks()
    {
        this.presenter.loadAllTodoItems();
    }    
    
    get todoDomElement()
    {
        let todoElement = document.getElementById('edtTodo')
        return todoElement;
    }
    
    get todoDateDomElement()
    {
        let todoDateElement = document.getElementById('edtDate')
        return todoDateElement;
    }
    
    run() 
    {
        //insert initialization logic here
        this.loadAllTasks();
    }
   
}

let application = new Application();
application.run();