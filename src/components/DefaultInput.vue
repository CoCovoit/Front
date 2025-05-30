<template>
	<FloatLabel variant="on" class="w-full">
		<IconField>
			<InputIcon :class="icon" />

			<!-- composant interne choisi dynamiquement -->
			<component
					:is="innerComponent"
					v-model="innerValue"
					:id="computedId"
					v-bind="innerProps"
					class="w-full"
					autocomplete="off"
			/>
		</IconField>

		<label :for="computedId">{{ label }}</label>
	</FloatLabel>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import FloatLabel  from 'primevue/floatlabel';
import IconField   from 'primevue/iconfield';
import InputIcon   from 'primevue/inputicon';
import InputText   from 'primevue/inputtext';
import DatePicker  from 'primevue/datepicker';

/* ------------------------------------------------------------------ */
/*  Props & emits                                                     */
/* ------------------------------------------------------------------ */
interface Props {
	/** Modèle (v-model) */
	modelValue: string | Date | null;
	/** Texte de l’étiquette */
	label: string;
	/** Icône PrimeIcons (ex. 'pi pi-search') */
	icon?: string;
	/**
	 * Type de champ :
	 *  'text'      → InputText
	 *  'date'      → DatePicker (date seule)
	 *  'time'      → DatePicker (timeOnly)
	 *  'datetime'  → DatePicker (date + heure)
	 */
	type?: 'text' | 'date' | 'time' | 'datetime';
	/** ID HTML (auto-généré si omis) */
	id?: string;
	/** Props supplémentaires passées au composant interne */
	inputProps?: Record<string, unknown>;
}

const props = withDefaults(defineProps<Props>(), {
	type: 'text',
	icon: 'pi pi-pencil',
	inputProps: () => ({})
});

// Signature correcte : on indique que "update:modelValue" émet une valeur string | Date | null
const emit = defineEmits<{
	(e: 'update:modelValue', value: string | Date | null): void
}>();

/* ------------------------------------------------------------------ */
/*  v-model proxy                                                     */
/* ------------------------------------------------------------------ */
const innerValue = computed<string | Date | null>({
	get: () => props.modelValue,
	set: (val) => emit('update:modelValue', val)
});

/* ------------------------------------------------------------------ */
/*  Choix du composant et réglages par type                           */
/* ------------------------------------------------------------------ */
const innerComponent = computed(
		() => props.type === 'text' ? InputText : DatePicker
);

// On utilise Record<string, unknown> plutôt que any,
// pour conserver l'objet libre mais non typé en détail
const innerProps = computed<Record<string, unknown>>(() => {
	const extra = props.inputProps ?? {};
	switch (props.type) {
		case 'date':
			return { dateFormat: 'dd/mm/yy', ...extra };
		case 'time':
			return { timeOnly: true, hourFormat: '24', ...extra };
		case 'datetime':
			return { showTime: true, hourFormat: '24', ...extra };
		default:
			return extra; // text
	}
});

/* ------------------------------------------------------------------ */
/*  ID unique si non fourni                                           */
/* ------------------------------------------------------------------ */
const computedId = computed<string>(() =>
		props.id
				? props.id
				: `${props.label.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).slice(2, 7)}`
);
</script>

<style scoped>
/* Aucun style supplémentaire : tout est géré par PrimeVue/PrimeFlex.
   Ajoute ici tes micro-ajustements si besoin. */
</style>
