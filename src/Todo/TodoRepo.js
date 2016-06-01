
export default class TodoRepo 
{    
    constructor()
    {
        this.todoStorePrefix = "Todo";
    }
    
    add(todoItem)
    {
        let key = this.todoStorePrefix + todoItem.text;
        window.localStorage.setItem(key, JSON.stringify(todoItem));
    }

    remove(todoItem) 
    {
        let key = this.todoStorePrefix + todoItem.text;
        window.localStorage.removeItem(key);
    }

    update(todoItem) 
    {     
        this.add(todoItem);        
    }
    
    findByText(text)
    {
        let key = this.todoStorePrefix + text;
        return findByKey(key);
    }
    
    findByKey(key)
    {
        return JSON.parse(window.localStorage.getItem(key));
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