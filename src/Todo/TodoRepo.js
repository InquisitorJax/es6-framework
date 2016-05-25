
export default class TodoRepo 
{    
    
    constructor()
    {
    }
    
    add(todoItem)
    {
        window.localStorage.setItem(todoItem.storeKey, JSON.stringify(todoItem));
    }

    remove(todoItem) 
    {
        window.localStorage.removeItem(todoItem.storeKey);
    }

    update(todoItem) 
    {
        window.localStorage.setItem(todoItem.storeKey, todoItem);
    }

    findByKey(key) 
    {
        return JSON.parse(window.localStorage.getItem(key));
    }

    getAll() 
    {
        const todoStorePrefix = "Todo";
        let items = [];
        for(let i=0; i < window.localStorage.length; i++) 
        {
            let key = window.localStorage.key(i);
            if (key.startsWith(todoStorePrefix)) {
                let todoItem = findByKey(key);
                items.add(todoItem);
            }
        }
        return items;
    }

    clearAll() 
    {
        window.localStorage.clear();
    }
}