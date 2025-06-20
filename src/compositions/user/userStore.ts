// src/stores/user.ts
import {defineStore} from 'pinia'
import {UserRequestDTO, UserResponseDTO, useUser} from './index'
import type {TrajetResponseDTO} from '@/compositions/trajet'

interface userState {
    users: UserResponseDTO[]
    loading: boolean
    error: string | null
    currentUserTrajets: Record<number, TrajetResponseDTO[]>
}

const {createUser,getUsers,getUserTrajets} = useUser()

export const useUserStore = defineStore('user', {
    state: (): userState => ({
        users: [],
        loading: false,
        error: null,
        currentUserTrajets: {}
    }),

    getters: {
        /** Accès à la liste des utilisateurs */
        allUsers: (state) => state.users,
        /** Récupère les trajets d’un user par son id */
        getTrajets: (state) => (userId: number) => state.currentUserTrajets[userId] ?? []
    },

    actions: {
        /** Récupère tous les utilisateurs */
        async fetchUsers() {
            this.loading = true
            this.error = null
            try {
                this.users = await getUsers()
            } catch (err: any) {
                this.error = err.message || 'Erreur lors de la récupération des utilisateurs'
            } finally {
                this.loading = false
            }
        },

        /**
         * Crée un nouvel utilisateur
         * @param payload
         */
        async createUser(payload: UserRequestDTO) {
            this.loading = true
            this.error = null
            try {
                const newUser = await createUser(payload)
                // on ajoute l’utilisateur créé à la liste
                this.users.unshift(newUser)
                return newUser
            } catch (err: any) {
                this.error = err.message || 'Erreur lors de la création de l’utilisateur'
                throw err
            } finally {
                this.loading = false
            }
        },

        /**
         * Récupère les trajets d’un utilisateur donné
         * @param userId
         */
        async fetchUserTrajets(userId: number) {
            this.loading = true
            this.error = null
            try {
                const trajets = await getUserTrajets(userId)
                this.currentUserTrajets[userId] = trajets
            } catch (err: any) {
                this.error = err.message || `Erreur lors de la récupération des trajets de l’utilisateur ${userId}`
            } finally {
                this.loading = false
            }
        }
    }
})
