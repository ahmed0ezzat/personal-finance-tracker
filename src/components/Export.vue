<template>
  <div>
    <button class="export" @click="exportCSV">Export to CSV</button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const exportCSV = () => {
  const transactions = computed(
    () => store.getters["transactions/allTransactions"]
  );
  let csvContent = "ID,Amount,Category,Date,Currency\n";
  transactions.value.forEach((transaction) => {
    csvContent += `${transaction.id},${transaction.amount},${transaction.category},${transaction.date},${transaction.currency}\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "transactions.csv";
  link.click();
};
</script>
<style scoped>
.export {
  margin-bottom: 15px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  color: #4caf51;
  font-size: 14px;
}
</style>
