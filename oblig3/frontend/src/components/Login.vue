<template>
  <div id="loginContainer">
    <div id="loginTitle">
      <label id="loginTitleLabel">{{ title }}</label>
    </div>
    <div id="username">
      <label id="usernameLabel">Username:</label>
      <input v-model="username" type="text" id="usernameInput"/>
    </div>
    <div id="password">
      <label id="passwordLabel">Password: </label>
      <input v-model="password" type="password" id="passwordInput"/>
    </div>
    <button v-on:click="handleClickSignin">Sign in</button>
    <label id="loginstatusLabel">{{ loginStatus }}</label>
  </div>
</template>

<script>
/* eslint-disable */
import {doLogin} from "../utils/apiutil.js";

export default {
  name: 'LoginComponent',
  props: {
    title: String
  },
  methods: {
    async handleClickSignin() {
      const loginRequest = {username: this.username, password: this.password};
      const loginResponse = await doLogin(loginRequest);
      this.loginStatus = loginResponse.loginStatus;
      if (this.loginStatus === "Success") {
        this.$store.dispatch("login", this.username, true);
        this.$emit("success");

        await this.$router.push({
          name: "Home",
        });
      } else {
        this.$emit("failure");
      }
    },
  },
  data() {
    return {
      username: '',
      password: '',
      loginStatus: '',
    }
  }
};
</script>

<style>
#loginContainer {
  display: grid;
  justify-content: center;
  margin: 40px;
}

#usernameLabel, #passwordLabel {
  width: 100px;
}

#loginTitle {
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 20px;
}

#username, #password {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 20px;
  padding: 5px;
}

input {
  padding: 10px;
  font-size: 15px;
}

button {
  margin-top: 10px;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  border: solid black 1px;
}

</style>
