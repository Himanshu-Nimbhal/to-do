import React, { useState, useEffect, useRef } from "react";

import ToDoItems from "./ToDoItems";
import todo_icon from "../assets/todo_icon.png";

function ToDo() {
  const [todolist, setTodolist] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const inputref = useRef("");

  const add = function () {
    if (inputref.current.value !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputref.current.value,
        iscomplete: false,
      };
      setTodolist((prev) => [newTodo, ...prev]);
      inputref.current.value = "";
    }
  };

  const remove = (id) => {
    setTodolist((prev) => prev.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todolist));
  }, [todolist]);
  const toggle = (id) => {
    setTodolist((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, iscomplete: !todo.iscomplete };
        }
        return todo;
      });
    });
  };

  return (
    <div className="bg-white place-self-center w-11/12 max-w-[90%] max-h-[70vh] flex flex-col p-7 min-h[550px] rounded-xl overflow-auto">
      {/* title  */}
      <div className=" mt-5 flex items-center gap-2">
        <img src={todo_icon} alt="To-Do icon." className="w-8" />
        <h1 className="text-2xl font-semibold"> To-Do List</h1>
      </div>
      {/* input blocks */}
      <div className="flex  items-center my-7 bg-gray-200 rounded-full pr-3">
        <input
          ref={inputref}
          type="text"
          placeholder="Add your task"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              add();
            }
          }}
          className="bg-transparent border-none outline-none px-4 py-2 flex-1 h-14 placeholder:text-slate-600 w-full"
        />
        <button
          onClick={add}
          className="border-none rounded-full px-4 py-2  bg-orange-600 text-white font-medium cursor-pointer"
        >
          <p className="whitespace-nowrap"> add +</p>
        </button>
      </div>
      {/* todo list */}
      <div
        className=" max-h-[60vh] overflow-y-auto rounded-lg border-none "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {todolist.map((todo) => (
          <ToDoItems
            key={todo.id}
            text={todo.text}
            id={todo.id}
            iscomplete={todo.iscomplete}
            remove={remove}
            toggle={toggle}
          />
        ))}
      </div>
    </div>
  );
}

export default ToDo;
