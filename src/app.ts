
import express from 'express';
import userRoutes from "./api/routes/users.routes"
import rolesRoutes from './api/routes/roles.routes';


const app = express();
app.use(express.json());
app.use("/api/users",userRoutes);
app.use("/api/roles",rolesRoutes);
app.get("/", (request, respose)=>respose.send({status: "Ok"}));

export default app;
