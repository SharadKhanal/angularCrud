import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { HomeComponent } from './home/home.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserComponent } from './user/user.component';
import { EditComponent } from './edit/edit.component';
import { AddUserComponent } from './add-user/add-user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'user-table',
        component: UserComponent,
      },
      {
        path: 'user-form',
        component: UserFormComponent,
      },

      {
        path: 'detail-view/:id',
        component: DetailViewComponent,
      },
      {
        path: 'edit/:id',
        component: EditComponent,
      },
      {
        path: 'add-user',
        component: AddUserComponent,
      },
    ],
  },

  {
    path: '**',
    component: PageNotFoundComponent, //wild card
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
