import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonFormComponent } from './pages/person-form/person-form.component';
import { PersonListComponent } from './pages/person-list/person-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'person', pathMatch: 'full' },
  { path: 'person', pathMatch: 'full', component: PersonListComponent },
  { path: 'person/add', pathMatch: 'full', component: PersonFormComponent },
  { path: 'person/edit/:id', pathMatch: 'full', component: PersonFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
