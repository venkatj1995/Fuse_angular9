import { Component,OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from '../profile/profile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileComponent implements OnInit
{ 
    form: FormGroup;

   /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(public profileService : ProfileService,private _formBuilder: FormBuilder)
    {

    }
    ProfileList:Object;
    Profile_username:any;
    Profile_email:any;

    ngOnInit() {
        console.log("OnInit in")
        var userid=localStorage.getItem('user_id')
        this.fetchProfileInfo(userid);

          this.form = this._formBuilder.group({
            username : ['',],
            emailid : ['',],
        });
      }

      fetchProfileInfo(id){        
        this.profileService.viewProfile(id).subscribe(
          (response) => {
              console.log(response['username']);
              console.log(response['email']);
            this.ProfileList = response;
            this.Profile_username= response['username'];                           
            this.Profile_email= response['email'];   
            this.form.controls['username'].setValue(this.ProfileList['username']);
            this.form.controls['emailid'].setValue(this.ProfileList['email']);                        
                       
          },
        )
      }
}
