import React, { Component } from 'react';
import axios from 'axios';
import UsersList from './components/UsersList';
import About from './components/About'
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Form from './components/Form';
import Logout from './components/Logout';
import UserStatus from './components/UserStatus';

class App extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			username: '',
			email: '',
			title: 'testdriven-app',
			formData: {
				username: '',
				email: '',
				password: ''
			},
			isAuthenticated: false
		};
		this.addUser = this.addUser.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.logoutUser = this.logoutUser.bind(this);
		this.getUserStatus = this.getUserStatus.bind(this);
	};

	componentWillMount() {
		console.log('will mount')
		if (window.localStorage.getItem('authToken')) {
			this.setState({ isAuthenticated: true });
		};
	};

	componentDidMount() {
		console.log('getting users');
		this.getUsers();
	};

	getUsers() {
		axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
		.then((res) => { this.setState({ users: res.data.data.users }); })
		.catch((err) => { console.log(err); });
	};

	addUser(event) {
		event.preventDefault();
		const data = {
			username: this.state.username,
			email: this.state.email
		};
		console.log('data', data);
		axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
		.then((res) => {
		this.getUsers();
		this.setState({ username: '', email: '' });
		})
		.catch((err) => { console.log(err); });
	};

	handleChange(event) {
		const obj = {};
		obj[event.target.name] = event.target.value;
		this.setState(obj);
	};

	handleUserFormSubmit(event) {
		event.preventDefault();
		const formType = window.location.href.split('/').reverse()[0];
		let data = {
			email: this.state.formData.email,
			password: this.state.formData.password,
		};
		if(formType === 'register') { 
			data.username = this.state.formData.username;
		}
		const url = `${process.env.REACT_APP_USERS_SERVICE_URL}/auth/${formType}`;
		axios.post(url, data)
		.then((res) => {
			this.clearFormState();
			window.localStorage.setItem('authToken', res.data.auth_token);
			this.setState({ isAuthenticated: true });
			this.getUsers();
		})
		.catch((err) => { 
			console.log('Error submitting form', err);
		})
	}

	handleFormChange(event) {
		const obj = this.state.formData;
		obj[event.target.name] = event.target.value;
		this.setState(obj);
	}

	clearFormState(){
		this.setState({
			formData: {username: '', email: '', password: ''},
			username: '',
			email: ''
		});
	};

	logoutUser() { 
		window.localStorage.clear();
		this.setState({ isAuthenticated: false });
	}


	getUserStatus(event){
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
			this.setState({ isAuthenticated: true})
		})
		.catch((err) => { console.log(err) })
	};

	render() {
		return (
			<div>
				<NavBar isAuthenticated={this.state.isAuthenticated} title={this.state.title} />
				<section className="section">
					<div className="container">
						<div className="columns">
							<div className="column is-half">
								<Switch>
									<Route exact path='/' render={() => (
										<UsersList users={this.state.users}/>
									)} />
									<Route exact path='/about' component={About}/>
									<Route exact path='/register' render={()=>(
										<Form
											formType={'Register'}
											formData={this.state.formData}
											handleUserFormSubmit={this.handleUserFormSubmit}
											handleFormChange={this.handleFormChange}
											isAuthenticated={this.state.isAuthenticated}
										/>
									)} />
									<Route exact path='/login' render={()=>(
										<Form
											formType={'Login'}
											formData={this.state.formData}
											handleUserFormSubmit={this.handleUserFormSubmit}
											handleFormChange={this.handleFormChange}
											isAuthenticated={this.state.isAuthenticated}									
										/>
									)} />
									<Route exact path='/logout' render={() => (
										<Logout
											logoutUser={this.logoutUser}
											isAuthenticated={this.state.isAuthenticated}
										/>
									)} />
									<Route exact path='/status' render={() => (
										<UserStatus
											isAuthenticated={this.state.isAuthenticated}
										/>
									)} />								
								</Switch>
							</div>
						</div>
					</div>
				</section>
			</div>
		)
	}
};
export default App;