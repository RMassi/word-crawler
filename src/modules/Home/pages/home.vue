<template>
  <div>
    <v-form ref="form">
      <div class="searchbar">
          <div class="input-container">
            <v-icon small>fa-search</v-icon>
            <v-text-field hide-details height="35" class="text-field" v-model="model.search" :rules="[rules.required]"></v-text-field>
          </div>
          <div class="button-container">
            <v-btn outlined @click="search">Buscar</v-btn>
          </div>
      </div>
    </v-form>
    <chart :items="wordSynonymsDataClone"></chart>
    <v-overlay :value="loader">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import Chart from '@/modules/Shared/chart.vue'

// import Card from '@/modules/Shared/components/card/card.vue'
// import FormHeader from '@/modules/Shared/components/form-header/form-header.vue'

export default {
  name: 'Home',
  components: {
    Chart
    // Card,
    // FormHeader,
  },
  data() {
    return {
      model: {
        search: ''
      },
      rules: {
        required: v => !!v || 'Field required'
      }
    }
  },
  computed: {
    ...mapGetters('wordSynonyms', [
      'wordSynonymsData',
      'loader',
    ]),
    wordSynonymsDataClone() {
      return cloneDeep(this.wordSynonymsData)
    }
  },
  methods: {
    ...mapActions('wordSynonyms', [
      'get'
    ]),
    search() {
      if (this.$refs.form.validate()) {
          // TODO - Passar valor de busca
        this.get(this.model.search)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .searchbar {
    width: 100%;
    height: 50px;
    background-color: #E0E0E0;
    display: flex;
    flex-direction: row;
    padding: 0 30px;

    .input-container {
      flex-grow: 1;
      display: flex;
      flex-direction: row;

      .text-field {
        flex-grow: 1;
        padding-top: 0;
        font-size: 20px;
        margin: 0 8px;
        -webkit-appearance: none;
        outline: none;
      }
    }

    .input-container, .button-container {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
</style>
