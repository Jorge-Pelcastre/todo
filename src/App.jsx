import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TasksBoard from './components/TasksBoard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<TasksBoard />} />
          <Route path="/create" element={<TaskForm />} />
          <Route path="/:id/edit" element={<TaskForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
