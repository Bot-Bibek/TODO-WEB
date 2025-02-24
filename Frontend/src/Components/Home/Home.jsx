import { useState, useEffect } from "react";
import axios from "axios";
import {
  AiOutlinePlus,
  AiOutlineCheck,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { toast } from "react-toastify"; // Importing toast for notifications

const App = () => {
  // State for managing tasks
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  // State for managing tabs
  const [tab, setTabs] = useState(1);

  // Fetch tasks from the server
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/read-task");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to load tasks.");
    }
  };

  // Handle adding a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      const res = await axios.post("http://localhost:5000/new-task", { task });
      setTasks(res.data);
      setTask("");
      toast.success("Task added successfully!"); // Display success message
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task.");
    }
  };

  // Handle editing an existing task
  const handleEdit = (id, Task_Name) => {
    setIsEdit(true);
    setTask(Task_Name);
    setUpdateId(id);
  };

  // Handle updating the task
  const updateTask = async (e) => {
    e.preventDefault();

    if (!task.trim()) {
      alert("Task name cannot be empty!");
      return;
    }

    if (!updateId) {
      alert("No task selected for update!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/update-task", {
        updateId,
        task,
      });

      setTasks(res.data);
      setTask("");
      setIsEdit(false);
      setUpdateId(null);
      toast.success("Task updated successfully!"); // Display success message
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Error updating task. Please try again.");
    }
  };

  // Handle deleting a task
  const handleDelete = async (id) => {
    try {
      const res = await axios.post("http://localhost:5000/delete-task", { id });
      setTasks(res.data);
      toast.success("Task deleted successfully!"); // Display success message
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  };

  // Handle marking a task as completed
  const handleComplete = async (id) => {
    try {
      const res = await axios.post("http://localhost:5000/complete-task", {
        id,
      });
      setTasks(res.data);
      toast.success("Task marked as completed!"); // Display success message
    } catch (error) {
      console.error("Error completing task:", error);
      alert("Failed to complete task.");
    }
  };

  // Filter tasks based on selected tab
  const filteredTasks = tasks.filter((task) =>
    tab === 1
      ? true
      : tab === 2
      ? task.Status === "active"
      : task.Status === "completed"
  );

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Heading */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          TO-DO LIST
        </h2>
      </div>

      {/* Task input field */}
      <div className="flex items-center space-x-4 mb-8">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
          placeholder="Enter Your Task"
          className="flex-grow px-6 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 placeholder-gray-400 text-lg"
        />
        <button
          onClick={isEdit ? updateTask : handleAddTask}
          className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-200"
        >
          {isEdit ? <AiOutlineEdit size={20} /> : <AiOutlinePlus size={20} />}
          <span>{isEdit ? "Update" : "Add"}</span>
        </button>
      </div>

      {/* Tabs for task filtering */}
      <div className="flex justify-center space-x-8 mb-8">
        {["All", "Active", "Completed"].map((item, index) => (
          <p
            key={index}
            onClick={() => setTabs(index + 1)}
            className={`cursor-pointer font-medium text-lg ${
              tab === index + 1
                ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                : "text-gray-600"
            } hover:text-indigo-700 transition duration-300`}
          >
            {item}
          </p>
        ))}
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <p className="text-center text-lg font-bold text-gray-500">
          {tab === 1
            ? "No tasks available."
            : tab === 2
            ? "No active tasks available."
            : "No completed tasks available."}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white shadow-lg rounded-xl p-6 transition transform hover:scale-105 hover:shadow-2xl duration-300 border border-gray-200"
            >
              <p
                className={`text-xl font-semibold ${
                  task.Status === "completed"
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {task.Task_Name}
              </p>
              <p className="text-sm text-gray-400">
                {task.CreatedAt
                  ? new Date(task.CreatedAt).toISOString().split("T")[0]
                  : "No Date Available"}
              </p>
              <p className="text-indigo-600 font-medium">
                Status: {task.Status}
              </p>

              {/* Buttons with Icons */}
              <div className="flex justify-between space-x-3 mt-4">
                {task.Status !== "completed" && (
                  <button
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300"
                    onClick={() => handleEdit(task.id, task.Task_Name)}
                  >
                    <AiOutlineEdit size={20} className="mr-1" /> Edit
                  </button>
                )}
                <button
                  className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition duration-300"
                  onClick={() => handleDelete(task.id)}
                >
                  <AiOutlineDelete size={20} className="mr-1" /> Delete
                </button>
                {task.Status !== "completed" && (
                  <button
                    className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition duration-300"
                    onClick={() => handleComplete(task.id)}
                  >
                    <AiOutlineCheck size={20} className="mr-1" /> Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
