import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {QuizVariantsComponent} from "./componenst/quiz-variants/quiz-variants.component";
import {LoadingComponent} from "./componenst/loading/loading.component";
import {CircleTimerComponent} from "./componenst/circle-timer/circle-timer.component";
import {FillPipe} from "./pipes/FillPipe";

const MODULES = [
    BrowserModule,
    HttpModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
];

const PIPES = [
    FillPipe,
    // put pipes here
];

const COMPONENTS = [
    QuizVariantsComponent,
    LoadingComponent,
    CircleTimerComponent,
    // put shared components here
];

const PROVIDERS = [

];

@NgModule({
    imports: [
        ...MODULES
    ],
    declarations: [
        ...PIPES,
        ...COMPONENTS
    ],
    exports: [
        ...MODULES,
        ...PIPES,
        ...COMPONENTS
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                ...PROVIDERS
            ]
        };
    }
}