import React from 'react';
import Calendar from './components/Calendar';
import TodoList from './components/TodoList';

function App() {
    return (
        <div>
            <div className="calendar-container">
                <Calendar />
                <TodoList />
            </div>
        </div>
    );
}

export default App;
