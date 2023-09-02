const mysql = require("mysql");
const con = mysql.createPool({
       connectionLimit: 10,
       host: process.env.db_host,
        user: process.env.db_user,
        password: process.env.db_pass,
        database: process.env.db_name
    });
 exports.view=(req,res)=>{
   con.getConnection((err,connection)=>{
        if(err) throw err
        connection.query("select * from users",(err,rows)=>{
        connection.release();
        if(!err){
         
         res.render("home",{rows});
        }
        else{
         console.log("Error in listing data"+err)
        }
        });
       });
    };

    exports.adduser= (req, res) => {
      res.render("adduser");
    }

    exports.save= (req, res) => {
      con.getConnection((err,connection)=>{
         if(err) throw err
         
         const{name,age,city}=req.body;


         connection.query("insert into users (NAME,AGE,CITY) values (?,?,?)",[name,age,city],(err,rows)=>{
         connection.release();
         if(!err){
          res.render("adduser",{msg:"user detail added successfully"});
         }
         else{
          console.log("Error in listing data"+err)
         }
         });
        });
    }

    exports.edituser= (req, res) => {

      con.getConnection((err,connection)=>{
          if(err) throw err
        //get ID from url
        
        let id = req.params.id

         connection.query("select * from users where id=?",[id],(err,rows)=>{
         connection.release();
         if(!err){
          
          res.render("edituser",{rows});
         }
         else{
          console.log("Error in listing data"+err)
         }
         });
        });

    }

    exports.edit= (req, res) => {
      con.getConnection((err,connection)=>{
         if(err) throw err
         
         const{name,age,city}=req.body;
         let id = req.params.id



         connection.query("update users set NAME=?,AGE=?,CITY=? where ID=?",[name,age,city,id],(err,rows)=>{
         connection.release();
         if(!err){
          con.getConnection((err,connection)=>{
            if(err) throw err
           //get ID from url
           
           let id = req.params.id
   
            connection.query("select * from users where id=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
             
             
             res.render("edituser",{rows,msg:"user detail updated successfully"});
            }
            else{
             console.log("Error in listing data"+err)
            }
            });
           });

          
         }
         else{
          console.log("Error in listing data"+err)
         }
         });
        });
    }

    exports.delete=(req,res)=>{
      con.getConnection((err,connection)=>{
        if(err) throw err
        //get ID from url
        
        let id = req.params.id
        connection.query("delete from users where id=?",[id],(err,rows)=>{
          connection.release();
          if(!err){
           res.redirect("/");
          }else{
            console.log(err);
          }
        });
      });
    };