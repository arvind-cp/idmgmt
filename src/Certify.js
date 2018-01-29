import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Web3 from 'web3';
import _ from 'lodash';

//import Tabs from 'material-ui/Tabs';
//import Tab from 'material-ui/Tabs';

//var file=new File('/home/ubuntu/workspace/id_management_project/identity_management_eth/src/Identity.png');

//var fs= new FileReader();

var reader = new FileReader();

var provider=new Web3.providers.HttpProvider('http://metastock-ninantharakan.c9users.io:8080');
var ETHEREUM_CLIENT = new Web3(provider);
var acct=ETHEREUM_CLIENT.eth.accounts;
//console.log(acct);

var MasterContractABI = [{"constant":true,"inputs":[{"name":"_userID","type":"string"}],"name":"getuserAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_userID","type":"string"},{"name":"_pwd","type":"string"},{"name":"_role","type":"string"},{"name":"userAddr","type":"address"}],"name":"addUser","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"useraddress","type":"address"}],"name":"getuserID","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
var usrABI= [{"constant":true,"inputs":[{"name":"piitype","type":"string"}],"name":"bytes32ToStrPII","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"piitype","type":"string"}],"name":"getPII","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"bytes"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"piiType","type":"string"},{"name":"piiValue","type":"bytes32"},{"name":"exposepii","type":"string"},{"name":"digcert","type":"bytes"},{"name":"certaddr","type":"address"},{"name":"encrypt_flg","type":"string"},{"name":"url_link","type":"string"}],"name":"addUpdPII","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"piitype","type":"string"}],"name":"deletePII","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"piiType","type":"string"},{"name":"piiValue","type":"bytes32"}],"name":"verifyPII","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]


var master_Addr='0x90217aa566fe2d5706743454f71716b22c9aaf3a';
var usr_addr='0xb22267071b5f83b1676c955baebd0c79f4bdb24f';
var cert_addr='0xb22267071b5f83b1676c955baebd0c79f4bdb24f'; // This needs to be replaced with Certifier contract address
// This needs to be replaced. Get the User Contract address from Master Contract
// var usr_addr = MyMasterContract.getuserAddress.call(this.state.username ,{from:acct[0]});
var dig_cert='MyDigCert' //This needs to be replaced

var MyMasterContract= ETHEREUM_CLIENT.eth.contract(MasterContractABI).at(master_Addr);
var MyUserContract= ETHEREUM_CLIENT.eth.contract(usrABI).at(usr_addr);

//********************* Code will be same till here for all pages**********************************************

const style = {
  margin: 15,
};
 
class Certify extends Component {
    
   constructor(props) {
    super(props);
    this.state = {
      userid:'',
      name:'',
      value: '',
      attributevalue:'',
      proofpath:'',
      proofuploadlink:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Nepal_new_passport.jpg/220px-Nepal_new_passport.jpg'
      //Above needs to be replaced with actual URL where ID Proof is uploaded
    };
  }

 handleChange = (event, index, value) => this.setState({value});

openFile(event) {
  var openFile = function(event) {
    var input = event.target;

    reader.onload = function(){
      var dataURL = reader.result;
      var output = document.getElementById('output');
      output.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
    console.log(reader);
  };
}
 handleClick(event){
  var name_match = MyUserContract.verifyPII.call("Name",this.state.name);
  var res;
  var proofhash;
  if(this.state.proofpath.length>0){
           // function addUpdPII(string piiType, bytes32 piiValue,string exposepii,bytes digcert,address certaddr,string encrypt_flg,string url_link) returns (bool){
           res = MyUserContract.addUpdPII(this.state.value,proofhash,'Y',dig_cert,cert_addr,'Y',this.state.proofuploadlink,{from:acct[1],gas:200000});
      }
 else 
        { 
        // If Proof file is NOT uploaded then hash the proof text value and add it to the contract
         // function addUpdPII(string piiType, bytes32 piiValue,string exposepii,bytes digcert,address certaddr,string encrypt_flg,string url_link) returns (bool){
        console.log(this.state.proofpath);
         res = MyUserContract.addUpdPII(this.state.value,this.state.attributevalue,'Y',dig_cert,cert_addr,'Y',this.state.proofuploadlink,{from:acct[1],gas:200000});
        }
             if (res)
             {
              
              this.props.history.push('/CertifySuccess');
              
             }
             else{
               this.props.history.push('/Certify');
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
           <h2>Welcome to Identity Certification Portal!</h2>
          
            User ID :   
           <TextField
             hintText="ID of User to be Certified"
             onChange = {(event,newValue) => this.setState({userid:newValue})}
          />
           <br/>
           
           Name :   
           <TextField
             hintText="Name of User to be Certified"
             onChange = {(event,newValue) => this.setState({name:newValue})}
          />
           <br/>
            Attribute Type :
          
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
             <MenuItem value="Passport" primaryText="Passport" />
             <MenuItem value="DL" primaryText="DL" />
             <MenuItem value="SSN" primaryText="SSN" />
             <MenuItem value="Email ID" primaryText="Email ID" />
          </DropDownMenu>
              <br/>
            Enter Attribute Value : 
           <TextField
               hintText="Identity Attribute Value"
               onChange = {(event,newValue) => this.setState({attributevalue:newValue})}
               />
             Store Hash &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox"  />&nbsp;
            <br/>
            <br/>
            OR
            <br/>
            Upload Attribute Proof : 
           <input type='file' accept='image/*' onClick={(event) =>this.openFile(event)} />

                <br/>
               <br/>
               <br/>
               <br/>
               

               I certify the above identity attribute belongs to the user {this.state.name} <input type="checkbox"  />
               <br/> <br/> <br/>
               I agree that i am  legally responsible for the correctness of certified identitity attribute <input type="checkbox"  />

               <br/>
               <br/>
                <RaisedButton label="certify" primary={true} style={style} 
                onClick={(event) => this.handleClick(event)}/>
               
           </div>
            </MuiThemeProvider>
        </div>
        );
    }
}
export default Certify;