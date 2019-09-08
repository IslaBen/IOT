const express = require('express');
var sqldb = require("mssql");
var config = require("./config.js");
var {serverPort} = require('./config');
const bodyparser = require('body-parser');
var cors = require('cors');
const axios = require('axios')


const app = express();
app.use(bodyparser.json());
app.use(cors())
app.use(
    bodyparser.urlencoded({
      extended: false
    })
  )
  
//Setting up the db.
const db = new sqldb.ConnectionPool(config.dbConfig);
//connecting to the SQL db
db.connect((err) =>{
    if(err) {
        throw err;
}
    console.log("Oracle SQL Connected");
    let createCustomers = `create table customers(
        id int primary key ,
        account_number int not null ,
        essn_number int not null ,
        mac varchar(255) not null ,
        first_name varchar(255) not null ,
        last_name varchar(255) not null ,
        email varchar(255) not null ,
        zip varchar(255) not null   
    )
    create table users(
        id int primary key ,
        username varchar(255) not null unique,
        password varchar(255) not null unique,
    )  
    create table notes(
        id int primary key ,
        id_customer int not null ,
        content varchar(255) not null ,
        created_at timestamp not null 
    )  
    `;
    let insertCustomers = `
    INSERT INTO customers (id,account_number,essn_number,mac,first_name,last_name,email,zip) VALUES(1,2,12,500023,'salhi','shinj','salhi@gmail.com',1651);            
    INSERT INTO customers (id,account_number,essn_number,mac,first_name,last_name,email,zip) VALUES(2,3,13,50002,'omar','omar','salhi@gmail.fr',1605);            
    INSERT INTO customers (id,account_number,essn_number,mac,first_name,last_name,email,zip) VALUES(3,4,14,5023,'ali','salhi ','salhi@hotmail.com',6051);            
    INSERT INTO customers (id,account_number,essn_number,mac,first_name,last_name,email,zip) VALUES(4,5,15,52023,'test','ali','salhi@yahoo.com',151);            
    INSERT INTO customers (id,account_number,essn_number,mac,first_name,last_name,email,zip) VALUES(5,6,16,523,'test','haider ','salhi@outlook.com',51);            
    INSERT INTO users (id,username,password) VALUES(2,'test','haider');            
    INSERT INTO notes (id,id_customer,content) VALUES(1,2,'salhi');            
    INSERT INTO notes (id,id_customer,content) VALUES(2,3,'omar');            
    INSERT INTO notes (id,id_customer,content) VALUES(3,4,'ali');            
    INSERT INTO notes (id,id_customer,content) VALUES(4,5,'test');            
    INSERT INTO notes (id,id_customer,content) VALUES(5,6,'test');            

    `;
    db.query(createCustomers, function(err, results, fields) {
        if (err) {
            console.log('table exists');
            return axios.get('http://localhost:3001/CSQReadings')
            .then(response =>console.log(response.data))
        
        }else{
            console.log('customers table created .. ');
            db.query(insertCustomers, function(err, results, fields) {
                if (err) {
                  console.log(err.message);
                }else{
                    console.log('dummy data inserted  options :\
                    \ http://localhost:8080/insert/customers : to isnert data'+
                     'http://localhost:8080/delete/customers : to delete data ');
                }
              });
        
        }
      });
    
});


const port = serverPort || 9000;
app.listen(port, () => {
    console.log(`A Node Js API is listening on port: ${port}`);
});


//Get all customers
app.get('/delete/customers', (req, res) => {
    db.query('delete from customers where id>0', (err, results) => {
        if (!err)
            res.send(results);
        else
            console.log(err);
    })
});
app.get('/customers', (req, res) => {
    db.query('SELECT * FROM customers', (err, results) => {
        if (!err)
            res.send(results);
        else
            console.log(err);
    })
});




app.get('/insert/customers', (req, res) => {
    db.query(insertCustomers, (err, results) => {
        if (!err)
            res.send(results);
        else
            console.log(err);
    })
});


//Get an customers
//Delete an customers

//Insert an customers
// app.post('/customers', (req, res) => {
//     let customer = req.body;
//     var sql = "SET @account_number = ?;SET @Name = ?;SET @customerCode = ?;SET @Salary = ?; \
//     CALL customerloyeeAddOrEdit(@account_number,@Name,@customerCode,@Salary);";
//     db.query(sql, [customer.account_number, customer.Name, customer.customerCode, customer.Salary], (err, results) => {
//         if (!err)
//             results.forEach(element => {
//                 if(element.constructor == Array)
//                 res.send('Inserted customerloyee id : '+element[0].account_number);
//             });
//         else
//             console.log(err);
//     })
// });


app.post('/insert/note', (req, res) => {
    let new_id;
    let {id_customer,content} = req.body;
    let timestamp = new Date().getTime();
    db.query('select max(id) as max_id from notes', (err, results) => {
        if (err){
            console.log(err)
        }else{
            new_id = results.recordset[0].max_id + 1;
             var sql = ` INSERT INTO notes(id,id_customer,content) values(${new_id},'${id_customer}','${content}')`;
                db.query(sql, (err2, results2) => {
                    if (err2){
                        console.log(err2)
                    }else{
                        var sql2 = ` SELECT * FROM notes WHERE id_customer = ${id_customer}`;
                        db.query(sql2, (err3, results3) => {
                            if (err3){
                                return res.send(err3)
                            }else{
                                return res.json({
                                    data:results3
                                })
                            }
                        });
                    
                    }
                });
        
        }
    });
    
});

app.post('/customer/update', (req, res) => {
    let {account_number,esn_number,mac_address,first_name,last_name,email,zip_code} = req.body;
    let sql = `update customers SET 
    esn_number=${esn_number} ,
    mac_address='${mac_address}' ,
    first_name='${first_name}' ,
    last_name='${last_name}' ,
    email='${email}' ,
    zip_code='${zip_code}' 
    where account_number=${account_number}`;
    db.query(sql, (err, results) => {
        if (err){
            console.log(err.originalError)
        }else{
            var sql2 = ` SELECT * FROM customers WHERE account_number = ${account_number}`;
            db.query(sql2, (err2, results2) => {
                if (err){
                    return res.send(err2)
                }else{
                    return res.json({
                        data:results2
                    })
                }
            });

        }
    });
    
});




app.get('/note', (req, res) => {
    let {id_customer} = req.query;
    var sql = ` SELECT * FROM notes WHERE id_customer = ${id_customer}`;
    db.query(sql, (err, results) => {
        if (err){
            return res.send(err)
        }else{
            return res.json({
                data:results
            })
        }
    });
});


app.get('/search', (req, res) => {
    let {account_number,esn_number,mac_address,first_name,last_name,email,zip_code} = req.query;
    var sql = ` SELECT * FROM customers WHERE account_number=${account_number} or esn_number=${esn_number} or mac_address='${mac_address}' or first_name='${first_name}' or last_name='${last_name}' or email='${email}' or zip_code='${zip_code}';`;
    db.query(sql, (err, results) => {
        if (err){
            console.log(sql)
        }else{
            return res.json({
                data:results
            })
        }
    });
});


app.get('/customer', (req, res) => {
    let {id} = req.query;
    var sql = ` SELECT * FROM customers WHERE id = ${id}`;// or essn_number = ${essn_number} or mac = ${mac} or first_name = ${first_name} or last_name = ${last_name} or email = ${email} or zip = ${zip} `;
    db.query(sql, (err, results) => {
        if (err){
            return res.send(err)
        }else{
            return res.json({
                data:results
            })
        }
    });
});



app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		mysqlConnection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
                return response.json({
                    data:results
                })
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
  
app.post('/register', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
    if (username && password) {
		mysqlConnection.query('insert into users values(?,?)', [username, password], function(error, results, fields) {
            if (error) {
                response.json({
                    status:false,
                    message:'there are some error with query'
                })
              }else{
				request.session.loggedin = true;
                request.session.username = username;
                return response.json({
                    data:results
                })
    
              }
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});



