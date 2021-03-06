import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Web3 from 'web3';

var provider=new Web3.providers.HttpProvider('http://metastock-ninantharakan.c9users.io:8080');
var ETHEREUM_CLIENT = new Web3(provider);
var acct=ETHEREUM_CLIENT.eth.accounts;
//console.log(acct);

var MasterContractABI = [{"constant":true,"inputs":[{"name":"_userID","type":"string"}],"name":"getuserAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_userID","type":"string"},{"name":"_pwd","type":"string"},{"name":"_role","type":"string"},{"name":"userAddr","type":"address"}],"name":"addUser","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"useraddress","type":"address"}],"name":"getuserID","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
var usrABI= [{"constant":true,"inputs":[{"name":"piitype","type":"string"}],"name":"bytes32ToStrPII","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"piitype","type":"string"}],"name":"getPII","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"bytes"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"piiType","type":"string"},{"name":"piiValue","type":"bytes32"},{"name":"exposepii","type":"string"},{"name":"digcert","type":"bytes"},{"name":"certaddr","type":"address"},{"name":"encrypt_flg","type":"string"},{"name":"url_link","type":"string"}],"name":"addUpdPII","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"piitype","type":"string"}],"name":"deletePII","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"piiType","type":"string"},{"name":"piiValue","type":"bytes32"}],"name":"verifyPII","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]


var master_Addr='0x90217aa566fe2d5706743454f71716b22c9aaf3a';
var usr_addr='0xb22267071b5f83b1676c955baebd0c79f4bdb24f';
var cert_addr='0xb22267071b5f83b1676c955baebd0c79f4bdb24f';
 // This needs to be replaced. Get the User Contract address from Master Contract
// var usr_addr = MyMasterContract.getuserAddress.call(this.state.username ,{from:acct[0]});
             

var MyMasterContract= ETHEREUM_CLIENT.eth.contract(MasterContractABI).at(master_Addr);
var MyUserContract= ETHEREUM_CLIENT.eth.contract(usrABI).at(usr_addr);

//********************* Code will be same till here for all pages************************************************

const style = {
  margin: 15,
};

class Login extends Component {
    

    constructor(props) {
    super(props);
    this.state = {
      username:'',
      OTP:'',
      password:''
    };
  }

       handleClick(event){
        if(this.state.username.length>0 && this.state.password.length>0 && this.state.OTP.length>0){
           
           console.log(MyUserContract.address);
            var userid_verify = MyUserContract.verifyPII.call("User ID",this.state.username);
            var passwd_verify = MyUserContract.verifyPII.call("Password",this.state.password);
            
            if(userid_verify && passwd_verify)
            {
                this.props.history.push('/Dashboard');
            }
            else{
                this.props.history.push('/Login');
            }
        }
         else{
      alert("Input field value is missing");
    }
 }


    render() {
    return (
        
       <div>
        <MuiThemeProvider>
          <div className="App">
          <AppBar title="XXXID Manager"
           /> 
           
            <h2>Login</h2>
            
            User ID :   
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
          />
           <br/>
           Password : 
           <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
                <br/>
          OTP : 
            <TextField
               hintText="Enter OTP"
               floatingLabelText="OTP"
               onChange = {(event,newValue) => this.setState({OTP:newValue})}
               />
                <br/>
            <RaisedButton label="Login" primary={true} style={style} 
                onClick={(event) => this.handleClick(event)}/>
               
           </div>
            </MuiThemeProvider>
        </div>
        );
    }
    
}
export default Login;
         