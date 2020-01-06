<template>
    <div class="card bg-light">
      <article class="card-body mx-auto" style="max-width: 400px;">
        <h4 class="card-title mt-3 text-center">Login </h4>
        <form @submit.prevent="handleSubmit">
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-user"></i>
              </span>
            </div>
            <input
              name="username"
              v-model="username"
              class="form-control" :class="{ 'is-invalid': submitted && !username }"
              placeholder="Username"
              type="text"
            />
             <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
          </div>
          
          <!-- form-group end.// -->
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
            </div>
            <input
              name="username"
              v-model="password"
              class="form-control" :class="{ 'is-invalid': submitted && !password }"
              placeholder="Password"
              type="password"
            />
            <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
          </div>
        
          <!-- form-group// -->
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block" :disabled="status.loggingIn">
              Login
            </button>
          </div>

          <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />


          <!-- form-group// -->
          <p class="text-center">Don't have an account? Just <router-link class="nav-link" to="/signup">Sign Up</router-link> to start using our website</p>
           
        </form>
      </article>
    </div>
    <!-- card.// -->
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
            username: '',
            password: '',
            submitted: false
    }
  },
  computed: {
 ...mapState('account', ['status'])

  },
  created() {
      // reset login status
        this.logout();
  },
  methods: {
    ...mapActions('account', ['login', 'logout']),
    handleSubmit() {
      this.submitted = true;
      const payload = {'USER_NAME': this.username, 'PASSWORD': this.password};
        if (this.username && this.password) {
            this.login(payload);
        }
    }
  }
};
</script>

<style scoped>

</style>
