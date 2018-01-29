import React, { Component } from 'react';
import './Partner_App.css';
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
var usrABI= [{"constant":false,"inputs":[{"name":"piitype","type":"string"}],"name":"getPII","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"bytes"},{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"piitype","type":"string"},{"name":"piiValue","type":"bytes"},{"name":"exposepii","type":"string"},{"name":"certid","type":"string"},{"name":"digcert","type":"bytes"}],"name":"deletePII","outputs":[{"name":"","type":"bool"},{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"bytes"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"piiType","type":"string"},{"name":"piiValue","type":"bytes"}],"name":"verifyPII","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"userID","type":"string"},{"name":"password","type":"string"},{"name":"exposepii","type":"string"},{"name":"digcert","type":"bytes"},{"name":"certid","type":"string"}],"name":"destructMe","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"piiType","type":"string"},{"name":"piiValue","type":"bytes"},{"name":"exposepii","type":"string"},{"name":"digcert","type":"bytes"},{"name":"certaddr","type":"address"}],"name":"addUpdPII","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"userID","type":"string"},{"name":"password","type":"string"}],"name":"destructMe","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"constructor","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"userID","type":"string"},{"name":"password","type":"string"},{"name":"piitype","type":"string"}],"name":"usrApprovePII","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"inputs":[],"payable":false,"type":"constructor","stateMutability":"nonpayable"}]
            

var master_Addr='0x2ff3823b03fc924a1a3103e5f5d964bacd1b494a';
var usr_addr='0x9fc238a9b0a6be0002e86b4affa2970688c95a4c';
var cert_addr='0x9fc238a9b0a6be0002e86b4affa2970688c95a4c';

var MyMasterContract= ETHEREUM_CLIENT.eth.contract(MasterContractABI).at(master_Addr);
var MyUserContract= ETHEREUM_CLIENT.eth.contract(usrABI).at(usr_addr); 
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
   
   MyUserContract.addUpdPII("User ID",this.state.username,"Y","Self Certified",cert_addr,{from:acct[1],gas:150000}); 
   


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
          <div className="Partner_App">
          <AppBar
             title="Bank of USA"
           /> 
           <br/>
           <img src="https://exitpromise.com/wp-content/uploads/2013/07/Banking-Structure.jpg" width="100" height="100"></img> <h2>Welcome</h2>
            <h2> Open Account Online! </h2>
           User ID :   
           <TextField/><br/>
           Name :   
           <TextField/><br/>
           Password : 
           <TextField/><br/>
          Repeat Password :
          <TextField/><br/>
          Email ID : 
           <TextField /><br/>
          Contact No :
          <TextField/><br/>
          SSN No: 
          <TextField/><br/>
          Passport / DL #
          <TextField/><br/>
          Citizenship
          <TextField/><br/>
          Address Line 1
          <TextField/><br/>
          Address Line 2
         <TextField/><br/>
         City
         <TextField/><br/>
         State
         <TextField/><br/>
         Zip
         <TextField/><br/>
         Employer Name
         <TextField/><br/>
         Occupation
         <TextField/><br/>
         Annual Income
         <TextField/><br/>
         

              <br/>
               <br/>  <br/>
                <RaisedButton label="Register" primary={true} style={style} 
                onClick={(event) => this.handleClick(event)}/>
                <br/> <br/>
               OR  <br/> <br/>
               Use Trust ID Manager Login
                <br/>
                <a href="http://identity-management-mayank8292.c9users.io:8080/Partner_Register_IDMgr">
               <img src="http://groovyman.com/wp-content/uploads/2016/05/identity.jpg" width="100" height="100"></img>
               </a>
           </div>
            </MuiThemeProvider>
        </div>
        );
    }
}
export default Register;