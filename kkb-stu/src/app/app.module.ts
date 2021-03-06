import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
// import { UserModule } from './user/user.module';
import { AppRoutingModule } from './app-routing.module';
import { RxjsModule } from './rxjs/rxjs.module';
import { HomeComponent } from './home/home.component';
// import { MainModule } from './main/main.module';
import { CompCommunicateModule } from './comp-communicate/comp-communicate.module';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
  BrowserModule,
    HttpClientModule,
    // UserModule,
    RxjsModule,
    CompCommunicateModule,
    // MainModule,
    AppRoutingModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'zh'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
