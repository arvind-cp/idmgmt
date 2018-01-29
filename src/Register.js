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

var MyMasterContract= ETHEREUM_CLIENT.eth.contract(MasterContractABI).at(master_Addr);
var MyUserContract= ETHEREUM_CLIENT.eth.contract(usrABI).at(usr_addr); 
//var MyUserContractProxy= new ETHEREUM_CLIENT.eth.contract(usrABI); 
//var MyUserContract=MyUserContractProxy.new({data:usr_byte_code,from:acct[0],gas:150000});
//console.log("Address=",MyUserContract); 
//********************* Code will be same till here for all pages************************************************
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

  if(this.state.username.length>0 && this.state.name.length>0 && this.state.emailid.length>0 && this.state.password.length>0 && this.state.repassword.length>0){
   //Add User in Master Contract - function addUser(string _userID, string _pwd,string _role,address userAddr) returns (bool)
   var res = MyMasterContract.addUser(this.state.username,this.state.password,this.state.value,usr_addr,{from:acct[1]});
   
   // Create User Contract object 
   // Add code for getting the User Contract Address from Master Contract and create new User Contract  

   // Add basic PII to User Contract -    
   //function addUpdPII(string piiType, bytes32 piiValue,string exposepii,bytes digcert,address certaddr,string encrypt_flg) returns (bool){

   MyUserContract.addUpdPII("User ID",this.state.username,"Y","Self Certified",cert_addr,'N','N/A',{from:acct[1],gas:200000}); 
   MyUserContract.addUpdPII("Name",this.state.name,"Y","Self Certified",cert_addr,'N','http://www.google.com',{from:acct[1],gas:200000}); 
   MyUserContract.addUpdPII("Email ID",this.state.emailid,"Y","Self Certified",cert_addr,'N','',{from:acct[1],gas:200000});
   MyUserContract.addUpdPII("Password",this.state.password,"Y","Self Certified",cert_addr,'Y','',{from:acct[1],gas:200000});
   MyUserContract.addUpdPII("Blockchain Address",acct[1],"Y","Self Certified",cert_addr,'N','',{from:acct[1],gas:200000});


      if(res){
      this.props.history.push('/Welcome');
     }
     else{
      this.props.history.push('/Register');
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
          <AppBar
             title="Trust ID Manager"
           /> 
           <br/>
           <img src="http://groovyman.com/wp-content/uploads/2016/05/identity.jpg" width="100" height="100"></img>
           <h2>Welcome</h2>
      
           User ID :   
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
          />
           <br/>
           
           Name :   
           <TextField
             hintText="Enter your Name"
             floatingLabelText="Name"
             onChange = {(event,newValue) => this.setState({name:newValue})}
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
          Repeat Password : 
           <TextField
               type="password"
               hintText="Enter Password again"
               floatingLabelText="Re Enter Password"
               onChange = {(event,newValue) => this.setState({repassword:newValue})}
               />
                <br/>
          Email ID : 
           <TextField
               hintText="Enter your Email ID"
               floatingLabelText="EmailID"
               onChange = {(event,newValue) => this.setState({emailid:newValue})}
               />
              <br/>
          User Type :
          
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
             <MenuItem value="User" primaryText="User" />
             <MenuItem value="Certifier" primaryText="Certifier" />
          </DropDownMenu>
               <br/>
                <RaisedButton label="Register" primary={true} style={style} 
                onClick={(event) => this.handleClick(event)}/>
               
           </div>
            </MuiThemeProvider>
        </div>
        );
    }
}
export default Register;