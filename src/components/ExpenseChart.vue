<template>
    <div class="expense-chart">
      <h3>Expense Breakdown by Category</h3>
      <pie-chart :data="chartData" />
    </div>
  </template>
  
  <script>
  import { computed, toRefs } from 'vue';
//   import { useStore } from 'vuex';
  import { Pie } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
  
  // Register required chart.js components
  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
  
  export default {
    name: 'ExpenseChart',
    components: {
      PieChart: Pie
    },
    props: {
      transactions: {
        type: Array,
        required: true
      }
    },
    setup(props) {
      // Access props directly inside setup() to ensure reactivity
      const { transactions } = toRefs(props)
  
      // Group transactions by category
      const categorizedExpenses = computed(() => {
        const categories = ['Food', 'Transportation', 'Bills', 'General'];
        const expensesByCategory = { Food: 0, Transportation: 0, Bills: 0, General: 0 };
  
        transactions.forEach(transaction => {
          if (transaction.amount < 0 && categories.includes(transaction.category)) {
            expensesByCategory[transaction.category] += Math.abs(transaction.amount); // Add expense
          }
        });
  
        return expensesByCategory;
      });
  
      // Prepare data for the chart
      const chartData = computed(() => {
        const labels = Object.keys(categorizedExpenses.value);
        const data = Object.values(categorizedExpenses.value);
  
        return {
          labels,
          datasets: [
            {
              data,
              backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F1C40F'],
              hoverBackgroundColor: ['#FF7043', '#66BB6A', '#42A5F5', '#F39C12']
            }
          ]
        };
      });
  
      return {
        chartData
      };
    }
  };
  </script>
  
  <style scoped>
  .expense-chart {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    margin: 20px 0;
  }
  
  h3 {
    text-align: center;
    margin-bottom: 15px;
  }
  </style>
  