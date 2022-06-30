const {user} = require('../models');
const {generateAccessToken, sendAccessToken, isAuthorized} = require('./webToken')
const { asyncWrapper} = require("../errors/async");
const CustomError = require("../errors/custom-error");
const ethers = require('ethers')
const StatusCodes = require("http-status-codes")
const {mintToken} = require('./smartContract')
const bcrypt = require('bcrypt');

module.exports = {

    signIn: asyncWrapper(async (req, res, next) => {

        if (req.body.email === undefined || req.body.password === undefined) {
            throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.CONFLICT);
        }
        const {email,password} = req.body
        const cryptPassword=bcrypt.hashSync(password, 10); //비밀번호 암호화
        console.log(email,"------",cryptPassword)
        const userInfo = await user.findOne({
            where: {email: email},
        });
        const validPassword = await bcrypt.compare(password, userInfo.password);
        if (!validPassword) {
            throw new CustomError("존재하지 않는 사용자입니다.",StatusCodes.NOT_FOUND);
        } else {
            const payload = {
                id: userInfo.id,
                email: userInfo.email,
                username: userInfo.username,
                token: userInfo.token,
                createdAt: userInfo.createdAt,
                updatedAt: userInfo.updatedAt
            }
            sendAccessToken(res, await generateAccessToken(payload))
            if(userInfo.todayLogin===false){
                await mintToken(userInfo.address, 5);
                userInfo.update({
                    todayLogin: true,
                })
            }
            res.status(StatusCodes.OK).send({message: "ok"})
        }
    }),

    signOut: (req, res) => {
        res.clearCookie('jwt')
        res.status(StatusCodes.OK).send("로그아웃 되었습니다.");
    },
    signUp: asyncWrapper(async (req, res, next) => {
        if (req.body.email === undefined || req.body.password === undefined || req.body.userName === undefined ) {
            throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.CONFLICT);
        } else {
            try {
                const {email,userName,password} = req.body
                const salt = await bcrypt.genSalt(10);
                const cryptPassword=bcrypt.hashSync(password, salt); //비밀번호 암호화
                const foundAccount = await user.findOne({
                    where:{email: req.body.email}
                });
                if (foundAccount) throw new CustomError("이미 존재하는 아이디 입니다.",StatusCodes.CONFLICT);
                const account = ethers.Wallet.createRandom()
                const newBody = {email,userName,password:cryptPassword, address: account.address, privateKey: account.privateKey};
                const newAccount = new user(newBody);
                await newAccount.save();
                res.status(StatusCodes.OK).send({message: "ok"});
            } catch (err) {
                res.status(400).json({message: err.message});
            }

        }
    }),


    getBalance : asyncWrapper(async (req, res) => {
        const decoded = await isAuthorized(req)
        const userInfo = await user.findOne({
            where: {id: decoded.id},
        });
        const {userName,token} = await userInfo
        res.status(200).json({
            status: "success",
            data: {
                userName,
                token
            },
        });
    }),

}



