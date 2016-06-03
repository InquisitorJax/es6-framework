import chai from 'chai';
import sinon from 'sinon';
import {TodoRepo} from './../../../src/Todo/todoRepo';
import {TodoItem} from './../../../src/Todo/todoItem';
const expect = chai.expect;

describe('Todo Repo Tests', function() 
{
    let _repo = null;
    let  _sandbox = null;
    
    before(function() 
    {
       _repo = new TodoRepo();
    });
    
    beforeEach(function() 
    {
        _sandbox = sinon.sandbox.create();
    });
    
    afterEach(function() 
    {
        // restore the environment as it was before
        _sandbox.restore();
    });
    
    it('add', function() {
        //arrange
        sandbox.stub(window.localStorage, "setItem");
        //var spy = sinon.spy(window.localStorage, "setItem");
        let newTodo = new TodoItem("test", "12/12/2016");
        //act
        _repo.add(newTodo);
        
        //assert            
        //spy.calledWith(_repo.todoStorePrefix + "test", newTodo);
        sinon.assert.calledWithExactly(window.localStorage.setItem, _repo.todoStorePrefix + "test", newTodo);
    });
});
