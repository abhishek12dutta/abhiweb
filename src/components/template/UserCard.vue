<template>
<!-- :class="todo.completed ? 'bg-green-200' : 'bg-white'" -->
  <li
    class="p-1 mb-1 flex flex-wrap justify-between items-center shadow rounded-lg
     cursor-move border border-white"
     :class="todo.completionStatus=='C' ? 'bg-green-200' : 'bg-white'"
     
  >
    <div class="flex1 md:w-4/5 w-3/5">
      <!-- <p class="ml-2 text-gray-700 font-semibold font-sans tracking-wide">{{user.name}}</p> -->
      <p class="ml-2 text-gray-700 font-semibold font-sans tracking-wide text-justify">
        {{todo.title}}
      </p>
    </div>
    <div class="flex1 md:w-1/5 w-2/5" v-if="todo.completionStatus!='C'">
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
    <div class="flex items-center w-100">
      <div class="flex-1 w-1/3 text-center px-4 m-2">
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
              style="{ background: tag.red, color: '#fff' }"  v-for="(tag, key) in todo.tags"
                      :key="key"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex-2 w-1/3 text-center px-2">
         <span class="todo-date">
           {{moment(todo.date).format('DD-MMM-YYYY')}}
         </span>
      </div>
      <div class="flex-1 w-1/3 text-center px-2 m-2">
        <div class="todo-priority">
          <div class="priority-dot" :class="todo.priority"></div>
          <span>{{ todo.priority }}</span>
          
        </div>
      </div>
    </div>
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
  /* margin-right: 10px; */
  margin: auto;
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
.High {
  background: red;
}
.Medium {
  background: green;
}
.Low {
  background: greenyellow;
}
</style>
