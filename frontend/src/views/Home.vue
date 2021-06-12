<template>

  <div class="flex-col w-full min-h-screen justify-center">
    <TopNavigation />
    <div class="flex flex-col items-center justify-center flex-grow w-full h-full">
      <h1 class="mx-5 my-12 mb-16 font-normal tracking-wide font-heading p-16 text-center text-7xl">The quickest way to store your items</h1>
      <div class="container w-7/12 ">
        <p class="text-center font-sans">
          Internet of things package locker for no contact item exchange
        </p>
      </div>
                <div class="flex flex-col lg:flex-row">
            <button v-if="!logged" class="px-8 py-3 my-6 text-sm font-medium text-white rounded lg:max-w-max bg-primary focus:outline-none" @click="$router.push('/auth')"
              >Get Started</button
            >
            <button v-if="logged" class="px-8 py-3 my-6 text-sm font-medium text-white rounded lg:max-w-max bg-primary focus:outline-none" @click="$router.push('/items')"
              >Your Items</button
            >
          </div>
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
    data() {
      return {
        logged: false,
      };
    },
    mounted() {
      if (localStorage.token) {
        this.logged = true;
      }
    },
  };
</script>
