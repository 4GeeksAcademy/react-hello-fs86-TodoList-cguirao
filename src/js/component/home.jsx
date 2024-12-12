import React, { useState } from "react";
import '../../styles/home.css';

const Home = () => {
  const [tareas, setTareas] = useState([]); 

  const nuevaTarea = (e) => {
    if (e.key === 'Enter') {
      setTareas([...tareas, e.target.value]);
      e.target.value = ""; 
    }
  };

  const eliminarAccion=(index)=>{
	setTareas(tareas.filter((_,i)=>i!==index));
  }
  return (
    <div className="todoList">
      <h1>TODO LIST</h1>
      <input
        type="text"
        placeholder="What needs to be done?"
        onKeyDown={nuevaTarea}
      />
      <ul className="todoList__group">
        {
          tareas.map((tarea, index) => {
            return (
              <li className="todoList__group-item " key={index}>
                {tarea}
                <button className="eliminar"  onClick={() => eliminarAccion(index)}>X</button>
              </li>
            );
          })
        }
      </ul>
	  <p className="tareasPendientes">{tareas.length > 0 ? `${tareas.length} tarea${tareas.length > 1 ? 's' : ''} pendiente` : 'No hay tareas pendientes'}</p>

    </div>
  );
};

export default Home;
