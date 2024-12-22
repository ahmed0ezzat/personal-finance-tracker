<template>
    <div class="filter-container">
      <div class="filter-group">
        <label for="start-date">Start Date</label>
        <input type="date" id="start-date" v-model="filters.startDate" />
      </div>
      <div class="filter-group">
        <label for="end-date">End Date</label>
        <input type="date" id="end-date" v-model="filters.endDate" />
      </div>
      <div class="filter-group">
        <label for="category">Category</label>
        <select id="category" v-model="filters.category">
          <option value="">All</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Bills">Bills</option>
          <option value="General">General</option>
        </select>
      </div>
      <div class="filter-actions">
        <button @click="applyFilters" class="apply-btn">Filter</button>
        <button @click="resetFilters" class="reset-btn">Reset</button>
      </div>
    </div>
  </template>
  
  <script> 
  import { ref } from 'vue';
   export default {
    name: 'TransactionFilter',
    emits: ['update-filters'],
    setup(_, { emit }) {
      const filters = ref({
        startDate: '',
        endDate: '',
        category: '',
      });
  
      const applyFilters = () => {
        emit('update-filters', { ...filters.value });
      };
  
      const resetFilters = () => {
        filters.value = {
          startDate: '',
          endDate: '',
          category: '',
        };
        emit('update-filters', { ...filters.value });
      };
  
      return {
        filters,
        applyFilters,
        resetFilters,
      };
    },
  };
  </script>
  
  <style scoped>
  .filter-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .filter-group {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
  }
  
  label {
    margin-bottom: 5px;
  }
  
  input,
  select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .filter-actions {
    display: flex;
    gap: 10px;
    margin-top: 25px;
  }
  
  .apply-btn {
    background-color: #28a745;
    color: white;
    padding: 2px 20px;;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .reset-btn {
    background-color: #ff4d4d;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .apply-btn:hover {
    background-color: #218838;
  }
  
  .reset-btn:hover {
    background-color: #cc0000;
  }
  </style>
  