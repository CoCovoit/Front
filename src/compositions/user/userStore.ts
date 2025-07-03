// src/stores/user.ts
import { defineStore } from 'pinia'
import { UserResponseDTO, useUser } from './index'
import {
    TrajetRequestDTO,
    TrajetResponseDTO,
    useTrajet
} from '@/compositions/trajet'

interface userState {
    currentUser: UserResponseDTO | null
    loading: boolean
    error: string | null
    currentUserTrajets: TrajetResponseDTO[]
}

const { getUsers, getUserTrajets } = useUser()
const { createTrajets } = useTrajet()

export const useUserStore = defineStore('user', {
    state: (): userState => ({
        currentUser: null,
        loading: false,
        error: null,
        currentUserTrajets: []
    }),

    getters: {
        currentUserTrajetsList: (state) => state.currentUserTrajets
    },

    actions: {
        async fetchUserByEmail(userEmail: string) {
            this.loading = true
            this.error = null
            try {
                const all = await getUsers()
                const found = all.find(u => u.email === userEmail) as UserResponseDTO | undefined

                if (!found) {
                    throw new Error(`Aucun utilisateur trouvé pour l’email : ${userEmail}`)
                }

                this.currentUser = found
            }
            catch (err: any) {
                this.error = err.message
                this.currentUser = null
            }
            finally {
                this.loading = false
            }
        },

        async fetchUserAndTrajetByEmail(userEmail: string) {
            this.loading = true
            this.error = null

            try {
                const all = await getUsers()
                const found = all.find(u => u.email === userEmail) as UserResponseDTO | undefined

                if (!found) {
                    throw new Error(`Aucun utilisateur trouvé pour l’email : ${userEmail}`)
                }

                this.currentUser = found
                this.currentUserTrajets = await getUserTrajets(found.id)
            }
            catch (err: any) {
                this.error = err.message
                this.currentUser = null
                this.currentUserTrajets = []
            }
            finally {
                this.loading = false
            }
        },

        /**
         * Crée un trajet
         */
        async createUserTrajet(payload: TrajetRequestDTO): Promise<TrajetResponseDTO> {
            this.loading = true
            this.error = null

            try {
                const newTrajet = await createTrajets(payload)
                if (this.currentUser && this.currentUser.id === +payload.conducteurId) {
                    this.currentUserTrajets.unshift(newTrajet)
                } else {
                    this.currentUserTrajets.push(newTrajet)
                }
                return newTrajet
            } catch (err: any) {
                this.error = err.message || 'Erreur lors de la création du trajet'
                throw err
            } finally {
                this.loading = false
            }
        },

        async fetchUserTrajets(userId: number) {
            this.loading = true
            this.error = null
            try {
                this.currentUserTrajets = await getUserTrajets(userId)
            }
            catch (err: any) {
                this.error = err.message
            }
            finally {
                this.loading = false
            }
        }
    }
})
