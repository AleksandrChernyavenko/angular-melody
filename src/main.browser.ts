import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import {enableProdMode} from "@angular/core";

require('font-awesome-webpack');

if(process.env.NODE_ENV === 'production') {
    enableProdMode();
}
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
