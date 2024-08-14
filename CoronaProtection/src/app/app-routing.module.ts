import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ItemListComponent } from './item-list/item-list.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaymentComponent } from './payment/payment.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { TestingfileComponent } from './testingfile/testingfile.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'items', component: ItemListComponent,canActivate: [AuthGuard]},
  {path: 'suggestion', component: SuggestionComponent,canActivate: [AuthGuard]},
  {path: 'cart', component: CartComponent,canActivate: [AuthGuard]},
  {path: 'payment', component: PaymentComponent,canActivate: [AuthGuard]},
  {path: 'testingfile', component: TestingfileComponent,canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
