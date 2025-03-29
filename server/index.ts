import env from "dotenv";
import connectDB from "./config/database.js";
import {app} from "./app.js";

env.config();
const port =process.env.PORT || 3000;


connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`⚙️ Server is running at port : ${port}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})