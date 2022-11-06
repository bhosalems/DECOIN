import web3 from './web3';
const buildJson= require('./DnewsV2.json');

const abi=buildJson.abi
const address=process.env.REACT_APP_SC_ADDRESS;
const contract=new web3.eth.Contract(abi,address);
console.log("contract",contract);
// @ts-ignore
export default new web3.eth.Contract(abi,address);