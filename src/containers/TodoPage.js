import React, { PropTypes } from 'react';
import TodoComponent from '../components/TodoComponent';
import { logout, fetchUser} from './actions/userActions';
import {deleteAllCompleted,updateSingleTodo,deleteSingleTodo,deleteAllTodo, FETCH_TODO, fetchTodos, createTodo, setTodos } from "./actions/todosActions";
import { validateTodoForm } from './validations/todo';
import { connect } from 'react-redux';
import ListItem from '../components/Body/listitem';
import todo from '../components/Login/css/todo.css';
// import { browserHistory} from 'react-router';
class TodoPage extends React.Component {

    constructor(props) {
        super(props);

        // set the initial component state
        this.state = {
            _id : this.props.todo ? this.props.todo._id : null,
            name: this.props.todo ? this.props.todo.name : '',
            owner: this.props.todo ? this.props.todo.owner : '',
            createdDate:this.props.todo ? this.props.createdDate : '',
            userID: '',
            errors: {},
            fetched: false,
            todotask: '',
            count: this.props.todo ? this.props.todo.length : 0,
            todoState: this.props.todo ? this.props.todo : null,


        };

        this.onChange = this.onChange.bind(this);
        this.logout = this.logout.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.deleteAllTodo = this.deleteAllTodo.bind(this);
        this.deleteAllCompleted = this.deleteAllCompleted.bind(this);


    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            todoState: nextProps.todo,

            count: nextProps.todo.length > 0 ? this.props.todo.length : 0
        });

    }


    componentDidMount() {

            this.props.fetchUser();
            let userID = this.state.userID;
            let id = this.props.user._id;
            let count = this.state.count;
            userID = id;
                this.props.fetchTodos(userID).then((response) => {
                    count = response.length;
                    this.setState({count});
                });

                this.setState({userID});
                this.setState({
                    todoState: this.props.todo
                });

    }


    toggle(todoIndex) {
        // Put your code here
        let todoState = this.state.todoState;



        todoState[todoIndex].isChecked = !todoState[todoIndex].isChecked;

        this.setState({
            todoState

        });
        // console.log(todoState[todoIndex].isChecked);

    }

    completeSingleTodo(todoIndex) {


        let count = this.state.todoState.length;
        let todoState = this.state.todoState;

        if(todoState[todoIndex].isChecked) {
            if(!todoState[todoIndex].isCompleted)
            {

                this.props.updateSingleTodo(todoState[todoIndex]._id);
                todoState[todoIndex].isCompleted = true;

                this.props.fetchTodos(this.state.userID).then((response) => {
                    count = response.length;
                    todoState = response;
                    todoState[todoIndex].isChecked= !todoState[todoIndex].isCheckedd;
                    this.setState({count, todoState});
                });




                console.log(todoState[todoIndex].isCompleted)
            }
            else{

                alert("already completed");
            }


        }
        else {
            if(!todoState[todoIndex].isCompleted) {
                alert("use the checkbox")
            }
            else {
                alert("already completed");
            }


        }



    }

    deleteSingleTodo(todoIndex) {
        let todoState = this.state.todoState;
        let count = this.state.todoState.length;

        if(todoState[todoIndex].isChecked) {

            console.log("STATEEEEEEEEEEEEEEE",todoState[todoIndex].isCompleted);
            this.props.deleteSingleTodo(todoState[todoIndex]._id);
            todoState[todoIndex].isChecked = !todoState[todoIndex].isChecked;
            this.props.fetchTodos(this.state.userID).then((response) => {
                count = response.length;
                todoState = response;
                this.setState({count, todoState});
            });


        }
        if(todoState[todoIndex].isChecked) {
            if(todoState[todoIndex].isCompleted) {
               return;
            }

        }

        else {
            console.log("STATE",todoState[todoIndex].isCompleted);

        }
    }




    logout(e) {
        e.preventDefault();
        this.props.logout().then((response) => {

            // browserHistory.push('/login');
            window.location ="/login";
        })
    }
    isValid() {
        const { errors, isValid } = validateTodoForm(this.state);

        if (!isValid){
            this.setState({errors});
        }
        return isValid;
    }

    onChange(e) {
        if(!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                [e.target.name]: e.target.value, errors
            });
        }
        else {
            this.setState({[e.target.name]:e.target.value});
        }

    }

    deleteAllTodo(e) {
        e.preventDefault();

        let r = confirm("Do you want to delete all your todo?");
        if (r == true) {
            this.props.deleteAllTodo(this.state.userID);
            window.location = '/';
        }
    }
    deleteAllCompleted(e) {
        e.preventDefault();

        let r = confirm("Do you want to delete all  the completed todo?");
        if (r == true) {
            this.props.deleteAllCompleted(this.state.userID).then((response) => {
            });
            window.location = '/';

        }
    }

    createTodo(e) {
        e.preventDefault();
        let todoState = this.state.todoState;
        let count = this.state.count;
        if (this.isValid){
            this.setState({
                errors: {},
                fetched: true,
                checkBoxStatus: false
            });
            this.props.createTodo(this.state).then((response) => {
                if(!response.data.success){
                    const data = response.data;
                    this.setState({errors:data, fetched: false});
                }else {
                    this.props.fetchTodos(this.state.userID).then((response) => {
                        count = response.length;
                        todoState = response;
                        this.setState({count, todoState});
                    });
                    this.setState({ errors: {}, todotask:'' });

                }


            })
        }
    }

    render()
    {
        document.title= "Home | Just Do IT";

        const {isChecked,fetched, todotask,errors, count, todoState} = this.state;
        const { deleteSingleTodo, user, todo} = this.props;
        let todoComplete = 0;
        let activeComplete = 0;
        let allTodos = [];
        for(var index = 0; index < todoState.length; index++) {
            if (todoState[index].isCompleted) {
                todoComplete = todoComplete+1
            }
            allTodos.push(
                <div className="task-content">
                    <ul className="task-list">
                        <ListItem
                            EachTodo = {todoState[index]}
                            onComplete={this.toggle.bind(this, index)}
                            key={todoState[index]._id}
                            deleteSingleTodo={this.deleteSingleTodo.bind(this, index)}
                            completed = {todoState.isCompleted ? "completed" : ''}
                            completeSingleTodo={this.completeSingleTodo.bind(this, index)}
                            isChecked={isChecked}
                        />
                    </ul>
                </div>
            );
        }
        let activeTodos = [];

        for(var index = 0; index < todoState.length; index++) {
            if (!todoState[index].isCompleted) {
                activeComplete = activeComplete+1;
                activeTodos.push(
                    <div className="task-content">
                        <ul className="task-list">
                            <li>
                                <div className="task-title">
                                    <span className={todoState[index].isCompleted ? 'active' : 'task-title'}>{todoState[index].name}</span>
                                    <div className="pull-right hidden-phone">
                                        {todoState[index].createdDate}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                );
            }

        }



        let completedTodos = [];
        for(var index = 0; index < todoState.length; index++) {
            if (todoState[index].isCompleted) {
                completedTodos.push(
                    <div className="task-content">
                        <ul className="task-list">
                            <li>
                                <div className="task-title">
                                    <span className={todoState[index].isCompleted ? 'active' : 'task-title'}>{todoState[index].name}</span>
                                    <div className="pull-right hidden-phone">
                                        {todoState[index].createdDate}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                );
            }

        }

        return (
            <TodoComponent
                deleteAllTodo={this.deleteAllTodo}
                deleteAllCompleted={this.deleteAllCompleted}
                createTodo={this.createTodo}
                logout={this.logout}
                user = {user.username}
                todotask = {todotask}
                onChange={this.onChange}
                errors = {errors}
                userEmail = {user.email}
                count = {count}
                allTodos = {allTodos}
                todoComplete = {todoComplete}
                activeTodos = {activeTodos}
                completedTodos = {completedTodos}
                activeComplete = {activeComplete}

            />
        );
    }

}

TodoPage.propTypes = {
    logout:PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    todotask: PropTypes.string,
    isAuthenticated: React.PropTypes.bool.isRequired,
    // todo: PropTypes.array.isRequired,
    createTodo: PropTypes.func.isRequired,
    deleteAllTodo: PropTypes.func.isRequired,
    fetchTodos: PropTypes.func.isRequired
    // isAuthenticated: PropTypes.bool.isRequired,
};

TodoPage.contextTypes = {
    router: PropTypes.object.isRequired
};
function mapStateToProps(state,props) {
    if(props.params._id){
        return {
            todo: state.todo(find(item => item._id === props.params._id))
        }
    }
    return {
        user: state.user.user,
        todo: state.todo,
        isAuthenticated: state.user.isAuthenticated
    };
}
export default connect(mapStateToProps, {deleteAllCompleted,updateSingleTodo,deleteSingleTodo,deleteAllTodo, FETCH_TODO, fetchTodos, logout, fetchUser, createTodo, setTodos} )(TodoPage);
