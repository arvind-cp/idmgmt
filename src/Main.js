import React from 'react';
import { Switch, Route } from 'react-router-dom';
//import Register from './Register';
import Register from './Register';
import Welcome from './Welcome';
import Home from './Home';
import Login from './Login';
import Dashboard from './Dashboard';
import Certify from './Certify';
import CertifySuccess from './CertifySuccess';
import BankRegistration from './BankRegistration';
import PartnerBankRegister from './Partner_Register';
import PartnerRegisterIDMgr from './Partner_Register_IDMgr';
import PartnerLoginMain from './Partner_Login_Main';
import PartnerLoginIDMgr from './Partner_Login_IDMgr';
import PartnerKYC from './Partner_KYC';
import Partner2KYC from './Partner2_KYC';
import PartnerDashboard from './Partner_Dashboard';


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/Login' component={Login}/>
      <Route path='/Welcome' component={Welcome}/>
      <Route path='/Dashboard' component={Dashboard}/>
      <Route path='/Register' component={Register}/>
      <Route path='/Certify' component={Certify}/>
      <Route path='/CertifySuccess' component={CertifySuccess}/>
      <Route path='/BankRegistration' component={BankRegistration}/>
      <Route path='/Partner_Register' component={PartnerBankRegister}/>
      <Route path='/Partner_Register_IDMgr' component={PartnerRegisterIDMgr}/>
      <Route path='/Partner_KYC' component={PartnerKYC}/>
      <Route path='/Partner2_KYC' component={Partner2KYC}/>
      <Route path='/Partner_Dashboard' component={PartnerDashboard}/>
      <Route path='/Partner_Login_Main' component={PartnerLoginMain}/>
      <Route path='/Partner_Login_IDMgr' component={PartnerLoginIDMgr}/>


    </Switch>
  </main>
);

export default Main;
