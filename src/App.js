import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TasksList from './components/TasksList';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<TasksList />} />
          <Route path="/create" element={<TaskForm />} />
          <Route path="/:id/edit" element={<TaskForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
