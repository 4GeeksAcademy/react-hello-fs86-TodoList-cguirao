import React, { useEffect, useState } from "react";
import "../../styles/home.css";

import { userExists, createNewUserData, getUserData,updateUser, updateTodoList } from '../component/fetch'

const Home = () => {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const checkUserAndTodoList = async () => {

      if (!(await userExists())) {
        createNewUserData();
      } else {
        const tareaList=await updateUser();
        setTareas(tareaList.todos.map((item) => ({
          label: item.label,
          id: item.id
        })));
      }
    };
    checkUserAndTodoList();
  }, []);



  const nuevaTarea = async (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const tareaLabel = e.target.value.trim();
      const nuevaTarea = {
        label: tareaLabel
      };

      const nuevasTareas = [...tareas, nuevaTarea];
      setTareas(nuevasTareas);

      e.target.value = "";
      await updateTodoList(nuevaTarea.label, true);
    }
  };

  const eliminarAccion = async (index) => {
    const tareaAEliminar = tareas[index];
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
    await updateTodoList(tareaAEliminar.label, false, tareaAEliminar.id); 
  };


  return (
    <div className="todoList">
      <h1>TODO LIST</h1>
      <input
        type="text"
        placeholder="What needs to be done?"
        onKeyDown={nuevaTarea}
      />
      <ul className="todoList__group">
        {tareas.map((tarea, index) => (
          <li className="todoList__group-item" key={tarea.id}>
            {tarea.label}
            <button className="eliminar" onClick={() => eliminarAccion(index)}>
              X
            </button>
          </li>
        ))}
      </ul>
      <p className="tareasPendientes">
        {tareas.length > 0
          ? `${tareas.length} tarea${tareas.length > 1 ? "s" : ""} pendiente`
          : "No hay tareas pendientes"}
      </p>
    </div>
  );
};

export default Home;
