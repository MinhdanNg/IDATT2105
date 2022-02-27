<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Hello {{ $store.state.username }}!</h1>
    <div>You have access to our services!!!</div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
