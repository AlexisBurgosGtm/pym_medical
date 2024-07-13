var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');


var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 3334;

var execute = require('./server/mysqlConnection');

app.use(bodyParser.json());

app.use(express.static('build'));

var path = __dirname + '/'

//manejador de rutas
router.use(function (req,res,next) {
  /*
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name, pplication/json');
        // Set to true if you need the website to include cookies in the requests sent
      res.setHeader('Access-Control-Allow-Credentials', true);
*/
  //console.log("/" + req.toString());
  next();
});

app.get("/",function(req,res){
  //execute.start();
	res.sendFile(path + 'index.html');
}); 

app.get("/receta2",function(req,res){
  
  const {idreceta} = req.query;
  
  res.format ({
    'text/html': function() {
       res.send(`

          <h3>Comprobante de Producto Entregado</h3>
          <br>
          <label>Fecha:</label><b>${fecha}</b>
          <br>
          
          <br>
          <table>
            <thead>
              <tr>
                <td><b>Producto</b></td>
                <td><b>Cantidad</b></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${desprod}
                  <br>
                  <br>
                  <small>Codigo:${codprod}</small>      
                </td>
                <td>${cantidad} ${codmedida}
                  <br>
                  <br>
                  <small>Uns Entregadas: ${totalentregado}</small>
                </td>
              </tr>
            </tbody>
          </table>
          <br>
          <label>Entregado a:</label>
          <h4>${persona}</h4>
          <br>
          <label><b>Observaciones:</b></label>
          <br>
          <label>${obs}</label>
          <br>
          <br>
          <label><b>BLOCKERA DON RAUL</b></label>
       `); 

    }
  })


}); 

// RECETAS
app.get("/receta",function(req,res){
  
  

}); 

// RECETAS

// CLIENTES PACIENTES

app.post("/insert_paciente",function(req,res){

  const {nombre,telefonos,fecha,fechanacimiento,direccion,coddepto,sucursal} = req.body; 
  
  let qry = `INSERT INTO CLIENTES
   (NOMCLIE,TELEFONOS,FECHANACIMIENTO,DIRCLIE,CODDEPTO,TOKEN)
    VALUES ('${nombre}','${telefonos}','${fechanacimiento}','${direccion}',${coddepto},'${sucursal}')`;
  execute.query(qry, res);

}); 


app.post("/edit_paciente",function(req,res){

  const {id,nombre,telefonos,fecha,fechanacimiento,direccion,coddepto,sucursal} = req.body; 
  
  let qry = `UPDATE CLIENTES SET NOMCLIE='${nombre}',DIRCLIE='${direccion}',TELEFONOS='${telefonos}',
              CODDEPTO=${coddepto},FECHANACIMIENTO='${fechanacimiento}' WHERE IDCLIENTE=${id};`;
  execute.query(qry, res);

}); 

app.post("/delete_paciente",function(req,res){

  const {sucursal,id} = req.body; 
  
  
  let qry = `DELETE FROM CLIENTES WHERE IDCLIENTE=${id} AND TOKEN='${sucursal}' `;
  
   
  execute.query(qry, res);

}); 


app.post("/select_paciente",function(req,res){

  const {filtro,sucursal} = req.body; 
  
  let qry = `SELECT TOKEN,IDCLIENTE,NOMCLIE,TELEFONOS,FECHANACIMIENTO, 
          ifnull(DIRCLIE,'CIUDAD') AS DIRCLIE, ifnull(CODDEPTO,0) AS CODDEPTO,
          ifnull(DIABETES,0) AS DIABETES, ifnull(HIPERTENSION,0) AS HIPERTENSION, ifnull(CARDIOPATIAS,0) AS CARDIOPATIAS
  FROM CLIENTES WHERE NOMCLIE LIKE '%${filtro}%' `;



  execute.query(qry, res);

}); 

app.post("/select_lista_pacientes",function(req,res){

  const {sucursal,filtro} = req.body; 
  
  let qry = `SELECT TOKEN, IDCLIENTE,NOMCLIE,TELEFONOS,FECHANACIMIENTO, ifnull(DIRCLIE,'CIUDAD') AS DIRCLIE,
          ifnull(CODDEPTO,0) AS CODDEPTO,
          ifnull(DIABETES,0) AS DIABETES, ifnull(HIPERTENSION,0) AS HIPERTENSION, ifnull(CARDIOPATIAS,0) AS CARDIOPATIAS
           FROM CLIENTES WHERE NOMCLIE LIKE '%${filtro}%' `;

  
         
  execute.query(qry, res);

}); 

// CLIENTES PACIENTES

app.post("/select_correlativo",function(req,res){

  const {sucursal,coddoc} = req.body; 
  
  let qry = `SELECT CORRELATIVO FROM TIPODOCUMENTOS WHERE TOKEN='${sucursal}' AND CODDOC='${coddoc}'`;
  execute.query(qry, res);

});

// RECETAS ...
app.post("/select_temp_receta",function(req,res){

  const {sucursal} = req.body; 
  
  let qry = `SELECT ID, MEDICAMENTO,DOSIS,DURACION FROM TEMP_RECETA
              WHERE TOKEN='${sucursal}' `;
  execute.query(qry, res);

}); 

app.post("/insert_temp_receta",function(req,res){

  const {medicamento,dosis,duracion,sucursal} = req.body; 
  
  let qry = `INSERT INTO TEMP_RECETA (MEDICAMENTO,DOSIS,DURACION,TOKEN)
   VALUES ('${medicamento}', '${dosis}', '${duracion}','${sucursal}')`;
  execute.query(qry, res);

}); 

app.post("/delete_temp_receta",function(req,res){

  const {sucursal, id} = req.body; 
  
  let qry = `DELETE FROM TEMP_RECETA WHERE ID=${id} AND TOKEN='${sucursal}' `;
  execute.query(qry, res);

});

app.post("/delete_all_temp_receta",function(req,res){

  const {sucursal} = req.body; 
  
  let qry = `DELETE FROM TEMP_RECETA WHERE TOKEN='${sucursal}' `;
  execute.query(qry, res);

});

app.post("/insert_receta",function(req,res){

  const {sucursal,correlativo,idcliente,obs,fecha,hora, coddoc,peso,talla,motivo,diagnostico,historia,antecedentes,examenf,impclinica,plantx,idmorbilidad, seguro, receta} = req.body; 
  let nuevocorrelativo = Number(correlativo) + 1;
  let det_receta = JSON.parse(receta);

  let qryR = `INSERT INTO RECETAS 
    (TOKEN,IDRECETA,FECHA,HORA,CODCLIENTE,OBS,PESO,TALLA,MOTIVO,DIAGNOSTICO,HISTORIAENF,ANTECEDENTES,EXAMENFISICO,PLANTX,IMPRESIONCLINICA,IDMORBILIDAD,SEGURO) 
      VALUES 
    ('${sucursal}',${correlativo},'${fecha}','${hora}',${idcliente},'${obs}',${peso},${talla},'${motivo}','${diagnostico}','${historia}','${antecedentes}','${examenf}','${plantx}','${impclinica}',${idmorbilidad},'${seguro}');`;
 
    let qryD = "";
    det_receta.map((r)=>{
        qryD +=  `INSERT INTO RECETAS_DETALLE (TOKEN,IDRECETA,MEDICAMENTO,DOSIS,DURACION) 
        VALUES ('${sucursal}', ${correlativo},'${r.DESPROD}','${r.DOSIS}','${r.DURACION}');`
    })
 
    
 
 
  let qryDoc = `UPDATE TIPODOCUMENTOS SET CORRELATIVO=${nuevocorrelativo} WHERE CODDOC='${coddoc}' AND TOKEN='${sucursal}';`

  execute.query(qryD + qryR + qryDoc, res);

});




app.post("/insert_receta_VIEJO",function(req,res){

  const {sucursal,correlativo,idcliente,obs,fecha,hora, coddoc,peso,talla,motivo,diagnostico,historia,antecedentes,examenf,impclinica,plantx,idmorbilidad, seguro} = req.body; 
  let nuevocorrelativo = Number(correlativo) + 1;

  let qryR = `INSERT INTO RECETAS 
    (TOKEN,IDRECETA,FECHA,HORA,CODCLIENTE,OBS,PESO,TALLA,MOTIVO,DIAGNOSTICO,HISTORIAENF,ANTECEDENTES,EXAMENFISICO,PLANTX,IMPRESIONCLINICA,IDMORBILIDAD,SEGURO) 
      VALUES 
    ('${sucursal}',${correlativo},'${fecha}','${hora}',${idcliente},'${obs}',${peso},${talla},'${motivo}','${diagnostico}','${historia}','${antecedentes}','${examenf}','${plantx}','${impclinica}',${idmorbilidad},'${seguro}');`;
  let qryD = `INSERT INTO RECETAS_DETALLE (TOKEN,IDRECETA,MEDICAMENTO,DOSIS,DURACION) SELECT '${sucursal}' AS TOKEN, ${correlativo} AS IDRECETA,TEMP_RECETA.MEDICAMENTO,TEMP_RECETA.DOSIS,TEMP_RECETA.DURACION FROM TEMP_RECETA WHERE TEMP_RECETA.TOKEN='${sucursal}';`
  let qryDoc = `UPDATE TIPODOCUMENTOS SET CORRELATIVO=${nuevocorrelativo} WHERE CODDOC='${coddoc}' AND TOKEN='${sucursal}';`

  execute.query(qryD + qryR + qryDoc, res);

});




app.post("/insert_preconsulta",function(req,res){

  const {sucursal,idcliente,fecha,hora, peso,talla,motivo,diagnostico,historia,antecedentes,examenf,impclinica,plantx,idmorbilidad,seguro} = req.body; 
  
  let qry = `INSERT INTO RECETAS_PRECONSULTA 
    (TOKEN,FECHA,CODCLIENTE,PESO,TALLA,MOTIVO,DIAGNOSTICO,HISTORIAENF,ANTECEDENTES,EXAMENFISICO,PLANTX,IMPRESIONCLINICA,IDMORBILIDAD,SEGURO) 
      VALUES 
    ('${sucursal}','${fecha}',${idcliente},${peso},${talla},'${motivo}','${diagnostico}','${historia}','${antecedentes}','${examenf}','${plantx}','${impclinica}',${idmorbilidad},'${seguro}');`;
  
  execute.query(qry, res);

});

app.post("/delete_preconsulta",function(req,res){

  const {sucursal, id} = req.body; 
  
  let qry = `DELETE FROM RECETAS_PRECONSULTA WHERE ID=${id} AND TOKEN='${sucursal}'; 
             `;
             
  execute.query(qry, res);

});


app.post("/delete_receta",function(req,res){

  const {sucursal, id} = req.body; 
  
  let qry = `DELETE FROM RECETAS WHERE IDRECETA=${id} AND TOKEN='${sucursal}'; 
            DELETE FROM RECETAS_DETALLE WHERE IDRECETA=${id} AND TOKEN='${sucursal}'; `;
  execute.query(qry, res);

});

app.post("/select_historial_recetas",function(req,res){

  const {sucursal,codclie} = req.body; 
  
  let qry = `SELECT TOKEN, ID, IDRECETA, FECHA, HORA, OBS,PESO, TALLA, ifnull(MOTIVO,'SN') AS MOTIVO, ifnull(DIAGNOSTICO,'SN') AS DIAGNOSTICO,
  ifnull(HISTORIAENF,'SN') AS HISTORIAENF, ifnull(ANTECEDENTES,'SN') AS ANTECEDENTES, ifnull(EXAMENFISICO,'SN') AS EXAMENFISICO, 
  ifnull(PLANTX,'SN') AS PLANTX, ifnull(IMPRESIONCLINICA,'SN') AS IMPRESIONCLINICA
   FROM RECETAS WHERE CODCLIENTE=${codclie}
    ORDER BY ID DESC;`;

  execute.query(qry, res);

});

app.post("/select_historial_consultas",function(req,res){

  const {sucursal,codclie} = req.body; 
  
  let qry = `SELECT TOKEN, ID, IDRECETA, FECHA, HORA, OBS,PESO, TALLA, ifnull(MOTIVO,'SN') AS MOTIVO, ifnull(DIAGNOSTICO,'SN') AS DIAGNOSTICO,
  ifnull(HISTORIAENF,'SN') AS HISTORIAENF, ifnull(ANTECEDENTES,'SN') AS ANTECEDENTES, ifnull(EXAMENFISICO,'SN') AS EXAMENFISICO, 
  ifnull(PLANTX,'SN') AS PLANTX, ifnull(IMPRESIONCLINICA,'SN') AS IMPRESIONCLINICA
   FROM RECETAS WHERE CODCLIENTE=${codclie}
    ORDER BY ID DESC LIMIT 10;`;

   

  execute.query(qry, res);

});

app.post("/select_receta",function(req,res){

  const {sucursal,correlativo} = req.body; 
  
  let qry = `SELECT
              recetas.IDRECETA,
              recetas.FECHA,
              recetas.HORA,
              recetas.CODCLIENTE,
              clientes.NOMCLIE,
              clientes.TELEFONOS,
              clientes.FECHANACIMIENTO,
              recetas.OBS,
              recetas_detalle.MEDICAMENTO,
              recetas_detalle.DOSIS,
              recetas_detalle.DURACION
            FROM recetas
              LEFT OUTER JOIN recetas_detalle
                ON recetas.IDRECETA = recetas_detalle.IDRECETA AND recetas.TOKEN= recetas_detalle.TOKEN
              LEFT OUTER JOIN clientes
                ON recetas.CODCLIENTE = clientes.IDCLIENTE
                  AND recetas.TOKEN= clientes.TOKEN
            WHERE recetas.IDRECETA = ${correlativo} and recetas.TOKEN='${sucursal}' `;

  execute.query(qry, res);

});

app.post("/select_lista_preconsultas",function(req,res){

  const {sucursal} = req.body; 
  
  let qry = `SELECT
  recetas_preconsulta.ID,
  recetas_preconsulta.FECHA,
  recetas_preconsulta.CODCLIENTE,
  clientes.NOMCLIE,
  clientes.FECHANACIMIENTO,
  clientes.TELEFONOS,
  recetas_preconsulta.MOTIVO,
  recetas_preconsulta.DIAGNOSTICO,
  recetas_preconsulta.PESO,
  recetas_preconsulta.TALLA,
  recetas_preconsulta.HISTORIAENF,
  recetas_preconsulta.ANTECEDENTES,
  recetas_preconsulta.EXAMENFISICO,
  recetas_preconsulta.PLANTX,
  recetas_preconsulta.IMPRESIONCLINICA,
  recetas_preconsulta.IDMORBILIDAD,
  ifnull(recetas_preconsulta.SEGURO,'--') AS SEGURO,
  gen_morbilidades.MORBILIDAD,
  recetas_preconsulta.TOKEN
FROM recetas_preconsulta
  LEFT OUTER JOIN clientes
    ON recetas_preconsulta.CODCLIENTE = clientes.IDCLIENTE
  LEFT OUTER JOIN gen_morbilidades
    ON recetas_preconsulta.IDMORBILIDAD = gen_morbilidades.IDMORBILIDAD
WHERE recetas_preconsulta.TOKEN = '${sucursal}' ORDER BY recetas_preconsulta.ID ASC `;

  execute.query(qry, res);

});

// RECETAS ...

//TURNOS ESPERA
app.post("/select_lista_espera",function(req,res){

  const {sucursal} = req.body; 
  
  let qry = `SELECT
  temp_turnos.ID,
  temp_turnos.IDCLIENTE,
  ifnull(clientes.NOMCLIE,'PACIENTE ELIMINADO') as NOMCLIE,
  temp_turnos.TEMPERATURA,
  temp_turnos.PA,
  temp_turnos.HORA,
  clientes.FECHANACIMIENTO,
  temp_turnos.SEGURO,
  temp_turnos.CODIGO_SEGURO
FROM temp_turnos
  LEFT OUTER JOIN clientes
    ON temp_turnos.IDCLIENTE = clientes.IDCLIENTE
WHERE temp_turnos.TOKEN = '${sucursal}'
 ORDER BY temp_turnos.ID ASC`;

  execute.query(qry, res);

});

app.post("/insert_temp_espera",function(req,res){

  const {sucursal,idcliente,temperatura,pa,hora,seguro,codigoseguro} = req.body; 
  
  let qry = `INSERT INTO TEMP_TURNOS (TOKEN,IDCLIENTE,TEMPERATURA,PA,HORA,SEGURO,CODIGO_SEGURO)
   VALUES ('${sucursal}', ${idcliente}, ${temperatura},'${pa}','${hora}','${seguro}','${codigoseguro}');`;
  execute.query(qry, res);

}); 

app.post("/delete_temp_espera",function(req,res){

  const {sucursal,id} = req.body; 
  
  let qry = `DELETE FROM TEMP_TURNOS WHERE ID=${id} AND TOKEN='${sucursal}' `;
 
  execute.query(qry, res);

}); 

//TURNOS ESPERA

//-----------------
//REPORTES
//-----------------
app.post("/rpt_consultas",function(req,res){

  const {sucursal,fi,ff} = req.body; 
  
  let qry = `SELECT
  recetas.IDRECETA AS NOCASO,
  recetas.FECHA,
  recetas.HORA,
  recetas.CODCLIENTE,
  ifnull(clientes.NOMCLIE,'SN') as NOMCLIE,
  ifnull(recetas.SEGURO,'-') as SEGURO,
  recetas.TOKEN
FROM recetas
  LEFT OUTER JOIN clientes
    ON recetas.CODCLIENTE = clientes.IDCLIENTE
WHERE recetas.TOKEN = '${sucursal}' and recetas.FECHA BETWEEN '${fi}' and '${ff}'
ORDER BY NOCASO`;

  execute.query(qry, res);

});





//-----------------
//REPORTES
//-----------------


app.post("/login",function(req,res){

  const {tipo,usuario,pass} = req.body; 
  

  let qry = `
  SELECT
  usuarios.TOKEN,
  usuarios.USER,
  usuarios.TIPO,
  tokens.EMPRESA,
  tokens.DIRECCION,
  tokens.FOOTER,
  tokens.TELEFONO,
  tokens.LOGO
FROM usuarios
  LEFT OUTER JOIN tokens
    ON usuarios.TOKEN = tokens.TOKEN
    WHERE usuarios.TOKEN='${usuario}' AND usuarios.TIPO='${tipo}' AND usuarios.PASS='${pass}' 
    AND tokens.HABILITADO='SI';
  `
  execute.query(qry, res);

});

//Router para app VENTAS
//app.use('/ventas', routerVentas);

app.use("/",router);


app.use("*",function(req,res){
  res.send('<h1 class="text-danger">NO DISPONIBLE</h1>');
});


// SOCKET HANDLER
io.on('connection', function(socket){
  
  socket.on('turno nuevo', function(token,paciente){
	  io.emit('turno nuevo', token, paciente);
  });

  socket.on('turno finalizado', function(token,id){
    io.emit('turno finalizado', token, id)
  })

  socket.on('turno finalizado doctor', function(token,id){
    io.emit('turno finalizado doctor', token, id)
  })

  socket.on('preconsulta nueva', function(token){
    io.emit('preconsulta nueva', token)
  })
    
});

http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});
