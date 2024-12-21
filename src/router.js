import { createRouter, createWebHistory } from 'vue-router';
import TransactionView from './views/TransactionView.vue';
import FinancialSummaryView from './views/FinancialSummaryView.vue';

const routes = [
  {
    path: '/',
    name: 'transactions',
    component: TransactionView,  // This view will handle transaction list, add, and edit
  },
  {
    path: '/financial-summary',
    name: 'financial-summary',
    component: FinancialSummaryView,  // This view will handle financial summary and charts
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
