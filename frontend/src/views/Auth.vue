<template>
  <div class="flex flex-col items-center justify-center w-full h-full">
    <section class="w-full p-4 bg-white shadow-lg lg:w-auto lg:p-8 lg:rounded-xl">
      <h1 class="my-1 text-xl font-medium text-gray font-heading">Hello! 🖐 Please sign in! </h1>
      <p class="my-2 text-gray-light"> {{ message }}</p>

      <div class="flex flex-col items-center justify-between w-full mt-8 lg:items-end lg:flex-row">
        <div class="w-full">
          <p class="my-2 text-sm text-gray-light">Email</p>

          <input
            type="email"
            v-model="userEmail"
            v-on:keyup.enter="requestsMagicEmail()"
            placeholder="... @gmail.com"
            class="block w-full px-3 py-3 text-sm border-transparent rounded bg-background text-gray placeholder-gray-light lg:w-80 focus:outline-none "
            autofocus
            autocomplete
          />
        </div>

        <button
          class="px-8 py-3 mx-5 my-5 text-sm font-medium text-white rounded lg:my-0 bg-primary disabled:bg-gray disabled:text-gray-light focus:outline-none"
          @click="requestsMagicEmail()"
          :disabled="!userEmail.length"
          >Continue</button
        >
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Auth',
    data() {
      return {
        message: 'You will receive a magic login link via Email.',
        showInput: true,
        userEmail: '',
        magicToken: null,
      };
    },
    methods: {
      requestsMagicEmail() {
        if (!this.userEmail) {
          return;
        }
        this.axios
          .post('/api/auth/magic', {
            email: this.userEmail,
          })
          .then(() => {
            this.message = 'Done! Check Your Inbox!';
            this.userEmail = '';
          });
      },
      login() {
        if (this.magicToken) {
          this.axios
            .post('/api/auth/magic/' + this.magicToken)
            .then((payload) => {
              localStorage.token = payload.data.authToken;
              this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + payload.data.authToken;
              this.$router.push('/items');
            })
            .catch(() => {
              this.message = 'Error! Try again!';
            });
        }
      },
    },
    mounted() {
      this.magicToken = this.$route.params.magicToken;
      this.login();
    },
    watch: {
      $route() {
        this.magicToken = this.$route.params.magicToken;
        this.login();
      },
    },
  };
</script>
