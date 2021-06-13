<template>
  <header class="static flex flex-row items-center justify-between px-20 py-6 pb-8 border-b">
    <h1 class="py-2 font-medium cursor-pointer text-2xl" @click="$router.push('/').catch((err) => {})">📦</h1>

    <nav class="flex items-center justify-center">
      <router-link v-if="logged && $route.name != 'Items'" class="mx-5 text-sm font-medium text-white rounded lg:max-w-max bg-primary focus:outline-none px-8 py-3" to="/items">Your items</router-link>
      <router-link v-if="logged && $route.name == 'Items'" class="mx-5 text-sm font-medium text-white rounded lg:max-w-max bg-primary focus:outline-none px-8 py-3" to="/">Go back</router-link>
      <router-link v-if="!logged" class="mx-5 text-sm font-medium text-white rounded lg:max-w-max bg-primary focus:outline-none px-8 py-3" to="/auth">Get started</router-link>
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
