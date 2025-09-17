<script setup>
import coach1 from "../assets/coach11.png";
import coach2 from "../assets/coach22.png";
import coach3 from "../assets/coach33.png";
import coach4 from "../assets/coach44.jpg";
import coach5 from "../assets/coach55.jpg";
import coach6 from "../assets/coach66.jpeg";

const trainers = [
  {
    id: 1,
    name: "Coach Alex",
    specialty: "Strength & Conditioning",
    bio: "Alex has 10+ years of experience in personal training and competitive weightlifting. He believes in pushing limits safely and effectively.",
    img: coach1,
    quote: "No pain, no gain!",
    longbio: "  Alex has a lot of experience helping people achieve their fitness goals — from beginners taking their first steps into the gym to athletes looking to maximize performance. She specializes instrength training, fat loss, and functional workouts tailored to your lifestyle. Her philosophy is simple: fitness should empower you, not overwhelm you. With her supportive approach andmotivational coaching style, Sarah ensures every session is both  challenging and enjoyable. When she’s not coaching, you’ll find he running marathons, experimenting with healthy recipes, or leading  outdoor bootcamps.",
    phone:"+123 456 789",
    email: "alex@gmail.com"
  },
  {
    id: 2,
    name: "Coach Maria",
    specialty: "Yoga & Flexibility",
    bio: "Maria is a certified yoga and pilates instructor. She focuses on improving flexibility, balance, and mindfulness in training.",
    img: coach2,
    quote: "Breathe, stretch, grow.",
    longbio: "Maria is passionate about helping people build strength, flexibility, and inner balance through yoga and Pilates. With over 5 years of teaching experience, she designs classes that improve posture, reduce stress, and increase body awareness. Her calm and encouraging approach makes every session welcoming — whether you’re a complete beginner or looking to deepen your practice. Maria believes that movement is not just about fitness, but also about finding peace and harmony in everyday life.",
    phone: "+987 654 321",
    email:"maria@gmail.com"
  },
  {
    id: 3,
    name: "Coach Jane",
    specialty: "Cardio & HIIT",
    bio: "Jane specializes in HIIT and endurance training. He loves helping people achieve peak performance and stamina.",
    img: coach3,
    quote: "Sweat is just fat crying!",
    longbio:"Jane brings unstoppable energy to every workout. With a focus on high-intensity interval training and cardio conditioning, she helps clients burn fat, build stamina, and stay motivated. Her sessions are fast-paced, dynamic, and designed to push you beyond your limits — while still keeping things fun and achievable.",
    phone: "+345 678 921",
    email:"jane@gmail.com"
  },
  {
    id: 4,
    name: "Coach Tom",
    specialty: "Functional Training & Mobility",
    bio: "Tom is a specialist in functional movement and mobility improvement. He helps clients move better, prevent injuries, and build a strong foundation for any fitness goal.",
    img: coach4,
    quote: "Move better, feel stronger.",
    longbio: "Coach Tom combines expert knowledge of biomechanics and mobility training to create sessions that focus on real-life strength, flexibility, and injury prevention. His approach is ideal for athletes, active individuals, and anyone who wants to move with more freedom and less pain. Whether you're recovering from an injury or looking to improve your everyday performance, Tom’s programs are practical, safe, and highly effective.",
    phone: "+123 456 789",
    email: "tom@gmail.com"
  },
  {
    id: 5,
    name: "Coach Christina",
    specialty: "Nutrition & Wellness",
    bio: "Christina is a certified nutrition and wellness expert dedicated to helping clients build healthier eating habits and balanced lifestyles.",
    img: coach5,
    quote: "Fuel your body, fuel your life.",
    longbio: "Coach Christina combines expert knowledge in nutrition, wellness coaching, and holistic health to create customized plans that fit every lifestyle. Her approach focuses on practical, sustainable changes—whether your goal is weight management, improved energy levels, or overall health enhancement. With her guidance, you’ll learn how to nourish your body, develop mindful eating habits, and make choices that support your long-term well-being.",
    phone: "+456 789 123",
    email: "christina@gmail.com"
  },
  {
    id: 6,
    name: "Coach Marko",
  specialty: "Strength & Conditioning",
  bio: "Marko is a strength and conditioning specialist who helps clients develop power, endurance, and peak athletic performance.",
  img: coach6,
  quote: "Strength is the foundation of success.",
  longbio: "Coach Marko brings years of experience in building strength, increasing athletic performance, and creating well-rounded training programs. His sessions focus on compound movements, progressive overload, and proper technique to ensure consistent and safe progress. Whether you're training for a sport, looking to enhance your physique, or simply want to become stronger in daily life, Marko’s structured programs will get you there.",
  phone: "+567 891 234",
  email: "marko@gmail.com"
  }

];
</script>

<template>
  <div class="bg-light py-5">
    <div class="container">
      <!-- Page Title -->
      <div class="text-center mb-5">
        <h1 class="fw-bold">Meet Our Coaches</h1>
        <p class="lead text-muted">
          Expert guidance, personalized training, and lots of motivation.
        </p>
      </div>

      <!-- Coaches -->
      <div
        class="row g-5 mb-5 align-items-center"
        v-for="(t, index) in trainers"
        :key="t.id"
      >
        <!-- Image Column -->
        <div class="col-md-6" :class="{ 'order-md-2': index % 2 !== 0 }">
          <img
            :src="t.img"
            :alt="t.name"
            class="img-fluid rounded shadow-lg max-width:200px"
            style="
              max-width: 100%;
              height: auto;
              display: block;
              margin: 0 auto;
            "
          />
        </div>

        <!-- Info Column -->
        <div class="col-md-6" :class="{ 'order-md-1': index % 2 !== 0 }">
          <h2 class="fw-bold">{{ t.name }}</h2>
          <h5 class="text-warning mb-3">{{ t.specialty }}</h5>
          <p class="fs-3">{{ t.bio }}</p>
          <p class="fst-italic text-secondary">"{{ t.quote }}"</p>
          <p class="fs-5">
         {{ t.longbio }}
          </p>
          <p class="fw-bold">Personal contact:</p>
          <ul>
            <li class="text-warning">Phone: {{ t.phone }}</li>
            <li class="text-warning">Email: {{ t.email }}</li>
          </ul>
        </div>
      </div>

      <!-- Motto -->
      <div class="text-center py-4 mt-5 bg-white rounded shadow-sm">
        <h4 class="fw-bold">
          💪 Train Hard. Stay Humble. Achieve Excellence. 🚀
        </h4>
      </div>
    </div>
  </div>
</template>