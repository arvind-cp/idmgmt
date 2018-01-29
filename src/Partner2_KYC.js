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

var provider=new Web3.providers.HttpProvider('http://metastock-ninantharakan.c9users.io:8080');
var ETHEREUM_CLIENT = new Web3(provider);
var acct=ETHEREUM_CLIENT.eth.accounts;
//console.log(acct);

var MasterContractABI = [{"constant":true,"inputs":[{"name":"_userID","type":"string"}],"name":"getuserAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_userID","type":"string"},{"name":"_pwd","type":"string"},{"name":"_role","type":"string"},{"name":"userAddr","type":"address"}],"name":"addUser","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"useraddress","type":"address"}],"name":"getuserID","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
var usrABI= [{"constant":true,"inputs":[{"name":"piitype","type":"string"}],"name":"bytes32ToStrPII","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"piitype","type":"string"}],"name":"getPII","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"bytes"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"piitype","type":"string"}],"name":"deletePII","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"piiType","type":"string"},{"name":"piiValue","type":"bytes32"}],"name":"verifyPII","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"piiType","type":"string"},{"name":"piiValue","type":"bytes32"},{"name":"exposepii","type":"string"},{"name":"digcert","type":"bytes"},{"name":"certaddr","type":"address"},{"name":"encrypt_flg","type":"string"}],"name":"addUpdPII","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]


var master_Addr='0x375190774a43cdc9476f86c1391033a9f21f324b';
var usr_addr='0xbdfa6b26060ced07289aa4eb6429db09f5de3017';
var cert_addr='0xbdfa6b26060ced07289aa4eb6429db09f5de3017';
 // This needs to be replaced. Get the User Contract address from Master Contract
// var usr_addr = MyMasterContract.getuserAddress.call(this.state.username ,{from:acct[0]});
             

var MyMasterContract= ETHEREUM_CLIENT.eth.contract(MasterContractABI).at(master_Addr);
var MyUserContract= ETHEREUM_CLIENT.eth.contract(usrABI).at(usr_addr);

//********************* Code will be same till here for all pages**********************************************

const style = {
  margin: 15,
};

class Dashboard extends Component {
  constructor(props){
   super(props);
    this.state = {

     userID: String,
     piiTypes: [],
     piiValues: [],
     expflag:[],
     certifierIds: [],
     digitalcert: [],
     hashflg: []
    };
  }
  
  componentWillMount() {
   // var userid = MyUserContract.getPII.call("User ID",{from:acct[0]});
   var userid= "Ninan";
   var pii=["Passport","DL","Name","Email ID","Address","SSN","Annual Income"];
   
   //  PIIs List             
   var PIIObj_Passport= MyUserContract.getPII.call("Passport",{from:acct[0]});
   var PIIObj_DL=  MyUserContract.getPII.call("DL",{from:acct[0]});
   var PIIObj_Name = MyUserContract.getPII.call("Name",{from:acct[0]});
   var PIIObj_Email= MyUserContract.getPII.call("Email ID",{from:acct[0]});
  
   //PII Value for Name and Email ID is not encrypted. So get the string value instead of bytes32
   var PIIString_Name = MyUserContract.bytes32ToStrPII.call("Name",{from:acct[0]});
   var PIIString_Email = MyUserContract.bytes32ToStrPII.call("Email ID",{from:acct[0]});

   var piival= [PIIObj_Passport[0],PIIObj_DL[0],PIIString_Name,PIIString_Email]
   var exposeflag=  [PIIObj_Passport[1],PIIObj_DL[1],PIIObj_Name[1],PIIObj_Email[1]];
   var certaddr=    [PIIObj_Passport[2],PIIObj_DL[2],PIIObj_Name[2],PIIObj_Email[2]];
   var digcert=     [PIIObj_Passport[3],PIIObj_DL[3],PIIObj_Name[3],PIIObj_Email[3]];   
   var hash_flg= [PIIObj_Passport[4],PIIObj_DL[4],PIIObj_Name[4],PIIObj_Email[4]];
   //console.log("piival="+piival);
  
   this.setState({
    userID: userid,
    piiTypes: pii,
    certifierIds:certaddr,
    kyc_flag: "Pass"
     });
  }
  
  handleClick(event){
        
                this.props.history.push('/Partner_Dashboard');
            }
     
  
 render() {
  
  var TableRows = [];
    _.each(this.state.piiTypes,(value,index) =>{
   
   if(this.state.certifierIds[index]) {
   TableRows.push(
   <tr>
   <td>{this.state.userID}</td> 
   <td>{this.state.piiTypes[index]}</td>
   <td><a href="http://www.google.com">{this.state.certifierIds[index]}</a></td>
   <td>Y</td>
   </tr>
   );
   }
   else
   {
    kyc_flag:"Fail";
    TableRows.push(
   <tr>
   <td>{this.state.userID}</td> 
   <td>{this.state.piiTypes[index]}</td>
   <td><a href="http://www.google.com">0xbdfa6b26060ced07289aa4eb6429db09f5de3017</a></td>
   <td>Y</td>
   </tr>
   );}
  
  });
    return (
      
     <div>
        <MuiThemeProvider>
          <div className="Partner_App">
          <AppBar
             title="Bank of USA"
           /> 
           <br/>
           <img src="https://exitpromise.com/wp-content/uploads/2013/07/Banking-Structure.jpg" width="100" height="100"></img> <h2>Welcome</h2>
           <h2>KYC Check  for {this.state.userID}</h2> <h3> Powered by Trust ID Manager</h3>
           <div className="App-Content">
        <table>
        <thead>
        <tr>
        <th>User ID</th>
        <th>PII Type</th>
        <th>Certifier Address</th>
        <th> KYC Pass? </th>

        </tr>
        </thead>
        <tbody>
        {TableRows}
        </tbody>
        </table>
     
       <br/> KYC Check {this.state.kyc_flag}! New Account Created !<br/><br/>
       <RaisedButton label="Proceed to Home Page" primary={true} style={style} 
                onClick={(event) => this.handleClick(event)}/>
        
        </div>
           </div>
           
             </MuiThemeProvider>
           </div>
      );
 }
}
export default Dashboard;