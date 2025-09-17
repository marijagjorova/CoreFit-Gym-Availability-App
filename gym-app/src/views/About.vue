<script setup>
import { ref, computed } from "vue";

import trainer1 from "../assets/coach11.png";
import trainer2 from "../assets/coach22.png";
import trainer3 from "../assets/coach33.png";
import trainer4 from "../assets/coach44.jpg";
import trainer5 from "../assets/coach55.jpg";
import trainer6 from "../assets/coach66.jpeg";
import gym from "../assets/gym.png";

const trainers = ref([
  { name: "Coach Alex", img: trainer1, desc: "Strength training expert with 10+ years of experience." },
  { name: "Coach Maria", img: trainer2, desc: "Certified yoga and pilates instructor." },
  { name: "Coach Nina", img: trainer3, desc: "Cardio and HIIT specialist." },
  { name: "Coach Tom", img: trainer4, desc: "Functional training and mobility coach." },
  { name: "Coach Christina", img: trainer5, desc: "Nutrition and wellness expert." },
  { name: "Coach Marko", img: trainer6, desc: "Strength & conditioning specialist." },
]);

const visibleCount = ref(3);
const startIndex = ref(0);

const visibleTrainers = computed(() =>
  trainers.value.slice(startIndex.value, startIndex.value + visibleCount.value)
);

const maxStartIndex = computed(() =>
  trainers.value.length - visibleCount.value
);

function nextTrainer() {
  if (startIndex.value < maxStartIndex.value) {
    startIndex.value++;
  }
}

function prevTrainer() {
  if (startIndex.value > 0) {
    startIndex.value--;
  }
}
</script>


<template>
  <div class="bg-light py-5">
    <div class="container">
      
      <div class="text-center mb-5">
        <h1 class="fw-bold">About Us</h1>
        <p class="lead text-muted">
          Strong Body. Strong Mind. Strong Community.
        </p>
      </div>

    
      <div class="row align-items-center mb-5">
       
        <div class="col-md-6 text-center mb-4 mb-md-0">
          <img
            :src="gym"
            alt="Our Gym"
            class="img-fluid rounded shadow-lg border border-3 border-light"
            style="max-width: 450px"
          />
        </div>
        <!-- Text -->
        <div class="col-md-6">
          <h3 class="fw-bold mb-3 text-uppercase text-secondary">Our Story</h3>
          <p class="fs-5 lh-lg">
            Founded in <strong>2010</strong>,
            <span class="text-warning">CoreFit Gym</span> started as a small
            community space for fitness lovers in <strong>Skopje</strong>. What
            began with just a few weights and a dream has now grown into one of
            the city’s most vibrant gyms.
          </p>
          <p class="fs-5 lh-lg">
            Our mission has always been simple:
            <em
              >to help people transform their lives through strength,
              discipline, and community support</em
            >.
          </p>
          <router-link
            to="/trainers"
            class="btn btn-outline-secondary btn-lg mt-3"
            >Who will guide you</router-link
          >
        </div>
      </div>

      <div class="mb-5 text-center">
        <h3 class="fw-bold mb-4">Who We Are</h3>
        <p class="fs-5">
          We are more than just a gym — we are a community built on strength,
          passion, and progress. Our mission is to help people of all fitness
          levels achieve their goals through expert guidance, modern equipment,
          and a supportive environment. Whether you’re here to lift heavier,
          move faster, or simply feel better in your everyday life, we’re here
          to guide you every step of the way. At our core, we believe fitness is
          not just about the body, but about building confidence, resilience,
          and a healthier lifestyle.
        </p>
      </div>



      
 
    <div class="mb-5">
    <h3 class="fw-bold text-center mb-4">Meet Our Coaches</h3>
    <div class="d-flex justify-content-center align-items-center position-relative">

      <button @click="prevTrainer" class="btn btn-dark position-absolute start-0 top-50 translate-middle-y" :disabled="startIndex === 0">
        &#8592;
      </button>

      <div class="d-flex gap-3 mx-5 overflow-hidden" style="width: 80%;">
        <div class="d-flex w-100">
          <div v-for="(trainer, index) in visibleTrainers" :key="index" class="card shadow-sm m-3" style="flex: 1 0 0;">
            <img :src="trainer.img" class="card-img-top" :alt="trainer.name" />
            <div class="card-body text-center">
              <h5 class="card-title">{{ trainer.name }}</h5>
              <p class="card-text text-muted">{{ trainer.desc }}</p>
            </div>
          </div>
        </div>
      </div>

    
      <button @click="nextTrainer" class="btn btn-dark position-absolute end-0 top-50 translate-middle-y" :disabled="startIndex >= maxStartIndex">
        &#8594;
      </button>

    </div>
  </div>


      <!-- Motto -->
      <div class="text-center py-4 bg-white rounded shadow-sm">
        <h4 class="fw-bold">
          💪 Train Hard. Stay Humble. Become Unstoppable. 🚀
        </h4>
      </div>
    </div>
  </div>
</template>

 
  <style>
  .transition-transform {
  transition: transform 0.5s ease;
  
}
.card-img-top {
  width: 100%;       /* full card width */
  height: 400px;     /* fixed height (adjust as needed) */
  object-fit: cover; /* crop instead of stretch */
}
.card {
  flex: 1 0 0;   /* default: share space */
}

@media (max-width: 768px) {
  .d-flex.w-100 {
    flex-direction: column; /* stack vertically */
  }

  .d-flex.w-100 .card {
    flex: 0 0 100%; /* full width */
    max-width: 100%;
    margin: 10px 0; /* space between cards */
  }

  .d-flex.gap-3.mx-5.overflow-hidden {
    width: 100%;   /* fit small screen */
    margin: 0;     /* remove big margins */
  }

  /* optional: hide arrows on small screens */
  .btn.position-absolute {
    display: none;
  }
}


</style>