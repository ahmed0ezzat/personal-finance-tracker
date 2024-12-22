<template>
  <div class="financial-summary-view">
    <h2>Financial Summary & Charts</h2>
    <button @click="navigateToAddTransactions" class="add-transactions">
      Add More Transactions
    </button>
    <financial-summary />
    <expense-chart />
  </div>
</template>

<script setup>
import FinancialSummary from "../components/FinancialSummary.vue";
import ExpenseChart from "../components/ExpenseChart.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToAddTransactions = () => {
  router.push("/");
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
