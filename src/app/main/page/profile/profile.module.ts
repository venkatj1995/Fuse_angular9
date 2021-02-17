import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';

import { ProfileComponent } from 'app/main/page/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



const routes = [
    {
        path     : 'profile',
        component: ProfileComponent
       // ,
        // resolve  : {
        //     profile: ProfileService
        // }
    }
];

@NgModule({
    declarations: [
        ProfileComponent
        
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        ProfileRoutingModule,
        MatFormFieldModule,
        MatInputModule,        
        FuseSharedModule
    ]
    //,
    // providers   : [
    //    // ProfileService
    // ]
})
export class ProfileModule
{
}
