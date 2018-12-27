import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule, MatButtonModule,
  MatCardModule,
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpModule } from '@angular/http';


//Modules
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

//Routing Module
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
