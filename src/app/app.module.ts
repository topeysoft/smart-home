import { CUSTOM_ELEMENTS_SCHEMA, NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, MenuController, NavController } from 'ionic-angular';
import { MyApp } from './app.component';
import { TsServices } from './services/services.module';
// import { RouterModule } from "@angular/router";
// import { AppRoutes } from './app.routing.module';
import { TsComponents } from './components/components.module';

@NgModule({
  declarations: [
    MyApp,
    , ...TsComponents
  ],
  imports: [
    IonicModule.forRoot(MyApp)
   // , RouterModule.forRoot(AppRoutes)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
   , ...TsComponents
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
  MenuController,
  ...TsServices]
})
export class AppModule { }
