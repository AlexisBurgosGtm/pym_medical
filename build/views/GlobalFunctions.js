function get_correlativo(coddoc){
    return new Promise((resolve,reject)=>{
        axios.post('/select_correlativo',{
            sucursal:GlobalCodSucursal,
            coddoc:coddoc
        })
        .then((response) => {
             //console.log(response);
             let correlativo = 0;
             response.data.map((r)=>{
                correlativo= Number(r.CORRELATIVO);
             })
             //console.log(correlativo);          
            resolve(correlativo);             
        }, (error) => {
            reject(0);
        });
    });
};


function get_data_receta(sucursal,idreceta){
    return new Promise((resolve,reject)=>{
        axios.post('/select_receta',{
            sucursal:sucursal,
            correlativo:idreceta
        })
        .then((response) => {
             
             let data = response.data
                       
            resolve(data);             
        }, (error) => {
            reject(error);
        });
    });
};



function getFormatoReceta(sucursal,fecha,paciente,data,obs){
    
    let f = new Date(fecha);

    let view = '';
    switch (sucursal) {
        case 'AMPIE':
            view = `
           
            <div class="row p-4">
                <div class="col-3">
                    <img src="./logos/logo_ampie.png" width="110" height="180">
                </div>
                <div class="col-6 text-center">
                    <h5 class="negrita cursiva">Clínica Médica "Niño Jesús"</h5>
                    <h4>Dr. Pablo A. Vásquez Ampié</h4>
                    <small class="cursiva">Miembro de la Asociación de Médicos y Cirujanos de Guatemala</small><br>
                    <small class="cursiva">Miembro de la Asociación Pediátrica de Guatemala.</small><br>
                    <small class="cursiva">Colegiado Activo 8,871</small><br>
                    <small>3a. Avenida 5-02 Zona 1, Edificio El Colorado,</small><br>
                    <small>Frente al Centro de Salud, Retalhuleu.</small><br>
                    <small>Teléfono 7771-2416 * Celular 5199-5119</small><br>
                    <small>e-mail: pablovasampie@hotmail.com</small>
                </div>
                <div class="col-3">
                </div>
            </div> 
            <h5>_________________________________________________________________________________</h5> 
           
            <div class="row p-4" style="font-size:80%">
                <h5>Retalhuleu, ${fecha}</h5>
                <h5>Nombre del Paciente: ${paciente}</h5>
            </div>  
            <h5>_________________________________________________________________________________</h5>
           
            <div class="row p-4">
                <div class="col-12">
                    ${data}
                </div>
            
            </div>
            <br><br><br>
            <div class="row p-4">
                <div class="form-group">
                    <label class="negrita">Observaciones:</label>
                    <br>
                    <label>${obs}</label>
                </div>
            </div>
            <br>
             
            <div class="row footer text-center p-4">
               
                <h5>PRÓXIMA CITA: ______________________________________________</h5>    
                <br>
                <small>NO CAMBIAR LA RECETA SIN AUTORIZACIÓN DE SU MÉDICO</small>
                <br>
                <h3 class="bg-info text-white">EMERGENCIAS LAS 24 HORAS</h3>
                
            </div>  
  
            `
            break;
    
       
        case 'MATERNO DIAZ':
            view =       `
                                <div class="row p-4">
                                    <div class="col-3">
                                        <img src="./logos/logo_onne.jpeg" width="90%" height="110%" style="border: none">
                                    </div>
                                    <div class="col-6 text-center">
                                      
    
                                        <h1 style="text-align: center; font-family: 'Nunito Sans', sans-serif; font-size: 25px;" class="negrita cursiva">DR. JUAN DIEGO DÍAZ MIRANDA</h1>
                                        <h2 style="text-align: center; font-size: 15px;">PEDIATRÍA</h2>
                                       
                                        <br>
                                        <br>                                  
                                        <span style="font-size: 12px;"><strong>Boulevard Centenario, 2-71 Zona 3 Jardines de Santa Rosa, Retalhuleu (Interior Materno Infantil Clínica  2)</strong></span><br>
                                        <span style="font-size: 12px;"><strong>HORARIO: Lunes a Viernes: 8:00-13:00 / 14:30-17:00 - Sábado 8:30 - 13:00</strong></span>
    
    
                                    </div>
                                    <div class="col-3">
                                        <span style="font-size: 15px;"><img src="./logos/onne_1.jpeg" alt="" style="width: 20px; height: 20px;">   CITAS: 5216 2177</span><br><br>
                                        <span style="font-size: 15px;"><img src="./logos/onne_2.jpeg" alt="" style="width: 20px; height: 20px;">   EMERGENCIAS: 3450 4257</span><br><br>
                                        <span style="font-size: 15px;"><img src="./logos/onne_3.jpeg" alt="" style="width: 20px; height: 20px;">   @peidatraJuanDigego</span>
                                    </div>
                                </div> 
                                
                                                         
                                <div class="row p-4" style="font-size:80%">
                                    <h5>Retalhuleu, <u>${f.getDate()}</u> de <u>${f.getMonth()+1}</u> de ${f.getFullYear()} <u>mes</u> Fecha: <u>${fecha}</u></h5>
                                </div> 
                                <div class="row p-4" style="font-size:80%;">
                                    <h5>Nombre del Paciente: <u>${paciente}</u></h5>
                                </div> 
                                <div class="row p-4" style="font-size: 80%;">
                                    <h2>RP.</h2>
                                </div>
                               
                                <div class="row p-4">
                                    <div class="col-12">
                                        ${data}
                                    </div>
                                    <div class="col-12">
                                        <center>
                                        <img src="./logos/logo_onne.jpeg" style="background-image: url(./logos/logo_onne.jpeg);  position: relative; left: 30px; opacity: 0.5;">
                                        </center>
                                    </div>
                                </div>
    
                                <br><br><br>
                                <div class="row p-4">
                                    <div class="form-group">
                                        <label class="negrita">Observaciones:</label>
                                        <br>
                                        <label>${obs}</label>
                                    </div>
                                </div>
    
                                <br>
                                 
                                <div class="row footer text-center p-4">
                                    <h5>FAVOR NO CAMBIAR ESTA RECETA</h5>
                                </div> 
                `
            break;        

        case 'ONNE':
            view =       `
                            <div class="row p-4">
                                <div class="col-3">
                                    <img src="./logos/logo_onne.jpeg" width="90%" height="110%" style="border: none">
                                </div>
                                <div class="col-6 text-center">
                                  

                                    <h1 style="text-align: center; font-family: 'Nunito Sans', sans-serif; font-size: 25px;" class="negrita cursiva">DR. JUAN DIEGO DÍAZ MIRANDA</h1>
                                    <h2 style="text-align: center; font-size: 15px;">PEDIATRÍA</h2>
                                   
                                    <br>
                                    <br>                                  
                                    <span style="font-size: 12px;"><strong>Boulevard Centenario, 2-71 Zona 3 Jardines de Santa Rosa, Retalhuleu (Interior Materno Infantil Clínica  2)</strong></span><br>
                                    <span style="font-size: 12px;"><strong>HORARIO: Lunes a Viernes: 8:00-13:00 / 14:30-17:00 - Sábado 8:30 - 13:00</strong></span>


                                </div>
                                <div class="col-3">
                                    <span style="font-size: 15px;"><img src="./logos/onne_1.jpeg" alt="" style="width: 20px; height: 20px;">   CITAS: 5216 2177</span><br><br>
                                    <span style="font-size: 15px;"><img src="./logos/onne_2.jpeg" alt="" style="width: 20px; height: 20px;">   EMERGENCIAS: 3450 4257</span><br><br>
                                    <span style="font-size: 15px;"><img src="./logos/onne_3.jpeg" alt="" style="width: 20px; height: 20px;">   @peidatraJuanDigego</span>
                                </div>
                            </div> 
                            
                                                     
                            <div class="row p-4" style="font-size:80%">
                                <h5>Retalhuleu, <u>${f.getDate()}</u> de <u>${f.getMonth()+1}</u> de ${f.getFullYear()} <u>mes</u> Fecha: <u>${fecha}</u></h5>
                            </div> 
                            <div class="row p-4" style="font-size:80%;">
                                <h5>Nombre del Paciente: <u>${paciente}</u></h5>
                            </div> 
                            <div class="row p-4" style="font-size: 80%;">
                                <h2>RP.</h2>
                            </div>
                           
                            <div class="row p-4">
                                <div class="col-12">
                                    ${data}
                                </div>
                                <div class="col-12">
                                    <center>
                                    <img src="./logos/logo_onne.jpeg" style="background-image: url(./logos/logo_onne.jpeg);  position: relative; left: 30px; opacity: 0.5;">
                                    </center>
                                </div>
                            </div>

                            <br><br><br>
                            <div class="row p-4">
                                <div class="form-group">
                                    <label class="negrita">Observaciones:</label>
                                    <br>
                                    <label>${obs}</label>
                                </div>
                            </div>

                            <br>
                             
                            <div class="row footer text-center p-4">
                                <h5>FAVOR NO CAMBIAR ESTA RECETA</h5>
                            </div> 
            `
            break;
       
            default:
            view = `
           
            <div class="row p-4">
                <div class="col-3">
                    <img src="./favicon.png" width="100" height="100">
                </div>
                <div class="col-6 text-center">
                    <h5 class="negrita cursiva">Onne Doctor</h5>
                    <h4>Onne Business</h4>
                   
                </div>
                <div class="col-3">
                </div>
            </div> 
            <h5>_________________________________________________________________________________</h5> 
           
            <div class="row p-4" style="font-size:80%">
                <h5>Fecha: ${fecha}</h5>
                <h5>Nombre del Paciente: ${paciente}</h5>
            </div>  
            <h5>_________________________________________________________________________________</h5>
           
            <div class="row p-4">
                <div class="col-12">
                    ${data}
                </div>
            
            </div>
            <br><br><br>
            <div class="row p-4">
                <div class="form-group">
                    <label class="negrita">Observaciones:</label>
                    <br>
                    <label>${obs}</label>
                </div>
            </div>
            <br>
             
            <div class="row footer text-center p-4">
                <small>FORMATO GENÉRICO DE RECETA</small>
            </div>  
  
            `
            break;
    }

    console.log(view);

    return view;
    
}