
export default class TodoItem 
{
    constructor(text, completeBy, isDone) 
    {
        this.text = text;
        this.completeBy = completeBy;
        this.isDone = isDone;
    }

    get storeKey() 
    {        
        const todoStorePrefix = "Todo";
        return todoStorePrefix + this.text;
    }

}