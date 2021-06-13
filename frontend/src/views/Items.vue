<template>
  <div class="flex flex-col w-full min-h-screen">
    <div class="flex flex-col items-center justify-center border-b xl:border-transparent">
      <h1 class="mx-5 xl:mt-24 p-5 block font-bold tracking-wide font-heading text-center text-6xl text-gray xl:absolute">Check your packages</h1>
    </div>
    <TopNavigation />

    <section class="flex flex-col items-center justify-center w-full h-full p-4">
      
      <button class="px-8 py-3 mx-4 my-5 text-sm font-medium text-white rounded bg-primary focus:outline-none" @click="$router.push('/items/create')">Store a New Item</button>

      <div class="w-full max-w-lg border-b ">
        <p class="text-xs p-4 text-gray-light">Your Stored Items</p>

        <div class="flex flex-row items-center justify-between p-1 my-2 bg-white rounded shadow-sm cursor-pointer lg:p-2" v-for="(item, index) in items" :key="index">
          <div>
            <h1 class="m-3 text-base font-medium text-gray ">{{ item.name }}</h1>
            <p class="m-3 text-sm text-gray-light">Can be retrieved at: {{ item.locker.name }}</p>
            <p class="m-3 text-sm text-gray-light">{{ item.locker.location[1] }}, {{ item.locker.location[0] }}</p>
          </div>

          <button
            class="px-5 py-3 mx-4 text-sm font-medium border rounded text-primary border-primary hover:bg-primary hover:text-white focus:outline-none"
            @click="$router.push('/items/' + item._id)"
            >More</button
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import TopNavigation from '@/components/TopNavigation.vue';

  export default {
    name: 'Items',
    components: {
      TopNavigation,
    },
    data() {
      return {
        items: [],
      };
    },
    methods: {
      getItems() {
        this.axios
          .get('/api/items')
          .then((payload) => {
            this.items = payload.data;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    mounted() {
      this.getItems();
    },
  };
</script>
