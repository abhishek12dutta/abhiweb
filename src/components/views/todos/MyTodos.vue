<template>
  <div class="row">
    <div class="col-md-6">
      <div class="box box-aqua">
        <div class="box-body">
          <div class="box-header ui-sortable-handle" style="cursor: move;">
            <i class="ion ion-clipboard"></i>
            <h3 class="box-title">To Do List</h3>
          </div>
          <ul class="todo-list ui-sortable">
            <li v-for="(todo, index) in incompletedTodos" v-bind:key="index">
              <span class="handle ui-sortable-handle">
                <i class="fa fa-ellipsis-v"></i>
                <i class="fa fa-ellipsis-v"></i>
              </span>
              <span class="text">{{ todo.title }}</span>
              <small class="label label-danger"
                ><i class="fa fa-clock-o"></i> {{ todo.desc }}</small
              >
              <div class="tools">
                <i class="fa fa-edit" @click="editTodoModal(todo.id)"></i>
                <i class="fa fa-trash" @click="deleteTodo(todo.id)"></i>
              </div>
            </li>
          </ul>
        </div>
        <div class="box-footer clearfix no-border">
          <button
            type="button"
            class="btn btn-default pull-right"
            @click="openNewTodoModal"
          >
            <i class="fa fa-plus"></i> Add item
          </button>
        </div>
      </div>
    </div>
    <!-- @click="addNewTodo"  
    data-toggle="modal" data-target="#myModal"
    -->
    <div class="col-md-6">
      <div class="box box-green">
        <div class="box-body">
          <div class="box-header ui-sortable-handle" style="cursor: move;">
            <i class="ion ion-clipboard"></i>
            <h3 class="box-title">Completed</h3>
          </div>
          <ul class="todo-list ui-sortable">
            <li v-for="(todo, index) in completedTodos" v-bind:key="index">
              <span class="handle ui-sortable-handle">
                <i class="fa fa-ellipsis-v"></i>
                <i class="fa fa-ellipsis-v"></i>
              </span>
              <span class="text">{{ todo.title }}</span>
              <small class="label label-danger"
                ><i class="fa fa-clock-o"></i> {{ todo.desc }}</small
              >
              <div class="tools">
                <i class="fa fa-edit"></i>
                <i class="fa fa-trash"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <ModalForm ref="addNewTodoModal"></ModalForm>
    <DeleteModal ref="deleteModal"></DeleteModal>
    <!-- MODAL -->
  </div>
</template>
<script>
import ModalForm from "./ModalForm";
import DeleteModal from "../../template/DeleteModal";
import JQuery from "jquery";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "MyTodos",
  components: {
    ModalForm,
    DeleteModal
  },
  //   data() {
  //     return {
  //       todos: ["TODO 1", "TODO 3", "TODO 2", "TODO 2"]
  //     };
  //   },
  methods: {
    ...mapActions("todo", ["action_delete_todo"]),
    ...mapState("todo", ["todos"]),
    openNewTodoModal() {
      let $ = JQuery;
      let element = this.$refs.addNewTodoModal.$el;
        let todo = {
        title: "",
        desc: "",
        completed: false,
        date: ""
      };
      this.$refs.addNewTodoModal.setUseraction("CREATE", todo);
      $(element)
        .modal({
          backdrop: "static",
          keyboard: false
        })
        .on("click", "#submitNewTodo", () => {
          $(element).modal("toggle");
        });
    },

    deleteTodo: function(id) {
      let $ = JQuery;
      let element = this.$refs.deleteModal.$el;
      //$(element).modal("show");
      $(element)
        .modal({
          backdrop: "static",
          keyboard: false
        })
        .on("click", "#delete_me", e => {
          $(element).modal("toggle");
          this.action_delete_todo(id);
          console.log(e);
        });

      // this.action_delete_todo(id);
    },
    editTodoModal: function(id) {
      const todos = this.$store.state.todo.todos;
      let index = todos.findIndex(todo => todo.id === id);
      if (index >= 0) {
        this.$refs.addNewTodoModal.setUseraction("EDIT", todos[index]);
        let $ = JQuery;
        let element = this.$refs.addNewTodoModal.$el;
        $(element).modal("show");
      }
    }
  },
  computed: {
    // ...mapState("todo", ["todos"]),
    ...mapGetters("todo", ["completedTodos", "incompletedTodos"])
  }
};
</script>
<style scoped>
.box.box-aqua {
  border-top-color: #00c0ef !important;
}
.box.box-green {
  border-top-color: #00a65a !important;
}
.box.box-success {
  border-top-color: #3c8dbc;
}
.box {
  position: relative;
  border-radius: 3px;
  background: #ffffff;
  border-top: 3px solid #d2d6de;
  margin-bottom: 20px;
  width: 100%;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.box-header {
  color: #444;
  display: block;
  padding: 10px;
  position: relative;
}
.box-header > .ion {
  margin-right: 5px;
}
.box-header .box-title {
  display: inline-block;
  font-size: 18px;
  margin: 0;
  line-height: 1;
}
.box-header > .box-tools {
  position: absolute;
  right: 10px;
  top: 5px;
}
.inline {
  display: inline;
}
.box-body {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  padding: 10px;
}
.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: auto;
}
.todo-list > li {
  border-radius: 2px;
  padding: 10px;
  background: #bbb5b5;
  margin-bottom: 2px;
  border-left: 2px solid #e6e7e8;
  color: #444;
}
.todo-list > li .label {
  margin-left: 10px;
  font-size: 9px;
}
.todo-list > li .tools {
  float: right;
  color: #dd4b39;
}
.todo-list > li:hover .tools {
  display: block;
}
.no-border {
  border: 0 !important;
}
.box-footer {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  border-top: 1px solid #f4f4f4;
  padding: 10px;
  background-color: #fff;
}
.btn-default {
  background-color: #f4f4f4;
  color: #444;
  border-color: #ddd;
}
.btn {
  border-radius: 3px;
  -webkit-box-shadow: none;
  box-shadow: none;
  border: 1px solid transparent;
}

.tools > i {
  margin-left: 0.2rem;
}

.text {
  padding-left: 1rem;
}
</style>
