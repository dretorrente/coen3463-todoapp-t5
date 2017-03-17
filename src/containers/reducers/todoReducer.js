import { SET_TODOS, ADD_TODO, TODO_FETCHED, TODO_UPDATED, TODO_DELETED } from '../actions/types/types';
import shortid from 'shortid';

export default function reducer(state = [], action = {}) {
    switch(action.type) {

        case "FETCH_TODO":
            return {...state};



        case ADD_TODO:
            return [
                ...state,
                action.todo
            ];

        case TODO_DELETED:
            return state.filter(item => item._id !== action.todoID);


        case TODO_UPDATED:
            return state.map(item => {
                if (item._id === action.todo._id) return action.todo;
                return item;
            });


        case TODO_FETCHED:
            const index = state.findIndex(item => item._id === action.todo._id);
            if (index > -1) {
                return state.map(item => {
                    if (item._id === action.todo._id) return action.todo;
                    return item;
                });
            } else {
                return [
                    ...state,
                    action.todo
                ];
            }

        case SET_TODOS:
            return action.todo;
        default: return state;
    }
}
