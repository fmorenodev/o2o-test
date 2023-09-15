import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
    { path: 'main', component: MainComponent },
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: "**", component: MainComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
