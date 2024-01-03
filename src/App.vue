<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Login from "@/components/Login"
import Home from "@/components/Home";
export default {
  name: 'App',
  components: {
    Login,
    Home
  }
}
</script>

<style>

</style>
