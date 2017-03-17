import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchUser} from '../containers/actions/userActions';


export default function(ComposedComponent) {
    class AuthContainer extends Component {

        componentWillMount() {
            this.props.fetchUser();
            if (!this.props.isAuthenticated) {
                console.log("NOT AUTHENTICATED");
                this.context.router.push('/login');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                this.context.router.push('/');
            }
        }

        render() {

            return (
                <ComposedComponent {...this.props} />
            )
        }
    }


    AuthContainer.propTypes = {
        isAuthenticated: React.PropTypes.bool.isRequired,
        // addFlashMessage: React.PropTypes.func.isRequired
    };
    AuthContainer.contextTypes = {
        router: PropTypes.object.isRequired
    };
    function mapStateToProps(state) {
        return {
            isAuthenticated: state.user.isAuthenticated
        };
    }

    return connect(mapStateToProps, { fetchUser})(AuthContainer);

}



