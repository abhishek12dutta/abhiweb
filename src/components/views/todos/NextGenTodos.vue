<template>
  <div class="main-wrapper" id="todolist">
    <div class="box-footer clearfix no-border">
      <button
        type="button"
        class="btn btn-default pull-right"
        @click="openNewTodoModal"
      >
        <i class="fa fa-plus"></i> Add item
      </button>
    </div>
    <div class="row">
      <div class="col-4">
        <span class="badge badge-primary"
          >Total :
          {{ incompletedTodos.length + completedTodos.length || 0 }}</span
        >
      </div>
      <div class="col-4">
        <span class="badge badge-warning"
          >Pending : {{ incompletedTodos.length || 0 }}</span
        >
      </div>
      <div class="col-4">
        <span class="badge badge-success"
          >Completed : {{ completedTodos.length || 0 }}</span
        >
      </div>
    </div>
    <div
      id="app"
      class="border-2 bg-gray-200 md:flex flex-wrap justify-between"
    >
      <div
        class="text-gray-700 text-center bg-gray-400 md:px-4 py-2 m-2 flex-1"
      >
        <div class="box box-aqua">
          <h3 class="box-title">Open Todos</h3>
        </div>
        <draggable
          class="w-full list-group min-height-20"
          :list="todosList"
          v-bind="dragOptions"
          tag="ul"
          @add="onAdd($event, true)"
        >
          <transition-group type="transition" :name="'flip-list'">
            <!-- v-for="(todo, index) in incompletedTodos"
                v-bind:key="index" -->

            <user-card
              v-for="todo in incompletedTodos"
              :key="todo.id"
              :todo="todo"
              :data-id="todo.id"
              @on-edit="onEdit"
              @on-delete="onDelete"
            ></user-card>
          </transition-group>
        </draggable>
      </div>
      <div
        class="text-gray-700 text-center bg-gray-400 md:px-4 py-2 m-2 flex-1"
      >
        <div class="box box-green">
          <h3 class="box-title">Completed Todos</h3>
        </div>
        <draggable
          class="w-full list-group min-height-20"
          :list="todosList"
          v-bind="dragOptions"
          tag="ul"
          @add="onAdd($event, false)"
        >
          <transition-group name="no" class="list-group" tag="ul">
            <user-card
              v-for="todo in completedTodos"
              :key="todo.id"
              :todo="todo"
              :data-id="todo.id"
              @on-edit="onEdit"
              @on-delete="onDelete"
            ></user-card>
          </transition-group>
        </draggable>
      </div>
    </div>
    <CreateTODOModal></CreateTODOModal>
    <EditTodoModal></EditTodoModal>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import UserCard from "../../template/UserCard";
import { mapState, mapActions, mapGetters } from "vuex";
import CreateTODOModal from "../../template/modal/CreateTODOModal";
import EditTodoModal from "../../template/modal/EditTodoModal";


export default {
  name: "App",
  components: {
    draggable,
    UserCard,
    CreateTODOModal,
    EditTodoModal
  },
  props: {
    todosList: []
  },
  data() {
    return {
      //todosList:[]
    };
  },
  mounted: function() {
    this.fetch_my_todos();
  },

  computed: {
    ...mapGetters("todo", ["completedTodos", "incompletedTodos"]),
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  methods: {
    ...mapActions("todo", [
      "action_delete_todo",
      "action_toggle_completed_todo",
      "action_feth_my_todos"
    ]),
    ...mapState("todo", ["todos"]),
    onAdd(event, isCompleted) {
      let id = event.item.getAttribute("data-id");
      let todo = event.item.getAttribute("todo");
      // axios.patch('/admin/testimonialsVisibility/' + id, {
      //     visible: visible
      // }).then((response) => {
      //     // success message
      // })
      console.log("todo is: " + JSON.stringify(todo, null, 2));
      console.log("id is: " + id);
      console.log("Completed is: " + isCompleted);
    },
    openNewTodoModal() {
      //  this.$modal.show('createNewTodoModal',{ id: 1 });
      this.$modal.show("createNewTodoModal");
    },
    onEdit(todo) {
      const id = todo.id;
      console.log('Curently edit todo, Id is : ' + id);
      this.$modal.show("editTodoModal", { id: id });
    },
    onDelete(todo) {
      alert(`Deleting ${todo.id}`);
    },
    fetch_my_todos: function() {
      this.action_feth_my_todos();
    }
  }
};
</script>

<style>
/* Unfortunately @apply cannot be setup in codesandbox, 
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.moving-card {
  background: #f7fafc;
}

.box.box-aqua {
  border: 3px solid #00c0ef;
}
.box.box-green {
  border: 3px solid #00a65a !important;
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
.box-title {
  font-size: 18px;
}
</style>
