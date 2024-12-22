<template>
  <div class="financial-summary">
    <h3>Financial Summary</h3>
    <div class="summary-item">
      <span>Total Income:</span>
      <span class="amount positive"
        >{{ totalIncome }} <span class="currency">/USD</span></span
      >
    </div>
    <div class="summary-item">
      <span>Total Expenses:</span>
      <span class="amount negative"
        >{{ Math.abs(totalExpenses) }} <span class="currency">/USD</span></span
      >
    </div>
    <div class="summary-item">
      <span>Net Balance:</span>
      <span class="amount positive"
        >{{ netBalance }} <span class="currency">/USD</span></span
      >
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

// Calculate total income
const totalIncome = computed(() => store.getters["transactions/totalIncome"]);

// Calculate total expenses
const totalExpenses = computed(
  () => store.getters["transactions/totalExpenses"]
);

// Calculate net balance
const netBalance = computed(() => store.getters["transactions/netBalance"]);
</script>

<style scoped>
.financial-summary {
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

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.amount {
  font-weight: bold;
  color: #333;
}
.amount.negative {
  color: red;
}

.amount.positive {
  color: green;
}
.amount .currency {
  color: #333;
  font-size: 10px;
}
</style>
