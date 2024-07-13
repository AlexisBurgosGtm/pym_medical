let Navegar ={
    login : ()=>{
        funciones.loadScript('./views/login.js','root')
        .then(()=>{
            GlobalCodSucursal = '';
            GlobalSelectedCodPaciente = 0;
            GlobalSelectedNomPaciente = '';
            InicializarVista();
        })
    },
    recetas: ()=>{
        funciones.loadScript('./views/viewDoctor.js','root')
          .then(()=>{
            initView();
          })
    },
    recepcion: ()=>{
        funciones.loadScript('./views/viewSecretaria.js','root')
        .then(()=>{
          initView();
        })
    }
}