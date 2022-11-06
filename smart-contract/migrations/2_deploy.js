const Dcoin=  artifacts.require('Dcoin.sol');
const Dnews= artifacts.require('Dnews.sol');

module.exports = async function (deployer, network, address) {

    // const [admin,_] = addresses;

    if(network==='develop')
    {
        let erc20 = await deployer.deploy(Dcoin,100000000000000000000);    
            deployer.deploy(newsCoin,erc20);
    }

    const initialSupply = BigInt(100000 * 10 ** 18);
    await deployer.deploy(Dcoin, initialSupply);
    const token = await Dcoin.deployed();
    await deployer.deploy(Dnews, token.address,1);
    const DnewsContract = await Dnews.deployed();
    // await token.updatemarketplaceSmartContractAddress(marketplace.address);
    
};
