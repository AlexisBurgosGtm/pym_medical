function getView(){
    let view = {
        body:()=>{
            return `
            <div class="card shadow p-2 col-12 card-rounded">
                <div class="card-header bg-white">
                    <h5 class="negrita text-danger">Listado de Turnos Pendientes</h5>
                </div>
             
                    <div class="row">
                        <div class="col-6 text-right">
                            <label class="negrita">Turnos Pendientes: </label>
                        </div>
                        <div class="col-6 text-left">
                            <h3 class="negrita text-danger" id="lbTotalTurnos">0</h3>
                        </div>
                        
                    </div>
                    <div class="table-responsive p-0 col-12">
                        <table class="table table-responsive table-hover table-bordered" id="tblTurnos">
                            <thead class="bg-info text-white">
                                <tr>
                                    <td>PACIENTE / TIPO SEGURO</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody id="tblEsperaData">
                            
                            </tbody>
                        </table>
                    </div>
               
            </div>
            
            <button type="button" class="btn btn-info btn-xl btn-circle hand btn-right shadow btn-right" id="btnNuevoTurno">
                <i class="fal fa-plus"></i>
            </button>
            `
        },
        modalNuevoTurno:()=>{
            return `
        <div class="modal fade" id="modalNuevoTurno" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-right modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header bg-info">
                    <h5 class="modal-title  text-white">Nuevo Turno</h5>
                </div>
                <div class="modal-body">

                    <hr class="solid">

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label class="negrita">Código</label>
                                <input type="text" class="form-control" id="tPacienteCodigo" disabled="true">
                            </div>    
                        </div>
                        <div class="col-6">
                            <button class="btn btn-info btn-xl btn-circle shadow" id="btnBuscarPaciente">
                                <i class="fal fa-search"></i>
                            </button>
                        </div>
                      
                    </div>
                    

                    <div class="form-group">
                        <label class="negrita">Nombre del Paciente</label>
                        <input type="text" class="form-control" id="tPacienteNombre" disabled="true">
                    </div>
                                     
                    <hr class="solid">

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label class="negrita">Temperatura</label>
                                <input type="number" class="form-control" id="tTemperatura">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label class="negrita">Presión Arterial</label>
                                <input type="text" class="form-control" id="tPA" value="0/0">
                            </div>
                        </div>
                    </div>

                    <hr class="solid">

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label class="negrita">Seguro / Tipo de Consulta</label>
                                <select class="form-control" id="cmbPacienteSeguro">
                                
                                </select>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label class="negrita">Código de Consulta</label>
                                <input type="text" class="form-control" id="txtPacienteCodigoSeguro" value="SN">
                            </div>
                        </div>
                    </div>


                    

                    <hr class="solid">

                </div>
                <div class="modal-footer">
                    <div class="row">
                        <div class="col-6">
                            <button type="button" class="btn btn-secondary btn-xl btn-circle hand shadow" id="btnCerrarModalTurno">
                                <i class="fal fa-angle-left"></i>
                            </button>
                        </div>
                        <div class="col-6">
                          

                            <button type="button" class="btn btn-info btn-xl btn-circle hand shadow" id="btnGuardarTurno">
                                <i class="fal fa-save"></i>
                            </button>
                        </div>
                    </div>
                   

                </div>
                </div>
            </div>
        </div>
            `
        },
        modalListaPacientes:()=>{
            return `
        <div class="modal fade" id="modalPacientes" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header bg-secondary">
                    <h5 class="modal-title  text-white">Listado de Pacientes</h5>
                </div>
                <div class="modal-body">

                    <hr class="solid">
                   
                    <div class="row">
                        <div class="col-8">
                            <div class="form-group">
                                <label class="negrita">Busque al paciente por Nombre</label>
                                <input type="text" class="form-control" id="txtBuscarPaciente" placeholder="Escriba el nombre para buscar...">
                               
                            </div>    
                        </div>
                        <div class="col-4">
                            <br>
                            <button class="btn btn-md btn-secondary shadow" id="btnBuscar">
                                <i class="fal fa-search"></i>
                            </button>
                               
                        </div>
                    </div>
                    

                    
                                     
                    <hr class="solid">
                  
                    <div class="table-responsive col-12 p-0">
                        <table class="table table-responsive table-hover table-bordered">
                            <thead class="bg-secondary text-white">
                                <tr>
                                    <td>Paciente</td>
                                    <td>Edad</td>
                                </tr>
                            </thead>
                            <tbody id="tblPacientesData">
                            
                            </tbody>
                        </table>
                    </div>

                    
                    
                    <hr class="solid">

                </div>
                <div class="modal-footer">
                    <div class="row">
                        
                        <div class="col-6">
                            <button type="button" class="btn btn-secondary btn-xl btn-circle hand shadow" id="btnCerrarModalListado">
                                <i class="fal fa-angle-left"></i>
                            </button>
                        </div>
                      
                        <div class="col-6">
                            <button class="btn btn-success btn-xl btn-circle shadow" id="btnNuevoPaciente">
                                <i class="fal fa-plus"></i>
                            </button>
                        </div>
                    </div>
                   

                </div>
                </div>
            </div>
        </div>
            `
        },
        modalNuevoPaciente:()=>{
            return `
            <div class="modal fade" id="modalNuevoPaciente" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header bg-info">
                            <h5 class="modal-title  text-white">Nuevo Paciente</h5>
                        
                        </div>
                    <div class="modal-body">

                        <hr class="solid">

                        <div class="form-group">
                            <label class="negrita">Nombre del Paciente</label>
                            <input type="text" class="form-control" id="Nombre" autocomplete="false">
                        </div>

                        <div class="form-group">
                            <label class="negrita">Domicilio / Dirección</label>
                            <input type="text" class="form-control" id="Direccion" placeholder="Escriba la dirección del paciente" autocomplete="false">
                        </div>

                        <div class="form-group">
                            <label class="negrita">Departamento</label>
                            <select class="form-control" id="cmbDepartamento"></select>
                        </div>

                        <hr class="solid">

                        <div class="row">
                            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="form-group">
                                    <label class="negrita">Fecha de nacimiento</label>
                                    <input type="date" class="form-control" id="FechaNacimiento">
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="form-group">
                                    <label class="negrita">Teléfono del Paciente</label>
                                    <input type="number" class="form-control" id="Telefono">
                                </div>
                            </div>
                        </div>
                                               
                        
                        <hr class="solid">

                    </div>
                    <div class="modal-footer">
                        <div class="row">
                            <div class="col-6">
                                <button type="button" class="btn btn-secondary btn-xl btn-circle hand shadow" id="btnCerrarModalClienteNuevo">
                                    <i class="fal fa-angle-left"></i>
                                </button>
                            </div>
                            <div class="col-6">
                              

                                <button type="button" class="btn btn-info btn-xl btn-circle hand shadow" id="btnGuardarCliente">
                                    <i class="fal fa-save"></i>
                                </button>
                            </div>
                        </div>
                       

                    </div>
                    </div>
                </div>
            </div>
            `
        }
    }

    root.innerHTML = view.body() + view.modalNuevoTurno() + view.modalListaPacientes() + view.modalNuevoPaciente();
    rootMenuFooter.innerHTML = '';

};

function addListeners(){

    //llena los departamentos
    document.getElementById('cmbDepartamento').innerHTML = funciones.getComboDepartamentos();

    document.getElementById('btnCerrarModalTurno').addEventListener('click',()=>{$('#modalNuevoTurno').modal('hide')});
    document.getElementById('btnCerrarModalListado').addEventListener('click',()=>{$('#modalPacientes').modal('hide')});

    //cargo los nombres de los SEGUROS
    let cmbPacienteSeguro = document.getElementById('cmbPacienteSeguro');
    cmbPacienteSeguro.innerHTML = funciones.getComboSeguros();

    cmbPacienteSeguro.addEventListener('change',()=>{
        if(cmbPacienteSeguro.value=='NINGUNO'){
            document.getElementById('txtPacienteCodigoSeguro').value = 'SN';
        }
    });



    let btnNuevoTurno = document.getElementById('btnNuevoTurno');
    btnNuevoTurno.addEventListener('click',()=>{

        document.getElementById('tPacienteCodigo').value='0';
        document.getElementById('tPacienteNombre').value='';
        document.getElementById('tTemperatura').value='36';
        document.getElementById('tPA').value='0/0';
        document.getElementById('cmbPacienteSeguro').value='NINGUNO';
        document.getElementById('txtPacienteCodigoSeguro').value = 'SN';


        $('#modalNuevoTurno').modal('show');

    });

    let btnBuscarPaciente = document.getElementById('btnBuscarPaciente');
    btnBuscarPaciente.addEventListener('click',()=>{

        document.getElementById('txtBuscarPaciente').value= '';
        document.getElementById('tblPacientesData').innerHTML = '';
        $('#modalPacientes').modal('show');

    });

    let btnBuscar = document.getElementById('btnBuscar');
    btnBuscar.addEventListener('click',()=>{

        buscar_paciente('txtBuscarPaciente');

    });

    document.getElementById('txtBuscarPaciente').addEventListener('keydown',(e)=>{
        if (e.key == 'Enter' || e.keyCode == 13) {
            btnBuscar.click();
        };
    })

    let btnGuardarTurno = document.getElementById('btnGuardarTurno');
    btnGuardarTurno.addEventListener('click',()=>{

        funciones.Confirmacion('¿Está seguro que desea agregar este Turno a la cola de Espera?')
        .then((value)=>{
            if(value==true){
                let codigo = document.getElementById('tPacienteCodigo').value;
                if(codigo=='0'){
                    funciones.AvisoError('Debe indicar el paciente');
                    return
                };

                let temperatura = document.getElementById('tTemperatura').value  || '36';
                let pa = document.getElementById('tPA').value || '0/0';

                let seguro = document.getElementById('cmbPacienteSeguro').value || 'NINGUNO';
                let codigoseguro = document.getElementById('txtPacienteCodigoSeguro').value || 'SN';

                btnGuardarTurno.disabled = true;
                btnGuardarTurno.innerHTML =  '<i class="fal fa-save fa-spin"></i>';

                insert_turno(codigo,temperatura,pa,seguro,codigoseguro)
                .then(()=>{
                    btnGuardarTurno.disabled = false;
                    btnGuardarTurno.innerHTML =  '<i class="fal fa-save"></i>';
                    funciones.Aviso('Cliente agregado exitosamente!!');
                    
                    let nombre = document.getElementById('tPacienteNombre').value;
                   
                    getTblTurnos();
                    $('#modalNuevoTurno').modal('hide');

                    socket.emit('turno nuevo', GlobalCodSucursal, nombre);


                })
                .catch(()=>{
                    btnGuardarTurno.disabled = false;
                    btnGuardarTurno.innerHTML =  '<i class="fal fa-save"></i>';
                    funciones.AvisoError('No se pudo agregar este turno a la Espera');
                })

            }
        })

    });



    document.getElementById('FechaNacimiento').value = funciones.getFecha();
    let btnNuevoPaciente = document.getElementById('btnNuevoPaciente');
    btnNuevoPaciente.addEventListener('click',()=>{

        document.getElementById('Nombre').value='';
        document.getElementById('Direccion').value='';

        document.getElementById('FechaNacimiento').value = funciones.getFecha();
        document.getElementById('Telefono').value=0;

        $('#modalNuevoPaciente').modal('show');
    });



    document.getElementById('btnCerrarModalClienteNuevo').addEventListener('click',()=>{$('#modalNuevoPaciente').modal('hide')});

    let btnGuardarCliente = document.getElementById('btnGuardarCliente');
    btnGuardarCliente.addEventListener('click',()=>{
        
       

        funciones.Confirmacion('¿Está seguro que desea Guardar este Paciente?')
        .then((value)=>{
            if(value==true){
                let nombre = document.getElementById('Nombre');
                let direccion = document.getElementById('Direccion').value || 'SN';
                let cmbDepartamento = document.getElementById('cmbDepartamento');

                let fechanacimiento = funciones.devuelveFecha('FechaNacimiento');
                let telefono = document.getElementById('Telefono') || '0';

                btnGuardarCliente.disabled = true;
                btnGuardarCliente.innerHTML = '<i class="fal fa-save fa-spin"></i>';

                insert_paciente(funciones.limpiarTexto(nombre.value),fechanacimiento,telefono.value, funciones.limpiarTexto(direccion),cmbDepartamento.value)
                .then(()=>{
                    funciones.Aviso('Cliente agregado exitosamente!!')
                    btnGuardarCliente.disabled = false;
                    btnGuardarCliente.innerHTML = '<i class="fal fa-save"></i>';
                    $('#modalNuevoPaciente').modal('hide');
                    
                    document.getElementById('txtBuscarPaciente').value= nombre.value;
                    btnBuscar.click();
                })
                .catch(()=>{
                    funciones.AvisoError('No se pudo guardar')
                    btnGuardarCliente.disabled = false;
                    btnGuardarCliente.innerHTML = '<i class="fal fa-save"></i>';
                })
               
            }
        })
    });


    getTblTurnos();


};

function initView(){

    getView();
    addListeners();

};


//busqueda de pacientes
function buscar_paciente(idbuscar){
    let buscar = document.getElementById(idbuscar).value;
    
    if(buscar==''){
        funciones.AvisoError('Escriba para buscar');
        return;
    }else{
        buscar = funciones.limpiarTexto(buscar);
    };

    getTblPaciente(buscar);

};

function getDataPaciente(filtro){
    return new Promise((resolve, reject) => {

        axios.post('/select_paciente',{
            sucursal:GlobalCodSucursal,
            filtro:filtro
        })
        .then((response) => {   
            let data = response.data; 
            resolve(data);
        }, (error) => {
            reject(error);
        });
    })
    
};

function getTblPaciente(filtro){
    

    let container = document.getElementById('tblPacientesData');
    container.innerHTML = GlobalLoader;
    let str = '';
    let stclass = '';

    getDataPaciente(filtro)
    .then((data)=>{
        data.map((r)=>{
            if(r.TOKEN==GlobalCodSucursal){stclass=''}else{stclass='text-danger'};
            str += `
                <tr>
                    <td class="${stclass}">${r.NOMCLIE}
                        <br><small class="negrita text-danger">${r.TELEFONOS}</small>
                        <br>
                        <button class="btn btn-info btn-sm hand shadow" onclick="agregar_espera('${r.IDCLIENTE}','${r.NOMCLIE}')">
                            <i class="fal fa-edit"></i>Agregar a Espera...
                        </button>
                    </td>
                    <td>${funciones.getEdad(r.FECHANACIMIENTO)}
                        <br>
                        <small class="negrita">FN:${funciones.convertDate(r.FECHANACIMIENTO)}</small>
                                              
                    </td>
                </tr>
            `
        })
        container.innerHTML = str;
    })
    .catch((error)=>{
        console.log(error);
        container.innerHTML = 'No se pudieron cargar los datos...'
    })
    

    
};

function agregar_espera(codigo,nombre){
    document.getElementById('tPacienteCodigo').value = codigo;
    document.getElementById('tPacienteNombre').value = nombre;
    $('#modalPacientes').modal('hide');
};

function insert_paciente(nombre,fechanacimiento,telefono,direccion,departamento){
    return new Promise((resolve,reject)=>{
        axios.post('/insert_paciente',{
            sucursal:GlobalCodSucursal,
            nombre:nombre,
            fechanacimiento:fechanacimiento,
            telefonos:telefono,
            direccion:direccion,
            coddepto:departamento
        })
        .then((response) => {

            resolve();             
        }, (error) => {
            reject();
        });
    });
};


//********************* */
//turnos de Espera
//********************* */

function getDataTurnos(){
    return new Promise((resolve, reject) => {

        axios.post('/select_lista_espera',{
            sucursal:GlobalCodSucursal
        })
        .then((response) => {   
            let data = response.data; 
            resolve(data);
        }, (error) => {
            reject(error);
        });
    })
    
};

function getTblTurnos(){
    

    let container = document.getElementById('tblEsperaData');
    container.innerHTML = GlobalLoader;
    let lbTotalTurnos = document.getElementById('lbTotalTurnos');
    lbTotalTurnos.innerText = '--';

    let str = '';

    let contador = 0;

    getDataTurnos()
    .then((data)=>{
        data.map((r)=>{
            contador += 1;
            let rowid = r.ID.toString() + 'row';
            str += `
                <tr>
                    <td>${r.NOMCLIE}
                        <br>
                        <small class="negrita text-info">${r.SEGURO} / ${r.CODIGO_SEGURO}</small>
                        <div class="row">
                            <div class="col-4">
                                <small class="negrita text-danger">T: ${r.TEMPERATURA}</small>
                            </div>
                            <div class="col-4">
                                <small class="negrita text-danger">P/A: ${r.PA}</small>
                            </div>
                            <div class="col-4">
                                <small class="negrita text-info">H: ${r.HORA}</small>
                            </div>
                        </div>
                        <br>
                        <button class="btn btn-info btn-sm hand shadow" onclick="funciones.hablar('Es el turno de ' + '${r.NOMCLIE}' + ', adelante por favor')">
                            <i class="fal fa-bullhorn"></i> Llamar a Consulta
                        </button>                       
                    </td>
      

                    <td>
                        <button class="btn btn-danger btn-circle btn-sm hand shadow" onclick="eliminar_turno('${rowid}','${r.ID}')" id='${rowid}'>
                            <i class="fal fa-trash"></i>
                        </button>
                    </td>
                
                </tr>
            `
        })
        container.innerHTML = str;
        lbTotalTurnos.innerText = contador;
    })
    .catch((error)=>{
        console.log(error);
        container.innerHTML = 'No se pudieron cargar los datos...'
    })
    

    
};

function insert_turno(idcliente,temperatura,pa,seguro,codigoseguro){
    return new Promise((resolve,reject)=>{
        axios.post('/insert_temp_espera',{
            sucursal:GlobalCodSucursal,
            idcliente:idcliente,
            temperatura:temperatura,
            pa:pa,
            hora:funciones.getHora(),
            seguro:seguro,
            codigoseguro:codigoseguro
        })
        .then((response) => {     
            resolve();             
        }, (error) => {
            reject();
        });
    });
};

function eliminar_turno(idturno, id){
    funciones.Confirmacion('¿Está seguro que desea ELIMINAR este turno?')
    .then((value)=>{
        if(value==true){

            document.getElementById(idturno).disabled = true;
            document.getElementById(idturno).innerHTML = '<i class="fal fa-trash fa-spin"></i>'

            delete_turno(id)
            .then(async()=>{
                funciones.Aviso('Turno eliminado exitosamente!!');
               
                await getTblTurnos();
                socket.emit('turno finalizado', GlobalCodSucursal, idturno);
            })
            .catch(()=>{
                funciones.AvisoError('No se pudo eliminar este turno');
                document.getElementById(idturno).disabled = false;
                document.getElementById(idturno).innerHTML = '<i class="fal fa-trash"></i>'
            })

        }
    })
}

function delete_turno(idturno){
    return new Promise((resolve, reject) => {

        axios.post('/delete_temp_espera',{
            sucursal:GlobalCodSucursal,
            id:idturno
            })
        .then(async(response) => {          
            GlobalSelectedIdTurno = 0;
            resolve();    
        }, (error) => {
            console.log('turno no eliminado');
            reject();
        });

    })
    

}
