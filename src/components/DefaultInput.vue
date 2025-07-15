<template>
  <!-- Si floatLabel est actif, on enveloppe dans FloatLabel -->
  <component
    :is="floatLabel ? FloatLabel : 'div'"
    v-bind="floatLabelProps"
    class="float-label-wrapper"
  >
    <IconField>
      <InputIcon :class="icon" />

      <!-- composant interne choisi dynamiquement -->
      <component
        :is="innerComponent"
        v-model="innerValue"
        :id="computedId"
        v-bind="innerProps"
        class="input-field"
        autocomplete="off"
      />
    </IconField>

    <label style="font-weight: 400" v-if="floatLabel" :for="computedId">{{
      label
    }}</label>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import FloatLabel from "primevue/floatlabel";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import DatePicker from "primevue/datepicker";
import Password from "primevue/password";

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
   *  'password'  → Password (avec masque)
   */
  type?: "text" | "date" | "time" | "datetime" | "password";
  /** ID HTML (auto-généré si omis) */
  id?: string;
  /** Props supplémentaires passées au composant interne */
  inputProps?: Record<string, unknown>;
  /** Si true, utilise FloatLabel pour l’étiquette flottante */
  floatLabel?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  icon: "pi pi-pencil",
  inputProps: () => ({}),
});

// Signature correcte : on indique que "update:modelValue" émet une valeur string | Date | null
const emit = defineEmits<{
  (e: "update:modelValue", value: string | Date | null): void;
}>();

/* ------------------------------------------------------------------ */
/*  v-model proxy                                                     */
/* ------------------------------------------------------------------ */
const innerValue = computed<string | Date | null>({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

/* ------------------------------------------------------------------ */
/*  Choix du composant et réglages par type                           */
/* ------------------------------------------------------------------ */
// Choix du composant interne
const innerComponent = computed(() => {
  switch (props.type) {
    case "password":
      return Password;
    case "date":
      return DatePicker;
    case "time":
      return DatePicker;
    case "datetime":
      return DatePicker;
    default:
      return InputText;
  }
});
// On utilise Record<string, unknown> plutôt que any,
// pour conserver l'objet libre mais non typé en détail
const innerProps = computed<Record<string, unknown>>(() => {
  const extra = props.inputProps ?? {};
  switch (props.type) {
    case "password":
      // on désactive le feedback et on ajoute toggleMask
      return { feedback: false, toggleMask: true, ...extra };
    case "date":
      return { dateFormat: "dd/mm/yy", ...extra };
    case "time":
      return { timeOnly: true, hourFormat: "24", ...extra };
    case "datetime":
      return { showTime: true, hourFormat: "24", ...extra };
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
    : `${props.label.toLowerCase().replace(/\s+/g, "-")}-${Math.random()
        .toString(36)
        .slice(2, 7)}`
);

// Props pour le wrapper FloatLabel/div
const floatLabelProps = computed(() => {
  if (props.floatLabel) {
    return { variant: "on" as const };
  } else {
    // si pas de FloatLabel, on tombe sur un <div>
    return {};
  }
});
</script>

<style scoped lang="scss">
.input-field {
  width: 100%;
  height: 3rem; /* Hauteur standard pour les champs de saisie */
  color: #64748b;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.float-label-wrapper {
  width: 100%;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
:deep(.p-inputtext) {
  color: #64748b;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

/* Aucun style supplémentaire : tout est géré par PrimeVue/PrimeFlex.
   Ajoute ici tes micro-ajustements si besoin. */
</style>
