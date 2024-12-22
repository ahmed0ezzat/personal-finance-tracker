import { fetchExchangeRatesApi } from "../../api/exchangeRateService";

const saveTransactionsToLocalStorage = (transactions) => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

const convertAmountToBaseCurrency = (transaction, exchangeRates) => {
  if (
    transaction.currency !== "USD" &&
    exchangeRates?.rates?.[transaction.currency]
  ) {
    const conversionRate = exchangeRates.rates[transaction.currency];
    return {
      ...transaction,
      currency: "USD",
      amount: Math.round(transaction.amount / conversionRate),
    };
  }
  return transaction;
};

const state = {
  transactions: [],
  categories: ["Food", "Transportation", "Bills", "General"],
  baseCurrency: "USD",
  exchangeRates: {},
};

const mutations = {
  SET_TRANSACTIONS(state, transactions) {
    state.transactions = transactions;
  },
  ADD_TRANSACTION(state, transaction) {
    state.transactions.push(transaction);
  },
  EDIT_TRANSACTION(state, editedTransaction) {
    const index = state.transactions.findIndex(
      (t) => t.id === editedTransaction.id
    );
    if (index !== -1) {
      state.transactions.splice(index, 1, editedTransaction);
    }
  },
  DELETE_TRANSACTION(state, transactionId) {
    state.transactions = state.transactions.filter(
      (t) => t.id !== transactionId
    );
  },
  SET_EXCHANGE_RATES(state, rates) {
    state.exchangeRates = rates;
  },
};

const actions = {
  async fetchExchangeRates({ commit }) {
    try {
      const data = await fetchExchangeRatesApi();
      commit("SET_EXCHANGE_RATES", data);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  },
  addTransaction({ commit }, transaction) {
    let newTransaction = {
      ...transaction,
      id: Date.now(),
    };

    newTransaction = convertAmountToBaseCurrency(
      newTransaction,
      state.exchangeRates
    );
    commit("ADD_TRANSACTION", newTransaction);
    saveTransactionsToLocalStorage(state.transactions);
  },
  editTransaction({ commit }, editedTransaction) {
    const updatedTransaction = convertAmountToBaseCurrency(
      editedTransaction,
      state.exchangeRates
    );
    commit("EDIT_TRANSACTION", updatedTransaction);
    saveTransactionsToLocalStorage(state.transactions);
  },
  deleteTransaction({ commit }, transactionId) {
    commit("DELETE_TRANSACTION", transactionId);
    saveTransactionsToLocalStorage(state.transactions);
  },
  loadTransactionsFromLocalStorage({ commit }) {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    commit("SET_TRANSACTIONS", transactions);
  },
};

const getters = {
  allTransactions: (state) => {
    return state.transactions.filter(
      (transaction) => transaction.amount !== undefined
    );
  },
  transactionsByDate: (state) => (startDate, endDate) => {
    return state.transactions.filter(
      (transaction) =>
        new Date(transaction.date) >= new Date(startDate) &&
        new Date(transaction.date) <= new Date(endDate)
    );
  },
  transactionsByCategory: (state) => (category) => {
    return state.transactions.filter(
      (transaction) => transaction.category === category
    );
  },
  // Get total income (assuming positive amounts represent income)
  totalIncome: (state) => {
    return state.transactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  },

  // Get total expenses (assuming negative amounts represent expenses)
  totalExpenses: (state) => {
    return state.transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  },

  // Get net balance (total income - total expenses)
  netBalance: (state, getters) => {
    return getters.totalIncome + getters.totalExpenses;
  },
  allAvailableCurrencies: (state) => {
    return state.exchangeRates.rates
      ? Object.keys(state.exchangeRates.rates)
      : [];
  },
  exchangeRates: (state) => {
    return state.exchangeRates.rates;
  },
  categoriesSummary: (state) => {
    return state.categories.map((category) => {
      const total = state.transactions
        .filter((t) => t.category === category)
        .reduce((sum, t) => sum + t.amount, 0);
      return { category, total };
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
