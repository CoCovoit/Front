<template>
    <div class="flex align-items-center justify-content-center min-h-screen bg-surface-100">
        <div class="surface-card p-6 shadow-2 border-round w-full max-w-md">
            <h2 class="text-center text-2xl font-bold mb-6">Connexion</h2>
            
            <form @submit.prevent="handleSubmit" class="flex flex-column gap-4">
                <div class="flex flex-column gap-2">
                    <label for="email" class="font-semibold">Email</label>
                    <InputText
                        id="email"
                        v-model="email"
                        type="email"
                        placeholder="exemple@email.com"
                        :class="{ 'p-invalid': submitted && !email }"
                    />
                    <small v-if="submitted && !email" class="p-error">L'email est requis.</small>
                </div>

                <div class="flex flex-column gap-2">
                    <label for="password" class="font-semibold">Mot de passe</label>
                    <Password
                        id="password"
                        v-model="password"
                        :feedback="false"
                        toggleMask
                        :class="{ 'p-invalid': submitted && !password }"
                        placeholder="Votre mot de passe"
                    />
                    <small v-if="submitted && !password" class="p-error">Le mot de passe est requis.</small>
                </div>

                <div class="flex align-items-center justify-content-between">
                    <Checkbox v-model="rememberMe" :binary="true" id="rememberMe" />
                    <label for="rememberMe" class="ml-2 cursor-pointer">Se souvenir de moi</label>
                </div>

                <Button
                    type="submit"
                    label="Se connecter"
                    class="mt-2"
                    :loading="loading"
                />

                <div class="text-center mt-4">
                    <a href="#" class="text-primary hover:underline">Mot de passe oublié ?</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const submitted = ref(false)
const loading = ref(false)

const handleSubmit = async () => {
    submitted.value = true

    if (!email.value || !password.value) {
        return
    }

    try {
        loading.value = true
        // TODO: Implémenter la logique de connexion
        console.log('Login attempt:', {
            email: email.value,
            password: password.value,
            rememberMe: rememberMe.value
        })
    } catch (error) {
        console.error('Login error:', error)
    } finally {
        loading.value = false
    }
}
</script>

<style scoped lang="scss">
:deep(.p-password-input) {
    width: 100%;
}

:deep(.p-password) {
    width: 100%;
}
</style>


