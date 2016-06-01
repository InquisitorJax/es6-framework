
export default class TodoItem 
{
    constructor(text, completeBy) 
    {
        this.text = text;
        this.completeBy = completeBy;
        this.isDone = false;
    }
}