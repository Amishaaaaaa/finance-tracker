const express = require('express');
const bodyParser = require('body-parser');
const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user')

const app = express();

//middlewares
app.use(bodyParser.json());
// app.use("/", (req, res) => {
//     res.send("hello");
// })
app.use("/admin", adminRoute);
app.use("/user", userRoute);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});