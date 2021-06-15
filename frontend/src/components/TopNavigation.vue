<template>
  <header class="static flex flex-row items-center justify-between px-16 py-2 md:py-3 border-b border-primary shadow-md bg-moderngrey bg-gradient-to-t from-gray">
    <h1 class="py-5 font-medium cursor-pointer text-2xl" @click="$router.push('/').catch((err) => {})">📦</h1>

    <nav class="flex items-center justify-center">
      <router-link v-if="logged && $route.name != 'Items'" class="lg:mx-auto text-sm font-medium text-white text-center rounded lg:max-w-max bg-primary focus:outline-none px-8 py-3" to="/items">Your items</router-link>
      <router-link v-if="(logged && $route.name == 'Items') || !logged && $route.name == 'Auth'" class="lg:mx-auto text-sm font-medium text-white text-center rounded lg:max-w-max bg-primary focus:outline-none px-8 py-3" to="/">Go back</router-link>
      <router-link v-if="!logged && $route.name == 'Home'" class="lg:mx-5 text-sm font-medium text-white text-center rounded lg:max-w-max bg-primary focus:outline-none px-8 py-3" to="/auth">Get started</router-link>
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
