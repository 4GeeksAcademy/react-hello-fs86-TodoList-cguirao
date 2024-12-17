export const userExists = async () => {
  try {
    const url = "https://playground.4geeks.com/todo/users/cguirao";

    const response = await fetch(url, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error al comprobar el usuario:", error.message);
    return false;
  }
};

export const createNewUserData = async () => {
  try {
    const url = "https://playground.4geeks.com/todo/users/cguirao";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "cguirao", id: 0 }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${response.statusText}. Detalles: ${errorText}`);
    }

    const data = await response.json();
    console.log("Usuario creado:", data);
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error.message);
    throw error;
  }
};


export const getUserData = async () => {
  try {
    const url = 'https://playground.4geeks.com/todo/users/cguirao';

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error.message);
    throw error;
  }
};


export const updateUser = async () => {
  const tareasIniciales = await getUserData();
  return tareasIniciales;

}
export const updateTodoList = async (tarea, isNewdata, id) => {
  const url = 'https://playground.4geeks.com/todo/todos/cguirao';
  try {

    if (isNewdata) {
      const datosAEnviar = {
        "label": tarea,
        "is_done": true
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosAEnviar),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${response.statusText}. Detalles: ${errorText}`);
      }
      const data = await response.json();
    } else {

      const url = `https://playground.4geeks.com/todo/todos/${id}`;

      console.log('este es el id: ', id);
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${response.statusText}. Detalles: ${errorText}`);
      }
      const data = await response.json();
    }

  } catch (error) {
    console.error("Error al sincronizar las tareas con la API:", error.message);
  }
};

