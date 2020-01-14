<template>
  <div class="normal-case tracking-normal">
    <!-- <router-link to="/login" @click.prevent="show" class="text-white p-2 hover:text-black-600">Login</router-link> -->
    <a
      href="/login"
      @click.prevent="show"
      class="text-white p-2 hover:text-black-600"
      >Login</a
    >
    <modal
      name="modal-login"
      @opened="opened"
      :adaptive="true"
      :height="440"
      :width="400"
      :clickToClose=false
    >
      <div class="px-10 py-8">
        <div
          class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-red text-sm z-50"
        >
          <svg
            class="fill-current text-red"
            xmlns="http://www.w3.org/2000/svg"
            @click.prevent="hide"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            ></path>
          </svg>
        </div>
        <h2 class="mb-4 uppercase tracking-wide text-xl">Login</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group mb-4">
            <label
              for="username"
              class="block font-normal uppercase tracking-wide text-xs mb-1"
              >User Name</label
            >
            <input
              name="username"
              v-model="username"
              class="border px-4 py-2 w-full rounded bg-gray-200"
              ref="username"
              @keydown.shift.tab.prevent=""
            />
          </div>
          <div class="form-group mb-4">
            <label
              for="password"
              class="block font-normal uppercase tracking-wide text-xs mb-1"
              >Password</label
            >
            <input
              type="password"
              name="password"
              v-model="password"
              class="border px-4 py-2 w-full rounded bg-gray-200"
            />
          </div>
          <div class="form-group mb-8">
            <label class="text-sm font-normal"
              ><input type="checkbox" name="remember" class="mr-2" />Keep me
              signed in</label
            >
          </div>
          <div class="form-group mb-4">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
            >
              Login
            </button>
          </div>
        </form>
        <div class="text-sm font-normal text-center">
          <p>
            Don't have an account?
            <a
              href="#"
              class="text-blue-600 hover:text-blue-800"
              @click.prevent="showRegister"
              @keydown.tab.exact.prevent=""
              >Register</a
            >
          </p>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
      username: "",
      password: "",
      submitted: false
    };
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
    show() {
      this.$modal.show("modal-login");
    },
    showRegister() {
      this.$modal.show("modal-register");
      this.$modal.hide("modal-login");
    },
    opened() {
      this.$refs.username.focus();
    },
    hide() {
      this.$modal.hide("modal-login");
    },
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
