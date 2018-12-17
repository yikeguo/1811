import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompCommunicateComponent } from './comp-communicate/comp-communicate.component';
import { CompCommunicateRoutingModule } from './comp-communicate-routing.module';

@NgModule({
  declarations: [CompCommunicateComponent],
  imports: [
    CommonModule,
    CompCommunicateRoutingModule
  ]
})
export class CompCommunicateModule { }
