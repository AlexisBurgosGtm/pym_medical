const socket = io();

socket.on('turno nuevo', function(token,paciente){
    
    if(token==GlobalCodSucursal){
    }else{
        return;
    };

    funciones.NotificacionPersistent("Nuevo turno",`Paciente: ${paciente}`);
    
    if(GlobalTipoUsuario=='DOCTOR'){
        try {
            getTblTurnos();
        } catch (error) {
            
        }
    }
    
    if(GlobalTipoUsuario=='SECRETARIA'){
        try {
            //getTblTurnos();
        } catch (error) {
            
        }
    }

});

socket.on('turno finalizado', function(token,id){
    
    if(token==GlobalCodSucursal){
    }else{
        return;
    };

    if(GlobalTipoUsuario=='DOCTOR'){
        try {
            getTblTurnos();
        } catch (error) {
            
        }
    }

    if(GlobalTipoUsuario=='SECRETARIA'){
        try {
            //getTblTurnos();
        } catch (error) {
            
        }
    }

});

socket.on('turno finalizado doctor', function(token,id){

    if(token==GlobalCodSucursal){
    }else{
        return;
    };
    
    if(GlobalTipoUsuario=='SECRETARIA'){
        try {
            getTblTurnos();
        } catch (error) {
            
        }
    }

});