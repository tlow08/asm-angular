import { Routes } from '@angular/router';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ListProductComponent } from './pages/admin/list-product/list-product.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: ClientLayoutComponent,
        children:[
            {path: '', component: HomePageComponent},
            {path: 'product/:id', component: ProductDetailComponent},
            {path: 'register', component: RegisterComponent},
            {path: 'login', component: LoginComponent},
        ]
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [authGuard],
        children:[
            {path: 'product/list', component: ListProductComponent},
        ]
    }
];
