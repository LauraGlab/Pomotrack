import {useEffect} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTodosChange } from "../../contexts/TodoContext.jsx";
import SVG from "react-inlinesvg";
import DeleteAllTodoModal from "./todomodals/DeleteAllTodoModal.jsx";
import deleteIcon from "./../../assets/images/icon-delete.svg";
import "./../../css/todolist/MenuTodo.css";

export default function MenuTodo({ isMenu, setIsMenu, deleteMenu, setDeleteMenu }) {
  const { todos, setTodos } = useTodosChange();

  useEffect(() => {
    let handler = (e) => {
      if (!e.target.closest(".todoMenu")) {
        setIsMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isMenu]);

  function deleteCompleted() {
    setTodos(todos.filter((todo) => todo.done === false));
  }

  return (
    <>
      {isMenu && (
        <AnimatePresence>
          <motion.div
            key="modal"
            className="todoMenu"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
          >
            <button
              className="todoMenuBtn"
              onClick={() => {
                deleteCompleted();
                setIsMenu(false);
              }}
            >
              <SVG
                className="todoMenuIcon"
                src={deleteIcon}
                alt="delete icon"
                width={15}
                height={15}
              />
              <p>Clear finished tasks</p>
            </button>
            <button
              className="todoMenuBtn"
              onClick={() => {
                setDeleteMenu(true);
                setIsMenu(false);
              }}
            >
              <SVG
                className="todoMenuIcon"
                src={deleteIcon}
                alt="delete icon"
                width={15}
                height={15}
              />
              <p>Clear all tasks</p>
            </button>
          </motion.div>
        </AnimatePresence>
      )}
      {deleteMenu && todos.length > 0 && (
        <DeleteAllTodoModal setDeleteMenu={setDeleteMenu} />
      )}
    </>
  );
}