import { EventType } from '../../models/Enum';
import { Subject } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()
export class NotificationProvider {
  private sub = new Subject<any>();
  public emitter = this.sub.asObservable();

  notify(type : EventType, obj: any) {
      this.sub.next({ type: type, obj: obj });
  }

}
