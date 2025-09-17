 <template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-8 col-lg-5">
        <div class="card shadow p-4">
          <h3 class="text-center mb-4">Create Your Account</h3>

          <div v-if="error" class="alert alert-danger">{{ error }}</div>

          <form @submit.prevent="handleSignUp" novalidate>
            <div class="mb-3">
              <label class="form-label">Full Name</label>
              <input v-model.trim="form.name" type="text" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Email address</label>
              <input v-model.trim="form.email" type="email" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Password</label>
              <input v-model="form.password" type="password" class="form-control" minlength="6" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Confirm Password</label>
              <input v-model="form.confirm" type="password" class="form-control" minlength="6" required />
            </div>

            <button class="btn btn-danger w-100" :disabled="loading">
              <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
              Sign Up
            </button>
          </form>

          <p class="text-center mt-3 mb-0">
            Already have an account?
            <a href="/login" class="text-decoration-none text-danger">Log in</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// adjust path if your file location differs
import { auth, db } from '../firebase'; 
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default {
  name: 'SignUp',
  data() {
    return {
      form: { name: '', email: '', password: '', confirm: '' },
      loading: false,
      error: ''
    };
  },
  methods: {
    firebaseFriendlyMessage(e) {
      if (!e || !e.code) return e?.message || 'Sign up failed';
      const map = {
        'auth/email-already-in-use': 'Email already in use.',
        'auth/invalid-email': 'Invalid email.',
        'auth/weak-password': 'Password is too weak (min 6 chars).'
      };
      return map[e.code] || e.message || String(e);
    },
    async handleSignUp() {
      this.error = '';
      if (this.form.password !== this.form.confirm) {
        this.error = 'Passwords do not match.';
        return;
      }
      this.loading = true;
      try {
        const cred = await createUserWithEmailAndPassword(auth, this.form.email, this.form.password);
        // set display name
        await updateProfile(cred.user, { displayName: this.form.name });
        // save extra in firestore
        await setDoc(doc(db, 'users', cred.user.uid), {
          name: this.form.name,
          email: this.form.email,
          createdAt: serverTimestamp()
        });
        // success — redirect
        if (this.$router) this.$router.push('/login');
        else window.location.href = '/login';
      } catch (e) {
        console.error('SignUp error:', e);
        this.error = this.firebaseFriendlyMessage(e);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>




