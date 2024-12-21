<template>
    <div class="financial-summary">
      <h3>Financial Summary</h3>
      <div class="summary-item">
        <span>Total Income:</span>
        <span class="amount">{{ totalIncome }}</span>
      </div>
      <div class="summary-item">
        <span>Total Expenses:</span>
        <span class="amount">{{ totalExpenses }}</span>
      </div>
      <div class="summary-item">
        <span>Net Balance:</span>
        <span class="amount">{{ netBalance }}</span>
      </div>
    </div>
  </template>
  
  <script>
  import { computed, toRefs } from 'vue';
//   import { useStore } from 'vuex';
  
  export default {
    name: 'FinancialSummary',
    props: {
      transactions: {
        type: Array,
        required: true
      }
    },
    setup(props) {
     const { transactions } = toRefs(props);
  
      // Calculate total income
      const totalIncome = computed(() => {
        return transactions
          .filter(transaction => transaction.amount > 0)
          .reduce((sum, transaction) => sum + transaction.amount, 0);
      });
  
      // Calculate total expenses
      const totalExpenses = computed(() => {
        return transactions
          .filter(transaction => transaction.amount < 0)
          .reduce((sum, transaction) => sum + transaction.amount, 0);
      });
  
      // Calculate net balance
      const netBalance = computed(() => {
        return totalIncome.value + totalExpenses.value;
      });
  
      return {
        totalIncome,
        totalExpenses,
        netBalance
      };
    }
  };
  </script>
  
  <style scoped>
  .financial-summary {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    margin: 20px 0;
  }
  
  h3 {
    text-align: center;
    margin-bottom: 15px;
  }
  
  .summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .amount {
    font-weight: bold;
    color: #333;
  }
  </style>
  