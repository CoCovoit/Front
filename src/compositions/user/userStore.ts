// src/stores/user.ts
import {defineStore} from 'pinia'
import { UserResponseDTO, useUser} from './index'
import type {TrajetResponseDTO} from '@/compositions/trajet'

interface userState {
    currentUser: UserResponseDTO | null
    loading: boolean
    error: string | null
    currentUserTrajets: Record<number, TrajetResponseDTO[]>
}




const {getUsers,getUserTrajets} = useUser()

export const useUserStore = defineStore('user', {
    state: (): userState => ({
        currentUser: null,
        loading: false,
        error: null,
        currentUserTrajets: {}
    }),

    getters: {
        /** Accès à la liste des utilisateurs */
        currentUser: (state) => state.currentUser,
        /** Récupère les trajets d’un user par son id */
        getTrajets: (state) => (userId: number) => state.currentUserTrajets[userId] ?? []
    },

    actions: {
        /** Récupère tous les utilisateurs */
        // async fetchUsers() {
        //     this.loading = true
        //     this.error = null
        //     try {
        //         this.users = await getUsers()
        //     } catch (err: any) {
        //         this.error = err.message || 'Erreur lors de la récupération des utilisateurs'
        //     } finally {
        //         this.loading = false
        //     }
        // },

        /**
         * Récupère un utilisateur via son email
         */
        async fetchUserByEmail() {
            this.loading = true
            this.error = null
            try {
                // on récupère d’abord tous les users
                const all = await getUsers()
                const found = all.find(u => u.email === userEmail)
                if (!found) {
                    throw new Error(`Aucun utilisateur trouvé pour l’email : ${userEmail}`)
                }
                this.currentUser = found
            } catch (err: any) {
                this.error = err.message || `Erreur lors de la recherche de l’utilisateur ${userEmail}`
                this.currentUser = null
            } finally {
                this.loading = false
            }
        },

        /**
         * Crée un nouvel utilisateur
         * @param payload
         */
        // async createUser(payload: UserRequestDTO) {
        //     this.loading = true
        //     this.error = null
        //     try {
        //         const newUser = await createUser(payload)
        //         // on ajoute l’utilisateur créé à la liste
        //         this.users.unshift(newUser)
        //         return newUser
        //     } catch (err: any) {
        //         this.error = err.message || 'Erreur lors de la création de l’utilisateur'
        //         throw err
        //     } finally {
        //         this.loading = false
        //     }
        // },

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
