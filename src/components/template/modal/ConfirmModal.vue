<template>
  <modal
    name="confirmModal"
    :adaptive="true"
    :width="180"
    :height="200"
    :clickToClose="false"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Are you sure?</h4>
        <button
          type="button"
          class="close"
          @click="$modal.hide('confirmModal')"
        >
          &times;
        </button>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-sm btn-info"
          @click="$modal.hide('confirmModal')"
        >
          Cancel
        </button>
        <button
          type="button"
          id="delete_me"
          class="btn btn-sm btn-danger"
          @click.prevent="onDelete"
        >
          Delete
        </button>
      </div>
    </div>
  </modal>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "ConfirmModal",
  components: {
    //  Datepicker
  },
  data() {
    return {
      id: 0
    };
  },
  methods: {
    ...mapActions("todo", ["action_delete_todo"]),
    beforeOpen(event) {
      let todoId = event.params.id;
      this.id = todoId;
    },
    beforeClose() {
      this.id = 0;
    },
    onDelete() {
      this.action_delete_todo(this.id);
      this.$modal.hide("confirmModal");
    }
  }
};
</script>
<style scoped>
[type="date"] {
  background: #fff
    url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png)
    99% 50% no-repeat;
}
[type="date"]::-webkit-inner-spin-button {
  display: none;
}
[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
}

/* custom styles */
body {
  padding: 4em;
  background: #e5e5e5;
  font: 13px/1.4 Geneva, "Lucida Sans", "Lucida Grande", "Lucida Sans Unicode",
    Verdana, sans-serif;
}

input[type="date"] {
  border: 1px solid #dee2e6 !important;
  border-radius: 5px;
  background-color: #fff;
  padding: 3px 5px;
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.1);
  width: 99%;
}
</style>
