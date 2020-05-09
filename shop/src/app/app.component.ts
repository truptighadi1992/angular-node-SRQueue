import { Component, OnInit } from '@angular/core';
import {SwPush, SwUpdate} from "@angular/service-worker";
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateService } from './update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  readonly VAPID_PUBLIC_KEY = "BLR_XfEzmClxn0NhAiE_2ZoRAvyG-wbxG_i9kXJryf__RqGaHuchbbZ31RIf-tTzAJ4oHZ_4W9i9uYVP-DilNYw";

  constructor( private swUpdate:SwUpdate, private _snackBar:MatSnackBar, private swPush:SwPush, private updateService:UpdateService){

  }
  ngOnInit(){
     
    // service worker update handling
    if(this.swUpdate.isEnabled){
      console.log("swUpdate is enabled");
      this.swUpdate.available.subscribe(evt => {
        
        console.log("New Version available");
        const snack = this._snackBar.open('New version available', 'Reload',{
          duration: 15000,
        });
        snack.onAction().subscribe(() => {
          window.location.reload();
        });
      });
    }

    //Push Notification subscription
    if(this.swPush.isEnabled){
      console.log("swPush is enabled");

      this.swPush.requestSubscription(
        {
          serverPublicKey: this.VAPID_PUBLIC_KEY
        })
        .then( subscription =>{
          this.updateService.addPushSubscriber(subscription).subscribe(
            result =>{
              console.log(result);
            },
            error =>{
              console.log("error in subscription",error);
            }
          )
        })
        .catch( err=>{
          console.log("Could not subscribe to notification",err);
        })
  
    }
  
  }
}
