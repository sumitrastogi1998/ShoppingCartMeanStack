import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemListComponent } from './item-list/item-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartService } from './cart.service';
import { CartComponent } from './cart/cart.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaymentComponent } from './payment/payment.component';
import {HttpClientModule} from '@angular/common/http';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { TestingfileComponent } from './testingfile/testingfile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BooksFilterPipe } from './books-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    HomeComponent,
    NotFoundComponent,
    PaymentComponent,
    SuggestionComponent,
    TestingfileComponent,
    BooksFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [CartService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
