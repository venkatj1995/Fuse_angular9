import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ResetPassService } from './reset-password.service';
import {Router,ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';




@Component({
    selector     : 'reset-password',
    templateUrl  : './reset-password.component.html',
    styleUrls    : ['./reset-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ResetPasswordComponent implements OnInit, OnDestroy
{
    resetPasswordForm: FormGroup;
    private accesstoken;
    private emailid;
    public btndisabled=true;
    public userid:any;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private ResetPassService: ResetPassService,
        private router: Router,
        private route: ActivatedRoute,
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

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.resetPasswordForm = this._formBuilder.group({
            name           : ['', Validators.required],
            email          : ['', [Validators.required, Validators.email]],
            password       : ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.resetPasswordForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.resetPasswordForm.get('passwordConfirm').updateValueAndValidity();
            });

         this.authenticate_token();

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }



    authenticate_token(){
    this.route.queryParams.subscribe(params => {
        this.accesstoken = params['token'];
        this.emailid = params['email'];
        this.userid=0;
        });
    this.ResetPassService.Reset_auth_token(this.accesstoken,this.emailid,this.userid).subscribe(
            (response)=>{
            },(error)=>{
                this.router.navigate(['/auth/login']);
                this.snackBar.open("Invalid token/Token expired!","Close",{
                    duration: 5000,
                    verticalPosition: 'top'
                  })

            }
        )
    }

    reset_password(){
        console.log(this.resetPasswordForm.value.passwordConfirm);
       
        this.ResetPassService.Reset_password(this.accesstoken,this.resetPasswordForm.value.passwordConfirm).subscribe(
            (response)=>{
                this.router.navigate(['/auth/login']);
                this.snackBar.open("Your passwword has been successsfully reset","Close",{
                    duration: 5000,
                    verticalPosition: 'top'
                  })

            },(error)=>{
                this.snackBar.open("Password could not be reset","Close",{
                    duration: 4000,
                    verticalPosition: 'top'
                  })
            }
        )
    }

    password_match()
    {
        if(this.resetPasswordForm.value.password == this.resetPasswordForm.value.passwordConfirm  ){
             this.btndisabled=false;

        }
         else{
             this.btndisabled=true;
         }
    }

}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if ( !control.parent || !control )
    {
        return null;


    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return null;


    }

    if ( passwordConfirm.value === '' )
    {
        return null;
  
    }

    if ( password.value === passwordConfirm.value )
    {
        return null;
    }

    return {passwordsNotMatching: true};
};
