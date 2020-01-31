<template>
  <div class="main-wrapper" id="todolist">
    <div class="box-footer clearfix no-border">
      <button
        type="button"
        class="btn btn-success pull-right"
        @click="openNewTodoModal"
      >
        <i class="fa fa-plus"></i> Add item
      </button>
    </div>
    <div class="row">
      <div class="col-4">
        <span class="badge badge-primary"
          >Total :
          {{
            incompletedTodos.length +
              completedTodos.length +
              inprogessTodos.length || 0
          }}</span
        >
      </div>
      <div class="col-4">
        <span class="badge badge-warning"
          >Pending :
          {{ incompletedTodos.length + inprogessTodos.length || 0 }}</span
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
          @add="onAdd($event, 'O')"
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
              @on-archive="onArchive"
            >
            </user-card>
          </transition-group>
        </draggable>
      </div>
      <div
        class="text-gray-700 text-center bg-yellow-200 md:px-4 py-2 m-2 flex-1"
      >
        <div class="box box-yellow">
          <h3 class="box-title">InProgress Todos</h3>
        </div>
        <draggable
          class="w-full list-group min-height-20"
          :list="todosList"
          v-bind="dragOptions"
          tag="ul"
          @add="onAdd($event, 'I')"
        >
          <transition-group name="no" class="list-group" tag="ul">
            <user-card
              v-for="todo in inprogessTodos"
              :key="todo.id"
              :todo="todo"
              :data-id="todo.id"
              @on-edit="onEdit"
              @on-delete="onDelete"
              @on-archive="onArchive"
            ></user-card>
          </transition-group>
        </draggable>
      </div>
      <div
        class="text-gray-700 text-center bg-green-300 md:px-4 py-2 m-2 flex-1"
      >
        <div class="box box-green">
          <h3 class="box-title">Completed Todos</h3>
        </div>
        <draggable
          class="w-full list-group min-height-20"
          :list="todosList"
          v-bind="dragOptions"
          tag="ul"
          @add="onAdd($event, 'C')"
        >
          <transition-group name="no" class="list-group" tag="ul">
            <user-card
              v-for="todo in completedTodos"
              :key="todo.id"
              :todo="todo"
              :data-id="todo.id"
              @on-edit="onEdit"
              @on-delete="onDelete"
              @on-archive="onArchive"
            >
            </user-card>
          </transition-group>
        </draggable>
      </div>
      <div class="middleBox" v-if="inProgress">
        <img
          class="middleImg"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHdpZHRoPSI0MHB4IiBoZWlnaHQ9IjQwcHgiIHZpZXdCb3g9IjAgMCA0MCA0MCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEuNDE0MjE7IiB4PSIwcHgiIHk9IjBweCI+CiAgICA8ZGVmcz4KICAgICAgICA8c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwogICAgICAgICAgICBALXdlYmtpdC1rZXlmcmFtZXMgc3BpbiB7CiAgICAgICAgICAgICAgZnJvbSB7CiAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpCiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTM1OWRlZykKICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgQGtleWZyYW1lcyBzcGluIHsKICAgICAgICAgICAgICBmcm9tIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpCiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0zNTlkZWcpCiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHN2ZyB7CiAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDUwJSA1MCU7CiAgICAgICAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogc3BpbiAxLjVzIGxpbmVhciBpbmZpbml0ZTsKICAgICAgICAgICAgICAgIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuOwogICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBzcGluIDEuNXMgbGluZWFyIGluZmluaXRlOwogICAgICAgICAgICB9CiAgICAgICAgXV0+PC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJvdXRlciI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMCwwQzIyLjIwNTgsMCAyMy45OTM5LDEuNzg4MTMgMjMuOTkzOSwzLjk5MzlDMjMuOTkzOSw2LjE5OTY4IDIyLjIwNTgsNy45ODc4MSAyMCw3Ljk4NzgxQzE3Ljc5NDIsNy45ODc4MSAxNi4wMDYxLDYuMTk5NjggMTYuMDA2MSwzLjk5MzlDMTYuMDA2MSwxLjc4ODEzIDE3Ljc5NDIsMCAyMCwwWiIgc3R5bGU9ImZpbGw6YmxhY2s7Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNNS44NTc4Niw1Ljg1Nzg2QzcuNDE3NTgsNC4yOTgxNSA5Ljk0NjM4LDQuMjk4MTUgMTEuNTA2MSw1Ljg1Nzg2QzEzLjA2NTgsNy40MTc1OCAxMy4wNjU4LDkuOTQ2MzggMTEuNTA2MSwxMS41MDYxQzkuOTQ2MzgsMTMuMDY1OCA3LjQxNzU4LDEzLjA2NTggNS44NTc4NiwxMS41MDYxQzQuMjk4MTUsOS45NDYzOCA0LjI5ODE1LDcuNDE3NTggNS44NTc4Niw1Ljg1Nzg2WiIgc3R5bGU9ImZpbGw6cmdiKDIxMCwyMTAsMjEwKTsiLz4KICAgICAgICA8L2c+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMCwzMi4wMTIyQzIyLjIwNTgsMzIuMDEyMiAyMy45OTM5LDMzLjgwMDMgMjMuOTkzOSwzNi4wMDYxQzIzLjk5MzksMzguMjExOSAyMi4yMDU4LDQwIDIwLDQwQzE3Ljc5NDIsNDAgMTYuMDA2MSwzOC4yMTE5IDE2LjAwNjEsMzYuMDA2MUMxNi4wMDYxLDMzLjgwMDMgMTcuNzk0MiwzMi4wMTIyIDIwLDMyLjAxMjJaIiBzdHlsZT0iZmlsbDpyZ2IoMTMwLDEzMCwxMzApOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTI4LjQ5MzksMjguNDkzOUMzMC4wNTM2LDI2LjkzNDIgMzIuNTgyNCwyNi45MzQyIDM0LjE0MjEsMjguNDkzOUMzNS43MDE5LDMwLjA1MzYgMzUuNzAxOSwzMi41ODI0IDM0LjE0MjEsMzQuMTQyMUMzMi41ODI0LDM1LjcwMTkgMzAuMDUzNiwzNS43MDE5IDI4LjQ5MzksMzQuMTQyMUMyNi45MzQyLDMyLjU4MjQgMjYuOTM0MiwzMC4wNTM2IDI4LjQ5MzksMjguNDkzOVoiIHN0eWxlPSJmaWxsOnJnYigxMDEsMTAxLDEwMSk7Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNMy45OTM5LDE2LjAwNjFDNi4xOTk2OCwxNi4wMDYxIDcuOTg3ODEsMTcuNzk0MiA3Ljk4NzgxLDIwQzcuOTg3ODEsMjIuMjA1OCA2LjE5OTY4LDIzLjk5MzkgMy45OTM5LDIzLjk5MzlDMS43ODgxMywyMy45OTM5IDAsMjIuMjA1OCAwLDIwQzAsMTcuNzk0MiAxLjc4ODEzLDE2LjAwNjEgMy45OTM5LDE2LjAwNjFaIiBzdHlsZT0iZmlsbDpyZ2IoMTg3LDE4NywxODcpOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTUuODU3ODYsMjguNDkzOUM3LjQxNzU4LDI2LjkzNDIgOS45NDYzOCwyNi45MzQyIDExLjUwNjEsMjguNDkzOUMxMy4wNjU4LDMwLjA1MzYgMTMuMDY1OCwzMi41ODI0IDExLjUwNjEsMzQuMTQyMUM5Ljk0NjM4LDM1LjcwMTkgNy40MTc1OCwzNS43MDE5IDUuODU3ODYsMzQuMTQyMUM0LjI5ODE1LDMyLjU4MjQgNC4yOTgxNSwzMC4wNTM2IDUuODU3ODYsMjguNDkzOVoiIHN0eWxlPSJmaWxsOnJnYigxNjQsMTY0LDE2NCk7Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNMzYuMDA2MSwxNi4wMDYxQzM4LjIxMTksMTYuMDA2MSA0MCwxNy43OTQyIDQwLDIwQzQwLDIyLjIwNTggMzguMjExOSwyMy45OTM5IDM2LjAwNjEsMjMuOTkzOUMzMy44MDAzLDIzLjk5MzkgMzIuMDEyMiwyMi4yMDU4IDMyLjAxMjIsMjBDMzIuMDEyMiwxNy43OTQyIDMzLjgwMDMsMTYuMDA2MSAzNi4wMDYxLDE2LjAwNjFaIiBzdHlsZT0iZmlsbDpyZ2IoNzQsNzQsNzQpOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTI4LjQ5MzksNS44NTc4NkMzMC4wNTM2LDQuMjk4MTUgMzIuNTgyNCw0LjI5ODE1IDM0LjE0MjEsNS44NTc4NkMzNS43MDE5LDcuNDE3NTggMzUuNzAxOSw5Ljk0NjM4IDM0LjE0MjEsMTEuNTA2MUMzMi41ODI0LDEzLjA2NTggMzAuMDUzNiwxMy4wNjU4IDI4LjQ5MzksMTEuNTA2MUMyNi45MzQyLDkuOTQ2MzggMjYuOTM0Miw3LjQxNzU4IDI4LjQ5MzksNS44NTc4NloiIHN0eWxlPSJmaWxsOnJnYig1MCw1MCw1MCk7Ii8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K"
        />
      </div>
    </div>

    <CreateTODOModal></CreateTODOModal>
    <EditTodoModal></EditTodoModal>
    <ConfirmModal></ConfirmModal>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import UserCard from "../../template/UserCard";
import { mapState, mapActions, mapGetters } from "vuex";
import CreateTODOModal from "../../template/modal/CreateTODOModal";
import EditTodoModal from "../../template/modal/EditTodoModal";
import ConfirmModal from "../../template/modal/ConfirmModal";
import * as api from "../../../services/api";

export default {
  name: "App",
  components: {
    draggable,
    UserCard,
    CreateTODOModal,
    EditTodoModal,
    ConfirmModal
  },
  props: {
    todosList: []
  },
  data() {
    return {
      inProgress: false
      //todosList:[]
    };
  },
  mounted: function() {
    this.fetch_my_todos();
  },

  computed: {
    ...mapGetters("todo", [
      "completedTodos",
      "incompletedTodos",
      "inprogessTodos"
    ]),
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
    onAdd(event, completionstatus) {
      let id = event.item.getAttribute("data-id");
      let payload = {
        id: id,
        completionstatus: completionstatus
      };
      this.action_toggle_completed_todo(payload);
    },
    openNewTodoModal() {
      this.$modal.show("createNewTodoModal");
    },
    onEdit(todo) {
      this.inProgress = true;
      const id = todo.id;
      api.fetchTodoById(id).then(todo => {
        this.inProgress = false;
        this.$modal.show("editTodoModal", { todo: todo });
      });
      console.log(this.inProgress);
      //this.$modal.show("editTodoModal", { id: id });
    },
    onDelete(todo) {
      this.$modal.show("confirmModal", { 'id': todo.id , 'action':'DELETE' });
    },
    fetch_my_todos: function() {
      this.action_feth_my_todos();
    },
    onArchive(todo){
      this.$modal.show("confirmModal", { 'id': todo.id, 'action':'PURGE'});
    }
  }
};
</script>

<style>

.moving-card {
  background: #f7fafc;
}

.box.box-aqua {
  border: 3px solid #00c0ef;
}
.box.box-green {
  border: 3px solid #00a65a !important;
}
.box.box-yellow {
  border: 3px solid #d7f81c !important;
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

.middleBox {
  position: fixed; /* or absolute */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
