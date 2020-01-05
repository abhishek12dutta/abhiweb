<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: rgba(2, 162, 210);">
    <router-link class="navbar-brand" to="/">Money Manager</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <!-- <a class="nav-link" href:to="{ name: 'home' }"
            >Home <span class="sr-only">(current)</span></a
          > -->

          <!-- <router-link class="nav-link" to="/">Home<span class="sr-only">(current)</span> </router-link> -->

        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/myTodos">MyTodos</router-link>
        </li>
          <li class="nav-item">
          <a class="nav-link" href="#">Link2</a>
        </li>
          <li class="nav-item">
          <a class="nav-link" href="#">Link3</a>
        </li>
      </ul>
      <ul class="navbar-nav navbar-right">
        <li class="nav-item" v-if="!status.loggedIn">
          <!-- <a class="nav-link" href="#">Login</a> -->
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>

        <li class="nav-item" v-if="!status.loggedIn">
          <router-link class="nav-link" to="/signup">Signup</router-link>
        </li>

        <li class="nav-item dropdown" v-if="status.loggedIn">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Welcome {{user.username}}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link class="nav-link" to="/changepassword/">Change password</router-link>
            <router-link class="nav-link" to="/login">Logout</router-link>
          </div>
        </li>

        <li v-if="status.loggedIn" class="nav-item" >
          <router-link class="nav-link" to="/login">Logout</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapState } from "vuex";
export default {

  data() {
    return {
      //loggedIn: false
    };
  },
  computed: {
 ...mapState('account', ['status','user'])

  },
  methods: {
  }

  
};
</script>
<style scoped>

.navbar-light .navbar-brand {
    color: white;
}

.navbar-light .navbar-nav .active>.nav-link, .navbar-light .navbar-nav .nav-link.active, .navbar-light .navbar-nav .nav-link.show, .navbar-light .navbar-nav .show>.nav-link {
      color: white;
}

.navbar-light .navbar-nav .nav-link {
    color: white;
}
.dropdown-menu{
  background-color: rgb(2, 162, 210);
}
</style>
