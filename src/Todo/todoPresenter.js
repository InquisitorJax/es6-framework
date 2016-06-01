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
        console.log("toggle attempt");
        
        let listElement = element.parentNode;
        console.log(listElement);
        
        if (this.domMap.has(listElement))
        {
            console.log("has element");
            let todoItem = this.domMap.get(listElement);
            todoItem.isDone = !todoItem.isDone;
            this.store.update(todoItem);
            window.requestAnimationFrame(() => 
            {
                listElement.className = todoItem.isDone ? 'done' : '';
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
            <input type="checkbox" class="todoCheck" ></input>
            <span id="spanTodo">${todoItem.text}</span>
            <span id="spanDate">${todoItem.completeBy}</span>                        
        `;
        
        element.id = todoItem.text;

        this.todoList.appendChild(element);
        
        this.domMap.set(element, todoItem);
    }    

    remove(element) 
    {
        if (this.domMap.has(element)) 
        {
            let todoItem = this.domMap.get(element);

            this.domMap.delete(element);            
            this.todoList.removeChild(element);
            
            this.store.remove(todoItem);    
        }
    }
  
    
    deleteAll()
    {
        //delete all dom elements
         window.requestAnimationFrame(() => {
            while(this.todoList.firstChild) 
            {
                this.todoList.removeChild(this.todoList.firstChild);
            }
         });
         //clear the local storage
         this.store.clearAll();
         this.domMap.deleteAll();
    }

    loadAllTodoItems() 
    {
        let tasks = this.store.getAll();
        this.showItems(tasks);
    }    
    
    showItems(todoItems)
    {
        window.requestAnimationFrame(() => {
            while(this.todoList.firstChild) 
            {
                this.todoList.removeChild(this.todoList.firstChild);
            }
            
            for (let todoItem of todoItems) 
            {
                this.add(todoItem);                            
            }            
        });
    }
    
     
    filter(filterText)
    {
        let allItems = this.store.getAll();
        let filteredItems = allItems.filter(function (todoItem) {
            let todoText = todoItem.text.toLowerCase();
            return todoText.indexOf(filterText.toLowerCase()) > -1;
        } );
        this.showItems(filteredItems);        
    }
    
  
}