import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


const style = {
  margin: 15,
};

class BankRegistration extends Component {
    
    constructor(props) {
    super(props);
    this.state = {

    };
  }

    render() {
    return (
        
       <div>
        <MuiThemeProvider>
          <div className="App">
          <AppBar
             title="Bank of YYY"
           /> 
           <h2>New User Registration</h2>
      
           Name :   
           <TextField
             hintText="Enter your Name"
             floatingLabelText="Name"
             onChange = {(event,newValue) => this.setState({name:newValue})}
          />
           <br/>
           SSN : 
           <TextField
             hintText="Enter your SSN"
             floatingLabelText="SSN"
             onChange = {(event,newValue) => this.setState({ssn:newValue})}
          />
                <br/>
           Occupation : 
           <TextField
             hintText="Enter your Occupation"
             floatingLabelText="Occupation"
             onChange = {(event,newValue) => this.setState({occupation:newValue})}
          />
                <br/>
                Address : 
           <TextField
             hintText="Enter your Address"
             floatingLabelText="Address"
             onChange = {(event,newValue) => this.setState({address:newValue})}
          />
           <br/>
          Email ID : 
           <TextField
               hintText="Enter your Email ID"
               floatingLabelText="EmailID"
               onChange = {(event,newValue) => this.setState({emailid:newValue})}
               />
              <br/>
          
               <br/>
                <RaisedButton label="Register" primary={true} style={style} 
                onClick={(event) => this.handleClick(event)}/>
               
           </div>
            </MuiThemeProvider>
        </div>
        );
    }
}
export default BankRegistration;
