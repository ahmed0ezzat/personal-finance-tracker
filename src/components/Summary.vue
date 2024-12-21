<template>
  <div class="summary">
    <h2>Financial Summary</h2>
    <div class="summary-item">
      <span class="label">Total Income:</span>
      <span class="value">${{ totalIncome }}</span>
    </div>
    <div class="summary-item">
      <span class="label">Total Expenses:</span>
      <span class="value">${{ totalExpenses }}</span>
    </div>
    <div class="summary-item">
      <span class="label">Net Balance:</span>
      <span class="value">{{ netBalance < 0 ? '-' : '' }}${{ Math.abs(netBalance) }}</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Summary',
  setup() {
    const store = useStore();

    // Computed properties for total income, total expenses, and net balance
    const totalIncome = computed(() => store.getters['transactions/totalIncome']);
    const totalExpenses = computed(() => store.getters['transactions/totalExpenses']);
    const netBalance = computed(() => store.getters['transactions/netBalance']);

    return {
      totalIncome,
      totalExpenses,
      netBalance
    };
  }
};
</script>

<style scoped>
.summary {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
}

.summary-item {
  margin: 10px 0;
  font-size: 18px;
}

.label {
  font-weight: bold;
  margin-right: 10px;
}

.value {
  font-size: 20px;
  color: #333;
}

.value.negative {
  color: red;
}

.value.positive {
  color: green;
}
</style>
