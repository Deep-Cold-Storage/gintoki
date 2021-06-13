<template>
  <div class="flex flex-col w-full min-h-screen">
    <TopNavigation />

    <section class="flex flex-col items-center justify-center w-full h-full p-4">
      <div v-if="!editMode" class="w-full max-w-lg ">
        <p class="text-xs text-gray-light">Available Lockers</p>

        <div class="flex flex-row items-center justify-between p-1 my-2 bg-white rounded shadow-sm cursor-pointer lg:p-2" v-for="(locker, index) in lockers" :key="index">
          <div>
            <h1 class="m-3 text-base font-medium text-gray ">{{ locker.name }}</h1>
            <p class="m-3 text-sm text-gray-light">{{ locker.available ? 'Available' : 'Not Available' }}</p>
          </div>

          <button
            v-if="locker.available"
            class="px-5 py-3 mx-4 text-sm font-medium border rounded text-primary border-primary hover:bg-primary hover:text-white focus:outline-none"
            @click="
              item.lockerId = locker._id;
              message = 'Selected: ' + locker.name;
            "
            >Select</button
          >
        </div>

        <div class="w-full p-4 bg-white shadow-sm lg:w-auto lg:p-8 lg:rounded">
          <p v-if="!editMode" class="mb-6 text-gray-light"> {{ message }} </p>

          <p class="my-2 text-xs text-gray-light">Item Name</p>

          <input
            v-model="item.name"
            placeholder="... eg. Backpack"
            class="block w-full px-3 py-3 text-sm border-transparent rounded bg-background text-gray placeholder-gray-light focus:outline-none "
          />
        </div>
      </div>

      <div v-if="editMode" class="w-full max-w-lg ">
        <div class="w-full p-4 bg-white shadow-sm lg:w-auto lg:p-8 lg:rounded">
          <p class="my-2 text-xs text-gray-light">Item Name</p>
          <p class="mb-6 text-lg text-gray"> {{ item.name }} </p>

          <p class="my-2 text-xs text-gray-light">Locker Name</p>
          <p class="mb-6 text-lg text-gray"> {{ item.locker.name }} </p>
        </div>
      </div>

      <button v-if="!editMode" class="px-8 py-3 mx-4 my-5 text-sm font-medium text-white rounded bg-primary focus:outline-none" @click="createItem()">Store a New Item</button>
      <button v-if="editMode" class="px-8 py-3 mx-4 my-5 text-sm font-medium text-white rounded bg-primary focus:outline-none" @click="retrieveItem()">Retrieve Item</button>
    </section>
  </div>
</template>

<script>
  import TopNavigation from '@/components/TopNavigation.vue';

  export default {
    name: 'CreateItem',
    components: {
      TopNavigation,
    },
    props: {
      editMode: Boolean,
    },
    data() {
      return {
        lockers: [],
        item: { locker: {} },
        message: 'Select the nearest locker box.',
      };
    },
    methods: {
      getLockers() {
        this.axios
          .get('/api/lockers')
          .then((payload) => {
            this.lockers = payload.data;
          })
          .catch((err) => {
            console.log(err);
          });
      },

      getItem(itemId) {
        this.axios
          .get('/api/items/' + itemId)
          .then((payload) => {
            this.item = payload.data;
          })
          .catch((err) => {
            console.log(err);
          });
      },

      createItem() {
        this.axios
          .post('/api/items', this.item)
          .then(() => {
            this.$router.push('/items');
          })
          .catch((err) => {
            console.log(err);
          });
      },

      retrieveItem() {
        this.axios
          .delete('/api/items/' + this.item._id)
          .then(() => {
            this.$router.push('/items');
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    mounted() {
      this.getLockers();

      if (this.editMode) {
        this.getItem(this.$route.params.itemID);
      }
    },
  };
</script>
