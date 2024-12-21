<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal-content">
      <h3>{{ isEditMode ? 'Edit Transaction' : 'Add Transaction' }}</h3>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="amount">Amount</label>
          <input type="number" v-model="form.amount" id="amount" required />
        </div>
        <div class="form-group">
          <label for="category">Category</label>
          <select v-model="form.category" id="category" required>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Bills">Bills</option>
            <option value="General">General</option>
          </select>
        </div>
        <div class="form-group">
          <label for="currency">Currency</label>
          <select id="currencies" v-model="form.currency" required>
            <option v-for="(name, index) in currencies" :key="index" :value="name">
              {{ name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="date">Date</label>
          <input type="date" v-model="form.date" id="date" required />
        </div>
        <div class="modal-actions">
          <button type="button" @click="closeModal" class="cancel-btn">Cancel</button>
          <button type="submit" class="submit-btn">{{ isEditMode ? 'Save Changes' : 'Add Transaction' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'TransactionModal',
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    transactionToEdit: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'add-transaction', 'edit-transaction'],
  setup(props, { emit }) {
    const store = useStore();
    const form = ref({
      amount: '',
      category: '',
      date: '',
      currency: 'USD',
    });

    const isEditMode = ref(false);
    // Currencies available from the Vuex store
    const currencies = computed(() => store.getters['transactions/allAvailableCurrencies']);
    const resetForm = () => {
      form.value.amount = '';
      form.value.category = '';
      form.value.date = '';
      form.value.currency = 'USD';
    };
    // Watch for when a transaction is passed to edit
    watch(() => props.transactionToEdit, (newTransaction) => {
      console.log('newTransaction', newTransaction)
      if (newTransaction) {
        isEditMode.value = true;
        form.value.amount = newTransaction.amount;
        form.value.category = newTransaction.category;
        form.value.date = newTransaction.date;
        form.value.currency = newTransaction.currency;
      } else {
        console.log('else.....')
        isEditMode.value = false;
        resetForm()
      }
    });

    // Close the modal
    const closeModal = () => {
      emit('close');
    };

    // Handle form submission
    const handleSubmit = () => {
      const transaction = {
        id: isEditMode.value ? props.transactionToEdit.id : null,
        amount: parseFloat(form.value.amount),
        category: form.value.category,
        date: form.value.date,
        currency: form.value.currency,
      };

      if (isEditMode.value) {
        emit('edit-transaction', transaction);
      } else {
        emit('add-transaction', transaction);
      }
      closeModal();
    };
    return {
      form,
      isEditMode,
      closeModal,
      handleSubmit,
      currencies,
      resetForm
    };
  },

};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

h3 {
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.submit-btn {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #218838;
}

.cancel-btn {
  background-color: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-btn:hover {
  background-color: #c82333;
}
</style>