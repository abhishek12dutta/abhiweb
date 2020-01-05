const axios = require("axios");

export const api = {
    callregister
};  

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 50000,
  headers: { "Content-Type": "application/json" }
});

  
function callregister(user) {
    // user: {
    //     fullname: "",
    //     username: "",
    //     password: "",
    //     countrycode: "",
    //     phnext: "",
    //     phnno: "",
    //     email:""
    //   }
    instance
    .post("/auth/signup", {
        name:user.fullname,
        username:user.username,
        email:user.email,
        password:user.password,
        personalDetails:{
           country:user.countrycode,
           pincode:'723133',
           phnextn:parseInt(user.phnext),
           phnno:parseInt(user.phnno)
        }
    })
    .then(function(response) {
      const data=response.data;
      console.log(response);
      if(response.status==201){
        return data;
      }else{
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
    })
    .catch(function(error) {
        return Promise.reject(error);
    });
}
