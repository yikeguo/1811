import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'user', loadChildren: './user/user.module#UserModule'},
  {
    path: 'main', 
    loadChildren: './main/main.module#MainModule',
    data: {preload: true}
  },
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: '**', redirectTo: '/user/login'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
exports: [RouterModule]
})
export class AppRoutingModule { }
