import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CommentsComponent } from './components/comments/comments.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingComponent } from './components/landing/landing.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path: 'landing', component: LandingComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'book', component: BookComponent, canActivate: [AuthGuard]},
  {path: 'comments', component: CommentsComponent},
  {path: 'calculator', component: CalculatorComponent},
  {path: 'bookings', component: BookingsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  {path: '**', redirectTo: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
