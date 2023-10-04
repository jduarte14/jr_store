const { connection } = require('./db/conexion');
const express = require("express");
const cors = require("cors");

connection();

const app = express();
const port = 4800;

const whitelist = ['https://dehierroymadera.com.uy/'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:whitelist
 }));

const product_routes = require("./routes/product_routes");
const user_routes = require("./routes/user_routes");

app.use("/api", product_routes);
app.use("/auth", user_routes);

app.listen(port, () => {
    console.log(`servidor funcionando en el puerto ${port}`);
});
