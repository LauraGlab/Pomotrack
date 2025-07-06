import { AnimatePresence, motion } from "framer-motion";
import { useTodosChange } from "../../../contexts/TodoContext.jsx";
import SVG from "react-inlinesvg";
import dangerIcon from "./../../../assets/images/icon-danger.svg";
import "./../../../css/todolist/todomodals/DeleteTodoModals.css";

export default function DeleteTodoModal({ onClose, todo}) {
  const { todos, setTodos } = useTodosChange();

  function deleteToDo(todoId) {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  }

  console.log(todos);
  return (
    <div className="backgroundBlur">
      <AnimatePresence>
        <motion.div
          key="modal"
          className="window windowDelete"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
        >
          <div className="deleteTaskInfo">
            <SVG
              className="deleteCategory svgThreeIcon svgTwoIcon"
              src={todo.category}
            />
            <p className="deleteTitle">{todo.title}</p>
          </div>
          <p className="deleteText">
            Are you sure you want to delete this task?
          </p>
          <div className="infoDeleteSection">
            <SVG
              className="infoDeleteSvg"
              src={dangerIcon}
              width={15}
              height={15}
              alt="menu icon"
              aria-label="Open the menu"
              title="Open the menu"
            />
            <p className="infoDeleteText">This action cannot be undone</p>
          </div>
          <div>
            <div className="todoModalsBtn__section">
              <button className="todoModalsBtn" onClick={onClose}>
                Cancel
              </button>
              <button
                className="todoModalsBtn"
                onClick={() => deleteToDo(todo.id)}
              >
                Yes, Delete It
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
