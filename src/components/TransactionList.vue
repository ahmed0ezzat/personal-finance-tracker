<template>
  <div class="transaction-list">
    <div v-if="filteredTransactions.length">
      <h2>Transactions</h2>
      <button @click="navigateToSummary" class="financial-display">
        Display Your Financial Summary
      </button>
      <Export />
    </div>
    <TransactionFilter
      v-if="transactions.length > 0"
      @update-filters="updateFilters"
    />
    <div v-if="filteredTransactions.length === 0" class="no-transactions">
      <p>No transactions to display. Start adding some.</p>
    </div>
    <ul v-else>
      <li
        v-for="transaction in filteredTransactions"
        :key="transaction.id"
        class="transaction-item"
        :class="transaction.amount > 0 ? 'income' : 'expense'"
      >
        <div class="transaction-details">
          <span class="category">{{ transaction.category }}</span>
          <span class="amount"
            >{{ transaction.amount < 0 ? "-" : "" }}${{
              Math.abs(transaction.amount)
            }}</span
          >
          <span class="date">{{ formatDate(transaction.date) }}</span>
        </div>
        <div class="transaction-actions">
          <button @click="editTransaction(transaction)" class="edit-btn">
            Edit
          </button>
          <button @click="confirmDelete(transaction.id)" class="delete-btn">
            Delete
          </button>
        </div>
      </li>
    </ul>

    <!-- Confirmation Popup -->
    <div v-if="showConfirmDelete" class="confirm-delete-popup">
      <div class="popup-content">
        <p>Are you sure you want to delete this transaction?</p>
        <button @click="cancelDelete" class="cancel-btn">No</button>
        <button
          @click="deleteTransaction(selectedTransactionId)"
          class="confirm-btn"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import TransactionFilter from "./TransactionFilter.vue";
import Export from "./Export.vue";
import { useRouter } from "vue-router";

// eslint-disable-next-line no-undef
const emit = defineEmits(["edit-transaction"]);
const store = useStore();
const router = useRouter();

// Delete confirmation state
const showConfirmDelete = ref(false);
const selectedTransactionId = ref(null);
const filters = ref({ startDate: "", endDate: "", category: "" });

// Get all transactions from Vuex store
const transactions = computed(
  () => store.getters["transactions/allTransactions"]
);

const filteredTransactions = computed(() => {
  return transactions.value.filter((transaction) => {
    const isWithinDateRange =
      (!filters.value.startDate ||
        new Date(transaction.date) >= new Date(filters.value.startDate)) &&
      (!filters.value.endDate ||
        new Date(transaction.date) <= new Date(filters.value.endDate));
    const matchesCategory =
      !filters.value.category ||
      transaction.category === filters.value.category;
    return isWithinDateRange && matchesCategory;
  });
});

const navigateToSummary = () => {
  router.push("/financial-summary");
};
const updateFilters = (newFilters) => {
  filters.value = newFilters;
};

// Delete a transaction
const deleteTransaction = (id) => {
  store.dispatch("transactions/deleteTransaction", id);
  showConfirmDelete.value = false;
};

// Edit a transaction
const editTransaction = (transaction) => {
  emit("edit-transaction", transaction);
};

// Show delete confirmation popup
const confirmDelete = (id) => {
  selectedTransactionId.value = id;
  showConfirmDelete.value = true;
};

// Cancel delete action
const cancelDelete = () => {
  showConfirmDelete.value = false;
  selectedTransactionId.value = null;
};

// Format date to a more user-friendly format (e.g., 'MM/DD/YYYY')
const formatDate = (date) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
.transaction-list {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  margin-bottom: 5px;
}
.financial-display {
  margin-bottom: 15px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  color: #4caf51;
  font-size: 14px;
}

.no-transactions {
  text-align: center;
  font-size: 18px;
  color: #888;
}

ul {
  list-style: none;
  padding: 0;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
}

.transaction-item.income {
  background: #e9f4e9;
}
.transaction-item.expense {
  background: #f2e7e7;
}
.transaction-details {
  display: flex;
  justify-content: space-between;
  width: 70%;
}

.category {
  font-weight: bold;
}

.amount {
  color: #333;
}

.date {
  color: #888;
}

.transaction-actions button {
  padding: 5px 10px;
  margin-left: 5px;
  font-size: 14px;
  cursor: pointer;
}

.edit-btn {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}

.delete-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
}

.edit-btn:hover {
  background-color: #0056b3;
}

.delete-btn:hover {
  background-color: #cc0000;
}

.edit-field {
  width: 150px;
  padding: 5px;
  margin: 5px;
}

.save-btn {
  background-color: #28a745;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #ccc;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 3px;
}

.save-btn:hover {
  background-color: #218838;
}

.cancel-btn:hover {
  background-color: #aaa;
}

.confirm-delete-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.confirm-btn {
  background-color: #007bff;
  color: white;
  padding: 6px 15px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 3px;
}

.cancel-btn {
  background-color: #ccc;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-btn:hover {
  background-color: #0056b3;
}

.cancel-btn:hover {
  background-color: #aaa;
}
</style>
