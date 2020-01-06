<template>
  <div class="card bg-light">
    <article class="card-body mx-auto">
      <h4 class="card-title mt-3 text-center">Create Account</h4>
      <p class="text-center">Get started with your free account</p>
      <form @submit.prevent="handleSubmit">
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fas fa-user-circle"></i>
            </span>
          </div>
          <input
            type="text"
            placeholder="Full Name"
            v-model="user.fullname"
            v-validate="'required'"
            name="fullname"
            class="form-control"
            :class="{ 'is-invalid': submitted && errors.has('fullname') }"
          />
          <div
            v-if="submitted && errors.has('fullname')"
            class="invalid-feedback"
          >
            {{ errors.first("fullname") }}
          </div>
        </div>
        <!-- form-group// -->
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fas fa-at"></i>
            </span>
          </div>
          <input
            type="email"
            placeholder="Email Address"
            v-model="user.email"
            v-validate="'required'"
            name="email"
            class="form-control"
            :class="{ 'is-invalid': submitted && errors.has('email') }"
          />
          <div
            v-if="submitted && errors.has('email')"
            class="invalid-feedback"
          >
            {{ errors.first("email") }}
          </div>
        </div>

        <!-- form-group end.// -->
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-phone"></i> </span>
          </div>
          <vue-tel-input
            class="form-control"
            :class="{ 'is-invalid': submitted && !isPhnNoValid }"
            :preferred-countries="['us', 'gb', 'ua']"
            :valid-characters-only="true"
            @input="onInput"
          >
          </vue-tel-input>
          <div v-if="submitted && !isPhnNoValid" class="invalid-feedback">
            Please enter a valid Phn No
          </div>
        </div>

        <!-- form-group// -->
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fa fa-user"></i>
            </span>
          </div>
          <input
            type="text"
            placeholder="Choose Username"
            v-model="user.username"
            v-validate="'required'"
            name="username"
            class="form-control"
            :class="{ 'is-invalid': submitted && errors.has('username') }"
          />
          <div
            v-if="submitted && errors.has('username')"
            class="invalid-feedback"
          >
            {{ errors.first("username") }}
          </div>
        </div>

        <!-- form-group end.// -->
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
          </div>
          <input
            type="password"
            placeholder="Password"
            v-model="user.password"
            v-validate="{ required: true, min: 6 }"
            name="password"
            class="form-control"
            :class="{ 'is-invalid': submitted && errors.has('password') }"
          />
          <div
            v-if="submitted && errors.has('password')"
            class="invalid-feedback"
          >
            {{ errors.first("password") }}
          </div>
        </div>

        <input type="hidden" v-model="user.countrycode" />
        <input type="hidden" v-model="user.phnext" />
        <input type="hidden" v-model="user.phnno" />

        <!-- form-group// -->
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">
            Create Account
          </button>
        </div>

        <img
          v-show="status.registering"
          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
        />
        <!-- form-group// -->
        <p class="text-center">
          Have an account?
          <router-link class="nav-link" to="/login">Log In</router-link>
        </p>
      </form>
    </article>
  </div>
  <!-- card.// -->
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        fullname: "",
        username: "",
        password: "",
        countrycode: "",
        phnext: "",
        phnno: "",
        email:""
      },
      submitted: false,
      isPhnNoValid: false
    };
  },
  computed: {
    ...mapState("account", ["status"])
  },
  methods: {
    ...mapActions("account", ["register"]),
    handleSubmit() {
      this.submitted = true;
      console.log(this.isPhnNoValid);
      this.$validator.validate().then(valid => {
        console.log(this.isPhnNoValid);
        if (valid) {
          this.register(this.user);
        }
      });
    },
    onInput(formattedNumber, { number, valid, country }) {
      // this.phone.number = number.international;
      // this.phone.valid = valid;
      // this.phone.country = country.iso2;
      //country.dialCode
      //number.national
      this.user.countrycode = country.iso2;
      this.user.phnext = country.dialCode;
      this.user.phnno = number.input;
      this.isPhnNoValid = valid;
    }
  }
};
</script>

<style scoped>
</style>
