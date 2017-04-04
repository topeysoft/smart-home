import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import '../../node_modules/jquery/dist/jquery.js';
import $ from "jquery";
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
