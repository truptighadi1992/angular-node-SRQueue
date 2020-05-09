import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor( private http:HttpClient) {   }

  addPushSubscriber( subscription: PushSubscription){
    return this.http.post( 'http://localhost:3000/api/notification/subscribe/' , subscription );
  }
}
