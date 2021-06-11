<template>

  <div class="flex-col w-full h-auto justify-center">
    <TopNavigation />
    <div class="flex flex-col items-center justify-center flex-grow w-full h-full">
      <h1 class="mx-5 my-12 mb-16 font-normal tracking-wide font-heading p-16 text-center text-7xl">Parcel Locker</h1>
      <div class="container w-7/12 ">
        <p class="text-center font-sans">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, 
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <h2 class="font-heading my-16 text-4xl md:text-6xl text-center">Send Packages now!</h2>
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
