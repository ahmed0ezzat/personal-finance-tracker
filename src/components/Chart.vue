<template>
  <div>
    <h3>Expense Distribution by Category</h3>
    <PieChart v-if="chartData" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Registering the necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

export default defineComponent({
  components: {
    PieChart: Pie
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    // Preparing chart data to be used in the chart component
    const chartData = computed(() => {
      return {
        labels: props.data.map(item => item.name),  // Extracting category names
        datasets: [
          {
            label: 'Expenses by Category',
            data: props.data.map(item => item.value),  // Extracting category values
            backgroundColor: [
              '#FF5733', '#33FF57', '#3357FF', '#FF33A1' // Color for each category
            ],
            borderColor: '#FFFFFF',
            borderWidth: 2
          }
        ]
      };
    });

    // Chart options
    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Expense Distribution by Category'
        }
      }
    };

    return {
      chartData,
      chartOptions
    };
  }
});
</script>

<style scoped>
/* Styling for the chart component */
h3 {
  text-align: center;
  margin-bottom: 20px;
}

canvas {
  max-width: 100%;
  margin: 0 auto;
  display: block;
}
</style>
