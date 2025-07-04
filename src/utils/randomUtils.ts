import {carModels} from "@/data/enumCarModel.ts";

/**
 * Retourne un entier aléatoire entre 0 et max (inclus).
 * Oui je sais c'est du fake, mais c'est pratique
 *
 * @param max - Valeur maximale (doit être >= 0)
 */
export function randint(max: number): number {
    if (max < 0 || !Number.isFinite(max)) {
        throw new Error("Le paramètre max doit être un nombre fini ≥ 0");
    }
    return Math.floor(Math.random() * (max + 1));
}

/**
 * Retourne au hasard un modèle parmi les 100 listés.
 * @returns {string} Le nom du modèle sélectionné.
 */
export function getRandomCarModel(): string {
    const randomIndex = Math.floor(Math.random() * carModels.length);
    return carModels[randomIndex];
}
