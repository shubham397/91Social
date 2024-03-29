import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <Register />
    );
  }
}

const validEmailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      email: null,
      password: null,
      phone: null,
      address: null,
      errors: {
        fullName: 'Full Name must be 5 characters long!',
        email: 'Email is not valid!',
        password: 'Password must be 8 characters long!',
        phone: 'Phone must be 10 characters long!',
        address: 'Address must be 10 characters long!',
      }
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'fullName':
        errors.fullName =
          value.length < 5
            ? 'Full Name must be 5 characters long!'
            : '';
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password':
        errors.password =
          value.length < 8
            ? 'Password must be 8 characters long!'
            : '';
        break;
      case 'phone':
        errors.phone =
          value.length != 10
            ? 'Phone must be 10 characters long!'
            : '';
        break;
      case 'address':
        errors.address =
          value.length < 10
            ? 'Address must be 10 characters long!'
            : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let form = document.getElementById("formError");
    var message = '';
    if (validateForm(this.state.errors)) {
      document.getElementById("wholeForm").style.display = "none";
      message += "<ul><li><b>NAME: </b>" + document.form.fullName.value;
      message += "<li><b>EMAIL: </b>" + document.form.email.value;
      message += "<li><b>PASSWORD: </b>" + document.form.password.value;
      message += "<li><b>PHONE: </b>" + document.form.phone.value;
      message += "<li><b>ADDRESS: </b>" + document.form.address.value + "</ul>";
      document.getElementById("formData").innerHTML=message;
      form.innerText = 'Valid Form';
    } else {
      form.innerText = 'Invalid Form';
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className='wrapper'>
        <div id="formData" className='form-wrapper'>
          <h2>Welcome</h2>
          <form id="wholeForm" name="form" onSubmit={this.handleSubmit}>
            <div className='fullName'>
              <label htmlFor="fullName">Full Name</label>
              <input type='text' name='fullName' onChange={this.handleChange} />
              {errors.fullName.length > 0 &&
                <span className='error'>{errors.fullName}</span>}
            </div>
            <div className='email'>
              <label htmlFor="email">Email</label>
              <input type='email' name='email' onChange={this.handleChange} />
              {errors.email.length > 0 &&
                <span className='error'>{errors.email}</span>}
            </div>
            <div className='password'>
              <label htmlFor="password">Password</label>
              <input type='password' name='password' onChange={this.handleChange} />
              {errors.password.length > 0 &&
                <span className='error'>{errors.password}</span>}
            </div>
            <div className='phone'>
              <label htmlFor="phone">Phone</label>
              <input type='number' name='phone' onChange={this.handleChange} />
              {errors.phone.length > 0 &&
                <span className='error'>{errors.phone}</span>}
            </div>
            <div className='address'>
              <label htmlFor="address">Address</label>
              <input type='text' name='address' onChange={this.handleChange} />
              {errors.address.length > 0 &&
                <span className='error'>{errors.address}</span>}
            </div>
            <div className='submit'>
              <button>Submit</button>
              <span id="formError" className='error'></span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;