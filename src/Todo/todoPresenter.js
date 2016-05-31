import TodoRepo from './todoRepo';

export default class TodoPresenter
{
    constructor()
    {
        this.store = new TodoRepo();
        this.domMap = new WeakMap(); //map todoItem to the element that represents it
        this.todoList = document.getElementById('todoList');                
    }
    
    toggleTodoItemDone(element)
    {
        console.log("event fired");
        if (this.domMap.has(element))
        {
            console.log("has element");
            let todoItem = this.domMap.get(element);
            todoItem.isDone = !todoIt.isDone;
            window.requestAnimationFrame(() => 
            {
                element.className = todoItem.isDone ? 'done' : '';
            });                 
        }
        
    }


    add(todoItem)
    {
        this.store.add(todoItem);
        
        let element = document.createElement('li');
        element.className = todoItem.isDone ? 'done' : '';
        
        element.innerHTML =
        `
            <input type="checkbox" class="chb" id="${todoItem.text}"></input>
            <span id="spanTodo">${todoItem.text}</span>
            <span id="spanDate">${todoItem.completeBy}</span>                        
        `;
               
        element.onclick = this.toggleTodoItemDone(document.getElementById(todoItem.text));
        this.todoList.appendChild(element);
        
        this.domMap.set(element, todoItem);
    }    

    remove(element) 
    {
        if (this.domMap.has(element)) {
            let todoItem = this.domMap.get(element);

            this.domMap.delete(element);            
            this.todoList.removeChild(element);
            
            this.store.remove(todoItem);    
        }
    }
    
    delete(element)
    {
        let todoTask = this.domMap.get(element);
        
        this.todoList.removeChild(element);
        this.store.remove(todoTask);        
    }
    
    deleteAll()
    {
        let elements = this.todoList.children;
        
        for (let todoElement of elements) 
        {
            this.delete(todoElement);                           
        }      
    }

    loadAllTodoItems() 
    {
        window.requestAnimationFrame(() => {
            while(this.todoList.firstChild) 
            {
                this.todoList.removeChild(this.todoList.firstChild);
            }
            
            let tasks = this.store.getAll();
            for (let todoItem of tasks) 
            {
                this.add(todoItem);                            
            }            
        });
    }    
    
    filter(filterText)
    {
        
    }
}