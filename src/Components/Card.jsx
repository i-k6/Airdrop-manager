import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaRegTrashAlt } from 'react-icons/fa';
import { db } from '../firebase';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const style = {
  bg: `h-screen w-screen p-4 bg-transparent`,
  container: `max-w-[500px] w-full m-auto rounded-md shadow-xl p-4 relative`, // Added relative positioning
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border rounded-md p-2 w-full text-xl`,
  button: `border rounded-md p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
  taskContainer: `bg-white mt-5 mb-5 rounded-md shadow-md p-4 w-full mb-4 relative`, // Added relative positioning
  listItem: `flex justify-between items-center mb-2`,
  taskTitle: `flex-grow font-bold cursor-pointer ml-2`, // Adjusted margin left
  alert: `absolute bottom-0 left-0 right-0 bg-white p-4 shadow-md rounded-md`, // Added alert style
};

function Card() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [alert, setAlert] = useState(null); // State to manage alerts

  // Function to update subtaskInput for a specific todo
  const updateSubtaskInput = (todoId, value) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, subtaskInput: value } : todo
      )
    );
  };

  // Create main todo
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === '') {
      showAlert('Please enter a valid todo');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
      subtasks: [],
      subtaskInput: '', // Initialize subtaskInput for the new todo
    });
    setInput('');
  };

  // Create subtask for a main todo
  const createSubtask = async (todoId) => {
    const subtaskInputValue = todos.find((todo) => todo.id === todoId).subtaskInput;
    if (subtaskInputValue === '') {
      showAlert('Please enter a valid subtask');
      return;
    }
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          subtasks: [...todo.subtasks, { text: subtaskInputValue, completed: false }],
          subtaskInput: '' // Clear subtaskInput after adding subtask
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    await updateDoc(doc(db, 'todos', todoId), { subtasks: updatedTodos.find((todo) => todo.id === todoId).subtasks });
  };

  // Read todo from firebase
  useEffect(() => {
    const q = collection(db, 'todos');
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ id: doc.id, ...doc.data() });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // Update main todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete main todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  // Delete subtask
  const deleteSubtask = async (todoId, subtaskId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        const updatedSubtasks = todo.subtasks.filter((_, index) => index !== subtaskId);
        return { ...todo, subtasks: updatedSubtasks };
      }
      return todo;
    });
    setTodos(updatedTodos);
    await updateDoc(doc(db, 'todos', todoId), { subtasks: updatedTodos.find((todo) => todo.id === todoId).subtasks });
  };

  // Function to display alerts
  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert(null);
    }, 2000); // Hide the alert after 2 seconds
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo Airdrops</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type='text'
            placeholder='Add Tasks'
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        {alert && <div className={style.alert}>{alert}</div>} {/* Display alert if exists */}
        <div>
          {todos.map((todo) => (
            <div key={todo.id} className={style.taskContainer}>
              <div className={style.listItem}>
                <input
                  onChange={() => toggleComplete(todo)}
                  type='checkbox'
                  checked={todo.completed}
                />
                <p
                  onClick={() => toggleComplete(todo)}
                  className={todo.completed ? style.taskTitle : style.taskTitle}
                >
                  {todo.text}
                </p>
                <button onClick={() => deleteTodo(todo.id)}>
                  <FaRegTrashAlt />
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createSubtask(todo.id);
                }}
                className={style.form}
              >
                <input
                  value={todo.subtaskInput} // Use todo.subtaskInput as value
                  onChange={(e) => updateSubtaskInput(todo.id, e.target.value)} // Update subtaskInput for the current todo
                  className={style.input}
                  type='text'
                  placeholder='Add Subtask'
                />
                <button className={style.button}>
                  <AiOutlinePlus size={30} />
                </button>
              </form>
              <ul>
                {todo.subtasks.map((subtask, index) => (
                  <li key={index} className={style.listItem}>
                    <input
                      onChange={() => toggleSubtaskComplete(todo.id, index)}
                      type='checkbox'
                      checked={subtask.completed}
                    />
                    <p
                      onClick={() => toggleSubtaskComplete(todo.id, index)}
                      className={subtask.completed ? style.taskTitle : style.taskTitle}
                    >
                      {subtask.text}
                    </p>
                    <div>
                      <button onClick={() => deleteSubtask(todo.id, index)}>
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className={style.count}>{`You have ${todos.reduce((acc, todo) => acc + todo.subtasks.length + 1, 0)} Tasks`}</p>
      </div>
    </div>
  );
}

export default Card;
