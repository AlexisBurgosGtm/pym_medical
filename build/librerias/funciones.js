let funciones = {
    animateCSS: (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      const node = document.getElementById(element);

      node.classList.add(`${prefix}animated`, animationName);

      // When the animation ends, we clean the classes and resolve the Promise
      function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
      }

      node.addEventListener('animationend', handleAnimationEnd, {once: true});
    }),
    enviarRecetaWhatsapp: function(idreceta){
    swal({
      text: 'Escriba el número a donde se enviará:',
      content: "input",
      button: {
        text: "Whatsapp",
        closeModal: true,
      },
    })
    .then(numero => {
      if (!numero) throw null;
        let destino = '502' + numero.toString();
        let strmensaje = '';
        let msg = '';
       
        let footer = '';

        get_data_receta(idreceta)
        .then((data)=>{
          
            data.map((r)=>{
              strmensaje += `* ${r.MEDICAMENTO} - ${r.DOSIS} - ${r.DURACION}` + "\n" + '--------------' + "\n";
              footer = r.OBS + "\n" + 'NO CAMBIAR LA RECETA SIN AUTORIZACIÓN DE SU MÉDICO' + "\n";
            })   
    
            msg = GlobalEncabezadoReceta + strmensaje + footer + GlobalFooterReceta;
            msg = encodeURIComponent(msg);
            window.open('https://api.whatsapp.com/send?phone='+destino+'&text='+msg);
        })
        .catch((error)=>{
          console.log(error)
          funciones.AvisoError('No se enviará la receta...')
        })

        //api.digitadorDetallePedidoWhatsapp(fecha,coddoc,correlativo,stn);
    })
    },
    enviarRecetaWhatsapp2: function(sucursal,idreceta,telefono){
      swal({
        text: 'Escriba el número a donde se enviará:',
        content: {
          element: "input",
          attributes: {
            placeholder: "Número de whatsapp",
            type: "text",
            value: telefono
          },
          button: {
            text: "Whatsapp",
            closeModal: true,
          },
        }
      })
      .then(numero => {
        if (!numero) throw null;
          let destino = '502' + numero.toString();
          let strmensaje = '';
          let msg = '';
         
          let footer = '';
  
          get_data_receta(sucursal,idreceta)
          .then((data)=>{
            
              data.map((r)=>{
                strmensaje += `* ${r.MEDICAMENTO} - ${r.DOSIS} - ${r.DURACION}` + "\n" + '--------------' + "\n";
                footer = r.OBS + "\n" + 'NO CAMBIAR LA RECETA SIN AUTORIZACIÓN DE SU MÉDICO' + "\n";
              })   
      
              msg = GlobalRecetaEmpresa + GlobalRecetaDireccion + strmensaje + footer + GlobalRecetaTelefono;
              msg = encodeURIComponent(msg);
              window.open('https://api.whatsapp.com/send?phone='+destino+'&text='+msg);
          })
          .catch((error)=>{
            console.log(error)
            funciones.AvisoError('No se enviará la receta...')
          })
  
          //api.digitadorDetallePedidoWhatsapp(fecha,coddoc,correlativo,stn);
      })
      },
    enviarPedidoWhatsapp:(fecha,coddoc,correlativo)=>{

    var apiwha = (navigator.contacts || navigator.mozContacts);
      
    if (apiwha && !!apiwha.select) { // new Chrome API
      apiwha.select(['name', 'email', 'tel'], {multiple: false})
        .then(function (contacts) {
          //console.log('Found ' + contacts.length + ' contacts.');
          if (contacts.length) {
            let numero = contacts[0].tel.toString()
            numero = numero.replace('+502','');
            let stn = '502' + numero.toString();
            stn = stn.replace(' ','');
            api.digitadorDetallePedidoWhatsapp(fecha,coddoc,correlativo,stn);
          }
        })
        .catch(function (err) {
          console.log('Fetching contacts failed: ' + err.name);
          funciones.AvisoError('Fetching contacts failed 1 : ' +  err.toString())
        });
        
    } else if (apiwha && !!apiwha.find) { // old Firefox OS API
      var criteria = {
        sortBy: 'familyName',
        sortOrder: 'ascending'
      };
  
      apiwha.find(criteria)
        .then(function (contacts) {
          //console.log('Found ' + contacts.length + ' contacts.');
          if (contacts.length) {
            let numero = contacts[0].tel.toString()
            numero = numero.replace('+502','');
            let stn = '502' + numero.toString();
            stn = stn.replace(' ','');
            api.digitadorDetallePedidoWhatsapp(fecha,coddoc,correlativo,stn);
          }
        })
        .catch(function (err) {
          console.log('Fetching contacts failed: ' + err.name);
          funciones.AvisoError('Fetching contacts failed 2 : ' + err.toString())
        });
        
    } else {
      console.log('Contacts API not supported.');
    }
    },
    readContacts:(idResult)=>{

    let container = document.getElementById(idResult);

    var api = (navigator.contacts || navigator.mozContacts);
      
    if (api && !!api.select) { // new Chrome API
      api.select(['name', 'email', 'tel'], {multiple: false})
        .then(function (contacts) {
          console.log('Found ' + contacts.length + ' contacts.');
          if (contacts.length) {
            
            let numero = contacts[0].tel.toString()
            numero = numero.replace('+502','');
            let stn = '502' + numero.toString();
            stn = stn.replace(' ','');
            funciones.Aviso(stn);
            container.innerHTML = JSON.stringify(contacts);
            
          }
        })
        .catch(function (err) {
          console.log('Fetching contacts failed: ' + err.name);
          funciones.AvisoError('Fetching contacts failed: ' + err.name)
        });
        
    } else if (api && !!api.find) { // old Firefox OS API
      var criteria = {
        sortBy: 'familyName',
        sortOrder: 'ascending'
      };
  
      api.find(criteria)
        .then(function (contacts) {
          console.log('Found ' + contacts.length + ' contacts.');
          container.innerHTML = JSON.stringify(contacts);
          if (contacts.length) {
            let numero = contacts[0].tel.toString()
            numero = numero.replace('+502','');
            let stn = '502' + numero.toString();
            stn = stn.replace(' ','');
            funciones.Aviso(stn);
            container.innerHTML = JSON.stringify(contacts);
            
          }
        })
        .catch(function (err) {
          console.log('Fetching contacts failed: ' + err.name);
          funciones.AvisoError('Fetching contacts failed: ' + err.name)
        });
        
    } else {
      console.log('Contacts API not supported.');
      container.innerHTML = 'Contacts API not supported.'
    }
    },
    GetDataNit: async (idNit,idCliente,idDireccion)=>{

      return new Promise((resolve, reject) => {
        let nit = document.getElementById(idNit).value;                    
        let url = 'https://free.feel.com.gt/api/v1/obtener_contribuyente';
        
        axios.post(url,{nit: nit})
        .then((response) => {
            let json = response.data;
            console.log(response.data);
            
            //document.getElementById(idCliente).value = json.descripcion;
            //document.getElementById(idDireccion).value = json.direcciones.direccion;    

            resolve(json);
        }, (error) => {
            console.log(error);
            reject();
        });
  


      });

    },
    instalationHandlers: (idBtnInstall)=>{
      //INSTALACION APP
      let btnInstalarApp = document.getElementById(idBtnInstall);
      btnInstalarApp.hidden = true;

      let capturedInstallEvent;
      window.addEventListener('beforeinstallprompt',(e)=>{
        e.preventDefault();
        btnInstalarApp.hidden = false;
        capturedInstallEvent = e;
      });
      btnInstalarApp.addEventListener('click',(e)=>{
        capturedInstallEvent.prompt();
      capturedInstallEvent.userChoice.then((choice)=>{
          //solicita al usuario confirmacion para instalar
      })
    })
    //INSTALACION APP
    },
    instalationHandlers2: (idContainer,idBtnInstall)=>{
      //INSTALACION APP
      let btnInstalarApp = document.getElementById(idBtnInstall);
      btnInstalarApp.hidden = true;

      let container = document.getElementById(idContainer);

      let capturedInstallEvent;
      window.addEventListener('beforeinstallprompt',(e)=>{
        e.preventDefault();
        container.hidden = false;
        capturedInstallEvent = e;
      });
      btnInstalarApp.addEventListener('click',(e)=>{
        capturedInstallEvent.prompt();
        capturedInstallEvent.userChoice.then((choice)=>{
          //solicita al usuario confirmacion para instalar
        })
      })
      //INSTALACION APP
    },
    Confirmacion: function(msn){
        return swal({
            title: 'Confirme',
            text: msn,
            icon: 'warning',
            buttons: {
                cancel: true,
                confirm: true,
              }})
    },
    Aviso: function(msn){
        swal(msn, {
            timer: 1500,
            icon: "success",
            buttons: false
            });

        try {
            navigator.vibrate(500);
        } catch (error) {
            
        }
    },
    AvisoError: function(msn){
        swal(msn, {
            timer: 1500,
            icon: "error",
            buttons: false
            });
        try {
            navigator.vibrate([100,200,500]);
        } catch (error) {
            
        }
    },
    FiltrarListaProductos: function(idTabla){
        swal({
          text: 'Escriba para buscar...',
          content: "input",
          button: {
            text: "Buscar",
            closeModal: true,
          },
        })
        .then(name => {
          if (!name) throw null;
            funciones.FiltrarTabla(idTabla,name);

            //'tblProductosVentas'
        })
    },
    solicitarClave: function(){
      return new Promise((resolve,reject)=>{
          swal({
            text: 'Escriba su contraseña de usuario',
            content: "input",
            button: {
              text: "Verificar",
              closeModal: true,
            },
          })
          .then(name => {
            if (!name) throw null;
                resolve(name);
          })
          .catch(()=>{
            reject('no');
          })
      })     
    },
    setMoneda: function(num,signo) {
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num)) num = "0";
        let sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        let cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10) cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + signo + ' ' + num + ((cents == "00") ? '' : '.' + cents)).toString();
    },
    setMargen: function(num,signo) {
      num = num.toString().replace(/\$|\,/g, '');
      if (isNaN(num)) num = "0";
      let sign = (num == (num = Math.abs(num)));
      num = Math.floor(num * 100 + 0.50000000001);
      let cents = num % 100;
      num = Math.floor(num / 100).toString();
      if (cents < 10) cents = "0" + cents;
      for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
          num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
      return ( ((sign) ? '' : '-') +  num + ((cents == "00") ? '' : '.' + cents) + ' ' + signo  ).toString();
    },
    loadScript: function(url, idContainer) {
        return new Promise((resolve, reject) => {
          var script = document.createElement('script');
          script.src = url;
    
          script.onload = resolve;
          script.onerror = reject;
             
          document.getElementById(idContainer).appendChild(script)
        });
    },
    fetchData: (url)=>{
        fetch(url)
            .then(function(response) {
                return response.json();
                                    })
            .catch();
    },
    loadView: (url, idContainer)=> {
        return new Promise((resolve, reject) => {
            
            let contenedor = document.getElementById(idContainer);

            axios.get(url)
            .then((response) => {
                contenedor.innerHTML ='';
                contenedor.innerHTML = response.data;
                resolve();
            }, (error) => {
                console.log(error);
                reject();
            });
      
          });
    },   
    hablar: function(msn){
        var utterance = new SpeechSynthesisUtterance(msn);
        return window.speechSynthesis.speak(utterance); 
    },
    crearBusquedaTabla: function(idTabla,idBusqueda){
    var tableReg = document.getElementById(idTabla);
    var searchText = document.getElementById(idBusqueda).value.toLowerCase();
      var cellsOfRow="";
      var found=false;
      var compareWith="";
   
      // Recorremos todas las filas con contenido de la tabla
        for (var i = 1; i < tableReg.rows.length; i++)
                {
                  cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
                    found = false;
                    // Recorremos todas las celdas
                    for (var j = 0; j < cellsOfRow.length && !found; j++)
                    {
                      compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                      // Buscamos el texto en el contenido de la celda
                      if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1))
                      {
                          found = true;
                      }
                  }
                  if(found)
                  {
                      tableReg.rows[i].style.display = '';
                  } else {
                      // si no ha encontrado ninguna coincidencia, esconde la
                      // fila de la tabla
                      tableReg.rows[i].style.display = 'none';
                  }
              }
    },
    FiltrarTabla: function(idTabla,idfiltro){
    var tableReg = document.getElementById(idTabla);
    let filtro = document.getElementById(idfiltro).value;

    var searchText = filtro.toLowerCase();
      var cellsOfRow="";
      var found=false;
      var compareWith="";
   
      // Recorremos todas las filas con contenido de la tabla
        for (var i = 1; i < tableReg.rows.length; i++)
                {
                  cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
                    found = false;
                    // Recorremos todas las celdas
                    for (var j = 0; j < cellsOfRow.length && !found; j++)
                    {
                      compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                      // Buscamos el texto en el contenido de la celda
                      if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1))
                      {
                          found = true;
                      }
                  }
                  if(found)
                  {
                      tableReg.rows[i].style.display = '';
                  } else {
                      // si no ha encontrado ninguna coincidencia, esconde la
                      // fila de la tabla
                      tableReg.rows[i].style.display = 'none';
                  }
              }
        //funciones.scrollUp(1000, 'easing');
    },
    OcultarRows: function(idTabla){
    var tableReg = document.getElementById(idTabla);
        // Recorremos todas las filas con contenido de la tabla
        for (var i = 1; i < tableReg.rows.length; i++)
        {
            if(i>15){
                tableReg.rows[i].style.display = 'none';
            }
        }
    },
    NotificacionPersistent : (titulo,msn)=>{

    function InicializarServiceWorkerNotif(){
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () =>
       navigator.serviceWorker.register('sw.js')
        .then(registration => console.log('Service Worker registered'))
        .catch(err => 'SW registration failed'));
      };
      
      requestPermission();
    }
    
    if ('Notification' in window) {};
    
    function requestPermission() {
      if (!('Notification' in window)) {
        funciones.Aviso('Notification API not supported!');
        return;
      }
      
      Notification.requestPermission(function (result) {
        //$status.innerText = result;
      });
    }

    InicializarServiceWorkerNotif();
    
    const options = {
        body : titulo,
        icon: "../favicon.png",
        vibrate: [1,2,3],
      }
      //image: "../favicon.png",
         if (!('Notification' in window) || !('ServiceWorkerRegistration' in window)) {
          console.log('Persistent Notification API not supported!');
          return;
        }
        
        try {
          navigator.serviceWorker.getRegistration()
            .then(reg => 
                    reg.showNotification(msn, options)
                )
            .catch(err => console.log('Service Worker registration error: ' + err));
        } catch (err) {
          console.log('Notification API error: ' + err);
        }
      
    },
    ObtenerUbicacion: async(idlat,idlong)=>{
        let lat = document.getElementById(idlat);
        let long = document.getElementById(idlong);
        
        try {
            navigator.geolocation.getCurrentPosition(function (location) {
                lat.innerText = location.coords.latitude.toString();
                long.innerText = location.coords.longitude.toString();
            })
        } catch (error) {
            funciones.AvisoError(error.toString());
        }
    },
    ComboSemana :(letnum)=>{
      let str = '';
      if(letnum=="LETRAS"){
        str =  `<option value="LUNES">LUNES</option>
                <option value="MARTES">MARTES</option>
                <option value="MIERCOLES">MIERCOLES</option>
                <option value="JUEVES">JUEVES</option>
                <option value="VIERNES">VIERNES</option>
                <option value="SABADO">SABADO</option>
                <option value="DOMINGO">DOMINGO</option>
                <option value="OTROS">OTROS</option>
                `
      }else{
        str =  `<option value="1">LUNES</option>
                <option value="2">MARTES</option>
                <option value="3">MIERCOLES</option>
                <option value="4">JUEVES</option>
                <option value="5">VIERNES</option>
                <option value="6">SABADO</option>
                <option value="7">DOMINGO</option>
                <option value="0">OTROS</option>
                `
      };

      return str;
      
    },
    getDiaSemana:(numdia)=>{
      switch (numdia) {
        case 0:
          return 'DOMINGO';
          break;
        case 1:
          return 'LUNES';
          break;
        case 2:
          return 'MARTES';
          break;
        case 3:
          return 'MIERCOLES';
          break;
        case 4:
          return 'JUEVES';
          break;
        case 5:
          return 'VIERNES';
          break;
        case 6:
          return 'SABADO';
          break;
      
        default:
          break;
      }
    },
    ComboMeses: ()=>{
    let str =`<option value='1'>Enero</option>
              <option value='2'>Febrero</option>
              <option value='3'>Marzo</option>
              <option value='4'>Abril</option>
              <option value='5'>Mayo</option>
              <option value='6'>Junio</option>
              <option value='7'>Julio</option>
              <option value='8'>Agosto</option>
              <option value='9'>Septiembre</option>
              <option value='10'>Octubre</option>
              <option value='11'>Noviembre</option>
              <option value='12'>Diciembre</option>`
    return str;
    },
    ComboAnio: ()=>{
    let str =`<option value='2017'>2017</option>
              <option value='2018'>2018</option>
              <option value='2019'>2019</option>
              <option value='2020'>2020</option>
              <option value='2021'>2021</option>
              <option value='2022'>2022</option>
              <option value='2023'>2023</option>
              <option value='2024'>2024</option>
              <option value='2025'>2025</option>
              <option value='2026'>2026</option>
              <option value='2027'>2027</option>
              <option value='2028'>2028</option>
              <option value='2029'>2029</option>
              <option value='2030'>2030</option>`
    return str;
    },
    getFecha(){
      let fecha
      let f = new Date(); 
      let d = f.getDate(); 
      let m = f.getUTCMonth()+1; 

      switch (d.toString()) {
        case '30':
          m = f.getMonth()+1; 
          break;
        case '31':
          m = f.getMonth()+1; 
            break;
      
        default:

          break;
      }

      
      let y = f.getFullYear();
     
      di = d;
      var D = '0' + di;
      let DDI 
      if(D.length==3){DDI=di}else{DDI=D}
      
      ma = m;
      var MA = '0' + ma;
      let DDM 
      if(MA.length==3){DDM=ma}else{DDM=MA}


      fecha = y + '-' + DDM + '-' + DDI;
      return fecha;
    },
    limpiarTexto: (texto) =>{
      var ignorarMayMin = true;
      var reemplazarCon = " pulg";
      var reemplazarQue = '"';
      reemplazarQue = reemplazarQue.replace(/[\\^$.|?*+()[{]/g, "\\$&"),
      reemplazarCon = reemplazarCon.replace(/\$(?=[$&`"'\d])/g, "$$$$"),
      modif = "g" + (ignorarMayMin ? "i" : ""),
      regex = new RegExp(reemplazarQue, modif);
      return texto.replace(regex,reemplazarCon);
      //   .replace(/(\r\n|\n|\r)/gm, "")
    },
    quitarCaracteres: ( texto, reemplazarQue, reemplazarCon, ignorarMayMin) =>{
      var reemplazarQue = reemplazarQue.replace(/[\\^$.|?*+()[{]/g, "\\$&"),
      reemplazarCon = reemplazarCon.replace(/\$(?=[$&`"'\d])/g, "$$$$"),
      modif = "g" + (ignorarMayMin ? "i" : ""),
      regex = new RegExp(reemplazarQue, modif);
      return texto.replace(regex,reemplazarCon);
    },
    devuelveFecha: (idInputFecha)=>{
      let fe = new Date(document.getElementById(idInputFecha).value);
      let ae = fe.getUTCFullYear();//fe.getFullYear();
      
      let me = fe.getUTCMonth()+1;
      let de = fe.getUTCDate() 
      let fret = ae + '-' + me + '-' + de;
      return fret;
    },
    slideAnimationTabs: ()=>{
      //inicializa el slide de las tabs en censo
      $('a[data-toggle="tab"]').on('hide.bs.tab', function (e) {
          var $old_tab = $($(e.target).attr("href"));
          var $new_tab = $($(e.relatedTarget).attr("href"));
  
          if($new_tab.index() < $old_tab.index()){
              $old_tab.css('position', 'relative').css("right", "0").show();
              $old_tab.animate({"right":"-100%"}, 300, function () {
                  $old_tab.css("right", 0).removeAttr("style");
              });
          }
          else {
              $old_tab.css('position', 'relative').css("left", "0").show();
              $old_tab.animate({"left":"-100%"}, 300, function () {
                  $old_tab.css("left", 0).removeAttr("style");
              });
          }
      });
  
      $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
          var $new_tab = $($(e.target).attr("href"));
          var $old_tab = $($(e.relatedTarget).attr("href"));
  
          if($new_tab.index() > $old_tab.index()){
              $new_tab.css('position', 'relative').css("right", "-2500px");
              $new_tab.animate({"right":"0"}, 500);
          }
          else {
              $new_tab.css('position', 'relative').css("left", "-2500px");
              $new_tab.animate({"left":"0"}, 500);
          }
      });
  
      $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
          // your code on active tab shown
      });
    },
    exportTableToExcel: (tableID, filename = '')=>{
      var downloadLink;
      var dataType = 'application/vnd.ms-excel;charset=UTF-8';
      var tableSelect = document.getElementById(tableID);
      var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
      
      // Specify file name
      filename = filename?filename+'.xls':'excel_data.xlsx';
      
      // Create download link element
      downloadLink = document.createElement("a");
      
      document.body.appendChild(downloadLink);
      
      if(navigator.msSaveOrOpenBlob){
          var blob = new Blob(['ufeff', tableHTML], {
              type: "text/plain;charset=utf-8;"//dataType
          });
          navigator.msSaveOrOpenBlob( blob, filename);
      }else{
          // Create a link to the file
          downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
      
          // Setting the file name
          downloadLink.download = filename;
          
          //triggering the function
          downloadLink.click();
      }
    },
    getHora:()=>{
      let hoy = new Date();
      let hora = hoy.getHours();
      let minuto = hoy.getMinutes();
      return `${hora.toString()}:${minuto.toString()}`;
    },
    gotoGoogleMaps:(lat,long)=>{
      window.open(`https://www.google.com/maps?q=${lat},${long}`);
    },
    convertDate(date) {
   
      const [yy, mm, dd] = date.split(/-/g);
      return `${dd}/${mm}/${yy}`.replace('T06:00:00.000Z', '').replace('T00:00:00.000Z','');
    },
    getEdadAños(date) {
      dateString = date.replace('T06:00:00.000Z', '');
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
          age--;

      }
      return `${age} / ${m}` ;
    },
    getEdad:(fech)=>{
      
    
        try {
          
                          // Si la fecha es correcta, calculamos la edad
                  let fecha = fech.replace('T06:00:00.000Z','').replace('T00:00:00.000Z','');

                  if (typeof fecha != "string" && fecha && esNumero(fecha.getTime())) {
                    fecha = formatDate(fecha, "yyyy-MM-dd");
                }

                var values = fecha.split("-");
                var dia = values[2];
                var mes = values[1];
                var ano = values[0];
                
            
                // cogemos los valores actuales
                var fecha_hoy = new Date();
                var ahora_ano = fecha_hoy.getYear();
                var ahora_mes = fecha_hoy.getMonth() + 1;
                var ahora_dia = fecha_hoy.getDate();

                // realizamos el calculo
                var edad = (ahora_ano + 1900) - ano;
                if (ahora_mes < mes) {
                    edad--;
                }
                if ((mes == ahora_mes) && (ahora_dia < dia)) {
                    edad--;
                }
                if (edad > 1900) {
                    edad -= 1900;
                }

                // calculamos los meses
                var meses = 0;

                if (ahora_mes > mes && dia > ahora_dia)
                    meses = ahora_mes - mes - 1;
                else if (ahora_mes > mes)
                    meses = ahora_mes - mes
                if (ahora_mes < mes && dia < ahora_dia)
                    meses = 12 - (mes - ahora_mes);
                else if (ahora_mes < mes)
                    meses = 12 - (mes - ahora_mes + 1);
                if (ahora_mes == mes && dia > ahora_dia)
                    meses = 11;

                // calculamos los dias
                var dias = 0;
                if (ahora_dia > dia)
                    dias = ahora_dia - dia;
                if (ahora_dia < dia) {
                    ultimoDiaMes = new Date(ahora_ano, ahora_mes - 1, 0);
                    dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
                }

                //return edad + " años, " + meses + " meses y " + dias + " días";
                return  edad + " a," + meses +  " m";
        } catch (error) {
            return '0'
        }


    },
    quitarEnter:(texto)=>{
      return texto.replace(/(\r\n|\n|\r)/gm, "");
    },
    getComboSeguros:()=>{
      let seguros = `
        <option value="PARTICULAR">PARTICULAR</option>
        <option value="CORTESIA">CORTESÍA</option>
        <option value="EPSS">EPSS</option>
        <option value="MAGISTERIO">MAGISTERIO</option>
        <option value="ESCOLAR">SEGURO ESCOLAR</option>
        <option value="IGS">SEGURO IGS</option>
        <option value="ROBLE">SEGUROS EL ROBLE</option>
        <option value="QUETZAL">SEGUROS QUETZAL</option>
      `

      return seguros;
    },
    getComboDepartamentos:()=>{
      let seguros = `
        <option value="1">RETALHULEU</option>
        <option value="2">SUCHITEPEQUEZ</option>
        <option value="3">QUETZALTENANGO</option>
        <option value="4">SAN MARCOS</option>
        <option value="5">ESCUINTLA</option>
      `

      return seguros;
    }
};

//export default funciones;