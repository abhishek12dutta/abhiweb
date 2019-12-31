<template>
  <div id="app">
    <AppHeader />
    <div class="container">
      <div class="row">
        <div class="col-sm-6 offset-sm-3 mt-3">
          <div v-if="alert.message" :class="'alert ' + alert.type">
            {{ alert.message }}
          </div>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/template/AppHeader";
import { mapState, mapActions } from "vuex";
export default {
  name: "App",

  components: {
    AppHeader
  },

  data: () => ({
    //
  }),
  computed: {
    ...mapState({
      alert: state => state.alert
    })
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear"
    })
  },
  watch: {
    $route (){
        // clear alert on location change
        this.clearAlert();
    }
} 
};
</script>

<style scoped></style>
