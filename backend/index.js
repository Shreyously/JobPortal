import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";
dotenv.config({});

const app = express();
const PORT = process.env.PORT || 3000;

const _dirname = path.resolve();
 

// middleware
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser());
const corsOptions = {
    origin:'https://jobportal-qlmu.onrender.com',
    credentials:true
}

app.use(cors(corsOptions));




// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'))
})

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})