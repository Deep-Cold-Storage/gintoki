<template>
  <router-view class="w-screen min-h-screen bg-background" />
</template>

<script>
  export default {
    methods: {
      createInterceptors() {
        const that = this;
        this.axios.interceptors.response.use(
          function(response) {
            return response;
          },
          function(error) {
            if (error.response.status == 401) {
              localStorage.clear();
              that.$router.push('/auth');
            }
            return Promise.reject(error);
          }
        );
      },
    },
    mounted() {
      this.createInterceptors();
      if (localStorage.token) {
        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token;
      }
    },
  };
</script>
