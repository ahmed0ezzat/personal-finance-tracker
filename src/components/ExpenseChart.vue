<template>
  <div class="expense-chart" v-if="!noExpenses">
    <h3>Expense Breakdown by Category</h3>
    <pie-chart :data="chartData" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

// Register required chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
const store = useStore();
const transactions = computed(
  () => store.getters["transactions/allTransactions"]
);

// Group transactions by category
const categorizedExpenses = computed(() => {
  const categories = ["food", "transportation", "bills", "general"];
  const expensesByCategory = {
    Food: 0,
    Transportation: 0,
    Bills: 0,
    General: 0,
  };

  transactions.value.forEach((transaction) => {
    if (
      transaction.amount < 0 &&
      categories.includes(transaction.category.toLowerCase())
    ) {
      expensesByCategory[transaction.category] += Math.abs(transaction.amount); // Add expense
    }
  });
  return expensesByCategory;
});
const noExpenses = Object.values(categorizedExpenses.value).every(
  (v) => v === 0
);

// Prepare data for the chart
const chartData = computed(() => {
  const labels = Object.keys(categorizedExpenses.value);
  const data = Object.values(categorizedExpenses.value);

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#F1C40F"],
        hoverBackgroundColor: ["#FF7043", "#66BB6A", "#42A5F5", "#F39C12"],
      },
    ],
  };
});

// Register the PieChart component locally
const PieChart = Pie;
</script>

<style scoped>
.expense-chart {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h3 {
  text-align: center;
  margin-bottom: 15px;
}
</style>
