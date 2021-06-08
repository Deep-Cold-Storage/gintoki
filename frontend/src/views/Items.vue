<template>
  <div class="flex flex-col items-center justify-center w-full h-full">
    <h1 class="mx-5 my-5 text-xl font-bold text-primary">Your Items</h1>

    <div class="p-1 my-2 bg-white rounded shadow-sm cursor-pointer lg:p-5 " v-for="(item, index) in items" :key="index">
      <p class="m-3 text-base font-medium font-heading ">{{ item.name }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Items',
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
