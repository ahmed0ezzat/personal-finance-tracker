<template>
    <div class="financial-summary-view">
      <h2>Financial Summary & Charts</h2>
      <button @click="navigateToAddTransactions" class="add-transactions">Add More Transactions</button>
      <financial-summary />
      <expense-chart />
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import FinancialSummary from '../components/FinancialSummary.vue';
  import ExpenseChart from '../components/ExpenseChart.vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'FinancialSummaryView',
    components: {
      FinancialSummary,
      ExpenseChart
    },
    setup() {
      const store = useStore();
      const router = useRouter();
      const transactions = computed(() => store.getters['transactions/allTransactions']);
      

      const navigateToAddTransactions = () => {
        router.push('/');
     };

      return {
        transactions,
        navigateToAddTransactions
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  .add-transactions {
    margin-bottom: 15px;
    background: transparent;
    border: none;
    cursor: pointer;
    text-decoration: underline;
    color: #4caf51;
    font-size: 14px;
  }
  </style>
  