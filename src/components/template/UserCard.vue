<template>
  <li
    class="p-1 mb-1 flex flex-wrap justify-between items-center bg-white shadow rounded-lg cursor-move border border-white"
  >
    <div class="flex1 w-3/5">
      <!-- <p class="ml-2 text-gray-700 font-semibold font-sans tracking-wide">{{user.name}}</p> -->
      <p class="ml-2 text-gray-700 font-semibold font-sans tracking-wide">
        Todo Description long text item
      </p>
    </div>
    <div class="flex1 w-2/5">
      <button
        aria-label="Edit user"
        class="action-button p-1 focus:outline-none focus:shadow-outline text-teal-500 hover:text-teal-600"
        @click="$emit('on-edit', todo)"
      >
        <EditIcon />
      </button>
      <button
        aria-label="Delete user"
        class="action-button p-1 focus:outline-none focus:shadow-outline text-red-500 hover:text-red-600"
        @click="$emit('on-delete', todo)"
      >
        <Trash2Icon />
      </button>
    </div>
    <div class="flex items-center">
      <div class="flex-1 text-center px-4 m-2">
        <div class="todo-tags">
          <i
            class="fa fa-tag"
            aria-hidden="true"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></i>
          <div class="dropdown-menu">
            <div class="dropdown-header">
              <i class="fa fa-tag" aria-hidden="true"></i> Tags
            </div>
            <span
              class="badge badge-pill badge-info"
              style="{ background: tag.red, color: '#fff' }"
            >
              ABC
            </span>
            <span
              class="badge badge-pill badge-info"
              style="{ background: tag.green, color: '#fff' }"
            >
              ABC
            </span>
            <span
              class="badge badge-pill badge-info"
              style="{ background: tag.red, color: '#fff' }"
            >
              ABC
            </span>
          </div>
        </div>
      </div>
      <div class="flex-1 text-center px-4 m-2">
        <div class="todo-priority">
          <div class="priority-dot"></div>
          <span>High</span>
        </div>
      </div>
      <div class="flex-1 text-center px-4 m-2">
        <div class="todo-priority">
          <div class="priority-dot"></div>
          <span>High</span>
        </div>
      </div>
    </div>
    <!-- <div class="flex justify-between">
      <div class="flex1">
        <div class="todo-tags">
          <i
            class="fa fa-tag"
            aria-hidden="true"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></i>
          <div class="dropdown-menu">
           <div class="dropdown-header">
            <i class="fa fa-tag" aria-hidden="true"></i> Tags
          </div>
          <span
            class="badge badge-pill badge-info"
            style="{ background: tag.red, color: '#fff' }">
            ABC
          </span>
           <span
            class="badge badge-pill badge-info"
            style="{ background: tag.green, color: '#fff' }">
            ABC
          </span>
           <span
            class="badge badge-pill badge-info"
            style="{ background: tag.red, color: '#fff' }">
            ABC
          </span>
          </div>
        </div>
      </div>
      <div
        class="flex1"
      >
        <div class="todo-priority">
          <div class="priority-dot"></div>
          <span>High</span>
        </div>
      </div>
      <div
        class="flex1">
        3
      </div>
    </div> -->
  </li>
</template>
<script>
import { EditIcon, Trash2Icon } from "vue-feather-icons";
export default {
  data() {
    return {
      isOpen: false
    };
  },
  components: {
    EditIcon,
    Trash2Icon
  },
  props: {
    todo: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
<style scoped>
.priority-dot {
  height: 10px;
  width: 10px;
  background: #333;
  border-radius: 50%;
  margin-right: 10px;
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
</style>
