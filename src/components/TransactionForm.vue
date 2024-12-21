<template>
  <div class="transaction-form">
    <h2>Add Transaction</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="amount">Amount</label>
        <input
          type="number"
          id="amount"
          v-model="amount"
          placeholder="Enter amount"
          required
        />
      </div>

      <div class="form-group">
        <label for="category">Category</label>
        <select id="category" v-model="category" required>
          <option disabled value="">Select category</option>
          <option v-for="(name, index) in categories" :key="index" :value="name">
            {{ name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="date">Date</label>
        <input
          type="date"
          id="date"
          v-model="date"
          required
        />
      </div>

      <div class="form-group">
        <label for="currency">Currency</label>
        <select id="currencies" v-model="currency" required>
          <option v-for="(name, index) in currencies" :key="index" :value="name">
            {{ name }}
          </option>
        </select>
      </div>

      <button type="submit" :disabled="isSubmitting">Add Transaction</button>

      <div v-if="conversionError" class="error-message">
        <p>Error fetching exchange rate. Please try again later.</p>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'TransactionForm',
  setup() {
    const store = useStore();

    // Form fields
    const amount = ref('');
    const category = ref('');
    const date = ref('');
    const currency = ref('USD'); // Default currency
    const isSubmitting = ref(false);
    const conversionError = ref(false);
    

    // Categories available for transactions
    const categories = ['Food', 'Transportation', 'Bills', 'General'];

    // Currencies available from the Vuex store
    const currencies = computed(() => store.getters['transactions/allAvailableCurrencies']);
    const exchangeRates = computed(() => store.getters['transactions/exchangeRates']);

    // Submit form method
    const submitForm = async () => {
      isSubmitting.value = true;
      conversionError.value = false;

      if (amount.value === null) {
        conversionError.value = true;
        isSubmitting.value = false;
        return;
      }
      // Create the transaction object
      const transaction = {
        amount: amount.value,
        category: category.value,
        date: date.value,
        currency: currency.value,
        type: amount.value >= 0 ? 'income' : 'expense',
      };

      // Dispatch action to store the transaction
      store.dispatch('transactions/addTransaction', transaction)
        .catch(() => {
          conversionError.value = true;
        })
        .finally(() => {
          isSubmitting.value = false;
          amount.value = '';
          category.value = '';
          date.value = '';
          currency.value = 'USD';
        });
    };


    return {
      amount,
      category,
      date,
      currency,
      categories,
      isSubmitting,
      conversionError,
      submitForm,
      currencies,
      exchangeRates
    };
  }
};
</script>

<style scoped>
.transaction-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
