import TodoRepo from './Todo/todoRepo';
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
        this.store = new TodoRepo();
        this.presenter = new TodoPresenter();
        this.setupEvents();
    }

    setupEvents() 
    {
        document.getElementById('btnAdd').addEventListener('click', this.btnAddClicked.bind(this));
    }

    btnAddClicked() 
    {
        let todoElement = this.todoDomElement;
        let todoDateElement = this.todoDateDomElement;
        
        let todoText = todoElement.value;
        let dateText = todoDateElement.value;

        let todoItem = new TodoItem(todoText, dateText);
        this.store.add(todoItem);        
        this.presenter.add(todoItem);

        
        todoElement.value = "";
        todoDateElement.value = "";
        todoElement.focus();
                
        let storeTodo = this.store.findByKey(todoItem.storeKey);        
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
    }
   
}

let application = new Application();
application.run();