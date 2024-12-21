<template>
    <div class="financial-summary-view">
      <h2>Financial Summary & Charts</h2>
      <financial-summary :transactions="transactions" />
      <expense-chart :transactions="transactions" />
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import FinancialSummary from '../components/FinancialSummary.vue';
  import ExpenseChart from '../components/ExpenseChart.vue';
  
  export default {
    name: 'FinancialSummaryView',
    components: {
      FinancialSummary,
      ExpenseChart
    },
    setup() {
      const store = useStore();
      const transactions = computed(() => store.getters['transactions/allTransactions']);
      
      return {
        transactions
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  