<template>
  <modal
    name="editTodoModal"
    :adaptive="true"
    :width="400"
    :height="530"
    @before-open="beforeOpen"
    @before-close="beforeClose"
    :clickToClose=false
  >
    <div class="px-10 py-8">
      <div class="relative">
        <button @click="$modal.hide('editTodoModal')" class="absolute top-0 right-0">
          ❌
        </button>
      </div>
      <h2 class="mb-1 uppercase tracking-wide text-xl text-center">
        Edit Todo
      </h2>
      <form @submit.prevent="submitEdit">
        <div class="form-group mb-1 mt-2">
          <label
            for="title"
            class="block font-normal uppercase tracking-wide text-xs font-bold"
            >Todo Title</label
          >
          <input
            id="title"
            type="text"
            v-model="todo.title"
            class="border px-4 py-2 w-full rounded bg-gray-200"
            ref="email"
            @keydown.shift.tab.prevent=""
          />
        </div>
        <div class="form-group mb-1">
          <label
            for="desc"
            class="block font-normal uppercase tracking-wide text-xs font-bold"
            >Description</label
          >
          <textarea
            rows="1"
            name="desc"
            v-model="todo.desc"
            class="border px-4 py-2 w-full rounded bg-gray-200"
          />
        </div>
        <div class="form-group mb-1">
          <label
            for="title"
            class="block font-normal uppercase tracking-wide text-xs font-bold"
            >Date</label
          >
          <input
            type="date"
            name="dateofbirth"
            id="dateofbirth"
            v-model="todo.date"
            class="block font-normal uppercase tracking-wide text-xs mb-1"
          />
        </div>
        <div class="form-group mb-1">
          <label
            for="priority"
            class="block font-normal uppercase tracking-wide text-xs font-bold"
            >Priority</label
          >
          <select
            v-model="todo.priority"
            class="border px-4 py-2 w-full rounded bg-gray-200"
            name="priority"
          >
            <option disabled value="">Please select one</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
        <div class="form-group mb-1">
          <label
            for="priority"
            class="block font-normal uppercase tracking-wide text-xs font-bold"
            >Choose Tagging Option</label
          >
          <select v-model="todo.tags" multiple class="form-control" name="tags">
            <option>Personal</option>
            <option>Office Work</option>
            <option>Others</option>
          </select>
        </div>
        <div class="form-group mt-3 mb-5">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
          >
            Edit Todo
          </button>
        </div>
      </form>
    </div>
  </modal>
</template>
<script>
import { mapActions } from "vuex";
import * as api from "../../../services/api";
export default {
  name: "EditTodoModal",
  components: {
    //  Datepicker
  },
  data() {
    return {
      todo: {
      }, 
    };
  },
  methods: {
      ...mapActions("todo", ["action_edit_todo"]),
    beforeOpen(event) {
      this.todo=event.params.todo;
      //  let id=event.params.id;
      //  console.log('Curently in edit modal with todo Id : ' + id);
      //   api.fetchTodoById(id).then(todo => {
      //     this.todo=todo;
      // });
      // console.log('Done');
    },
    beforeClose(event) {
      console.log(event);
      // If modal was open less then 5000 ms - prevent closing it
      if (this.time + this.duration < Date.now()) {
        event.stop();
      }
    },
     async submitEdit() {
      await api.editTodo(this.todo).then(() => {
        this.action_edit_todo(this.todo);
        this.$modal.hide("editTodoModal");
      }).catch(function(error) {
          alert('error'+error);
      });
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
