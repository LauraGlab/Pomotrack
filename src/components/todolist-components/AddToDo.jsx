import { useState} from "react";
import SVG from "react-inlinesvg";
import AddTodoModal from "./todomodals/AddTodoModal.jsx";
import addIcon from "./../../assets/images/icon-add.svg";
import "./../../css/todolist/AddToDo.css";

export default function AddTodo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="addTodoSection">
      <button
        className="addTodoBtn"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <SVG
          className="addSvg"
          src={addIcon}
          width={18}
          height={18}
          alt="plus icon"
          aria-label="Add task"
        />
        Add Task
      </button>
      {isOpen && <AddTodoModal setIsOpen={setIsOpen} />}
    </div>
  );
}