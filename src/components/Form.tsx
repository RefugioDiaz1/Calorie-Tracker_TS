import { useState, type Dispatch, useEffect } from "react";
import {v4 as uuidv4} from 'uuid'
import type { Activity } from "../types";
import { categories } from "../data/categories";
import type { ActivityActions, ActivityState } from "../reducers/activity-reducers";


//Definicion de las props del componente Form
type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
}

//Estado inicial del formulario
const initalState :Activity = {
  id:uuidv4(),
  category: 1,
  name: "",
  calories: 0,
}

//Componente Formulario
export default function Form({ dispatch,state }: FormProps) {

  //Definicion del estado local del formulario
  const [activity, setActivity] = useState<Activity>(initalState);
  
  useEffect(() => {

    if (state.activeId) {
      
      const selectedActivity = state.activities.filter(stateActivity=> stateActivity.id === state.activeId)[0]

      setActivity(selectedActivity)


    }

  },[state.activeId])

  //Esta funcion maneja los cambios en los inputs del formulario
  const handleChange = (
    e:
      React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {

    // Verifico si el campo es de tipo numero
    const isNumberField = ["category", "calories"].includes(e.target.id);

    //Actualizo el estado local del formulario
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  //Aqui es la validacion del formulario
  const isValidActivity = () => {

    // Destructuring de los valores del estado local
    const { name, calories } = activity
    return name.trim() !== '' && calories > 0

  }

  const heandleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    //Prevenimos el comportamiento por defecto del formulario
    e.preventDefault()

    //Disparo la accion al reducer
    dispatch({ type: "save-activity", payload: { newActivity: activity } })

    //Seteo para que limpie el formulario
    setActivity({
      ...initalState,
      id: uuidv4()
    })

  }

  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={heandleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoría:
        </label>

        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Otro Div */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>

        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
          value={activity.name}
          onChange={handleChange}
        ></input>
      </div>

      {/* Otro Div */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorías:
        </label>

        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorias Ej. 300 o 500"
          value={activity.calories}
          onChange={handleChange}
        ></input>
      </div>

      <input
        type="submit"
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        className="bg-lime-600 disabled:opacity-12 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-lg w-full not-disabled:cursor-pointer transition-colors duration-300"
        disabled={!isValidActivity()}
      ></input>
    </form>
  );
}
