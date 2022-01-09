import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { CarouselComponent } from './home/carousel/carousel.component';
import { CategoriesComponent } from './home/categories/categories.component';
import { CategoryComponent } from './home/categories/category/category.component';

import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product-list/product/product.component';
import { CartComponent } from './cart/cart.component';
import { CartProductComponent } from './cart/cart-product/cart-product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddressComponent } from './checkout/address/address.component';
import { PaymentComponent } from './payment/payment.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { SuccessComponent } from './payment/success/success.component';
import { PayComponent } from './payment/pay/pay.component';
import { FailureComponent } from './payment/failure/failure.component';
import { OrderComponent } from './order/order.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { OrdersOrderComponent } from './order/orders-order/orders-order.component';
import { IndividualOrderComponent } from './order/orders-order/individual-order/individual-order.component';

const appRoutes: Routes =
  [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
  
    {path: 'home', component: HomeComponent},
    {path: 'product-list', component: ProductListComponent},
    {path: 'cart', component: CartComponent, canActivate:[AuthGuard]},
    {path: 'check-out', component: CheckoutComponent, canActivate:[AuthGuard]},
    {path: 'payment', component: PaymentComponent, canActivate:[AuthGuard], children:[{
      
      path:'',component:PayComponent
    },{

      path:'success',component:SuccessComponent
    },
    {
      path:'failure',component:FailureComponent
    }
  ]},
    {path: 'login', component: LoginComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'orders', component: OrderComponent, canActivate:[AuthGuard]},
    {path: '**', redirectTo:'home', pathMatch:'full'},
    

  ]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    CarouselComponent,
    CategoriesComponent,
    CategoryComponent,
    FooterComponent,
    ProductListComponent,
    ProductComponent,
    CartComponent,
    CartProductComponent,
    CheckoutComponent,
    AddressComponent,
    PaymentComponent,
    LoginComponent,
    SignUpComponent,
    SuccessComponent,
    PayComponent,
    FailureComponent,
    OrderComponent,
    OrdersOrderComponent,
    IndividualOrderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
