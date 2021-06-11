<template>
  <header class="static flex flex-row items-center justify-between px-20 py-6 pb-8 border-b">
    <h1 class="py-2 font-medium cursor-pointer text-2xl" @click="$router.push('/').catch((err) => {})">Parcel Locker</h1>

    <nav class="flex items-center justify-center">
      <router-link v-if="logged" class="mx-5 text-sm font-medium text-gray hover:text-primary border-2 border-solid rounded-full px-5 py-2" to="/projects">Packages</router-link>
      <router-link v-if="!logged" class="mx-5 text-sm font-medium text-gray hover:text-primary border-2 border-solid rounded-full px-5 py-2" to="/auth">Sign In</router-link>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'TopNavigation',
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
