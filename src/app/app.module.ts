import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtomsModule } from './components/atoms/atoms.module';
import { MoleculesModule } from './components/molecules/molecules.module';
import { PagesModule } from './components/pages/pages.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorResponseInterceptor } from 'src/shared/interceptors/error-interceptor/error-response.interceptor';
import { AuthService } from './api/auth.service';
import { JwtInterceptor } from 'src/shared/interceptors/jwt-interceptor/jwt.interceptor';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { OrganismsModule } from './components/organisms/organisms.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AtomsModule,
    MoleculesModule,
    OrganismsModule,
    PagesModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorResponseInterceptor,
      multi: true
    },
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthGuard
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
