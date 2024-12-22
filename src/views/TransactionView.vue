<template>
  <div class="transaction-view">
    <button @click="openAddTransactionModal" class="add-btn">
      Add Transaction
    </button>

    <!-- Display all transactions-->
    <TransactionList
      :transactionToEdit="selectedTransaction"
      @edit-transaction="openEditTransactionModal"
    />

    <!-- Add/Edit Transaction Modal -->
    <TransactionModal
      :isVisible="isModalOpen"
      :transactionToEdit="selectedTransaction"
      @close="closeModal"
      @add-transaction="saveTransaction"
      @edit-transaction="saveTransaction"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import TransactionModal from "../components/TransactionModal.vue";
import TransactionList from "../components/TransactionList.vue";

const store = useStore();

const isModalOpen = ref(false);
const selectedTransaction = ref(null);

// Open modal to add new transaction
const openAddTransactionModal = () => {
  selectedTransaction.value = null;
  isModalOpen.value = true;
};

// Open modal to edit an existing transaction
const openEditTransactionModal = (transaction) => {
  selectedTransaction.value = { ...transaction }; // Pass a copy of the transaction
  isModalOpen.value = true;
};

// Close modal
const closeModal = () => {
  isModalOpen.value = false;
};

// Save or update a transaction
const saveTransaction = (transaction) => {
  if (transaction.id) {
    store.dispatch("transactions/editTransaction", transaction); // Edit transaction
  } else {
    store.dispatch("transactions/addTransaction", transaction); // Add new transaction
  }
  closeModal();
};
</script>

<style scoped>
/* Add your custom styles here */
.add-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
}
</style>
