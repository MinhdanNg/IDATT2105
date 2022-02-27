<template>
  <div>
    <LoginComponent v-bind:title="title" @failure="loginFail" />
    <div id="register" v-if="loginFailure">
      <p>
        Not registered yet!,
        <a href="/register">register</a>
      </p>
    </div>
  </div>
</template>
<script>
import LoginComponent from "../components/Login";

export default {
  components: { LoginComponent },
  data() {
    return {
      title: "Please login",
      loginFailure: false,
    };
  },
  methods: {
    loginFail() {
      this.title = "Login failed!";
      this.loginFailure = true;
    },
  },
};
</script>
