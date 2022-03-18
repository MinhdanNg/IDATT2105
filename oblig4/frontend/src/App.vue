<template>
  <Calculator />
</template>

<script>
import Calculator from './components/Calculator.vue'
export default {
  name: 'App',
  components: {
    Calculator
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.field {
  margin: 10px;
  padding: 10px;
}
button {
  margin: auto;
  padding: 10px 15px;
  width: 100px;
  background-color: lightblue;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 17px;
  border-radius: 15px;
  border: grey solid 1px;
}
</style>
