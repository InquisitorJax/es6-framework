
export default class TodoItem 
{
    constructor(text, completeBy) 
    {
        this.text = text;
        this.completeBy = completeBy;
        this.isDone = false;
    }

    get storeKey() 
    {        
        const todoStorePrefix = "Todo";
        return todoStorePrefix + this.text;
    }

}