var mysql = require('mysql');



  const configx = {
    connectionLimit : 1000,
    host            : 'localhost:8080',
    user            : 'root',
    password        : '',
    database        : 'onne-doctor',
    multipleStatements: true,
    max_user_connections:1000
  };


  const config = {
    connectionLimit : 1000,
    host            : 'mysql5046.site4now.net',
    user            : 'a6478c_doctor',
    password        : 'razors1805',
    database        : 'db_a6478c_doctor',
    multipleStatements: true,
    max_user_connections:1000
  };


let execute = {
    query:(qry,res)=>{
        
        /*
        var pool  = mysql.createPool(config);
        pool.query(qry, function (error, results, fields) {
          
            //if (error) throw error;
            if(error){
                res.send(error);
            }else{
                res.json(results);
            }
           
            //console.log('The solution is: ', results[0].solution);
            
        });
        */

        var connection = mysql.createConnection(config);
          
          connection.connect();
          
          connection.query(qry, function (error, results, fields) {
            if(error){
                res.send(error);
            }else{
                res.json(results);
            }
          });
          
          connection.end();
     
    }
}

module.exports = execute;