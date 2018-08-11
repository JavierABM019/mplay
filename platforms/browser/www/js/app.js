
var $$ = Dom7;

var app7 = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App', 
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  /*panel: {
    swipe: 'left',
  },*/
  // Add default routes
  routes: routes,
  // ... other parameters
});
var mainView =app7.views.create('.view-main')


var app = {
  autenticado:false,
  usuario: "",
  password: "",
  name:"",
  email:"",
  subject:"",
  comentarios:"",
  hostname: "http://www.oronoticias.org",
  urlVideo:"",
  tituloVideo:"",
  autorVideo:"",

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        console.log("VARIABLE AUTENTICADO:"+window.localStorage.getItem("autenticado"));
        if (window.localStorage.getItem("autenticado")=="true") {
          mainView.router.navigate('/homepages/',{animate:true});
        }





    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);*/
    },
    loginAccess:function(){

      this.usuario= $$('#usuario').val();
      this.password= $$('#password').val();
      app7.preloader.hide();
      if (this.usuario==""||this.password=="") {
        app7.dialog.alert('Tu usuario o contraseña son incorrectos, verifíquelos')
      }
      else{
        app7.preloader.show();
      /*app7.preloader.show();
      setTimeout(function(){
        app7.preloader.hide();
        mainView.router.navigate('/homepages/',{animate:true});
      },4000);*/
        app7.request({
          url: this.hostname+'/mplay/api/login.php',
          data:{usuario:this.usuario,password:this.password},
          method:'POST',
         crossDomain: true,
         success:function(data){
          //alert(data);
          app7.preloader.hide();
          var objson= JSON.parse(data);
          if (objson.data=='Autenticado') {
            window.localStorage.setItem("autenticado", "true");
            this.autenticado=window.localStorage.getItem("autenticado");
            mainView.router.navigate('/homepages/',{animate:true});
          
          }else{
            app7.dialog.alert("Usuario o Password incorrecto");
          }
          
          //console.log(objson.data);

                   
          
         },
         error:function(data){
          app7.preloader.hide();
          app7.dialog("Hubo un error, por favor intente otra vez");
         }
        });
      }
    },
    RegisterAccess:function(){
      console.log('sirve');
      app7.preloader.show();
      setTimeout(function(){
        app7.preloader.hide();
        mainView.router.navigate('/signup/',{animate:true});
      },1000);
      /*this.fullname= $$('#Fullname').val();
      this.usename= $$('#Username').val();
      this.email= $$('#Email').val();
      this.contrasena= $$('#Password').val();
        if (this.fullname==""||this.usename==""||this.email==""||this.contrasena=="") {
        app7.dialog.alert('Tu usuario o contraseña son incorrectos, verifíquelos')
      }
      else{
        app7.request({
          url: 'http://localhost/mplay/api/signup.php',
          data:{fullname:this.fullname,usename:this.usename,email:this.email,contrasena:this.contrasena,confcontrasena:this.confcontrasena},
          method:'POST',
         crossDomain: true,
         success:function(data){
          alert(data);
          app7.preloader.hide();
          var objson= JSON.parse(data);
          },
          error:function(data){
          app7.preloader.hide();
          app7.dialog("Hubo un error, por favor intente otra vez");
         }
        });
      }*/
    },
    SignupAccess:function(){
      var Password= document.getElementById("Password").value;
      var Repassword= document.getElementById("Repassword").value;
    if (Password!=Repassword) {
          app7.dialog.alert('Revise su contraseña')

      }else{      
      this.name= $$('#Fullname').val();
      this.usuario= $$('#Username').val();
      this.email= $$('#Email').val();
      this.password= $$('#Password').val();
      app7.preloader.show();
        if (this.name==""||this.usename==""||this.email==""||this.contrasena=="") {
        app7.dialog.alert('Tu usuario o contraseña son incorrectos, verifíquelos')
      }
      else{
        app7.request({
          url: this.hostname+'/mplay/api/signup.php',
          data:{nombre:this.name,usuario:this.usuario,password:this.password},
          method:'POST',
         crossDomain: true,
         
         success:function(data){
             app7.dialog.alert("Ha sido dado de alta exitosamente");
             app7.preloader.hide();
             var objson= JSON.parse(data);
             mainView.router.navigate('/index/',{animate:true});

          },
          error:function(data){
          app7.preloader.hide();
          app7.dialog("Hubo un error, por favor intente otra vez");
          conole.log(data);
         }
        });
      }
      }
    },
    ContactAccess:function(){
      /*var subject= document.getElementById("subject").value;
      var EMail= document.getElementById("EMail").value;
      var nombre= document.getElementById("nombre").value;
      if (subject==""||EMail==""||nombre=="") {
        app7.dialog.alert('Llene los espacios necesarios')
      }
      else{
        app7.preloader.show();
        setTimeout(function(){
        app7.preloader.hide();
        mainView.router.navigate('/contact/',{animate:true});
      },1000);
      }*/
      this.name=$$('#nombre').val();
      this.email=$$('#EMail').val();
      this.subject=$$('#subject').val();
      this.comentarios=$$('#comentarios').val();
      app7.preloader.show();
      if (this.name==""||this.email==""||this.subject=="") {
        app7.dialog.alert('Por favor llene todos los datos para poder darle seguimiento')
      }
      else{
      app7.request({
          url: this.hostname+'/mplay/api/contact.php',
          data:{name:this.name,email:this.email,subject:this.subject,comentarios:this.comentarios},
          method:'POST',
         crossDomain: true,
         success:function(data){
          app7.preloader.hide();
          app7.dialog.alert('Su asunto ha sido enviado exitosamente');
          var objson= JSON.parse(data);
          mainView.router.navigate('/homepages/',{animate:true});
         },
         error:function(data){
          app7.preloader.hide();
          app7.dialog("Hubo un error, por favor intente otra vez");
          conole.log(data);
         }

       });
      }
    },
    loginClose: function(){
       app7.panel.close();
      app7.dialog.confirm('¿Seguro desea salir de la aplicación?',function(){
         mainView.router.navigate('/index/',{animate:true}); 
          window.localStorage.setItem("autenticado", "false");
      });
    }
  };



  function showMenu(){
    app7.panel.open('left',true);
  }
  $$(document).on('page:init', '.page[data-name="homepages"]', function(e){
      console.log('View Home load init');
      app7.panel.allowOpen=true;
      app7.panel.enableSwipe('left');
      
      var $ptrContent = app7.ptr.create('.ptr-content');
      $ptrContent.on('refresh',function(e){
        RefreshVideos();
        getSliders();


      });
      getVideos();
      getSliders();
    });
    $$(document).on('page:init', '.page[data-name="search"]', function(e){
      
      //searchVideo("super");
      $$('#search').on('keyup', function (e) {
        var keyCode = e.keyCode || e.which;

        if (keyCode===13) {
          searchVideo($$('#search').val());
          e.preventDefault();
          return false;
        }else{

        }

  
        });
        $$('#search').val("");


    });

    function searchVideo(buscar){
        var buscar  = buscar;
        $$('#list-search').html("");
        app7.preloader.show();
        app7.request({
          url: app.hostname+'/mplay/api/search.php?buscar='+buscar,
          method:'GET',
         crossDomain: true,
         success:function(data){
          
          app7.preloader.hide();
          var objson= JSON.parse(data);
          var img = "";
          var video="";
          if (objson.data == "Videos no encontrados") {
            app7.dialog.alert("No se encontraron resultados")
          }else{

          for(x in objson.data){
            console.log(objson.data[x].titulo);
            img= app.hostname+'/mplay/img/images/'+objson.data[x].imagen;
            video = '<li><a href="#" class="item-link item-content" onclick="goVideo(\''+objson.data[x].titulo+'\',\''+objson.data[x].url+'\',\''+objson.data[x].imagen+'\')"><div class="item-media"><img src="'+img+'" width="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">'+objson.data[x].titulo+'</div></div><div class="item-subtitle">'+objson.data[x].autor+'</div><div class="item-text">'+objson.data[x].duracion+' / '+objson.data[x].visitas+' Visitas / '+objson.data[x].fecha+'</div></div></a></li>';
            $$('#list-search').append(video);

          }

          }
         },
         error:function(error){
          app7.preloader.hide();
          app7.dialog.alert("Hubo un error, por favor intente otra vez");
          console.log(error);
         }

       });
  }
  function getVideos(){
    app7.preloader.show();
   app7.request({
          url: app.hostname+'/mplay/api/videos.php',
          method:'GET',
         crossDomain: true,
         success:function(data){
          app7.preloader.hide();
          var objson= JSON.parse(data);
          var video="";
          var img="";
           
          for(x in objson.data){
            console.log(objson.data[x].titulo);
            img =app.hostname+'/mplay/img/images/'+objson.data[x].imagen;
            video = '<div class="personas"><img src="'+img+'" onclick="goVideo(\''+objson.data[x].titulo+'\',\''+objson.data[x].url+'\',\''+objson.data[x].imagen+'\',\''+objson.data[x].autor+'\')" class="img"><div class="time">'+objson.data[x].duracion+'</div><div class="texto3"><b>'+objson.data[x].titulo+'</b></div><div class="texto4">'+objson.data[x].autor+'</div><div class="texto5">'+objson.data[x].visitas+' Views | '+objson.data[x].fecha+'</div></div>';
            $$('#content-videos').append(video);
          }
          
         },
         error:function(data){
          app7.preloader.hide();
          app7.dialog.alert("Hubo un error, por favor intente otra vez");
          conole.log(error);
         }

       });
  }

  function RefreshVideos(){
    app7.request({
          url: app.hostname+'/mplay/api/videos.php',
          method:'GET',
         crossDomain: true,
         success:function(data){
          app7.ptr.done();
          $$('#content-videos').html("");
          var objson= JSON.parse(data);
          var video="";
          for(x in objson.data){
            console.log(objson.data[x].titulo);
           video = '<div class="personas"><img src="../img/images/post4.jpg" onclick="goVideo(\''+objson.data[x].titulo+'\',\''+objson.data[x].url+'\',\''+objson.data[x].imagen+'\')" class="img"><div class="time">'+objson.data[x].duracion+'</div><div class="texto3"><b>'+objson.data[x].titulo+'</b></div><div class="texto4">'+objson.data[x].autor+'</div><div class="texto5">'+objson.data[x].visitas+' Views | '+objson.data[x].fecha+'</div></div>';
            $$('#content-videos').append(video)
          }
          
         },
         error:function(data){
          app7.preloader.hide();
          app7.dialog.alert("Hubo un error, por favor intente otra vez");
          conole.log(error);
         }

       });

  }
  function getSliders(){
    app7.request({
          url: app.hostname+'/mplay/api/slider.php',
          method:'GET',
         crossDomain: true,
         success:function(data){
          var img = "";
          //app7.ptr.done();
          $$('#swiper-wrapper').html("");
          var objson= JSON.parse(data);
          var swiper = app7.swiper.get('.swiper-container');
          swiper.removeAllSlides();
          for(x in objson.data){
            console.log(objson.data[x].titulo);
            img = app.hostname+'/mplay/img/images/'+objson.data[x].imagen;
            var slide='<div class="swiper-slide"><img src="'+img+'" onclick ="goVideo(\'prueba\')" class="slide"><div class="texto01"><b>'+objson.data[x].titulo+'</b></div><div class="texto02">'+objson.data[x].fecha+'</div><button class="play" onclick =goVideo(\'prueba\')>Play now</button></div>';
            swiper.appendSlide(slide);
            
          }
          
         },
         error:function(data){
          app7.preloader.hide();
          app7.dialog.alert("Hubo un error, por favor intente otra vez");
          conole.log(error);
         }

       });
  }
  function goVideo(titulo,url,imagen,autor){
    app.tituloVideo = titulo;
    app.urlVideo = url;
    app.autorVideo= autor;

    //alert(titulo);
     mainView.router.navigate('/video/',{animate:true});

  }

  $$(document).on('page:init', '.page[data-name="video"]', function(e){
      
        console.log();
        $$('.videoyoutube iframe').remove();
        $$('<iframe width="100%" height="200"  frameborder="0" allowfullscreen></iframe>').attr('src',app.urlVideo).appendTo('.videoyoutube');
        $$('#tituloVideo').html(app.tituloVideo);
        $$('#autor').html(app.autorVideo);


    });

/*function searchVideo(buscar){
        var buscar  = buscar;
        $$('#list-search').html("");
        app7.preloader.show();
        app7.request({
          url: app.hostname+'/mplay/api/search.php?buscar='+buscar,
          method:'GET',
         crossDomain: true,
         success:function(data){
          
          app7.preloader.hide();
          var objson= JSON.parse(data);
          
          var video="";
          if (objson.data == "Videos no encontrados") {
            app7.dialog.alert("No se encontraron resultados")
          }else{

          for(x in objson.data){
            console.log(objson.data[x].titulo);
            video = '<li><a href="#" class="item-link item-content"><div class="item-media"><img src="../img/images/card1.jpg" width="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">'+objson.data[x].titulo+'</div></div><div class="item-subtitle">'+objson.data[x].autor+'</div><div class="item-text">'+objson.data[x].duracion+' / '+objson.data[x].visitas+' Visitas / '+objson.data[x].fecha+'</div></div></a></li>';
            $$('#list-search').append(video);

          }

          }
         },
         error:function(error){
          app7.preloader.hide();
          app7.dialog.alert("Hubo un error, por favor intente otra vez");
          console.log(error);
         }

       });
  }*/


  