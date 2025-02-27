import { useState } from 'react';
import TodoList from "./components/TodoList";
import GroupbyDepartment from "./components/GroupbyDepartment";
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState("todo");

  return (
    <div>
      <div className="tabs">
        <button 
          className={activeTab === "todo" ? "active" : ""} 
          onClick={() => setActiveTab("todo")}
        >
          Todo List
        </button>
        <button 
          className={activeTab === "users" ? "active" : ""} 
          onClick={() => setActiveTab("users")}
        >
          User Groups
        </button>
      </div>

      <div className="content">
        {activeTab === "todo" && <TodoList />}
        {activeTab === "users" && <GroupbyDepartment />}
      </div>
    </div>
  );
}

export default App;
