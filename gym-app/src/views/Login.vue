<template>
  <div class="container my-5" style="max-width:420px;">
    <h2 class="mb-4 text-center">Sign In</h2>

    <form @submit.prevent="handleSignIn" :class="{ 'was-validated': submitted }" novalidate>
      <div class="mb-3">
        <input v-model="email" type="email" class="form-control" placeholder="Email" required />
        <div class="invalid-feedback">Please enter a valid email.</div>
      </div>

      <div class="mb-3">
        <input v-model="password" type="password" class="form-control" placeholder="Password" required />
        <div class="invalid-feedback">Please enter your password.</div>
      </div>

      <button class="btn btn-danger w-100" type="submit" :disabled="loading">
        {{ loading ? "Signing in..." : "Sign In" }}
      </button>
    </form>

    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      submitted: false,
      error: ""
    };
  },
  methods: {
    async handleSignIn() {
      this.submitted = true;
      this.error = "";

      if (!this.email || !this.password) return;

      this.loading = true;
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push("/my-appointments");
      } catch (err) {
        console.error(err);
        this.error = "Invalid email or password.";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.container { max-width: 420px; }
</style>
