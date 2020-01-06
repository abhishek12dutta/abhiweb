<template>
  <div class="main-wrapper" id="todolist">
    <div class="row">
      <div class="col-4">
        <span class="badge badge-primary">Total : {{incompletedTodos.length+completedTodos.length || 0}}</span>
      </div>
      <div class="col-4">
        <span class="badge badge-warning">Pending : {{incompletedTodos.length || 0}}</span>
      </div>
      <div class="col-4">
        <span class="badge badge-success">Completed : {{completedTodos.length || 0}}</span>
      </div>
      <div class="col-md-12 mt-3"></div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="box box-aqua">
          <div class="box-body">
            <div class="box-header ui-sortable-handle">
              <i class="ion ion-clipboard"></i>
              <h3 class="box-title">Open Todos</h3>
            </div>
            <ul id="todo-list">
              <li
                class="todo-item"
                v-for="(todo, index) in incompletedTodos"
                v-bind:key="index"
              >
                <div class="handle-wrapper">
                  <i class="fa fa-edit" @click="editTodoModal(todo.id)"></i>
                </div>
                <div class="todo-info">
                  <span class="label todo-title">{{ todo.title }}</span>
                </div>
                <div class="todo-priority">
                  <div class="priority-dot" :class="todo.priority"></div>
                  <span>{{ todo.priority }}</span>
                </div>
                <div class="todo-tags">
                  <i
                    class="fa fa-tag"
                    aria-hidden="true"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  ></i>
                  <div class="dropdown-menu" v-if="todo.tags.length <= 0">
                    <div class="dropdown-header">
                      <i class="fa fa-tag" aria-hidden="true"></i> Tags
                    </div>
                    <div class="no-tags">No tags attached</div>
                  </div>
                  <div class="dropdown-menu" v-if="todo.tags.length > 0">
                    <div class="dropdown-header">
                      <i class="fa fa-tag" aria-hidden="true"></i> Tags
                    </div>
                    <span
                      class="badge badge-pill badge-info"
                      :style="{ background: tag.color, color: '#fff' }"
                      v-for="(tag, key) in todo.tags"
                      :key="key"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
                <span class="todo-date">{{ todo.date }}</span>
                <div class="actions">
                  <button
                    type="button"
                    class="btn-picto color-skyblue"
                    @click.stop="toggleTodoCompletedStatus(todo.id,'TODO_DONE')"
                    :aria-label="todo.completed ? 'Undone' : 'Done'"
                    :title="todo.completed ? 'Undone' : 'Done'"
                  >
                    <i aria-hidden="true" class="material-icons">{{
                      todo.completed ? "check_box" : "check_box_outline_blank"
                    }}</i>
                  </button>
                  <button
                    @click.stop="deleteTodo(todo.id,'DELETE_TODO')"
                    type="button"
                    aria-label="Delete"
                    title="Delete"
                    class="btn-picto color-red"
                  >
                    <i aria-hidden="true" class="material-icons">delete</i>
                  </button>
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
      <div class="col-md-6">
        <div class="box box-green">
          <div class="box-body">
            <div class="box-header ui-sortable-handle">
              <i class="ion ion-clipboard"></i>
              <h3 class="box-title">Completed Todos</h3>
            </div>
            <ul id="todo-list">
              <li
                class="todo-item"
                v-for="(todo, index) in completedTodos"
                v-bind:key="index"
              >
                <div class="handle-wrapper">
                  <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                  <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                </div>
                <div class="todo-info">
                  <span class="label todo-title">{{ todo.title }}</span>
                </div>
                <div class="todo-priority">
                  <div class="priority-dot"></div>
                  <span>{{ todo.priority }}</span>
                </div>
                <div class="todo-tags">
                  <i
                    class="fa fa-tag"
                    aria-hidden="true"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  ></i>
                  <div class="dropdown-menu" v-if="todo.tags.length <= 0">
                    <div class="dropdown-header">
                      <i class="fa fa-tag" aria-hidden="true"></i> Tags
                    </div>
                    <div class="no-tags">No tags attached</div>
                  </div>
                  <div class="dropdown-menu" v-if="todo.tags.length > 0">
                    <div class="dropdown-header">
                      <i class="fa fa-tag" aria-hidden="true"></i> Tags
                    </div>
                    <span
                      class="badge badge-pill badge-info"
                      :style="{ background: tag.color, color: '#fff' }"
                      v-for="(tag, key) in todo.tags"
                      :key="key"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
                <span class="todo-date">{{ todo.date }}</span>
                <div class="actions">
                  <button
                    type="button"
                    class="btn-picto color-skyblue"
                    @click.stop="toggleTodoCompletedStatus(todo.id,'TODO_UNDONE')"
                    :aria-label="todo.completed ? 'Undone' : 'Done'"
                    :title="todo.completed ? 'Undone' : 'Done'"
                  >
                    <i aria-hidden="true" class="material-icons">{{
                      todo.completed ? "check_box" : "check_box_outline_blank"
                    }}</i>
                  </button>
                  <button
                    @click.stop="deleteTodo(todo.id,'DELETE_TODO')"
                    type="button"
                    aria-label="Delete"
                    title="Delete"
                    class="btn-picto color-red"
                  >
                    <i aria-hidden="true" class="material-icons">delete</i>
                  </button>
                  
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
  </div>
</template>
<script>
import ModalForm from "./ModalForm";
import DeleteModal from "../../template/DeleteModal";
import JQuery from "jquery";
import { mapState, mapActions, mapGetters } from "vuex";
import { api } from '../../../services/api';
export default {
  name: "MyTodos",
  components: {
    ModalForm,
    DeleteModal
  },
  mounted: function(){
    this.fetch_my_todos();
  },
  methods: {
    ...mapActions("todo", [
      "action_delete_todo",
      "action_toggle_completed_todo",
      "action_feth_my_todos"
    ]),
    ...mapState("todo", ["todos"]),
    openNewTodoModal() {
      let $ = JQuery;
      let element = this.$refs.addNewTodoModal.$el;
      let todo = {
            id:null,
            title: null,
			priority:null,
            desc: null,
            completed: false,
            date: null,
			tags:[]
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

    deleteTodo: function(id,action) {
      let $ = JQuery;
      let element = this.$refs.deleteModal.$el;
      this.$refs.deleteModal.setTODOAction(action);
      $(element)
        .modal({
          backdrop: "static",
          keyboard: false
        })
        .one("click", "#delete_me", (e) => {
          $(element).modal("toggle");
           $(this).off(e);
          this.action_delete_todo(id);
        });
    },
    editTodoModal: function(id) {
    //this should be get call to find todo from db
      let $ = JQuery;
      //const todos = this.$store.state.todo.todos;
      //let index = todos.findIndex(todo => todo.id === id);
      console.log('Todo vue id is: ' + id);
       var thisTodo = api.fetchTodoById(id);
        console.log('Todo vue id is: ' + thisTodo);
      if (thisTodo != null) {
        //let thisTodo= todos[index];
        this.$refs.addNewTodoModal.setUseraction("EDIT", thisTodo);
        let element = this.$refs.addNewTodoModal.$el;
       $(element)
        .modal({
          backdrop: "static",
          keyboard: false
        })
        .on("click", "#submitNewTodo", () => {
          $(element).modal("toggle");
        });

      }
    },
    toggleTodoCompletedStatus: function(id,action) {
      let $ = JQuery;
      let element = this.$refs.deleteModal.$el;
      this.$refs.deleteModal.setTODOAction(action);
      $(element)
        .modal({
          backdrop: "static",
          keyboard: false
        })
        .one("click", "#delete_me", (e)=>{
          $(element).modal("toggle");
          $(this).off(e);
          this.action_toggle_completed_todo(id);
        });
       
    },
    fetch_my_todos: function() {
      this.action_feth_my_todos();
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

.box {
  position: relative;
  border-radius: 3px;
  background: #ffffff;
  border-top: 3px solid #d2d6de;
  margin-bottom: 20px;
  width: 100%;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
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

.todo-tags {
  flex: 1 10%;
  text-align: center;
  display: inline-block;
}
.todo-tags .fa-tag[data-toggle="dropdown"] {
  color: #7a797e;
  height: 30px;
  display: flex;
  width: 30px;
  align-items: center;
  justify-content: center;
  margin: auto;
  transition: all 0.2s;
  border-radius: 50%;
}
.todo-tags .fa-tag[data-toggle="dropdown"]:hover {
  background: rgba(17, 205, 239, 0.5);
  color: #fff;
  transform: scale(1.2);
}

section.main-section {
  height: 100%;
}
.card-body {
  text-align: left;
}
@keyframes strikeitem {
  to {
    width: calc(100% + 1rem);
  }
}
.count {
  font-size: 16px;
}
.count.completed {
  text-align: center;
}
.count.pending {
  text-align: right;
}
#todolist {
  margin: 4rem auto;
  padding: 2rem 3rem 3rem;
  /* max-width: 750px; */
  background: #fff;
  color: #32325d;
  box-shadow: 0 0 19px 10px rgba(100, 100, 100, 0.2);
  overflow: visible;
}
#todolist .row {
  text-align: left;
}
#todolist h1 {
  /*text-align:center;*/
  font-weight: normal;
  font-size: 2.6rem;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
#todolist h1 span {
  display: block;
  font-size: 0.8rem;
  margin-bottom: 0.7rem;
  margin-left: 3px;
  margin-top: 0.2rem;
}
#todolist .emptylist {
  margin-top: 2.6rem;
  text-align: center;
  letter-spacing: 0.05em;
  font-style: italic;
  opacity: 0.8;
}
#todolist ul {
  margin-top: 1rem;
  list-style: none;
  padding: 0;
}
#todolist .todolist-move {
  transition: transform 1s;
}
#todolist li {
  display: flex;
  margin-top: 5px;
  padding: 0.5rem 1rem;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  text-align: left;
  padding-left: 5px;
}
#todolist .actions {
  flex-shrink: 0;
}
#todolist .label {
  position: relative;
  transition: opacity 0.2s linear;
}
#todolist .label.todo-title {
  /* display: block; */
  color: #7a797e;
}
#todolist .done .label,
#todolist .done .todo-priority,
#todolist .done .todo-tags,
#todolist .done .todo-date,
#todolist .done .actions {
  opacity: 0.6;
}
#todolist .done .label:before {
  content: "";
  position: absolute;
  top: 50%;
  left: -0.5rem;
  display: block;
  width: 0%;
  height: 1px;
  background: #fff;
  animation: strikeitem 0.3s ease-out 0s forwards;
}
#todolist .btn-picto {
  border: none;
  background: none;
  -webkit-appearance: none;
  cursor: pointer;

}
.color-red{
  color: #ea0909;
}
.color-skyblue{
  color: #11cdef;
}

/* FORM */
form {
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
}
form label {
  min-width: 100%;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}
.add-todo-field {
  border-radius: 0;
  border: none;
  background: transparent;
  border-bottom: 1px solid #11cdef;
  color: #32325d;
  padding-right: 50px;
}
.add-todo-field:focus {
  box-shadow: none;
  background: transparent;
  border: none;
  border-bottom: 1px solid #11cdef;
}
form input {
  flex-grow: 1;
  border: none;
  background: #f7f1f1;
  padding: 0 1.5em;
  font-size: initial;
}
.get-btn {
  padding: 0 1.3rem;
  border: none;
  background: #11cdef;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-left: 5px;
  cursor: pointer;
  transition: background 0.2s ease-out;
}
.get-btn:hover {
  background: #11cdef;
}
form input,
.get-btn {
  font-family: "Quicksand", sans-serif;
  height: 3rem;
}
/* TOOGLE COMPONENT */
.togglebutton-wrapper {
  margin-top: 1em;
}
.togglebutton-wrapper label {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.togglebutton-wrapper input {
  position: absolute;
  left: -9999px;
}
.togglebutton-wrapper .togglebutton-label {
  font-size: 0.8rem;
  letter-spacing: 0.1em;
}
.togglebutton-wrapper .tooglebutton-box {
  position: relative;
  display: block;
  margin-left: 0.6em;
  width: 38px;
  height: 22px;
  background: white;
  /*border:1px solid black;*/
  border-radius: 999px;
  cursor: pointer;
}
.togglebutton-wrapper .tooglebutton-box:before {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  display: block;
  width: 18px;
  height: 18px;
  /*border:1px solid #11cdef;*/
  border-radius: 50%;
  background: #11cdef;
  opacity: 0.7;
  transition: all 0.2s ease-in-out;
}
.togglebutton-wrapper.togglebutton-focus .tooglebutton-box {
  box-shadow: 0px 0px 0px 3px rgba(0, 0, 0, 0.1);
}
.togglebutton-wrapper.togglebutton-checked .tooglebutton-box:before {
  left: calc(100% - 4px - 16px);
  opacity: 1;
}
.scroll-area {
  position: relative;
  margin: auto;
  width: 100%;
  max-height: 450px;
  min-height: 350px;
}
.scroll-area .ps__scrollbar-y-rail {
  background: rgb(232, 232, 232);
  opacity: 1;
  width: 10px;
  border-radius: 8px;
}
.todo-footer {
  position: absolute;
  bottom: 0;
}
.todo-footer ul {
  display: flex;
}
.todo-footer .actions {
  display: flex;
}
.todo-footer .actions button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-wrapper {
  height: 100%;
}
@media screen and (min-width: 370px) {
  section.main-section {
    padding: 0;
  }
  #todolist {
    padding: 1.5rem;
    margin: 1rem auto;
  }
  #todolist h1 {
    font-size: 1.5rem;
  }
  .count.completed {
    text-align: left;
  }
  .count.pending {
    text-align: left;
  }
}
.fa.submit-icon {
  position: absolute;
  right: 30px;
  top: 12px;
  font-size: 25px;
  cursor: pointer;
}
.badge {
  font-size: 80%;
}
.navbar-dark .navbar-brand {
  font-size: 20px;
}
.todo-info {
  flex: 1 60%;
}
.todo-date {
  font-size: 12px;
  color: #8898aa;
  flex: 1 20%;
}
.my-style .vue-notification .notification-title {
  color: red !important;
}
#todolist li.todo-item:hover {
  background-color: #f4f5f7;
  cursor: pointer;
}
.todo-item .handle-wrapper {
  width: 20px;
  color: #191718;
  opacity: 1;
}
#todolist li.todo-item:hover .handle-wrapper {
  opacity: 1;
}
.handle-wrapper:hover {
  cursor: pointer;
}
.ghost {
  border-bottom: 1px solid #11cdef;
}
.user-icon img {
  width: 40px;
  cursor: pointer;
  border-radius: 50%;
}
.label.todo-description {
  font-size: 16px;
  background: #dedede;
  padding: 5px 8px;
  border-radius: 6px;
  color: #000;
  line-height: normal;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.badge.badge-pill.badge-info {
  font-size: 11px;
  margin-right: 5px;
  text-transform: capitalize;
  line-height: normal;
  padding: 3px 10px;
}
@media screen and (max-width: 370px) {
  #todolist {
    max-width: 400px;
    padding: 1rem;
  }
}
@media screen and (max-width: 768px) {
  #todolist {
    max-width: 650px;
    padding: 1.25rem;
  }
}
.todo-priority {
  flex: 1 20%;
  display: flex;
  align-items: center;
}
.todo-tags {
  flex: 1 10%;
  text-align: center;
}
.todo-tags .fa-tag[data-toggle="dropdown"] {
  color: #7a797e;
  height: 30px;
  display: flex;
  width: 30px;
  align-items: center;
  justify-content: center;
  margin: auto;
  transition: all 0.2s;
  border-radius: 50%;
}
.todo-tags .fa-tag[data-toggle="dropdown"]:hover {
  background: rgba(17, 205, 239, 0.5);
  color: #fff;
  transform: scale(1.2);
}
.todo-desc-icon {
  width: 20px;
}
.priority-dot {
  height: 10px;
  width: 10px;
  background: #333;
  border-radius: 50%;
  margin-right: 10px;
}
.todo-tags .dropdown-menu.show .badge-pill.badge {
  font-size: 12px;
  text-transform: capitalize;
  padding: 8px 8px;
  display: block;
  margin: 10px;
  width: 120px;
  margin: 8px auto;
}
.dropdown-header {
  color: #7a797e;
  text-align: center;
  font-size: 16px;
  padding: 4px;
  text-transform: none;
  font-weight: 600;
  border-bottom: 1px solid #c5c5c5;
  margin: 0 20px;
}
.no-tags {
  text-align: center;
  font-size: 14px;
  margin: 10px 0;
}
@media (max-width: 767px) {
  #todolist li {
    flex-wrap: wrap;
  }
  .todo-info {
    flex: 1 60%;
    padding: 0 0 0 0.2rem;
  }
  .todo-priority {
    flex: 1 20%;
    display: flex;
    align-items: center;
    order: 2;
    flex-shrink: 0;
    flex-grow: 0;
  }
  .todo-tags {
    flex: 1 10%;
    text-align: center;
    order: 3;
    flex-grow: 0;
  }
  .todo-date {
    flex: 1 20%;
    align-items: center;
  }
  #todolist .actions {
    flex-shrink: 0;
  }
}

.High{
  background:red;
}
.Medium{
background:green;
}
.Low{
background:greenyellow;
}

</style>
