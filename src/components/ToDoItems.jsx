import React from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";
function ToDoItems({ text, id, iscomplete, remove, toggle }) {
  return (
    <div
      className="flex  gap-2 items-center my-3 cursor-pointer "
      onClick={(e) => {
        if (e.target.dataset.clickable) {
          return toggle(id);
        }
      }}
    >
      <img
        src={iscomplete ? tick : not_tick}
        alt="toggle task"
        className="w-6 mr-4"
        data-clickable="true"
      />

      <p
        className={`text-slate-800  text-[17px] overflow-x-auto whitespace-nowrap w-full ${
          iscomplete ? " line-through" : ""
        } `}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        data-clickable="true"
      >
        {text}
      </p>

      <img
        src={delete_icon}
        alt="delete task"
        className="w-6 ml-auto"
        onClick={(e) => {
          e.stopPropagation();
          return remove(id);
        }}
      />
    </div>
  );
}

export default ToDoItems;
