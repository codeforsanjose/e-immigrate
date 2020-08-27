import React from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { getUsers } from '../../sendRequest/apis';
import { withRouter } from 'react-router-dom';
import './UsersInfo.css';

class UsersInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usernames: [],
            admin: '',
        }
    }

    componentDidMount() {
        let jwt = localStorage.getItem('jwt-eimmigrate');
        if (!jwt) {
            return this.props.history.push('/login');
        }

        if (jwt) {
            sendRequest(getUsers, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }).then((usersInfo) => {
                this.setState({
                    usernames: usersInfo.users,
                    admin: usersInfo.admin.name
                })
            })
        }
    }

    render() {
        const usernames = this.state.usernames.map(user =>
            <li>
                <div className="user-name">Name: {user.name}</div>
                <div className="phone-number">Phone number: {user.phoneNumber}</div>
                <div className="docs">Document: {user.document}</div>
            </li>
        )
        return (
            <div>
                <div className="user-info">
                    Hello {this.state.admin}!
                    Our users are:
                </div>
                <div className="usersList">
                    <ol>
                        {usernames}
                    </ol>
                </div>
            </div>
        )
    }
}

export default withRouter(UsersInfo);