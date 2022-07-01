const models = require("./models/index.js");
const express = require("express");
const errorHandler = require('./errors/error-handler')
const accountRoutes = require('./routes/account');
const boardRoutes = require('./routes/board');
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require("fs");
const https = require("https");
const app = express();
const PORT = 4000;
const {createServerAccount, deployContracts,getFaucet,loginInitialization,subscribe} = require('./serverInit')
const{SJTokenBytecode, SJTokenAbi} = require('./contracts/SJToken')




app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ['https://localhost:3000'],
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS']
    })
);



app.use('/account', accountRoutes);
app.use('/board', boardRoutes);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

///무조건 루트 밑에
app.use(errorHandler)



models.sequelize.sync().then( () => {
    console.log(" DB 연결 성공");
    let server;
    if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
        const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
        const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
        const credentials = { key: privateKey, cert: certificate };
        server = https.createServer(credentials, app);
        server.listen(PORT, async () => {
            console.log(`      🚀 HTTPS Server is starting on ${PORT}`);
            await createServerAccount()
            await getFaucet(1)
            await deployContracts("FT", SJTokenAbi, SJTokenBytecode)
            await loginInitialization()
            await subscribe()
        })

    } else {
        console.log("error!!!")
    }
}).catch(err => {
    console.log("연결 실패");
    console.log(err);
})





