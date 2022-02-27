<template>
  <div id="registerContainer">
    <div id="registerTitle">
      <label>Register yourself!</label>
    </div>
    <div class="field">
      <label id="fullname">Full name:</label>
      <input v-model="fullName" type="text" />
    </div>
    <div class="field">
      <label id="address">Address:</label>
      <input v-model="address" type="text" />
    </div>
    <div class="field">
      <label id="username">Username:</label>
      <input v-model="username" type="text" />
    </div>
    <div class="field">
      <label id="password">Password:</label>
      <input v-model="password" type="password" />
    </div>
    <div class="field">
      <label id="email">Email:</label>
      <input v-model="email" type="text" />
    </div>
    <div class="field">
      <label id="phone">Phone:</label>
      <input v-model="phone" type="number" />
    </div>

    <button v-on:click="handleRegister">Register</button>
    <div>
      <p>{{status}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      fullName: "",
      address: "",
      username: "",
      password: "",
      email: "",
      phone: "",
      status: "",
    };
  },
  methods: {
    handleRegister() {
      this.status = "Sending...";
      setTimeout(() => this.status = "Sent!", 2000);
      this.$store.dispatch("login", this.username, true);
      this.$router.push({
        name: "Home",
      });
    },
  },
};
</script>

<style scoped>
#registerContainer {
  display: grid;
  justify-content: center;
  margin: 40px;
}

label {
  width: 100px;
}

#registerTitle {
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 20px;
}

.field {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 20px;
  padding: 5px;
}
</style>
