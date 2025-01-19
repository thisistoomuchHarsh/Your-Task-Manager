import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { v4 as uuidv4 } from "uuid";
import saveButton from "./assets/save.svg";
import editButton from "./assets/edit.svg";
import deleteButton from "./assets/delete.svg";
import { FaEdit } from "react-icons/fa";

function App() {
  // State to manage the current input value
  const [todo, setTodo] = useState("");
  // State to manage the list of todos
  const [todos, setTodos] = useState([]);
  // State to toggle the visibility of completed tasks
  const [showFinished, setshowFinished] = useState();

  // Function to save the todos to localStorage
  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // Load todos from localStorage on initial render
  useEffect(() => {
    let todoSTring = localStorage.getItem("todos");
    if (todoSTring) {
      let todo = JSON.parse(localStorage.getItem("todos"));
      setTodos(todo);
    }
  }, []);

  // Handle adding a new todo
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]); // Add a new todo object
    setTodo(""); // Reset the input field
    saveToLS(); // Save updated todos to localStorage
  };

  // Handle editing a todo
  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id); // Find the todo to edit
    setTodo(t[0].todo); // Set the input field to the selected todo's value
    let newTodos = todos.filter((item) => item.id !== id); // Remove the selected todo
    setTodos(newTodos); // Update the state
    saveToLS(); // Save updated todos to localStorage
  };

  // Handle deleting a todo
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => item.id !== id); // Filter out the deleted todo
    setTodos(newTodos); // Update the state
    saveToLS(); // Save updated todos to localStorage
  };

  // Handle input value changes
  const handleChange = (e) => {
    setTodo(e.target.value); // Update the input field value
  };

  // Handle marking a todo as completed or not completed
  const handleCheckbox = (e) => {
    let id = e.target.name; // Get the id of the checkbox
    let index = todos.findIndex((item) => item.id === id); // Find the index of the todo
    let newTodos = [...todos]; // Create a copy of todos
    newTodos[index].isCompleted = !newTodos[index].isCompleted; // Toggle the completion status
    setTodos(newTodos); // Update the state
    saveToLS(); // Save updated todos to localStorage
  };

  // Toggle the visibility of completed tasks
  const handleFinished = () => {
    setshowFinished(!showFinished); // Toggle the state
  };

  return (
    <>
      <Navbar />

      <div className="todo-app p-3 rounded-xl mx-auto my-7 min-h-[80vh] max-h-[80vh] w-full sm:w-3/4 lg:w-1/2 bg-violet-300 overflow-auto"> {/* Made width responsive */}
        {/* App Header */}
        <div className="my-2 flex justify-center">
          <h2 className="font-bold text-xl sm:text-2xl">ToDo List</h2> {/* Adjusted text size for responsiveness */}
        </div>

        {/* Input field and Add button */}
        <div className="addTodo rounded-xl bg-white p-1 mx-5 sm:mx-10 flex flex-col sm:flex-row justify-between align-middle gap-3"> {/* Made layout responsive */}
          <input
            onChange={handleChange}
            value={todo}
            className="p-2 outline-none bg-white border-none rounded-xl text-sm sm:text-md w-full"
            type="text"
          />
          <button className="sm:mx-5" onClick={handleAdd} disabled={todo.length < 3}>
            <img src={saveButton} alt="Save Button" className="hover:cursor-pointer w-6 sm:w-8" /> {/* Adjusted button size */}
          </button>
        </div>

        {/* Toggle for showing completed tasks */}
        <div className="flex items-center my-3 mx-5 sm:mx-12 gap-2"> {/* Added responsive spacing */}
          <input
            onChange={handleFinished}
            type="checkbox"
            checked={showFinished}
          />
          <span>Show Finished Tasks</span>
        </div>

        {/* Todos list */}
        <div className="your-todos my-8 mx-5 sm:mx-10">
          {todos.length === 0 && (
            <div className="m-5 text-sm sm:text-lg">No todos to display</div> /* Adjusted text size */
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && ( // Filter todos based on showFinished
                <div
                  key={item.id}
                  className="your-todo my-3 flex flex-col sm:flex-row justify-between align-middle gap-3"> {/* Made layout responsive */}
                  <div className="bg-white px-4 py-2 rounded-xl w-full flex justify-between align-middle">
                    {/* Todo item with checkbox */}
                    <div className={item.isCompleted ? "line-through" : ""}>
                      <input
                        className="mx-2"
                        onChange={handleCheckbox}
                        type="checkbox"
                        checked={item.isCompleted}
                        name={item.id}
                        id=""
                      />
                      {item.todo}
                    </div>

                    {/* Edit and Delete buttons */}
                    <div className="text-buttons flex gap-3">
                      <div
                        onClick={(e) => {
                          handleEdit(e, item.id);
                        }}
                      >
                        <img className="hover:cursor-pointer w-5 sm:w-6" src={editButton} alt="Edit Button" /> {/* Adjusted icon size */}
                      </div>
                      <div
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                      >
                        <img className="hover:cursor-pointer w-5 sm:w-6" src={deleteButton} alt="Delete Button" /> {/* Adjusted icon size */}
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
