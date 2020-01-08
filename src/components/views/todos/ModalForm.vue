<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add New Todo</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form name="todo" role="form" @submit.prevent="submitNewTodo">
            <div class="modal-body">
              <div class="form-group">
                <label for="name">Todo Details</label>
                <input
                  type="text"
                  v-model="todo.title"
                  name="title"
                  class="form-control"
                />
              </div>

              <div class="form-group">
                <label for="desc">Description</label>
                <textarea
                  name="desc"
                  v-model="todo.desc"
                  class="form-control"
                ></textarea>
              </div>

              <div class="form-group">
                <label for="date">Date</label>
                <datepicker
                  format="MM/dd/yyyy"
                  placeholder="Select Date"
                  v-model="todo.date"
                ></datepicker>
              </div>

              <div class="form-group">
                <label for="priority">Priority</label>
                <select
                  v-model="todo.priority"
                  class="form-control"
                  name="priority"
                >
                  <option disabled value="">Please select one</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <div class="form-group">
                <label for="tags">Tags</label>
                <select
                  v-model="todo.tags"
                  multiple
                  class="form-control"
                  name="tags"
                >
                  <option>Personal</option>
                  <option>Office Work</option>
                  <option>Others</option>
                </select>
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="Submit" id="submitNewTodo" class="btn btn-success">
                {{ useraction == "EDIT" ? "Save changes" : "Create" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Datepicker from "vuejs-datepicker";
export default {
  components: {
    Datepicker
  },
  data() {
    return {
      todo: {
        id: 1,
        title: "",
        priority: "",
        desc: "",
        completed: false,
        date: "",
        tags: []
      },
      useraction: "",
    };
  },
  methods: {
    ...mapActions("todo", ["action_add_todo", "action_edit_todo"]),
    submitNewTodo() {
      this.todo.date=this.todo.date.toISOString().substring(0, 10);
      console.log("Hi" + JSON.stringify(this.todo));
      if (this.useraction == "EDIT") {
        this.action_edit_todo(this.todo);
      } else {
        this.action_add_todo(this.todo);
      }
    },
    setUseraction: function(action, todo) {
      this.useraction = action;
      this.todo = todo;
    },
    // CallDateFunction(date) {
    //   if (date) {
    //     const dateString = date.toISOString().substring(0, 10);
    //     this.todo.date==dateString;
    //     console.log(this.todo.date);
    //   } else {
    //     console.log("null date");
    //   }
    // }
  },
  computed: {
    //...mapState("todo", ["status", "todos"])
  }
};
</script>
