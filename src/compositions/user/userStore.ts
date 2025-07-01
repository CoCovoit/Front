// src/stores/user.ts
import {defineStore} from 'pinia'
import { UserResponseDTO, useUser} from './index'
import type {TrajetResponseDTO} from '@/compositions/trajet'

interface userState {
    currentUser: UserResponseDTO | null
    loading: boolean
    error: string | null
    currentUserTrajets: TrajetResponseDTO[]
}




const {getUsers,getUserTrajets} = useUser()

export const useUserStore = defineStore('user', {
    state: (): userState => ({
        currentUser: null,
        loading: false,
        error: null,
        currentUserTrajets: []
    }),

    getters: {
        /** Accès à la liste des utilisateurs */
        // currentUser: (state) => state.currentUser,
        /** Récupère les trajets d’un user par son id */
        currentUserTrajetsList: (state) => state.currentUserTrajets
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
        async fetchUserByEmail(userEmail:string) {
            this.loading = true
            this.error = null
            try {
                // on récupère d’abord tous les users
                console.log('fetchUserByEmail userEmail',userEmail)
                const all = await getUsers()
                const found = all.find(u => u.email === userEmail) as UserResponseDTO | undefined
                console.log('fetchUserByEmail found',found)
                if (!found) {
                    throw new Error(`Aucun utilisateur trouvé pour l’email : ${userEmail}`)
                }
                this.currentUser = found

                console.log('fetchUserByEmail currentUser', this.currentUser)
            } catch (err: any) {
                this.error = err.message || `Erreur lors de la recherche de l’utilisateur ${userEmail}`
                this.currentUser = null
            } finally {
                this.loading = false
            }
        },

        async fetchUserAndTrajetByEmail(userEmail: string) {
            this.loading = true
            this.error   = null

            try {
                // 1. Récupère tous les users et trouve celui par email
                const all   = await getUsers()
                const found = all.find(u => u.email === userEmail) as UserResponseDTO | undefined

                if (!found) {
                    throw new Error(`Aucun utilisateur trouvé pour l’email : ${userEmail}`)
                }

                // 2. On stocke l’utilisateur
                this.currentUser = found

                // 3. On récupère ses trajets et on remplace le tableau
                const trajets = await getUserTrajets(found.id)
                this.currentUserTrajets = trajets
            }
            catch (err: any) {
                // En cas d’erreur (user ou trajets), on réinitialise
                this.error               = err.message
                this.currentUser         = null
                this.currentUserTrajets  = []
            }
            finally {
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
