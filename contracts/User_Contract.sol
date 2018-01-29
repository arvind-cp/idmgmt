pragma solidity ^0.4.4;

contract User_Contract {
  
   struct PII {
   bytes32 PIIHash;
   string ExposePII;
   address certifierAddr;
   bytes digCert;
   string encr_flg;
   string urllink;
    }
              
   string PIIType;
   address masterAddress;
   mapping (string => PII) piis;    //piis that are certified and approved by user

  //Constructor to initialize
  function User_Contract() public {
   
   masterAddress=msg.sender;
  }
  
  // Add or update a new Certified PII
   function addUpdPII(string piiType, bytes32 piiValue,string exposepii,bytes digcert,address certaddr,string encrypt_flg,string url_link) returns (bool){
   // Direct string comparison not working in solidity. So using sha3() before comparing below
   if(sha3(encrypt_flg)!=sha3('Y'))  
   {piis[piiType].PIIHash=piiValue;}
   else
   {piis[piiType].PIIHash=sha3(piiValue);}
   
   piis[piiType].ExposePII=exposepii;
   piis[piiType].certifierAddr= certaddr;
   piis[piiType].digCert=digcert;
   piis[piiType].encr_flg=encrypt_flg;
   piis[piiType].urllink=url_link;
   return true;
   }
   
   // Delete a PII
   function deletePII(string piitype) returns (bool){
   delete piis[piitype];
   return true;
   }
   
   //Verify if the PII value match with the certified PII
    function verifyPII(string piiType, bytes32 piiValue) returns( bool ){
   
    // Direct string comparison not working in solidity. So using sha3() before comparing below
    if(sha3(piis[piiType].encr_flg)==sha3('Y') && sha3(piiValue) ==piis[piiType].PIIHash)
    {return true;}
    
    if(sha3(piis[piiType].encr_flg)!=sha3('Y') && piiValue == piis[piiType].PIIHash)
    {return true; }
    
    return false;   
  }
  
    
   //get the full User Approved PII object
   function getPII(string piitype) public constant returns(bytes32,string,address,bytes,string,string){
   return (piis[piitype].PIIHash,piis[piitype].ExposePII,piis[piitype].certifierAddr,piis[piitype].digCert,piis[piitype].encr_flg,piis[piitype].urllink);
   }

// Convert bytes to string 
 function bytes32ToStrPII(string piitype) public constant returns (string){
    bytes32 _bytes32=piis[piitype].PIIHash;
    bytes memory bytesArray = new bytes(32);
    for (uint256 i; i < 32; i++) {
        bytesArray[i] = _bytes32[i];
        }
    return string(bytesArray);
    }
   
   
 }