import React, { Component, PropTypes } from 'react';
import ListItem from '../Body/listitem';
import classnames from 'classnames';

class TodoList extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        // const {checkStatus,todoState,countDec} = this.state;
        const {deleteAllCompleted,activeComplete,completedTodos,activeTodos,todoComplete,allTodos,deleteAllTodo,count,createTodo, errors,todotask, onChange} = this.props;

        return (
            <div className="row">
                <div className="col-xs-offset-3 col-xs-6">
                    <h1 id="todoTitle">TODOS</h1>

                    <div className="widget-box">
                        <div className="widget-body">
                            <div className="widget-main">
                                <form onSubmit={createTodo}>
                                    <label
                                        className={classnames("block clearfix form-group", {'has-error': errors.todotask})}>
                                        <div className="input-group">
                                            <input
                                                name="todotask"
                                                className="form-control"
                                                type="text"
                                                size="50"
                                                value={todotask}
                                                onChange={onChange}
                                                placeholder="What needs to be done?"/>
                                            <span className="input-group-btn">
                                    <button className="btn btn-sm btn-primary" type="submit">
                                        <i className="ace-icon fa fa-calender bigger-100"></i>
                                        Add task
                                    </button>
                                    </span>

                                        </div>
                                        {errors.todotask && <span className="help-block">{errors.todotask}</span>}
                                    </label>


                                </form>
                                <h1 id="status">Status: <span id="finished">{todoComplete}</span> of <span id="total">{count}</span></h1>
                                <div className="tabbable">
                                    <ul className="nav nav-tabs" id="myTab">
                                        <li className="active">
                                            <a data-toggle="tab" href="#all">
                                                <i className="blue ace-icon fa fa-bookmark bigger-120"></i>
                                                All
                                            </a>
                                        </li>

                                        <li>
                                            <a data-toggle="tab" href="#active">
                                                Active &nbsp;
                                                <span className="badge badge-warning">{activeComplete}</span>
                                            </a>
                                        </li>

                                        <li>
                                            <a data-toggle="tab" href="#completed">
                                                Completed &nbsp;
                                                <span className="badge badge-success">{todoComplete}</span>
                                            </a>
                                        </li>

                                    </ul>


                                    <div className="tab-content">


                                        <div id="all" className="tab-pane fade in active tasks-widget">
                                            <div className="task-content" >
                                                <ul className="task-list">
                                                    <li className="">
                                                        <div className="task-title">
                                                            <div className="pull-right hidden-phone">
                                                                <button type="submit" onClick={deleteAllTodo} className="btn btn-danger">Delete All <i className="fa fa-trash-o "></i></button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>


                                            {allTodos}

                                        </div>

                                        <div id="active" className="tab-pane fade tasks-widget">

                                            {activeTodos}

                                        </div>

                                        <div id="completed" className="tab-pane fade tasks-widget">
                                            <div className="task-content" >
                                                <ul className="task-list">
                                                    <li className="">
                                                        <div className="task-title">
                                                            <div className="pull-right hidden-phone">
                                                                <button type="submit" onClick={deleteAllCompleted} className="btn btn-danger">Delete All <i className="fa fa-trash-o "></i></button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>


                                            {completedTodos}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

TodoList.propTypes = {
    createTodo: PropTypes.func.isRequired,
    deleteAllTodo: PropTypes.func.isRequired,
    todotask: PropTypes.string,
    errors: PropTypes.object

};

export default TodoList;