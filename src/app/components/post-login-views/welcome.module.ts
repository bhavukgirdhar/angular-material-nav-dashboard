import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [   
    WelcomeComponent,
    MenuListItemComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    WelcomeRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class WelcomeModule { }
