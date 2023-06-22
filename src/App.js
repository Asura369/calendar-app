import React from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Calendar from './components/Calendar';

function App() {
    return (
        <HashRouter>
            <div>
                <Routes>
                    <Route path="/" element={<Calendar />} />
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
