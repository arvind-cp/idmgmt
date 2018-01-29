import React, { Component } from 'react';
import './Partner_App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Web3 from 'web3';

const style = {
  margin: 1
};

class Register extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
      username:'',
      name:'',
      emailid:'',
      password:'',
      repassword:'',
      value: ''
    };
  }

 handleChange = (event, index, value) => this.setState({value});
 
 handleClick(event){

           this.props.history.push('/Register');
     
  }
    
 
    render() {
    return (
        
       <div>
        <MuiThemeProvider>
          <div className="Partner_App">
          <AppBar
             title="Bank of USA"
           /> 
           <br/>
           <img src="https://exitpromise.com/wp-content/uploads/2013/07/Banking-Structure.jpg" width="100" height="100"></img> <h2>Home</h2>
               <img src="https://docops.ca.com/devtest-solutions/8-0/en/files/161352004/161612779/1/1419280924045/2126109.png" width="1000" height="500"></img>
           </div>
            </MuiThemeProvider>
        </div>
        );
    }
}
export default Register;