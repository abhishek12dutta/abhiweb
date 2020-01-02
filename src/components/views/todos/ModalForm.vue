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
                <input
                  type="text"
                  v-model="todo.date"
                  name="date"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="priority">Priority</label>
                <input
                  type="text"
                  v-model="todo.priority"
                  name="priority"
                  class="form-control"
                />
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
                Save changes
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
export default {
  data() {
    return {
      todo: {
        id:1,
        title: "",
        priority:"",
        desc: "",
        completed: false,
        date: "",
        tags:[]
      },
      useraction:''
    };
  },
  methods: {
    ...mapActions("todo", ["action_add_todo"]),
    submitNewTodo() {
      console.log("Hi" + JSON.stringify(this.todo));
      this.action_add_todo(this.todo);
    },
    setUseraction: function(action,todo) {
        this.useraction = action;
        this.todo=todo;
    }
  },
  computed: {
    //...mapState("todo", ["status", "todos"])
  }
};
</script>
