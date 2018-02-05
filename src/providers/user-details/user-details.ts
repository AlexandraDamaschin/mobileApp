import { Injectable } from "@angular/core";
import { User } from '../../models/User';

// import { DialogService } from '../../../node_modules/ng2-bootstrap-modal';
// import { CategoryList } from '../models/category';
// import { Thread, ThreadList } from '../models/thread';
 import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class UserDetailsService {

  private _baseURL: string;

  constructor(private _http: Http) {
     this._baseURL = 'http://localhost:8100/'
    // this._baseURL = 'https://boiling-citadel-29540.herokuapp.com/' 
  }

  
  private _errorHandler(error: Response) {
    return Observable.throw(error);
  }

    
  createUser(data) {
    return this._http.post(`${this._baseURL}users`, data).map((res: Response) => res.json())
      .catch(this._errorHandler);
  }
 
  getUserDetails(uid: string) {
    return this._http.get(`${this._baseURL}users/${uid}`)
      .map((res: Response) => res.json())
      .catch(this._errorHandler);
  }


  updateUser(user: User){;
    return this._http.put(`${this._baseURL}users`, user)
      .map((res: Response) => res.json())
      .catch(this._errorHandler);
  }

}
