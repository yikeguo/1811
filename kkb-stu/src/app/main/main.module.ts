import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { UcenterComponent } from './ucenter/ucenter.component';
import { CourseComponent } from './course/course.component';
import { MessageComponent } from './ucenter/message/message.component';
import { AccountComponent } from './ucenter/account/account.component';
import { CommentComponent } from './ucenter/comment/comment.component';
import { CourseComponent as PathComponent } from './ucenter/course/course.component';
import { CollectionComponent } from './ucenter/collection/collection.component';
import { NgxUploaderModule } from 'ngx-uploader';
import { MyCompsModule } from '../common/my-comps.module';

@NgModule({
  declarations: [MainComponent, UcenterComponent, CourseComponent, MessageComponent, AccountComponent, CommentComponent, PathComponent, CollectionComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MyCompsModule,
    NgxUploaderModule
  ]
})
export class MainModule { }
