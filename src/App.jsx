import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { v4 as uuidv4 } from "uuid";
import saveButton from "./assets/save.svg";
import editButton from "./assets/edit.svg";
import deleteButton from "./assets/delete.svg";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState();

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  useEffect(() => {
    let todoSTring = localStorage.getItem("todos");
    if (todoSTring) {
      let todo = JSON.parse(localStorage.getItem("todos"));
      setTodos(todo);
    }
  }, []);

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  const handleFinished = () => {
    setshowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />

      <div className="todo-app p-3 rounded-xl mx-auto my-7 min-h-[80vh] w-1/2 bg-white">
        <div className="my-2 flex justify-center">
          <h2 className="font-bold text-2xl">ToDo List</h2>
        </div>
        <div className="addTodo rounded-xl bg-slate-400 p-1 mx-10 flex justify-between align-middle">
          < input
          onChange={handleChange}
          value={todo}
          className="p-2 outline-none bg-slate-400 border-none rounded-xl text-md w-full"
          type="text"
        />
          <button className="mx-5" onClick={handleAdd} disabled={todo.length < 3}>
            <img src={saveButton} alt="Save Button" className="hover:cursor-pointer" />
          </button>
        </div>
        <input
          onChange={handleFinished}
          className="my-3 mx-12"
          type="checkbox"
          checked={showFinished}
        />{" "}
        <span className="-mx-11">Show Finished Tasks</span>
        <div className="your-todos my-8 mx-10">
          {todos.length === 0 && (
            <div className="m-5 text-lg ">No todos to display</div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="your-todo my-3 flex justify-between align-middle"
                >
                  <div className="bg-slate-400 px-4 py-2 rounded-xl w-full flex justify-between align-middle">
                    <div className={item.isCompleted ? "line-through" : ""}>
                      <input
                        className="mx-2 "
                        onChange={handleCheckbox}
                        type="checkbox"
                        checked={item.isCompleted}
                        name={item.id}
                        id=""
                      />

                      {item.todo}
                    </div>

                    <div className="text-buttons flex gap-3">
                      <div
                        onClick={(e) => {
                          handleEdit(e, item.id);
                        }}
                        
                      >
                        <img className="hover:cursor-pointer" src={editButton} alt="Edit Button" />
                      </div>
                      <div
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                       >
                        <img className="hover:cursor-pointer" src={deleteButton} alt="Delete Button" />
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
