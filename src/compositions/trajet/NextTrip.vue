<template>
    <div>
        <div class="next-trip-container">
            <div class="next-trip-left"></div>
            <div class="next-trip-middle">
                <span class="next-trip-middle-date">{{ getRelativeDate(trajet.date) }} à {{ trajet.heureDebut }} {{ console.log(trajet) }}</span>
                <span class="next-trip-middle-depart-arrivee">{{ trajet.adresseDepart }} → {{ trajet.adresseArrivee }}</span>
                <span class="next-trip-middle-places"> - {{ trajet.passagers.length }} / {{ trajet.nombreDePassagersMax }}</span>
            </div>
            <div class="next-trip-right">
                <Button class="next-trip-button danger" label="Annuler" />
                <Button class="next-trip-button" label="Voir les détails" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Trajet } from './index';
import Button from 'primevue/button';
import { getRelativeDate } from '@/utils/dateUtils';
import { defineProps } from 'vue';


defineProps<{
    trajet: Trajet;
}>();


</script>

<style scoped lang="scss">
.next-trip-container {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-radius: 10px;
    align-items: flex-end;

    .next-trip-left {
        width: 26px;
        
        background-color: #CBD5E1;
        border-radius: 10px;


    }

    .next-trip-middle {
        display: flex;
        flex-direction: column;
        width: 100%;

        .next-trip-middle-date {
            font-size: 14px;
            font-weight: 400;
            color: #64748B;
        }

        .next-trip-middle-depart-arrivee {
            font-size: 16px;
            font-weight: 500;
            color: #000;
        }

        .next-trip-middle-places {
            font-size: 14px;
            font-weight: 400;
            color: #64748B;
        }
    }

    .next-trip-right {
        display: flex;
        width: 100%;
        justify-content: flex-end;
        gap: 10px;

        .next-trip-button {
            border: 1px solid #CBD5E1;
            background-color: transparent;
            color: #000;
            border-radius: 6px;
            padding: 9px 16px;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.2s ease-in-out;

            &:hover {
                background-color: #CBD5E1;
                transform: translateY(-2px);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            &:active {
                transform: translateY(0);
                box-shadow: none;
            }
        }
        .next-trip-button.danger {
            border: none;
            background-color: #FEF2F2;
            color: #DC2626;

            &:hover {
                background-color: #FEE2E2;
                color: #B91C1C;
                box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);
            }

            &:active {
                transform: translateY(0);
                box-shadow: none;
            }
        }

    }

}
</style>
