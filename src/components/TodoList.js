import React, { useState, useRef, useEffect } from 'react';
import deleteIcon from '../assets/images/deleteIcon.svg';
import toggleIcon from '../assets/images/toggleIcon.svg';
import addIcon from '../assets/images/addIcon.svg';
import cancelIcon from '../assets/images/cancelIcon.svg';
import checkIcon from '../assets/images/checkIcon.svg';


function TodoList() {
    // Define state variables
    const [todos, setTodos] = useState([]); // Array to store todos
    const [inputVisibility, setInputVisibility] = useState(false); // Boolean to control input field visibility
    const [inputValue, setInputValue] = useState(''); // String to store input field value
    const inputRef = useRef(null); // Create a reference to the input element

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

    // Focus on the input field when it becomes visible
    useEffect(() => {
        if (inputVisibility) {
            inputRef.current.focus();
        }
    }, [inputVisibility]);

    // Allows enter key to be used to add todo
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTodo();
        }
    };

    return (
        <div className="todo-list">
            <div className="todo-header">
                <h2>{todos.length} Todos</h2>
                <button className="button add" onClick={toggleInputFieldVisibility}>
                    {inputVisibility ? 
                        <img src={cancelIcon} alt="Cancel" className="cancel-icon" /> : 
                        <img src={addIcon} alt="Add" className="add-icon" />}
                </button>
            </div>
            <ul className="todo-items">
                {/* Render todos as list items */}
                {todos.map((todo) => (
                    <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                        <span>{todo.text}</span>
                        <div>
                            <button className="small-button" onClick={() => toggleTodo(todo.id)}>
                                <img src={toggleIcon} alt="Toggle" className="toggle-icon" />
                            </button>
                            <button className="small-button" onClick={() => deleteTodo(todo.id)}>
                                <img src={deleteIcon} alt="Delete" className="delete-icon" />
                            </button>
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
                        onKeyDown={handleKeyDown}
                        placeholder="Add a new todo"
                        ref={inputRef} // Assign the reference to the input element
                    />
                    <button className="button" onClick={addTodo}>
                        <img src={checkIcon} alt="Check" className="add-icon" />
                    </button>
                </div>
            )}
            {/* Button to toggle input field visibility all over the div */}
            <button className="button add-all-over-div" onClick={toggleInputFieldVisibility}></button>
        </div>
    );
}

export default TodoList;
