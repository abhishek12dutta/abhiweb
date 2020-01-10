<template>
  <div id="app" class="border-2 bg-gray-200 md:flex flex-wrap justify-between">
    
    <div class="list-group col-md-3">
      <pre>{{listString}}</pre>
    </div>
    <div class="list-group col-md-3">
      <pre>{{list2String}}</pre>
    </div>

    <div class="text-gray-700 text-center bg-gray-400 md:px-4 py-2 m-2 flex-1">
      <h2>Incompleted</h2>
      <draggable
        :list="users"
        :animation="200"    
        filter=".action-button"
        class="w-full max-w-md"
        tag="ul"
        v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="onEnd"
      >
          <transition-group type="transition" :name="'flip-list'">
          <user-card
            v-for="user in users"
            :key="user.order"
            :user="user"
            @on-edit="onEdit"
            @on-delete="onDelete"
          ></user-card>
        </transition-group>
      </draggable>
    </div>
    <div class="text-gray-700 text-center bg-gray-400 md:px-4 py-2 m-2 flex-1">
      <h2>completed</h2>
      <draggable
        :list="completedUsers"
        :animation="200"
        filter=".action-button"
        class="w-full max-w-md"
        tag="ul"
        v-bind="dragOptions" :move="onMove" @end="onEnd"
      >
       <transition-group name="no" class="list-group" tag="ul">
          <user-card
            v-for="user in completedUsers"
            :key="user.order"
            :user="user"
            @on-edit="onEdit"
            @on-delete="onDelete"
          ></user-card>
        </transition-group>
      </draggable>
    </div>

    <!-- <draggable
      :list="users"
      :animation="200"
      ghost-class="moving-card"
      group="users"
      filter=".action-button"
      class="w-full max-w-md"
      tag="ul"
    >
      <user-card
        v-for="user in users"
        :key="user.id"
        :user="user"
        @on-edit="onEdit"
        @on-delete="onDelete"
      ></user-card>
    </draggable> -->
  </div>
</template>

<script>
import draggable from "vuedraggable";
import UserCard from "../../template/UserCard";
export default {
  name: "App",
  components: {
    draggable,
    UserCard
  },
  data() {
    return {
      users: [
        {
          id: 1,
          order: 1,
          name: "Adrian Schubert",
          avatar:
            "https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png"
        },
        {
          id: 2,
          order: 2,
          name: "Violet Gates",
          avatar: "https://pickaface.net/gallery/avatar/freud51c8b3f65e7dc.png"
        },
        {
          id: 3,
          order: 3,
          name: "Steve Jobs",
          avatar: "https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png"
        },
        {
          id: 4,
          order: 4,
          name: "Yassine Smith",
          avatar:
            "https://pickaface.net/gallery/avatar/unr_yassine_191124_2012_3gngr.png"
        },
        {
          id: 5,
          order: 5,
          name: "Senior Saez",
          avatar:
            "https://pickaface.net/gallery/avatar/elmedinilla541c03412955c.png"
        }
      ],
      completedUsers: [
        {
          id: 6,
          order: 6,
          name: "XYZ",
          avatar:
            "https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png"
        },
        {
          id: 7,
          order: 7,
          name: "jsahjaa ajaa",
          avatar: "https://pickaface.net/gallery/avatar/freud51c8b3f65e7dc.png"
        },
        {
          id: 8,
          order: 8,
          name: "Abhishek",
          avatar: "https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png"
        }
      ],
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    listString() {
      return JSON.stringify(this.users, null, 2);
    },
    list2String() {
      return JSON.stringify(this.completedUsers, null, 2);
    }
  },
  methods: {
    onEdit(user) {
      alert(`Editing ${user.name}`);
    },
    onDelete(user) {
      alert(`Deleting ${user.name}`);
    },
    onMove({ relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );


      //console.log('relatedElement:' + JSON.stringify(relatedElement, null, 2));
      //console.log('draggedElement:' + JSON.stringify(draggedElement, null, 2));
    },
    onEnd: function(evt){ 
      // const relatedElement = relatedContext.element;
      // const draggedElement = draggedContext.element;

      // console.log('relatedElement' + relatedElement)
      // console.log('draggedElement' + draggedElement)
      console.log('onEnd');
      console.log('OldIndex' + evt.oldIndex)
      console.log('newIndex' + evt.newIndex)
      //console.log('from' + evt)
      //console.log('to' + evt)

    //  console.log(this.users[evt.oldIndex].id)
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
</style>
