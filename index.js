const { connection } = require('./db/conexion');
const express = require("express");
const cors = require("cors");

connection();

const app = express();
const port = 4800;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:(origin,callback)=>{
        const accepted_origins = [
            'https://dehierroymadera.com.uy',
            'http://192.168.1.4:3000'
        ]
        if(accepted_origins.includes(origin) || !origin){
            callback(null,true)
       }
       else {
        return callback(new Error("No allowed by CORS"));
       }
    }
}))

const product_routes = require("./routes/product_routes");
const user_routes = require("./routes/user_routes");
const banner_routes = require('./routes/banner_routes');

app.use("/api", product_routes);
app.use("/auth", user_routes);
app.use("/api", banner_routes);
app.listen(port, () => {
    console.log(`servidor funcionando en el puerto ${port}`);
});