<template>
  <div class="container my-5">
    <h1 class="text-center mb-4 fw-bold">Contact Us</h1>

    <div class="row align-items-start">
      <!-- Left Info Section -->
      <div class="col-md-5 mb-4">
        <h2 class="fw-bold">HAVE QUESTIONS?</h2>
        <p>We’re here to help you on your fitness journey at CoreFit!</p>
        <p>
          Whether you have questions about memberships, classes, or personal
          training, our team is ready to assist you.
        </p>
        <p><strong>*Please note: Response times may vary during peak hours.</strong></p>
        <p class="fw-bold">
          Head Office Hours:
          <br>
          Monday to Friday: 9:00 AM – 5:00 PM
        </p>
      </div>

      <!-- Right Form Section -->
      <div class="col-md-7 mb-4">
        <form @submit.prevent="handleSubmit" :class="{ 'was-validated': formSubmitted }" novalidate>
          <div class="mb-3">
            <input type="text" v-model="form.name" class="form-control" placeholder="Full Name" required>
            <div class="invalid-feedback">Please enter your full name.</div>
          </div>
          <div class="mb-3">
            <input type="email" v-model="form.email" class="form-control" placeholder="Email Address" required>
            <div class="invalid-feedback">Please enter a valid email address.</div>
          </div>
          <div class="mb-3">
            <input type="text" v-model="form.phone" class="form-control" placeholder="Phone Number">
          </div>
          <div class="mb-3">
            <select v-model="form.topic" class="form-select">
              <option value="">Select a Topic</option>
              <option>Membership Plans</option>
              <option>Group Classes</option>
              <option>Personal Training</option>
              <option>Other</option>
            </select>
          </div>
          <div class="mb-3">
            <textarea v-model="form.message" class="form-control" rows="4" placeholder="Your Message" required></textarea>
            <div class="invalid-feedback">Please write your message.</div>
          </div>
          <button type="submit" class="btn btn-danger w-100 fw-bold">SEND</button>
        </form>

        <!-- Success Message -->
        <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
          {{ successMessage }}
        </div>
      </div>
    </div>

    <!-- Google Map -->
    <div class="row mt-5">
      <div class="col-12">
        <iframe
          width="100%"
          height="400"
          style="border:0; border-radius: 8px;"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2966.216999!2d21.433!3d41.9981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1354145d9a97b!2sSkopje!5e0!3m2!1sen!2smk!4v1700000000000"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";

export default {
  name: "ContactPage",
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        topic: "",
        message: ""
      },
      formSubmitted: false,
      successMessage: ""
    };
  },
  methods: {
    async handleSubmit() {
      this.formSubmitted = true;

      // Basic validation
      if (!this.form.name || !this.form.email || !this.form.message) return;

      try {
        // 1️⃣ Save form to Firestore
        await addDoc(collection(db, "contactSubmissions"), {
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          topic: this.form.topic,
          message: this.form.message,
          createdAt: new Date()
        });

        // 2️⃣ Send email via EmailJS
        await emailjs.send(
          "service_0hf4rx4",      // Replace with your EmailJS Service ID
          "template_prn8nwp",     // Replace with your EmailJS Template ID
          {
            name: this.form.name,
            email: this.form.email,
            phone: this.form.phone,
            topic: this.form.topic,
            message: this.form.message
          },
          "Mlk76JHJ1zNp84Q7U"       // Replace with your EmailJS public key
        );

        // 3️⃣ Show success message and reset form
        this.successMessage = "Thank you for contacting CoreFit! We'll get back to you soon.";
        this.form = { name: "", email: "", phone: "", topic: "", message: "" };

        setTimeout(() => {
          this.successMessage = "";
        }, 5000);

      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Something went wrong. Please try again.");
      }
    }
  }
};
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
}
form input, form select, form textarea {
  border-radius: 8px;
  padding: 10px;
}
button {
  padding: 10px;
}
</style>
