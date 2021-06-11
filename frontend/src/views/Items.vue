<template>
  <div class="flex-col w-full h-auto justify-center">
    <TopNavigation />
    <div class="flex flex-col items-center justify-center flex-grow w-full h-full">
      <h1 class="mx-5 mt-16 lg:-mt-24 font-normal tracking-wide font-heading text-center text-4xl absolute">Check your packages</h1>
    </div>
  </div>
</template>

<script>
  import TopNavigation from '@/components/TopNavigation.vue';

  export default {
    name: 'Home',
    components: {
      TopNavigation,
    },
  };
</script>
