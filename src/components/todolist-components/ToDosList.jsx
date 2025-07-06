import {useState} from "react";
import { SwipeableList } from "react-swipeable-list";
import { useTodosChange } from "../../contexts/TodoContext.jsx"; 
import SVG from "react-inlinesvg";
import ToDoItem from "./ToDoItem.jsx";
import MenuTodo from "./MenuTodo.jsx";
import dotsIcon from "./../../assets/images/icon-threeDots.svg";
import otherIcon from "./../../assets/images/tomato.svg";
import "react-swipeable-list/dist/styles.css";
import "./../../css/todolist/ToDoList.css";

export default function ToDosList() {
  const [isMenu, setIsMenu] = useState(false);
  const [deleteMenu, setDeleteMenu] = useState(false);
  const { todos } = useTodosChange();

  return (
    <>
      <div>
        <div className="titleToDo__section">
          <h2 className="titleToDo">
            Tasks List{" "}
            {todos.length === 0 && <span className="titleNumber"></span>}
            {todos.length > 1 && (
              <span className="titleNumber">({todos.length} tasks)</span>
            )}
            {todos.length === 1 && (
              <span className="titleNumber">({todos.length} task)</span>
            )}
          </h2>
          <div className="buttonsDeleteSection">
            <button
              className="menuDelete"
              onClick={() => {
                setIsMenu(true);
              }}
            >
              <SVG
                className="svgTwoIcon"
                src={dotsIcon}
                width={20}
                height={20}
                alt="menu icon"
                aria-label="Open the menu"
                title="Open the menu"
              />
            </button>
          </div>
        </div>
        <div className="tasksSection">
          {todos.length === 0 ? (
            <div className="noTasksDisplay">
              <div>
                <SVG
                  className="deleteCategory svgThreeIcon svgTwoIcon"
                  src={otherIcon}
                  alt="zero tasks image"
                />
                <p className="noTasksText">No tasks</p>
                <p>Click "Add Task" to add one</p>
              </div>
            </div>
          ) : (
            <SwipeableList key={todos.id}>
              {todos.map((todo) => (
                <ToDoItem key={todo.id} todo={todo} />
              ))}
            </SwipeableList>
          )}
        </div>
      </div>
      <MenuTodo
        isMenu={isMenu}
        setIsMenu={setIsMenu}
        deleteMenu={deleteMenu}
        setDeleteMenu={setDeleteMenu}
      />
    </>
  );
}