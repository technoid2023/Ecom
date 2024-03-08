import Cookies from "js-cookie";
import CryptoJS from "crypto-js";



function encrypt(text ) {
  return CryptoJS.AES.encrypt(text, "poms-nic").toString();
}


function decrypt(ciphertext, key = "poms-nic") {
  let bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

const encryptUser=Cookies.get('_UR')

let userData;
let userRole;
if(encryptUser===undefined){
    userRole=null
}
else{
  let Data=decrypt(encryptUser);
    userData=JSON.parse(Data)
    userRole=(userData.roles)
  ////console.log(userData);
  }
  const isAuthenticated = async (r) => {
 
    await new Promise((resolve) => {

        if (userRole !== undefined) {
            resolve();
        } else {
          
            const intervalId = setInterval(() => {
                if (userRole !== undefined) {
                    clearInterval(intervalId);
                    resolve();
                }
            }, 50);
        }
    });


    if (userRole === null) {
        return false;
    }
    if (userRole) {
        const flag = userRole.includes(r);
        return flag;
    }
};


function extractSubstringAfterLastSlash(str) {
if(str!==null){
  const lastIndex = str.lastIndexOf('/');
  ////console.log(lastIndex+1);
  return str.substring(lastIndex + 1);
}
else{
  return
}
  
  
}
function extractSubstrings(obj, resultArray) {
  for (const key in obj) {
      if (Array.isArray(obj[key])) {
          obj[key].forEach(item => {
              extractSubstrings(item, resultArray);
          });
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          extractSubstrings(obj[key], resultArray);
      } else if (key === 'strAppUrl') {
       
      
          console.log("xxxx",obj[key]);
          resultArray.push(extractSubstringAfterLastSlash(obj[key]));
        
         
      }
  }
}
export { isAuthenticated,encrypt,decrypt,extractSubstrings,extractSubstringAfterLastSlash};