import React, { Component, PropTypes } from 'react';
import Header from './Header/header';
import Footer from './Footer/footer';
import TodoList from './Body/todolist';
import todo from './Login/css/todo.css'
class TodoComponent extends Component {
    constructor(props) {
        super(props);


    }

    render() {
        const{deleteAllCompleted,userEmail,todotask,activeComplete,completedTodos,activeTodos,todoComplete,allTodos,deleteSingleTodo, deleteAllTodo,count,user,logout, createTodo,  onChange, errors} = this.props;

        return (
            <div>
                <Header user={user}
                        logout={logout}
                        userEmail={userEmail}
                />
                <div className="main-container ace-save-state" id="main-container">
                    <div className="main-content">
                        <div className="main-content-inner">
                            <div className="page-content">
                                <TodoList
                                    createTodo={createTodo}

                                    onChange={onChange}
                                    errors={errors}
                                    todotask={todotask}
                                    count={count}
                                    deleteAllTodo={deleteAllTodo}
                                    deleteAllCompleted={deleteAllCompleted}
                                    deleteSingleTodo={deleteSingleTodo}
                                    allTodos={allTodos}
                                    todoComplete={todoComplete}
                                    activeTodos={activeTodos}
                                    completedTodos = {completedTodos}
                                    activeComplete={activeComplete}





                                />

                            </div>
                        </div>
                    </div>
                    <div className="footerClass">
                        <Footer />
                    </div>
                </div>
            </div>
        )
    }
}

TodoComponent.propTypes = {
    logout:PropTypes.func.isRequired,
    createTodo:PropTypes.func.isRequired,
    user: PropTypes.string,
    todotask: PropTypes.string,
    // todo: PropTypes.array
    // isAuthenticated: PropTypes.bool.isRequired,
};



export default TodoComponent;
