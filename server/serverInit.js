const {ethers} = require("ethers");
const {user, contract,transaction} = require("./models");
const schedule = require("node-schedule");
const {SJTokenAbi}=require('./contracts/SJToken')
const provider = new ethers.providers.JsonRpcProvider(process.env.NODE_URI);

const sleep = (ms) => {
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

module.exports = {
    createServerAccount: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const foundAccount = await user.findOne({
                    where: {email: "admin"}
                });
                if (foundAccount) {
                    console.log("server account exist!!")
                    resolve();
                } else {
                    const account = ethers.Wallet.createRandom()
                    const newBody = {
                        email: "admin",
                        userName: "admin",
                        password: "admin",
                        address: account.address,
                        privateKey: account.privateKey
                    };
                    const newAccount = new user(newBody);
                    await newAccount.save();
                    console.log("server account created!!")
                    resolve();
                }
            } catch (err) {
                console.log(err)
                reject(err)
            }
        })
    },

    deployContracts: (type, abi, bytecode) => {
        return new Promise(async (resolve, reject) => {
            try {



                const serverContract = await contract.findOne({
                    where: {type: type}
                });
                const data = await user.findOne({
                    where: {email: "admin"}
                });
                if (serverContract === null) {
                    const serverWallet = new ethers.Wallet(data.privateKey, provider)
                    const gasPrice = ethers.utils.formatUnits(await provider.getGasPrice(), 'gwei')
                    const options = {gasLimit: 6721975, gasPrice: ethers.utils.parseUnits(gasPrice, 'gwei')}
                    const factory = new ethers.ContractFactory(abi, bytecode, serverWallet)
                    let serverBalance = await provider.getBalance(data.address)
                    while (serverBalance<0.1){
                        await sleep(1000)
                        serverBalance = await provider.getBalance(data.address)
                        console.log("loading...")
                    }
                    console.log("complete!")
                    const serverContract = await factory.deploy(options)
                    await serverContract.deployed()
                    const serverContractAddress = serverContract.address
                    console.log(`Deployment successful! Contract Address: ${serverContractAddress}`)
                    const newBody = {contractAddress: serverContractAddress, type: type};
                    const newContract = new contract(newBody);
                    await newContract.save();
                    resolve();
                } else {
                    console.log("Contract is already deployed!");
                    console.log(`Contract Address: ${serverContract.contractAddress}`);

                    resolve();
                }
            } catch (err) {
                reject(err);
            }
        });
    },


    getFaucet: async (amount) => {
        const data = await user.findOne({
            where: {email: "admin"}
        });

        if (data === null) {
            console.log("Server account is not created!");
            return;
        }
        const serverBalance = await provider.getBalance(data.address)
        if (serverBalance > 0.1) {
            console.log('Server ETH : ', ethers.utils.formatEther(serverBalance))
            return;
        }
        let privateKey = process.env.GANACHE_ACCOUNT_PRIVATE_KEY
        // Create a wallet instance
        let wallet = new ethers.Wallet(privateKey, provider)
        // Receiver Address which receives Ether
        let receiverAddress = data.address
        // Ether amount to send
        // Create a transaction object
        let tx = {
            to: receiverAddress,
            // Convert currency unit from ether to wei
            value: ethers.utils.parseEther(amount.toString())
        }
        // Send a transaction
        wallet.sendTransaction(tx)
            .then(async (txObj) => {
                const serverBalance = await provider.getBalance(data.address)
                console.log('txHash : ', txObj.hash)
                console.log('Server ETH : ', ethers.utils.formatEther(serverBalance))
            })


    },

    loginInitialization: async () => {
        schedule.scheduleJob('59 59 23 * * *', async () => {
            const users = await user.findAll();
            users.map(
                async (user) => {
                    await user.update({
                        todayLogin: false
                    })
                }
            )
        })
    },


    subscribe: async () => {
        const serverContract = await contract.findOne({
            where: {type: "FT"}
        });
        const FTContract = new ethers.Contract(serverContract.contractAddress, SJTokenAbi, provider);
        FTContract.on("mintedToken", async (to, amount,data) => {
            console.log("mintToken transaction ====> ",data.transactionHash)
            const userData = await user.findOne({
                where: {address: to}
            });
            await transaction.findOrCreate({
                where: {
                    txHash: data.transactionHash,
                    method: 'mintToken',
                    token: ethers.utils.formatEther(amount),
                    userId: userData.id,
                },
            })

            const mintedToken= await transaction.findAll({
                where: {
                    userId: userData.id,
                },
            })
            let totalToken= mintedToken.reduce(function add(sum,data){return sum+data.token},0)
            await userData.update(
                {token: totalToken}
            )

        });

    },
}