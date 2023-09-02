const  express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");


const Connection = require("mysql/lib/Connection");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000; //port num for running server

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

app.use(express.static("public"));//to use static files

//template engine
const handlebars = exphbs.create({extname:"hbs"});
app.engine('hbs',handlebars.engine);
app.set('view engine',"hbs");

//mysql connection
// const con = mysql.createPool({
//     connectionLimit: 10,
//     host: process.env.db_host,
//     user: process.env.db_user,
//     password: process.env.db_pass,
//     database: process.env.db_name
// });

//check DB
// con.getConnection((err,connection)=>{
//  if(err) throw err
//  console.log("connection success");
// });





//router
// app.get('/',(req,res)=>{
//  res.render("home");
// });

const routes = require("./server/routes/students")
app.use('/',routes)

//listens port
app.listen(port,()=>{
    console.log("listening on port:" +port);
});
