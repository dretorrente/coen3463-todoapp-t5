import React, { Component } from 'react';

const ListItem = ({
    EachTodo,
    onComplete,
    deleteSingleTodo,
    completed,
    checkBoxStatus,
    completeSingleTodo,
    check


    // EachTodoName


}) => (
			<li className={completed}  >
                <div className="task-checkbox">
                  <input type='checkbox' onClick={onComplete} />
                </div>
                <div className="task-title">
                    <span className={ EachTodo.isCompleted ? 'active' : 'task-title'}>{EachTodo.name}</span>
                  <div className="pull-right hidden-phone">
                      <button onClick={completeSingleTodo} type="submit" className="btn btn-primary btn-xs">Completed<i className="fa fa-check"></i></button>
                      <button onClick={deleteSingleTodo} type="submit" className="btn btn-danger btn-xs"><i className="fa fa-trash-o "></i></button>
                  </div>
                </div>
            </li>
		);




export default ListItem;