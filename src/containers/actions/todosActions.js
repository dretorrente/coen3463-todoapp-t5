import axios from 'axios'


import {ADD_TODO,TODO_DELETED,SET_TODOS, TODO_UPDATED,TODO_FETCHED} from './types/types';
export function setTodos(todo){
    return {
        type:SET_TODOS,
        todo
    }
}

export function addTodos(todo){
    return {
        type:ADD_TODO,
        todo
    }
}
export function todo_deleted(todoID) {
    return {
        type: TODO_DELETED,
        todoID
    }
}


export function deleteSingleTodo(id) {
    return dispatch => {
        return fetch(`/todos/events/${id}`,{
            method: 'delete',
            header: {
                "Content-Type": "application/json"
            }
        }).then(data => dispatch(todo_deleted(id)))
    }
}
export function todoUpdated(todo) {
    return {
        type: TODO_UPDATED,
        todo
    }
}

export function updateSingleTodo(id) {
    return dispatch => {
        return axios.put('/todos/events/'+id)
            .then(function (response) {


                dispatch(todoUpdated(response.data.todo._id));

                return response.data.todos;
                //
            });

    }
}





export function FETCH_TODO() {
    return {
        type: "FETCH_TODO"
    }
}



export function fetchTodos(id) {
    return dispatch => {
        return axios.get('/todos/events/'+id)
            .then(function (response) {

                dispatch(setTodos(response.data.todos));
                return response.data.todos;
               //
            });
    }
}


export function createTodo(events) {
    return dispatch => {
        return axios.post("/todos/events", events)
            .then((response) => {

                const newTodo = response.data.result;
                dispatch(addTodos(newTodo));
                return response;
            })

            .catch((error) => {


                error.data = error.response.data.errors;
                error.data.success = error.response.data.success;
                return error;
            })

    }
}
export function deleteAllTodo() {
    return dispatch => {
        return axios.delete('api/v1/Todo')
    }
}

export function deleteAllCompleted(id) {
    return dispatch => {
        return axios.delete('/todos/events/allCompleted/'+id)
    }
}


