<template>
  <div class="flex flex-col w-full min-h-screen">
    <div class="flex flex-col items-center justify-center border-b border-light_gray lg:border-transparent">
      <h1 class="mx-5 lg:mt-24 block font-bold lg:tracking-wide font-heading text-center text-2xl lg:text-4xl text-gray lg:text-white lg:absolute select-none">Store a new item</h1>
    </div>
    <TopNavigation />
    

    <section class="flex flex-col items-center justify-center w-full h-full p-4">
      <div v-if="!editMode" class="w-full max-w-lg ">
        <p class="text-xs font-semibold pb-3 lg:text-lg text-gray-light">Available Lockers</p>

        <div class="flex flex-row items-center justify-between p-1 my-2 bg-white rounded shadow-sm cursor-pointer lg:p-2" v-for="(locker, index) in lockers" :key="index">
          <div>
            <h1 class="m-3 text-base font-medium text-gray ">{{ locker.name }}</h1>
            <p class="m-3 text-sm text-gray-light">{{ locker.available ? 'Available' : 'Not Available' }}</p>
            <p class="m-3 text-sm text-gray-light">{{ locker.location[1] }}, {{ locker.location[0] }}</p>
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

        <div class="w-full p-4 border border-primary shadow-sm lg:w-auto lg:p-8 lg:rounded">
          <p v-if="!editMode" class="mb-6 text-gray-light text-xl"> {{ message }} </p>

          <p class="my-2 text-xs text-gray-light">Item <span class="text-primary">Name</span></p>

          <input
            v-model="item.name"
            placeholder="... eg. Backpack"
            class="block w-full  px-3 py-3 text-sm border-b rounded-lg bg-gray bg-opacity-10 text-gray placeholder-gray-light focus:outline-none"
          />
        </div>
      </div>

      <div v-if="editMode" class="w-full max-w-lg py-2">
        <div class="w-full p-4 border border-primary shadow-sm lg:w-auto lg:p-8 lg:rounded">
          <p class="my-2 text-xs text-gray-light">Item Name</p>
          <p class="mb-6 text-lg text-gray"> {{ item.name }} </p>

          <p class="my-2 text-xs text-gray-light">Locker Name</p>
          <p class="mb-2 text-lg text-gray"> Can be retrieved at: {{ item.locker.name }} </p>

          <p class="text-sm text-gray-light">{{ item.locker.location[1] }}, {{ item.locker.location[0] }}</p>

          <div class="flex flex-col items-center justify-between w-full mt-8 lg:items-end lg:flex-row">
            <div class="w-full">
              <p class="my-2 text-sm text-gray-light">Share Item by Email</p>

              <input
                v-model="email"
                type="email"
                placeholder="... @gmail.com"
                class="block w-full px-3 py-3 text-sm border-b rounded-lg bg-gray bg-opacity-10 text-gray placeholder-gray-light lg:w-80 focus:outline-none "
              />
            </div>

            <button class="px-8 py-3 mx-5 my-5 text-sm font-medium text-white rounded lg:my-0 bg-primary focus:outline-none" @click="shareItem()">Share</button>
          </div>
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
        item: { locker: { location: [] } },
        message: 'Select the nearest locker box.',
        email: '',
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

      shareItem() {
        this.axios
          .post('/api/items/' + this.item._id + '/owners', { email: this.email })
          .then(() => {
            this.email = '';
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
