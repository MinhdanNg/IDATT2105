<template>
  <div>
    <h1>Contact form</h1>
    <form id="form" @submit.prevent="onSubmit">
      <label>Name</label>
      <BaseInput
          v-model="name"
          type="name"
          :error="nameError"
      />
      <label>Email address</label>
      <BaseInput
          v-model="email"
          type="email"
          :error="emailError"
      />
      <label>Message</label>
      <BaseInput
          v-model="message"
          type="text"
          required
      />
      <button type="submit" :disabled="nameError || emailError || !message || !name || !email ">Submit</button>
      <div> {{status}}</div>
    </form>
  </div>
</template>

<script>
import { useField, useForm } from 'vee-validate'
import BaseInput from "@/components/BaseInput";

export default {
  data () {
    return {
      feedback: {
        name: '',
        email: '',
        message: '',
      },
      message: '',
      status: '',
    }
  },
  components: {BaseInput},
  methods: {
    onSubmit () {
      this.$store.commit("SET_NAME", this.name);
      this.$store.commit("SET_EMAIL", this.email);
      this.status = "Sending...";
      setTimeout(() => this.status = "Sent!", 2000);
      console.log("Name: ", this.$store.state.name, "Email: ", this.$store.state.email);
    }
  },
  setup () {
    const validations = {
          email: value => {
            if (!value) return 'This field is required'

            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!regex.test(String(value).toLowerCase())) {
              return 'Please enter a valid email address'
            }

            return true
          },
      name: value => {
        const requiredMessage = 'This field is required'
        if (value === undefined || value === null) return requiredMessage
        if (!String(value).length) return requiredMessage
        return true
          }
    }
    useForm({
      validationSchema: validations
    })
    const { value: email, errorMessage: emailError } = useField('email')
    const { value: name, errorMessage: nameError } = useField('name')


    return {
      email,
      emailError,
      name,
      nameError
    }
  }
}
</script>

<style scoped>
#form {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 250px;
  margin: auto;
}
</style>