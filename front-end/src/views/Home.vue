<template>
<div class="home">
  <h1 class="page-title">My Pokédex</h1>
  <div class="content">
    <Summary v-if="user" />
    <Login v-else />
  </div>
</div>
</template>

<script>
import Login from "@/components/Login.vue";
import Summary from "@/components/Summary.vue";

export default {
  name: "home",
  components: {
    Login,
    Summary
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
};
</script>

<style scoped>
.page-title {
  margin-top: 0;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  background-color: lightsteelblue;
  font-size: 3.5em;
}

.content {
  max-width: 900px;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 75px;
}
</style>
