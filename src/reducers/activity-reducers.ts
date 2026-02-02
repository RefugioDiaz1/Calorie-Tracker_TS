import type { Activity } from "../types"

//Definicion de las acciones del reducer
export type ActivityActions =
    {
        type: 'save-activity',
        payload: { newActivity: Activity }

    } |
    {
        type: 'set-activeId',
        payload: { id: Activity['id'] }
    } |
    {
        type: 'delete-activity',
        payload: { id: Activity['id'] }
    } |
     {
        type: 'restart-app'
    }

//Definicion del estado del reducer
export type ActivityState = {

    activities: Activity[],
    activeId: Activity['id']
}

const localStorageActivities = () : Activity[] =>{

    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

//Estado inicial del reducer
export const initalState: ActivityState = {

    // El estado inicial tiene un array vacio de actividades
    activities: localStorageActivities(),
    activeId: ''

}

//Definicion del reducer
export const activityReducer = (

    state: ActivityState = initalState,
    action: ActivityActions

) => {

    //Logica del reducer
    if (action.type === 'save-activity') {
        // Este codigo maneja la logica para actualizar el state

        let updateActivities: Activity[] = []
        if (state.activeId) {

            // Si hay un activeId, actualiza la actividad existente
            updateActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)

        } else {

            // Si no hay activeId, agrega una nueva actividad
            updateActivities = [...state.activities, action.payload.newActivity]
        }

        // Retorna un nuevo estado con la nueva actividad agregada al array de actividades
        return {
            ...state,
            activities: updateActivities,
            activeId: ''
        }
    }

    //Logica para setear el activeId
    if (action.type === 'set-activeId') {
        // Este codigo maneja la logica para actualizar el activeId

        return {
            ...state,
            activeId: action.payload.id
        }
    }

    //Logica para eliminar una actividad
    if (action.type === 'delete-activity') {

        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)

        }

    }

    if(action.type === 'restart-app') {

        return {
            activities: [],
            activeId:''

        }
    }

    // Si la accion no es reconocida, retorna el estado actual sin cambios
    return state

}