import Balance from "../pages/Balance";
import HomePage from "../pages/HomePage";
import TransactionsList from "../pages/TransactionsList";

const routes = [
  {
    path: "/",
    component: HomePage,
    exact: true
  },
  {
    path: '/transactions/:address/:startBlock/:endBlock',
    component: TransactionsList,
    exact: true
  },
  {
    path: '/balance/:address/:startBlock/:endBlock',
    component: Balance,
    exact: true
  },
];

export default routes;