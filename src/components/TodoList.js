import React, { useState, useRef, useEffect } from 'react';
import deleteIcon from '../assets/images/deleteIcon.svg';
import toggleLeftIcon from '../assets/images/toggleLeftIcon.svg';
import toggleRightIcon from '../assets/images/toggleRightIcon.svg';
import addIcon from '../assets/images/addIcon.svg';
import cancelIcon from '../assets/images/cancelIcon.svg';
import checkIcon from '../assets/images/checkIcon.svg';

function TodoList() {
    // Define state variables
    const [todos, setTodos] = useState([]); // Array to store todos
    const [inputVisibility, setInputVisibility] = useState(false); // Boolean to control input field visibility
    const [inputValue, setInputValue] = useState(''); // String to store input field value
    const [dueDate, setDueDate] = useState(''); // String to store due date
    const [dueTime, setDueTime] = useState(''); // String to store due time
    const inputRef = useRef(null); // Create a reference to the input element

    // Toggle input field visibility
    const toggleInputFieldVisibility = () => {
        setInputVisibility(!inputVisibility);
        setInputValue(''); // Resets input value when invisible
        setDueDate(''); // Resets due date when invisible
        setDueTime(''); // Resets due time when invisible
    };

    // Update input field value
    const updateInputValue = (e) => {
        setInputValue(e.target.value);
    };

    // Update due date
    const updateDueDate = (e) => {
        setDueDate(e.target.value);
    };

    // Update due time
    const updateDueTime = (e) => {
        setDueTime(e.target.value);
    };

    // Add a new todo to the list
    const addTodo = () => {
        if (inputValue.trim() !== '') {
            const newTodo = {
                id: new Date().getTime(),
                text: inputValue,
                completed: false,
                dueDate: dueDate,
                dueTime: dueDate && !dueTime ? '11:59 PM' : formatTime(dueTime), // Set default due time to "11:59 PM" if due date is entered and due time is empty
            };
            setTodos([...todos, newTodo]);
            setInputValue('');
            setDueDate('');
            setDueTime('');
            inputRef.current.focus(); // Focus on the input field after adding a todo
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

    // Format time in 12-hour format
    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        let formattedTime = '';
        let suffix = 'AM';

        if (hours >= 12) {
            formattedTime = `${hours % 12}:${minutes}`;
            suffix = 'PM';
        } else {
            formattedTime = `${hours}:${minutes}`;
        }

        return formattedTime + ' ' + suffix;
    };

    return (
        <div className="todo-list">
            <div className="todo-header">
                <h2>{todos.length} Todos</h2>
                <button className="button add" onClick={toggleInputFieldVisibility}>
                    {inputVisibility ? (
                        <img src={cancelIcon} alt="Cancel" className="cancel-icon" />
                    ) : (
                        <img src={addIcon} alt="Add" className="add-icon" />
                    )}
                </button>
            </div>

            <ul className="todo-items">
                {/* Render todos as list items */}
                {todos.map((todo) => (
                    <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                        <span>
                            {todo.text}
                            <br />
                            {todo.dueDate && todo.dueTime && (
                                <span className="due-info">
                                    {todo.dueDate} {todo.dueTime}
                                </span>
                            )}
                        </span>
                        <div>
                            <button className="small-button" onClick={() => toggleTodo(todo.id)}>
                                {todo.completed ? (
                                    <img src={toggleRightIcon} alt="toggleRight" className="toggle-icon" />
                                ) : (
                                    <img src={toggleLeftIcon} alt="toggleLeft" className="toggle-icon" />
                                )}
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

                    <button className="small-button" onClick={addTodo}>
                        <img src={checkIcon} alt="Check" className="add-icon" />
                    </button>

                    {/* Input field for due date */}
                    <input type="date" value={dueDate} onChange={updateDueDate} placeholder="Due date" />

                    {/* Input field for due time */}
                    <input type="time" value={dueTime} onChange={updateDueTime} placeholder="Due time" />
                </div>
            )}

            {/* Button to toggle input field visibility all over the div */}
            <button className="button add-all-over-div" onClick={toggleInputFieldVisibility}></button>
        </div>
    );
}

export default TodoList;
