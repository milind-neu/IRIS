import React from 'react';
import UserTableRow from "../components/userTable";
import { withRouter } from "../utils/withRouter";
import { connect } from "react-redux";
import APIHelper from './../apis/APIHelper.js';

const mapStateToProps = (state) => ({ user: state.userReducer });

class SystemAdmin extends React.Component {
    state = { users: [] }

    /**
     * This page will display all users in the application and will allow the systemAdmin to view, edit and delete any user
     */
    /**
     * Function to get all users
     */
    componentDidMount() {
        APIHelper.getUsersForAdmin(this.props.user.state.accessToken).then((data) => this.setState({ users: data}));
        // fetch('http://localhost:9000/userInfo', this.props.user.state.accessToken)
        //     .then(response => response.json())
        //     .then(data => { 
        //         this.setState({ users: data }) });
    }

    render() {
        console.log(this.state.users);
        const users = this.state.users;
        const isLoading = users === null;
        return (
            <main>
                <div className="table-container">
                    <div className="uk-overflow-auto">
                        <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                            <thead>
                                <tr>
                                    <th className="uk-table-shrink" />
                                    <th className="uk-table-shrink">Avatar</th>
                                    <th>Name</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading
                                    ? <tr><td colSpan={6} className="uk-text-center"><em className="uk-text-muted">Loading...</em></td></tr>
                                    : users.map((user, index) =>
                                        <UserTableRow key={index} index={index + 1} user={user} />
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.13.10/dist/css/uikit.min.css" />
                <script src="https://cdn.jsdelivr.net/npm/uikit@3.13.10/dist/js/uikit.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/uikit@3.13.10/dist/js/uikit-icons.min.js"></script>
            </main>
        );
    }
}

export default connect(mapStateToProps)(withRouter(SystemAdmin));