var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Setup Firebase
var config = {
    apiKey: "AIzaSyDOCrlMiVQByz0V4nIfAHnslaampVgZn6g",
    authDomain: "binferen.firebaseapp.com",
    databaseURL: "https://binferen.firebaseio.com",
    projectId: "binferen",
    storageBucket: "binferen.appspot.com",
    messagingSenderId: "538403328085"
}
firebase.initializeApp(config)

var usersRef = firebase.database().ref('miapp')
var proyectosRef = firebase.database().ref('proyectos')

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  document.getElementById("mensaje").innerHTML= "<li>"+user.email+"</li> ";
   document.getElementById('oculto2').style.display = 'block';

 
  

  } else {
    document.getElementById("mensaje").innerHTML= '<a class="white-text  modal-trigger" href="#modal1">Login</a>';
    document.getElementById("mensaje1").innerHTML= '<a class="black-text  modal-trigger" href="#modal1">Login</a>';
    document.getElementById('oculto').style.display = 'none';
    document.getElementById('oculto1').style.display = 'none';
    document.getElementById('oculto2').style.display = 'none';


  }
});

// create Vue app
var app = new Vue({
  // element to mount to
  el: 'body',
  // initial data
  data: {
  proyecto:{name:'',description:'',icon:''},
  newUser: {name: '',email: ''}
  },
  // firebase binding
  // https://github.com/vuejs/vuefire
  firebase: {
    users: usersRef,
    proyectos: proyectosRef,
  },
  // computed property for form validation state
  computed: {
    validation: function () {
      return {
        name: !!this.newUser.name.trim(),
        email: emailRE.test(this.newUser.email)
      }
    },
    isValid: function () {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  // methods
  methods: {

    eliminarProyecto: function (proyecto) {
      proyectosRef.child(proyecto['.key']).remove()
    },
    crearProyecto: function(){
        proyectosRef.push(this.proyecto)
        this.proyecto.description = '';
        this.proyecto.email = '';
        this.proyecto.icon = '';
    },
    addUser: function () {
      if (this.isValid) {
        usersRef.push(this.newUser)
        this.newUser.name = ''
        this.newUser.email = ''
      }
    },
    removeUser: function (user) {
      usersRef.child(user['.key']).remove()
    },
    crear:function(email,password){
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
    },
    login: function(email,password){
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(error);
  // ...
});
    },
    salir:function(){
      firebase.auth().signOut().then(function() {
 alert('Acabas de salir!');
}).catch(function(error) {
 alert('No haz podifo salir!');
});
    }
  }
});





  $(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });
         