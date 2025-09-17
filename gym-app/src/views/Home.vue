<script>
import gymImage from '../assets/logo.png'
import mainImage from '../assets/main.jpg'
import card1Image from '../assets/card1IMAGE.png'
import card2Image from '../assets/card2IMAGE.png'
import card3Image from '../assets/card3IMAGE.png'
import card4Image from '../assets/card4IMAGE.png'
import img1GALLERY from '../assets/img1GALLERY.jpg'
import img2GALLERY from '../assets/img2GALLERY.jpg'
import img3GALLERY from '../assets/img3GALLERY.jpg'
import img4GALLERY from '../assets/img4GALLERY.jpg'
import img5GALLERY from '../assets/img5GALLERY.jpg'
import img6GALLERY from '../assets/img6GALLERY.jpg'
import img7GALLERY from '../assets/img7GALLERY.jpg'

import { db } from "../firebase"
import { collection, addDoc } from "firebase/firestore"
import emailjs from "@emailjs/browser";

export default {
  name: "App",
  data() {
    return {
      gymImage,
      mainImage,
      card1Image,
      card2Image,
      card3Image,
      card4Image,
      showMore: false,
      currentImage: 0,
      images: [img1GALLERY, img2GALLERY, img3GALLERY, img4GALLERY, img5GALLERY, img6GALLERY, img7GALLERY],
      formSubmitted: false,
      searchQuery: "",
      searchResults: [],
      allItems: [
        "Home",
        "About Us",
        "Make an appointment",
        "Contact",
        "Group Fitness Classes",
        "Personal Training",
        "Fitness Facilities & Equipment",
        "CoreFit Blog",
        "Membership Plans",
        "Gym Schedule"
      ],
     
      firstName: "",
      lastName: "",
      email: ""
    };
  },
  methods: {
    toggleText() {
      this.showMore = !this.showMore;
    },
    nextImage() {
      this.currentImage = (this.currentImage + 1) % this.images.length;
    },
    prevImage() {
      this.currentImage = (this.currentImage - 1 + this.images.length) % this.images.length;
    },
   async handleSubmit(event) {
      const form = event.target;

      if (form.checkValidity()) {
        try {
          // 1️⃣ Save form to Firestore
          await addDoc(collection(db, "submissions"), {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            createdAt: new Date()
          });

          // 2️⃣ Send welcome email
          await emailjs.send(
            "service_0hf4rx4",   // Replace with your Service ID
            "template_qvo4rii", // Template ID
            {
              firstName: this.firstName,
              email: this.email
            },
            "Mlk76JHJ1zNp84Q7U"   
          );

          alert("Form submitted and welcome email sent!");

          // Reset form fields
          this.firstName = "";
          this.lastName = "";
          this.email = "";
          form.classList.remove("was-validated");

        } catch (error) {
          console.error("Error: ", error);
          alert("Something went wrong. Please try again.");
        }
      } else {
        form.classList.add("was-validated");
      }
    }
  }
};
</script>




<template>

     <div class="text-bg-dark d-flex justify-content-center p-5 main">
        <div class="m-5 p-5 text-main">
           <h1 class="text-light">Join the Journey to a Healthier You</h1>
            <p class="w-60">Take the first step toward becoming your best self. Our gym offers expert guidance, modern equipment, and a supportive community to help you achieve your fitness goals—no matter your starting point.</p>
           <router-link class="btn btn-light me-2" to="/makeAnAppointment">Make an appointment</router-link>
      <router-link class="btn btn-outline-light" to="/about">About Us</router-link>
        </div>
    </div>

    <div class="cards px-5 pt-5 m-5 text-center">
      <h1 class="fw-bold">Why CoreFit?</h1>
      <div class="d-flex justify-content-between my-5 py-5">
        
        <div class="card" style="width: 20rem; border: none;">
  <img :src="card1Image" alt="card-img" height="200" width="200" class="mx-5">
  <div class="card-body my-3">
    <h3 class="card-title fw-bold">Expert Coaching</h3>
    <p class="card-text my-4">Work with certified trainers who guide you every step of the way, creating personalized workout plans tailored to your goals. Our team is here to keep you motivated and accountable throughout your journey.</p>
  </div>
</div>

  <div class="card" style="width: 20rem; border: none;">
  <img :src="card2Image" alt="card-img" height="200" width="200" class="mx-5">
  <div class="card-body my-3">
    <h3 class="card-title fw-bold">State-of-the-Art Equipment</h3>
    <p class="card-text my-4">Train with the latest fitness technology and top-quality machines designed for every fitness level. Every piece of equipment is maintained to ensure your workouts are safe and effective.</p>
  </div>
</div>

<div class="card" style="width: 20rem; border: none;">
  <img :src="card3Image" alt="card-img" height="200" width="200" class="mx-5">
  <div class="card-body my-3">
    <h3 class="card-title fw-bold">Supportive Community</h3>
    <p class="card-text my-4">Join a welcoming environment where motivation and encouragement push you to go further every day. Whether you're a beginner or experienced, you'll always feel at home.</p>
  </div>
</div>

<div class="card" style="width: 20rem; border: none;">
  <img :src="card4Image" alt="card-img" height="200" width="200" class="mx-5">
  <div class="card-body my-3">
    <h3 class="card-title fw-bold">Real Results</h3>
    <p class="card-text my-4">We focus on proven methods to help you build strength, burn fat, and transform your lifestyle sustainably. Your progress is our priority, and we celebrate every milestone with you.</p>
  </div>
</div>
      </div>
    </div>



      <div class="m-5 px-5 py-3 text-img-div">
    <div class="row align-items-center">
      
      <div class="col-md-6">
        <h1 class="fw-bold my-3">TRANSFORM YOUR BODY, TRANSFORM YOUR LIFE</h1>
        <h4 class="fw-bold my-3">Stronger Every Day.</h4>
        <p class="my-3">
          At Core Fit, we believe that fitness is not just about lifting weights or running on a treadmill—it’s about embracing a lifestyle that prioritizes health, strength, and well-being. Every individual who walks through our doors is on a unique journey, and our mission is to guide, support, and inspire each person to reach their fullest potential. We understand that starting can be intimidating, and staying motivated can be challenging. That’s why we combine expert coaching, state-of-the-art equipment, and a welcoming community to ensure that everyone—from beginners to experienced athletes—feels confident, encouraged, and empowered.
          <span v-if="showMore">
            <p class="my-3">
              Our certified trainers are more than instructors; they are mentors who take the time to understand your goals, monitor your progress, and adapt your training program to fit your lifestyle. Whether your aim is to build muscle, increase endurance, lose weight, or simply maintain a healthier lifestyle, we craft programs that are personalized, effective, and sustainable. Our training spaces are equipped with the latest machines, free weights, and functional training areas to provide variety, challenge, and efficiency in every workout. Every detail is designed with your success in mind.
            </p>
            <p class="my-3">
              But Core Fit is about more than equipment and exercises—it’s about people. Our community is built on encouragement, support, and shared victories. Group classes, friendly competitions, and social events foster connection, accountability, and camaraderie. Here, you’re not just a member; you’re part of a team that celebrates your milestones, cheers you on during challenges, and motivates you to keep going even when the journey feels tough.
            </p>
<p class="my-3">
  We also understand that fitness is only one part of a healthy lifestyle. That’s why we offer guidance on nutrition, recovery, and wellness strategies, helping you make informed decisions that complement your workouts and enhance your overall health. We believe that lasting change comes from consistent effort, knowledge, and the right support system, which is exactly what we provide at Core Fit.
</p>
<p class="my-3">
  Ultimately, joining Core Fit is more than signing up for a gym membership—it’s committing to yourself. It’s choosing to prioritize your health, push past your limits, and achieve goals you once thought were out of reach. Every drop of sweat, every challenge faced, and every milestone reached is a step toward the best version of yourself. Come join us, and discover a place where ambition meets action, where potential turns into performance, and where your journey to a healthier, stronger, and happier life truly begins.
</p>
          </span>
        </p>
        <button class="btn btn-link p-0 my-3 fw-bold text-danger fs-5" @click="toggleText">
  {{ showMore ? 'Read Less' : 'Continue Reading' }}
</button>
      </div>

      <div class="col-md-6 text-center">
        <img :src="images[currentImage]" class="img-fluid rounded" alt="Gym Image">
        <div class="d-flex justify-content-center mt-1 fs-3">
          <button class="btn btn-outline-danger mx-1" @click="prevImage">‹</button>
          <button class="btn btn-outline-danger mx-1" @click="nextImage">›</button>
        </div>
      </div>


    </div>
      </div>


<div class="text-center bg-dark text-light px-5 pt-5">
  <div class="px-5 pt-5">
    <h1 class="fw-bold my-3">STAY INFORMED & GET FIT</h1>
    <p class="fs-4">Get the latest World Gym news, fitness tips, & exclusive offers delivered straight to your inbox.</p>
   <form class="row g-3 needs-validation" novalidate @submit.prevent="handleSubmit">
  <div class="col-md-4">
    <input v-model="firstName" type="text" class="form-control py-2" placeholder="First Name*" required>
    <div class="invalid-feedback">Please enter your first name.</div>
  </div>

  <div class="col-md-4">
    <input v-model="lastName" type="text" class="form-control py-2" placeholder="Last Name*" required>
    <div class="invalid-feedback">Please enter your last name.</div>
  </div>

  <div class="col-md-4">
    <input v-model="email" type="email" class="form-control py-2" placeholder="Email Address*" required>
    <div class="invalid-feedback">Please enter a valid email.</div>
  </div>

  <div class="col-12">
    <button class="btn btn-danger px-4 fs-4 fw-bold" type="submit">SUBMIT</button>
  </div>
</form>


  <div v-if="formSubmitted" class="alert alert-secondary mt-5 fs-5">
    <p>THANK YOU FOR
CONNECTING WITH US!</p>
<p>Keep an eye out for News, Tips, and Offers sent straight to your inbox.</p>
  </div>

<div class="p-5" id="submit">
  <p>By clicking SUBMIT, you agree to the Privacy Policy and authorize CoreFit, our affiliates, as well as our marketing and/or service providers to send you non-emergency, automated text messages at the number you entered above. Consent is not a condition of purchase. Reply STOP to opt-out of text messaging. Standard rates may apply.</p>
</div>
  </div>
</div>

</template>


<style>
body{
  overflow-x: hidden;
}
.main{
    background-image: url('../assets/main.jpg'); 
    background-size: cover; 
    background-position: center; 
    height: 900px; 
    width: 100%;
}
.text-main{
  position: relative;
  top: 200px;
  font-size: 18px;
}
.text-main h1{
  font-size: 70px;
}
.list-group-item {
  cursor: pointer;
}
.list-group-item:hover {
  background-color: #f8f9fa;
}
.cards h1{
  font-size: 50px;
}
.text-img-div>img{
  max-height: 600px;
  object-fit: cover;
}
.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid red;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  padding: 30px;
}
.social-icon:hover {
  background-color: red;
  color: white;
}

@media only screen and (max-width: 600px) {
.main {
    flex-direction: column; /* stack content */
    text-align: center;     /* center text */
    padding: 2rem 1rem;     /* reduce padding */
  }

  .text-main {
    margin: 0;
    padding: 1rem;
  }

  .text-main h1 {
    font-size: 1.8rem;  /* smaller headline */
    line-height: 1.3;
  }

  .text-main p {
    font-size: 1rem;   /* readable text */
    line-height: 1.5;
    max-width: 100%;   /* full width */
    margin: 1rem auto;
  }

  .text-main .btn {
    display: block;
    width: 100%;      /* full-width buttons on phone */
    margin: 0.5rem 0;
  }

  .cards .d-flex {
    flex-direction: column;
    align-items: center;
  }

  .cards .card {
    width: 90%;
    margin-bottom: 20px;
  }

  .text-img-div .row {
    flex-direction: column-reverse;
    text-align: center;
  }

  .text-img-div img {
    max-height: 300px;
    width: 100%;
  }

  .text-img-div button {
    margin-top: 10px;
  }

  form .col-md-4 {
    width: 100%;
  }

  form .col-12 {
    width: 100%;
  }
   #submit p {
    width: 100%;          /* take full width */
    max-width: 100%;      /* prevent limiting */
    font-size: 0.9rem;    /* make text more readable */
    line-height: 1.5;
    text-align: justify;  /* optional: makes text tidy */
    padding: 0;      /* some breathing room left/right */
  
  }
}


</style>
