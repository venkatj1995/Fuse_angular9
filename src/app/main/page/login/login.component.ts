import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private loginService: LoginService,
        private router: Router,
        private snackBar: MatSnackBar
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            username   : ['', [Validators.required,]],
            password: ['', Validators.required]
        });
    }
    loginFn(){
        this.router.navigate(['/pages/subject']);
        this.loginService.loginAccount(this.loginForm.value).subscribe(
            (response)=>{
                console.log(response);
                // localStorage.setItem("username",this.loginForm.value.username);
                // localStorage.setItem("accessToken",response['access']);
                // localStorage.setItem("refreshToken",response['refresh']);
                // localStorage.setItem("user_id",response['user_id']);
                // localStorage.setItem("grouprole",response['grouprole']);
                // localStorage.setItem("tutorid",response['tutorid']);
                // localStorage.setItem("studentid",response['studentid']);



                // if(response['grouprole'] == 'admin'){                 
                // this.router.navigate(['/pages/subject'])
                // }
                // else if(response['grouprole'] == 'tutor')
                // {
                // this.router.navigate(['/pages/dashboard'])
                // }
                // else if(response['grouprole'] == 'student')
                // {
                // this.router.navigate(['/pages/student-view/student-chat'])
                // }

            },(error)=>{
                this.snackBar.open("Invalid Username or password","Close",{
                    duration: 4000,
                    verticalPosition: 'top'
                  })
            }
        )
    }
}
