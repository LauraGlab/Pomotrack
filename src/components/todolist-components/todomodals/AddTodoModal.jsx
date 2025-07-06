import { useState } from "react";
import SVG from "react-inlinesvg";
import { AnimatePresence, motion } from "framer-motion";
import { useLocalStorage } from "./../../../contexts/useLocalStorage";
import { useTodosChange } from "../../../contexts/TodoContext.jsx";
import foodIcon from "./../../../assets/images/categories/food.svg";
import gameIcon from "./../../../assets/images/categories/game.svg";
import otherIcon from "./../../../assets/images/tomato.svg";
import sportIcon from "./../../../assets/images/categories/sport.svg";
import studyIcon from "./../../../assets/images/categories/study.svg";
import workIcon from "./../../../assets/images/categories/work.svg";
import "./../../../css/todolist/todomodals/FormTodoModals.css";

export default function AddTodoModal({setIsOpen}) {
  const [isError, setIsError] = useState({ title: false, category: false });
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [idTodo, setIdTodo] = useLocalStorage("idTodo", 1);
  const { setTodos } = useTodosChange();
  const categories = [
    studyIcon,
    gameIcon,
    foodIcon,
    workIcon,
    sportIcon,
    otherIcon,
  ];

  const addToDo = () => {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: crypto.randomUUID(),
        category,
        title,
        priority,
        done: false,
      },
    ]);
    setIdTodo((prevId) => prevId + 1);
  };

  const handleTitle = (event) => {
    const selectedTitle = event.target.value;
    setTitle(selectedTitle);
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
  };

  const handlePriority = (event) => {
    const selectedPriority = event.target.value;
    setPriority(selectedPriority);
  };

  const addingToDo = () => {
    const errors = {
      title: title.length === 0,
      category: category === "",
    };

    setIsError(errors);

    if (!errors.title && !errors.category) {
      setTitle("");
      setPriority("");
      addToDo();
      setIsOpen(false);
    }
  };

  return (
    <div className="backgroundBlur">
      <AnimatePresence>
        <motion.div
          key="modal"
          className="window windowTodo"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
        >
          <input
            className="todoInput"
            placeholder="Write the title of your task..."
            value={title}
            onChange={handleTitle}
          />
          <p className={isError.title ? "errorMessage" : "errorMessageHidden"}>
            Please, write a title for your todo.
          </p>
          <div className="categories__section">
            <h3 className="formSubtitle">Select Category</h3>
            <div className="categories">
              {categories.map((category, index) => (
                <label className="category" key={category}>
                  <input
                    className="radioCategory"
                    type="radio"
                    name="category"
                    value={category}
                    onChange={handleCategoryChange}
                    id={`radioCategory-${index}`}
                  />
                  <SVG
                    className="svgThreeIcon svgTwoIcon categoryImg"
                    src={category}
                    width={50}
                    height={50}
                    alt="work icon"
                    aria-label="search the tasks"
                    title={category}
                  />
                </label>
              ))}
            </div>
          </div>
          <p
            className={isError.category ? "errorMessage" : "errorMessageHidden"}
          >
            Pick a category
          </p>
          <div className="priorities__section">
            <h3 className="formSubtitle">Set Priority</h3>
            <select
              className="priorities"
              value={priority}
              onChange={handlePriority}
            >
              <option value="">None</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="todoModalsBtn__section">
            <button
              className="todoModalsBtn"
              onClick={() => {
                setIsOpen(false);
                setIsError(false);
              }}
            >
              Cancel
            </button>
            <button className="todoModalsBtn" onClick={addingToDo}>
              Add Task
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
