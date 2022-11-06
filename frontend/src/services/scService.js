import web3 from "../config/web3";
import Dnews from "../config/dnews-abi.ts";
import { ethers } from "ethers";

const getAccounts = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts;
};

const getAccount = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts[0];
};

//register the user on sc
const register = async (account, deposit) => {
    console.log("acount",account);
    console.log("deposit",deposit);
  const status = await Dnews.methods.register().send({
    from: account,
    gas: 2000000,
    value: ethers.utils.parseEther(String(deposit)),
  });
  
  console.log("status",status)
  // if (!status.ok) {
  //   window.location.reload();
  // }
};

//reviewer votes for the article
const vote = async (account) => {
  try {
    const status = await Dnews.methods.vote().send({
      from: account,
      gas: 2000000,
    });
  } catch (error) {
    console.log("error in getBalance", error);
  }
};

const getBalance = async (account) => {
  let balance = 0;

  try {
    const res = await Dnews.methods.users(account).call();
    balance = res.balance.toString();

    //   return web3.utils.fromWei(balance, "ether");
    return balance;
  } catch (error) {
    console.log("error in getBalance", error);
  }
};

//writer publishes the article
const publish = async (account, hashVal) => {
  try {
    console.log("article",hashVal);
    console.log("account",account);
    let hashvalue = web3.utils.soliditySha3(hashVal);
    console.log("hashValue",hashvalue);
    const status = await Dnews.methods.publish(String(hashvalue)).send({
      from: account,
      gas: 2000000,
    });

    return hashvalue;
  } catch (error) {
    console.log("error in publish", error);
  }
};

//reader reads the article

const read = async (account, deposit) => {
  try {
    const status = await Dnews.methods.read().send({
      from: account,
      gas: 2000000,
      value: ethers.utils.parseEther(String(0.5)),
    });
  } catch (error) {
    console.log("error in read", error);
  }
};

export default {
  getAccounts,
  getAccount,
  getBalance,
  register,
  vote,
  getBalance,
  publish,
  read,
};
