<template>
  <div class="flex flex-col items-center justify-center border-b lg:border-transparent">
    <h1 class="mx-5 lg:mt-24 p-5 block font-bold tracking-wide font-heading text-center text-2xl sm:text-4xl lg:text-white lg:absolute select-none">Get started</h1>
  </div>
<TopNavigation/>
  <div class="flex flex-col items-center justify-center w-full h-auto">
    <div class="my-10 p-4">
      <section class="w-full p-4 border border-primary shadow-sm lg:w-auto lg:p-20 lg:rounded">
        <h1 class="my-1 text-xl font-semibold font-heading text-center lg:text-left">Hello! 🖐 Please sign in! </h1>
        <p class="my-2 text-gray-light text-xl text-center lg:text-left"> {{ message }}</p>

        <div class="flex flex-col items-center justify-between w-full mt-8 lg:items-end lg:flex-row">
          <div class="w-full">
            <p class="my-2 text-lg md:text-md p-2">E-mail:</p>

            <input
              type="email"
              v-model="userEmail"
              v-on:keyup.enter="requestsMagicEmail()"
              placeholder="... @gmail.com"
              class="block w-full  px-3 py-3 text-sm border-b rounded-lg bg-gray bg-opacity-10 text-gray placeholder-gray-light focus:outline-none"
              autofocus
              autocomplete
            />
          </div>

          <button
            class="px-8 py-3 mx-5 my-5 text-lg md:text-sm font-medium text-white rounded-md lg:my-0 bg-primary disabled:bg-gray disabled focus:outline-none"
            @click="requestsMagicEmail()"
            :disabled="!userEmail.length"
            >Continue</button
          >
        </div>
      </section>
      </div>
    </div>
</template>

<script>
  import TopNavigation from '@/components/TopNavigation.vue';

  export default {
    name: 'Auth',
    components: {
      TopNavigation,
    },
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
