<!-- <template>
    <div>
      <TransactionForm @submit="handleTransactionSubmit" />
      <TransactionList
        :transactions="allTransactions"
        @edit="handleEdit"
        @delete="handleDelete"
      />
      <Summary :income="totalIncome" :expenses="totalExpenses" :netBalance="netBalance" />
      <Chart :data="chartData" />
    </div>
  </template>
  
  <script>
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import TransactionForm from '@/components/TransactionForm.vue';
  import TransactionList from '@/components/TransactionList.vue';
  import Summary from '@/components/Summary.vue';
  import Chart from '@/components/Chart.vue';
  
  export default {
    components: {
      TransactionForm,
      TransactionList,
      Summary,
      Chart
    },
    setup() {
      const store = useStore();
  
      const totalIncome = computed(() => store.getters['transactions/totalIncome']);
      const totalExpenses = computed(() => store.getters['transactions/totalExpenses']);
      const netBalance = computed(() => store.getters['transactions/netBalance']);
    //   const filteredTransactions = computed(() =>
    //     store.getters['transactions/transactionsByDate']('2024-01-01', '2024-12-31')
    //   );
      const allTransactions = computed(() => store.getters['transactions/allTransactions'])
  
      const chartData = computed(() => {
        const categories = store.state.transactions.categories;
        return categories.map(category => ({
          name: category,
          value: store.getters['transactions/transactionsByCategory'](category).reduce(
            (sum, t) => sum + t.amount,
            0
          )
        }));
      });
  
      const handleTransactionSubmit = transaction => {
        store.dispatch('transactions/addTransaction', transaction);
      };
  
      const handleEdit = transaction => {
        store.dispatch('transactions/editTransaction', transaction);
      };
  
      const handleDelete = transactionId => {
        store.dispatch('transactions/deleteTransaction', transactionId);
      };
  
      onMounted(() => {
        // Load stored transactions when the app initializes
        store.dispatch('transactions/loadTransactionsFromLocalStorage');
        store.dispatch('transactions/fetchExchangeRates');
      });
  
      return {
        totalIncome,
        totalExpenses,
        netBalance,
        allTransactions,
        chartData,
        handleTransactionSubmit,
        handleEdit,
        handleDelete
      };
    }
  };
  </script>
  
  <style scoped>
  /* Scoped CSS for Home.vue */
  </style>
   -->