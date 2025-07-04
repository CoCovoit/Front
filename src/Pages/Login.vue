<template>
  <div class="page-container">

    <div class="card">

      <h1 class="logo">
        <span style="color:#4285F4">C</span>
        <span style="color:#EA4335">o</span>
        <span style="color:#FBBC05">C</span>
        <span style="color:#4285F4">o</span>
        <span style="color:#34A853">v</span>
        <span style="color:#EA4335">o</span>
        <span style="color:#FBBC05">i</span>
        <span style="color:#4285F4">t</span>
      </h1>

      <div class="subtitles">
        <h2 class="subtitle">Bienvenu sur CoCoVoit</h2>

        <p class="sub-subtitle">Connectez vous</p>
      </div>


      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <span>Adresse mail</span>

          <DefaultInput
              v-model="email"
              label="Adresse email"
              icon="pi pi-envelope"
              id="email"
              :inputProps="{
          type: 'email',
          placeholder: 'exemple@email.com',
          class: { 'p-invalid': submitted && !email }
        }"

          />
          <small v-if="submitted && !email" class="p-error">
            L'email est requis.
          </small>
        </div>

        <div class="input-group">
          <span>Mot de passe</span>
          <DefaultInput
              v-model="password"
              type="password"
              label="Mot de passe"
              icon="pi pi-lock"
              id="password"
              :inputProps="{
          placeholder: 'Votre mot de passe',
          class: { 'p-invalid': submitted && !password }
        }"
          />
          <small v-if="submitted && !password" class="p-error">
            Le mot de passe est requis.
          </small>
        </div>

        <div class="forget-password">
          <a href="#" class="text-primary hover:underline">
            Mot de passe oublié ?
          </a>
        </div>

        <main-button
            type="submit"
            label="Se connecter"
            class="mt-2"
            :loading="loading"
        />
      </form>
    </div>


  </div>

</template>

<script setup lang="ts">
import {ref} from 'vue'
import MainButton from "@/components/MainButton.vue";
import DefaultInput from "@/components/DefaultInput.vue";

const email = ref('')
const password = ref('')
const submitted = ref(false)
const loading = ref(false)

const handleSubmit = async () => {
  submitted.value = true

  if (!email.value || !password.value) {
    return
  }

  try {
    loading.value = true
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">

.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #F9FAFB;
  padding: 32px;


  .card {
    width: 57.8rem;
    height: 52.9rem;
    max-width: 600px;
    margin: auto;
    padding: 6rem 5rem;
    border-radius: 28px;
    box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.10), 0px 24px 36px 0px rgba(0, 0, 0, 0.04);
    max-height: 580px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    gap: 3.2rem;

    .logo {
      font-size: 4.8rem;
      font-weight: 600;
      text-align: center;
    }

    .subtitles {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.2rem;
      align-self: stretch;

      .subtitle {
        color: #000;
        text-align: center;
        font-size: 2.4rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }

      .sub-subtitle {
        color: #64748B;
        text-align: center;
        font-size: 1.2rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1.6rem;
      width: 100%;

      .input-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;

        span {
          color: #000;
          font-size: 1.4rem;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        }
      }
      .forget-password {
        color: #10B981;
        text-align: right;
        font-size: 1.2rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
      .p-error{
        color: #EF4444;
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }

  }
}


:deep(.p-password-input) {
  width: 100%;
}

:deep(.p-password) {
  width: 100%;
}
</style>


