import React, { useState } from 'react';

function TodoList() {
    // Define state variables
    const [todos, setTodos] = useState([]); // Array to store todos
    const [inputVisibility, setInputVisibility] = useState(false); // Boolean to control input field visibility
    const [inputValue, setInputValue] = useState(''); // String to store input field value

    // Toggle input field visibility
    const toggleInputFieldVisibility = () => {
        setInputVisibility(!inputVisibility);
        setInputValue(''); // resets input value when invisible 
    };

    // Update input field value
    const updateInputValue = (e) => {
        setInputValue(e.target.value);
    };

    // Add a new todo to the list
    const addTodo = () => {
        if (inputValue.trim() !== '') {
            const newTodo = {
                id: new Date().getTime(),
                text: inputValue,
                completed: false,
            };
            setTodos([...todos, newTodo]);
            setInputValue('');
            toggleInputFieldVisibility();
        }
    };

    // Toggle completion status of a todo
    const toggleTodo = (id) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed,
                };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    // Delete a todo from the list
    const deleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    return (
        <div className="todo-list">
            <div className="todo-header">
                <h2>Todo List</h2>
                <button className="button add" onClick={toggleInputFieldVisibility}>
                    {inputVisibility ? 'Cancel' : '+'}
                </button>
            </div>
            <ul className="todo-items">
                {/* Render todos as list items */}
                {todos.map((todo) => (
                    <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                        <span>{todo.text}</span>
                        <div>
                            <button className="button" onClick={() => toggleTodo(todo.id)}>Toggle</button>
                            <button className="button" onClick={() => deleteTodo(todo.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Render input field if inputVisibility is true */}
            {inputVisibility && (
                <div className="todo-input">
                    {/* Input field for adding a new todo */}
                    <input
                        type="text"
                        value={inputValue}
                        onChange={updateInputValue}
                        placeholder="Add a new todo"
                    />
                    <button onClick={addTodo}>Add</button>
                </div>
            )}
            {/* Button to toggle input field visibility all over the div*/}
            <button className="button add-all-over-div" onClick={toggleInputFieldVisibility}></button>
        </div>
    );
}

export default TodoList;
