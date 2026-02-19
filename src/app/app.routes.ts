import { Routes } from '@angular/router';
import { Home } from './home/home';


import { Login } from './login/login';
import { Register } from './register/register';
import { Result } from './result/result';
import { History } from './history/history';
import { Voting } from './voting/voting';
import { AddCandidate } from './addcandidate/addcandidate';
import { AddVoter } from './addvoter/addvoter';
import { AddParty } from './addparty/addparty';
import { authGuard} from './auth-guard';





export const routes: Routes = [
 // ⭐ PUBLIC ROUTES (NO LOGIN REQUIRED)
  { path: "", component: Home },
  { path: "home", component: Home },
  { path: "login", component: Login },
  { path: "register", component: Register },

  // 🔒 PROTECTED ROUTES (LOGIN REQUIRED)
  { path: "add-candidate", component: AddCandidate, canActivate: [authGuard] },
  { path: "add-voter", component: AddVoter, canActivate: [authGuard] },
  { path: "add-party", component: AddParty, canActivate: [authGuard] },
  { path: "vote", component: Voting, canActivate: [authGuard] },
  { path: "result", component: Result, canActivate: [authGuard] },
  { path: "history", component: History, canActivate: [authGuard] },
];
