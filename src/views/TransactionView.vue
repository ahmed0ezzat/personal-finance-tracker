<template>
    <div class="transaction-view">
      <button @click="openAddTransactionModal" class="add-btn">Add Transaction</button>

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
  
  <script>
  import { computed, ref } from 'vue';
  import { useStore } from 'vuex';
  import TransactionModal from '../components/TransactionModal.vue';
  import TransactionList from '../components/TransactionList.vue';
  
  export default {
    name: 'TransactionView',
    components: {
      TransactionModal,
      TransactionList
    },
    emits: ['edit-transaction'],
    setup() {
      const store = useStore();
      const transactions = computed(() => store.getters['transactions/allTransactions']);
      
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
          store.dispatch('transactions/editTransaction', transaction); // Edit transaction
        } else {
          store.dispatch('transactions/addTransaction', transaction); // Add new transaction
        }
        closeModal();
      };
  
      // Delete a transaction
      const deleteTransaction = (id) => {
        store.dispatch('transactions/deleteTransaction', id);
      };
  
      // Confirm delete action
      const confirmDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
          deleteTransaction(id);
        }
      };
  
      // Format date to a more user-friendly format
      const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString(undefined, options);
      };

      return {
        transactions,
        openAddTransactionModal,
        openEditTransactionModal,
        closeModal,
        saveTransaction,
        confirmDelete,
        formatDate,
        isModalOpen,
        selectedTransaction
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  .add-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  </style>
  