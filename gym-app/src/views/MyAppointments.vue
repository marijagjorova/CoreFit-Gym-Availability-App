<template>
  <div class="container py-5">
    <h2 class="mb-4 text-center">My Appointments</h2>

    <div v-if="loading" class="d-flex justify-content-center my-5">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>


    <div v-else-if="appointments.length === 0" class="alert alert-info text-center">
      You don’t have any appointments yet.
    </div>

    
    <div v-else class="row g-3">
      <div
        v-for="appointment in appointments"
        :key="appointment.id"
        class="col-12 col-md-6"
      >
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">{{ appointment.title }}</h5>
            <p class="card-text mb-1"><strong>Date:</strong> {{ appointment.date }}</p>
            <p class="card-text mb-3"><strong>Time:</strong> {{ appointment.hour }}</p>
            <button class="btn btn-outline-danger btn-sm" @click="cancelAppointment(appointment.id)">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

export default {
  name: "MyAppointments",
  data() {
    return {
      appointments: [],
      loading: true,
      user: null,
    };
  },
  methods: {
    async fetchAppointments(userId) {
      this.loading = true;
      try {
        const q = query(collection(db, "appointments"), where("userId", "==", userId));
        const snapshot = await getDocs(q);

        this.appointments = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (e) {
        console.error("Error fetching appointments:", e);
      } finally {
        this.loading = false;
      }
    },
    async cancelAppointment(id) {
      if (!confirm("Are you sure you want to cancel this appointment?")) return;
      try {
        await deleteDoc(doc(db, "appointments", id));
        this.appointments = this.appointments.filter(a => a.id !== id);
      } catch (e) {
        console.error("Error deleting appointment:", e);
      }
    }
  },
  mounted() {
    onAuthStateChanged(auth, user => {
      if (user) {
        this.user = user;
        this.fetchAppointments(user.uid);
      } else {
        this.$router.push("/login");
      }
    });
  }
};
</script>
