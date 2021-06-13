<template>
  <div class="flex flex-col w-full min-h-screen">
    <TopNavigation />

    <div class="flex flex-col items-center justify-center flex-grow w-full h-full">
      <div class="container flex flex-col items-center p-1 lg:flex-row lg:p-16 3xl:p-32">
        <div class="flex flex-col m-5 lg:flex-grow">
          <h1 class="mb-6 text-2xl font-bold tracking-tight font-heading lg:text-6xl text-gray">The quickest way to store your items.</h1>
          <p class="mb-6 text-gray-light "> Internet of things package locker for no contact item exchange.</p>

          <div class="flex flex-col lg:flex-row">
            <button v-if="!logged" class="px-8 py-3 my-6 text-sm font-medium text-white rounded lg:max-w-max bg-primary focus:outline-none" @click="$router.push('/auth')"
              >Get Started</button
            >
            <button v-if="logged" class="px-8 py-3 my-6 text-sm font-medium text-white rounded lg:max-w-max bg-primary focus:outline-none" @click="$router.push('/items')"
              >Your Items</button
            >
          </div>
        </div>

        <div class="w-full lg:w-5/6 lg:max-w-2xl">
          <img
            class="object-cover object-center rounded-xl "
            alt="hero"
            src="https://images.unsplash.com/photo-1617021581862-c327b6599571?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
          />
        </div>
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
