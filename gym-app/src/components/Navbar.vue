<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'


import logo from '../assets/logo.png'


const user = ref(null)
const router = useRouter()

onMounted(() => {
  onAuthStateChanged(auth, (u) => {
    user.value = u
  })
})

const logout = async () => {
  await signOut(auth)
  user.value = null
  router.push('/login')
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid px-5 py-2">
   
      <router-link class="navbar-brand" to="/">
        <img :src="logo" alt="Logo" height="85" width="85">
      </router-link>

   
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

   
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 fs-5">
          <li class="nav-item pe-4">
            <router-link class="nav-link" to="/" exact>Home</router-link>
          </li>
          <li class="nav-item pe-4">
            <router-link class="nav-link" to="/about">About Us</router-link>
          </li>
          <li class="nav-item pe-4">
            <router-link class="nav-link" to="/trainers">Coaches</router-link>
          </li>
          <li class="nav-item pe-4">
            <router-link class="nav-link" to="/contact">Contact Us</router-link>
          </li>

           <li v-if="user" class="nav-item pe-4">
            <router-link class="nav-link" to="/makeAnAppointment">Make an appointment</router-link>
          </li>

          <!-- Only show Sign Up if not logged in -->
          <li v-if="!user" class="nav-item pe-4">
            <router-link class="nav-link" to="/signup">Register</router-link>
          </li>

          <!-- My Appointments only if logged in -->
          <li v-if="user" class="nav-item pe-4">
            <router-link class="nav-link" to="/my-appointments">My Appointments</router-link>
          </li>

          <!-- Logout button if logged in -->
          <li v-if="user" class="nav-item pe-4">
            <button class="btn btn-outline-danger btn-sm" @click="logout">Logout</button>
          </li>

          <!-- Login button if not logged in -->
          <li v-if="!user" class="nav-item pe-4">
            <router-link class="nav-link" to="/login">Have an account?</router-link>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>
