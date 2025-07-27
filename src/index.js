const express = require('express');
const { serverConfig } = require('./config');
const app = express();
app.use(express.json());
// only folder name implies it is going to it's index.js file
const apirouter = require('./routers');
app.use(express.json()) ;
app.use(express.urlencoded({extended : true}))
app.get("/home", (req, res) => {
    return res.json({ msg: "route working" });
});

app.use("/api", apirouter);

// Start server
app.listen(serverConfig.PORT, () => {
    console.log('Successfully Running!');
});
