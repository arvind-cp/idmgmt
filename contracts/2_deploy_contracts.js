var Master_Contract = artifacts.require("./Master_Contract.sol");
var User_Contract = artifacts.require("./User_Contract.sol");
var Cert_Contract = artifacts.require("./User_Contract.sol");

module.exports = function(deployer) {  
deployer.deploy(Master_Contract);  
deployer.deploy(User_Contract);  deployer.deploy(Cert_Contract);
};
