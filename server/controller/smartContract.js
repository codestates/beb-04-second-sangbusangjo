const {user, contract,transaction} = require("../models");
const {ethers} = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(process.env.NODE_URI);
const {SJTokenAbi} = require('../contracts/SJToken')

module.exports ={
    mintToken : async (toAddress, amount) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { privateKey: adminPrivateKey } =
                    await user.findOne({
                        where: { email: "admin" }
                    });
                const { contractAddress } = await contract.findOne({
                    where:{ type: "FT" }
                });
                const wallet = new ethers.Wallet(adminPrivateKey,provider);
                const SJTContract = new ethers.Contract(contractAddress,SJTokenAbi,wallet);
                const sendPromise = await SJTContract.mintToken(toAddress,ethers.utils.parseEther(amount.toString()));

                // 이거는 데몬에서 해주자
                // const newTransaction = new transaction({
                //     txHash: sendPromise.hash,
                //     method: "mintToken",
                //     token: amount,
                //     userId: toId,
                // });
                // await newTransaction.save();
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    },
}

