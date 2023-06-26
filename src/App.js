import React, { useState } from 'react';
import Calendar from './components/Calendar';
import TodoList from './components/TodoList';

function App() {
    const [todos, setTodos] = useState([]); // Array to store todos

    return (
        <div>
            <div className="calendar-container">
                <Calendar todos={todos.map(todo => ({ ...todo, id: todo.id.toString() }))} />
                <TodoList todos={todos} setTodos={setTodos} /> {/* Pass the todos and setTodos props */}
            </div>
        </div>
    );

}

export default App;
