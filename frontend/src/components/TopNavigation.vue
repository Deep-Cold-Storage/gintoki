<template>
  <header class="static flex flex-row items-center justify-between p-3 md:px-20 md:py-3">
    <h1 class="py-2 font-medium cursor-pointer md:text-2xl" @click="$router.push('/').catch((err) => {})">📦</h1>

    <nav class="flex items-center justify-center">
      <router-link v-if="logged" class="mx-5 text-sm font-medium text-gray hover:text-primary" to="/items">Your Items</router-link>
      <router-link v-if="!logged" class="mx-5 text-sm font-medium text-gray hover:text-primary" to="/auth">Get Started</router-link>
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
