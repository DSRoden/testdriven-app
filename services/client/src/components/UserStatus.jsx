import React,  { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UserStatus extends Component { 
	constructor (props){
		super(props);
		this.state = {
			email: '',
			id: '',
			username: ''
		};
	};

	componentDidMount() {
		if (this.props.isAuthenticated) {
			console.log('get user details');
			this.getUserStatus();
		}
	};

	getUserStatus(event){
		console.log('get user')
		const options = {
			url: `${process.env.REACT_APP_USERS_SERVICE_URL}/auth/status`,
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${window.localStorage.authToken}`
			}
		};
		return axios(options)
		.then((res) => { console.log(res.data.data) 
			this.setState({
				email: res.data.data.email,
				id: res.data.data.id,
				username: res.data.data.username
			});
		})
		.catch((err) => { console.log(err) })
	};

	render() {
		if(!this.props.isAuthenticated){
			return (
				<p>You must be logged in to view this. Click <Link to="/login">here</Link> to
				log back in.</p>
			)
		}
		return (
			<div>
				<ul>
					<li><strong>User ID:</strong> {this.state.id}</li>
					<li><strong>Email:</strong> {this.state.email}</li>
					<li><strong>Username:</strong> {this.state.username}</li>
				</ul>
			</div>
		)
	}
};

export default UserStatus;