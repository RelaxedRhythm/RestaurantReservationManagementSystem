require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

const userRoutes=require("./routes/authRoutes");
const reservationRoutes=require("./routes/reservationRoutes");
const tableRoutes=require("./routes/tableRoutes");

const connectDB=require("./connect");

const port=process.env.PORT || 5000;

connectDB();

const app=express();
const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];

//middlewares
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// app.options('*', cors({
//     origin: allowedOrigins,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));
app.use(express.json());

//routes
app.use("/api/users",userRoutes);

app.use("/api/reservations",reservationRoutes);

app.use("/api/tables",tableRoutes);
//server listening
app.listen(port,()=>{
    console.log(`Server is running on port ${port}: http://localhost:${port}`);
});