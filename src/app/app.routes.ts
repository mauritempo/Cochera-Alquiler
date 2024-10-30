import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CocheraComponent } from './pages/cochera/cochera.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardContainerComponent } from './pages/dashboard-container/dashboard-container.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { soloPublicoGuard } from './guards/solo-publico.guard';
import { soloAdminGuard } from './guards/solo-admin.guard';
import { soloLogueadoGuard } from './guards/solo-logueado.guard';
import { RegisterComponent } from './pages/register/register.component';
import { PreciosComponent } from './pages/precios/precios.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardContainerComponent,
        canActivate: [soloLogueadoGuard],
        children: [
            {
                path: "cochera",
                component: CocheraComponent
            },
            {
                path: "reportes",
                component: ReportesComponent,
                canActivate: [soloLogueadoGuard]
                
            },
            //utilizarlo como header unico
            {
                path:"precios",
                component: PreciosComponent,
                canActivate: [soloLogueadoGuard]
            }
        ]
    },
    {
        path: 'Register',
        component: RegisterComponent,
        canActivate: [soloPublicoGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [soloPublicoGuard]
    },
    
    
    {
        path: "not-found",
        component: NotFoundComponent
    },
    {
        path: "**",
        redirectTo: "not-found",
        pathMatch: "full",

    },
];
