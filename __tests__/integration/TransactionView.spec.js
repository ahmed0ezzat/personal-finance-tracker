import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import TransactionView from '@/views/TransactionView.vue';
import TransactionModal from '@/components/TransactionModal.vue';

describe('TransactionView.vue', () => {
  let store;
  let router;

  beforeEach(() => {
    // Mock Vuex store
    store = createStore({
      state: {
        transactions: [
          {"id":1734877134502,"amount":2400,"category":"income","date":"2025-12-01","currency":"USD"},
          {"id":1734877163590,"amount":-302,"category":"Food","date":"2024-12-22","currency":"USD"}
        ],
      },
      getters: {
        'transactions/allTransactions': (state) => state.transactions,
      },
      actions: {
        'transactions/editTransaction': jest.fn(),
        'transactions/addTransaction': jest.fn(),
        'transactions/deleteTransaction': jest.fn(),
      },
    });

    // Mock Vue Router
    router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes: [
        {
          path: '/',
          name: 'transactions',
          component: TransactionView,
        },
      ],
    });

  });

  it('opens the modal to add a transaction when the "Add Transaction" button is clicked', async () => {
    const wrapper = mount(TransactionView, {
      global: {
        plugins: [store, router],
      },
    });

    const addButton = wrapper.find('.add-btn');
    await addButton.trigger('click');

    expect(wrapper.findComponent(TransactionModal).props().isVisible).toBe(true);
    expect(wrapper.findComponent(TransactionModal).props().transactionToEdit).toBeNull();
  });

  it('opens the modal to edit a transaction when the "Edit Transaction" button is clicked', async () => {
    const wrapper = mount(TransactionView, {
      global: {
        plugins: [store, router],
      },
    });

    const editButton = wrapper.find('.edit-btn');
    await editButton.trigger('click');

    expect(wrapper.findComponent(TransactionModal).props().isVisible).toBe(true);
    expect(wrapper.findComponent(TransactionModal).props().transactionToEdit).toEqual({"id":1734877134502,"amount":2400,"category":"income","date":"2025-12-01","currency":"USD"});
  });
  
  


});
