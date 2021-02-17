import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { LoginModule } from './main/page/login/login.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpInterceptorBaseAuthService } from './services/http-interceptor-base-auth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';




const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
      },
    {
        path: 'subject',
        redirectTo: '/pages/subject',
        pathMatch: 'full'
      },

    {
        path        : 'pages',
        loadChildren: './main/page/page.module#PageModule'
    },
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        // BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes,{useHash: true}),

        TranslateModule.forRoot(),
        MatSnackBarModule,

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatCardModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        ReactiveFormsModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        LoginModule,
    ],
    bootstrap   : [
        AppComponent
    ],
    providers:[
        {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorBaseAuthService, multi: true },
    ]
})
export class AppModule
{
}
