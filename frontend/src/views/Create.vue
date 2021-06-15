<template>
  <div class="flex-col w-full h-auto justify-center">
    <TopNavigation />
    
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
