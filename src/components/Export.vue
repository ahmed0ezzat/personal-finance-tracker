<template>
    <div>
      <button @click="exportCSV">Export to CSV</button>
    </div>
  </template>
  
  <script>
  import { useStore } from 'vuex';
  
  export default {
    name: 'Export',
    setup() {
      const store = useStore();
  
      const exportCSV = () => {
        const transactions = store.getters['transactions.allTransactions'];
        let csvContent = 'ID,Amount,Category,Date,Currency\n';
        transactions.forEach(transaction => {
          csvContent += `${transaction.id},${transaction.amount},${transaction.category},${transaction.date},${transaction.currency}\n`;
        });
  
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'transactions.csv';
        link.click();
      };
  
      return {
        exportCSV,
      };
    }
  };
  </script>
  