
export default class TodoRepo 
{    
    constructor()
    {
        this.todoStorePrefix = "Todo";
    }
    
    add(todoItem)
    {
        window.localStorage.setItem(todoItem.storeKey, JSON.stringify(todoItem));
    }

    remove(todoItem) 
    {
        delete window.localStorage[todoItem.storeKey];
    }

    update(todoItem) 
    {     
        //this.remove(todoItem);   //does not work - item remains in local storage
        this.add(todoItem);        
    }

    findByKey(key) 
    {
        return JSON.parse(window.localStorage.getItem(key));
    }
    
    findByText(text)
    {
        let key = this.todoStorePrefix + text;
        return this.findByKey(key);
    }

    getAll() 
    {
        
        let items = [];
        for(let i=0; i < window.localStorage.length; i++) 
        {
            let key = window.localStorage.key(i);
            if (key.startsWith(this.todoStorePrefix)) 
            {
                let todoItem = this.findByKey(key);
                items.push(todoItem);
            }
        }
        return items;
    }

    clearAll() 
    {
        window.localStorage.clear();
    }
}