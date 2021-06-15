<template>

  <div class="flex-col w-full min-h-screen justify-center bg-white">
    <div class="flex flex-col items-center justify-center border-b border-light_gray lg:border-transparent ">
      <h1 class="mx-5 lg:mt-24 font-bold lg:tracking-wide font-heading text-center text-2xl sm:text-4xl lg:text-white lg:absolute select-none">Parcel <span class="text-primary">Locker</span></h1>
    </div>
    <TopNavigation />

    <div class="flex flex-col grid-cols-1 items-center justify-center md:flex-grow w-full h-full lg:my-32 content-center ">
      <div class="container flex flex-col items-center lg:flex-row lg:p-16 3xl:p-32 ">
        <div class="w-full lg:w-5/6 lg:max-w-3xl lg:flex lg:flex-col sm:shadow-md pb-2 sm:p-2 py-2 border-b-2 border-primary-dark rounded-md">
          <img
            class=" object-cover sm:object-cover object-center rounded-md"
            alt="hero"
            src="https://images.unsplash.com/photo-1617021581862-c327b6599571?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
          />
        </div>
        <div class="lg:flex lg:flex-col m-5 flex-grow top-24 w-full sm:bg-none xl:border-l border-light_gray px-6 xl:py-16">
          <h1 class="mb-6 text-2xl text-center lg:text-left font-bold tracking-tight font-heading xl:text-6xl text-gray select-none">The <span class="text-primary">quickest way</span> to store your items.</h1>
          <p class="mb-6 text-gray-light text-center lg:text-left select-none"> Internet of things package locker for no contact item exchange.</p>

          <div class="flex flex-col sm:p-0 max-w-xs sm:max-w-full mx-auto sm:mx-0">
            <button v-if="!logged" class="px-8 py-3 my-6 text-sm font-medium text-white rounded lg:max-w-max bg-primary focus:outline-none" @click="$router.push('/auth')"
              >Get Started</button
            >
            <button v-if="logged" class="px-8 py-3 my-6 text-sm font-medium text-white rounded lg:max-w-max bg-primary focus:outline-none" @click="$router.push('/items')"
              >Your Items</button
            >
          </div>
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
