<template>
    <nav class="navbar navbar-expand-lg navbar-ligth bg-light">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/login" class="nav-link active">Iniciar Sesión</router-link>
          <router-link to="/semesters" class="nav-link active">Malla Curricular</router-link>
          <button class="btn btn-danger logout" type="submit" @click="handleLogout">Salir</button>
        </div>
      </div>
    </div>
  </nav>
    <router-view></router-view>
  </template>
  
  <script>
  export default {
    
        methods:{
            handleLogout(){
                localStorage.clear();
                this.$router.replace({path: '/login'});
            }
        }
    }
  </script>

  <style scoped>
    .logout{
        position: fixed;
        right: 20px;
    }
  </style>