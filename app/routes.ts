import { Route } from '@vaadin/router';
import LoginPage from './views/LoginPage.jsx';
import AccountPage from './views/AccountPage.jsx';
import ArtifactPage from './views/ArtifactPage.jsx';

export const routes: Route[] = [
  {
    path: '',
    component: 'main-layout',
    children: [
      { path: '', component: 'home-page' },
      { path: 'login', component: 'login-page' },
      { path: 'account', component: 'account-page' },
      { path: 'artifacts/:id', component: 'artifact-page' },
      { path: 'nodes', component: 'nodes-page' },
    ],
  },
];

customElements.define('login-page', LoginPage);
customElements.define('account-page', AccountPage);
customElements.define('artifact-page', ArtifactPage);