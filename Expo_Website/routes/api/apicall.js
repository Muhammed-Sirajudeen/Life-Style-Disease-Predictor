const { default: axios } = require("axios");

async function makeGetrequest(url,data){
    let res=await axios.post('http://localhost:5000/'+url,data)

    
}
module.exports.makeGetrequest=makeGetrequest;