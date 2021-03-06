import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { UcenterComponent } from './ucenter/ucenter.component';
import { CourseComponent } from './course/course.component';
import { CourseComponent as PathComponent } from './ucenter/course/course.component';
import { MessageComponent } from './ucenter/message/message.component';
import { CommentComponent } from './ucenter/comment/comment.component';
import { CollectionComponent } from './ucenter/collection/collection.component';
import { AccountComponent } from './ucenter/account/account.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '', 
    canActivate: [AuthGuard], 
    component: MainComponent, 
    children: [
      {path: 'ucenter', component: UcenterComponent, children: [
        {path: 'course', component: PathComponent},
        {path: 'message', component: MessageComponent},
        {path: 'comment', component: CommentComponent},
        {path: 'collection', component: CollectionComponent},
        {path: 'account', component: AccountComponent},
      ]},
      {path: 'course/:classId', component: CourseComponent},
      {path:'', pathMatch: 'full', redirectTo: '/main/ucenter'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
