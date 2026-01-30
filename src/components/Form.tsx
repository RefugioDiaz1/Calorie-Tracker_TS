import { useState } from "react";
import type { Activity } from "../types";
import { categories } from "../data/categories";

export default function Form() {
  const [activity, setActivity] = useState<Activity>({
    category: 1,
    name: "",
    calories: 0,
  });

  const handleChange = (
    e:
        React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {

    const {name,calories} = activity
    return name.trim() !== '' && calories >0

  }

  const heandleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Submit")
    
    
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
        value={activity.category=== 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        className="bg-lime-600 disabled:opacity-12 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-lg w-full not-disabled:cursor-pointer transition-colors duration-300"
        disabled={!isValidActivity()}
      ></input>
    </form>
  );
}
