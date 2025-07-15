// src/stores/user.ts
import { defineStore } from 'pinia'
import { UserResponseDTO, useUser } from './index'
import {
    TrajetRequestDTO,
    TrajetResponseDTO,
    useTrajet
} from '@/compositions/trajet'
import {ReservationRequestDTO, ReservationResponseDTO, useReservation} from "@/compositions/Reservation";

interface userState {
    currentUser: UserResponseDTO | null
    loading: boolean
    error: string | null
    currentUserTrajets: TrajetResponseDTO[]
}

const { getUsers, getUserTrajets } = useUser()
const { createReservation } = useReservation()
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
            catch (err: unknown) {
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
            catch (err: unknown) {
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
            } catch (err: unknown) {
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
            catch (err: unknown) {
                this.error = err.message
            }
            finally {
                this.loading = false
            }
        },
        /**
         * Réserve une place : on stocke directement le trajet réservé
         */
        async reserveTrajet(trajetId: number): Promise<ReservationResponseDTO> {
            if (!this.currentUser) {
                throw new Error('Aucun utilisateur connecté')
            }
            this.loading = true
            this.error = null

            try {
                const payload: ReservationRequestDTO = {
                    utilisateurId: this.currentUser.id,
                    trajetId
                }
                const resa = await createReservation(payload)
                // On insère le trajet renvoyé par l'API en tête de currentUserTrajets
                this.currentUserTrajets.unshift(resa.trajet)
                return resa
            }
            catch (err: unknown) {
                this.error = (err as Error).message || 'Erreur lors de la réservation'
                throw err
            }
            finally {
                this.loading = false
            }
        },
        async cancelReservation(trajetId: number): Promise<void> {
            if (!this.currentUser) {
                throw new Error('Aucun utilisateur connecté')
            }
            this.loading = true
            this.error = null

            try {
                // On filtre simplement la liste pour retirer le trajet annulé
                this.currentUserTrajets = this.currentUserTrajets.filter(
                    t => t.id !== trajetId
                )
            }
            catch (err: unknown) {
                this.error = (err as Error).message || 'Erreur lors de l\'annulation de la réservation'
                throw err
            }
            finally {
                this.loading = false
            }
        },
        /**
         * MàJ front-only d'un trajet déjà en state (prototype)
         */
        async updateUserTrajet(updated: TrajetResponseDTO): Promise<void> {
            if (!this.currentUser) {
                throw new Error('Aucun utilisateur connecté')
            }
            this.loading = true
            this.error = null

            try {
                const idx = this.currentUserTrajets.findIndex(t => t.id === updated.id)
                if (idx === -1) {
                    throw new Error(`Trajet non trouvé (id=${updated.id})`)
                }
                // on remplace l'ancien trajet par le nouveau
                this.currentUserTrajets.splice(idx, 1, updated)
            }
            catch (err: unknown) {
                this.error = (err as Error).message || 'Erreur lors de la mise à jour du trajet'
                throw err
            }
            finally {
                this.loading = false
            }
        }
    }
})
