import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http:HttpClient) { }

  verifyIfRoomExists(data:any){
    return this.http.post<any>(`${environment.apiUrl}/chat/verifyIfRoomExists`,data).pipe(map((val)=>{return val}))
  }

  initiateChatRoom(data:any){
    return this.http.post<any>(`${environment.apiUrl}/chat/initiate/`,data)
  }

  getConversationByRoomId(roomID:any){
    return this.http.get<any>(`${environment.apiUrl}/chat/getConversationByRoomId/${roomID}`).pipe(map((val)=>{return val.conversation}))
  }

  getRoomsByUserId=(userId:any)=>{
    return this.http.get<any>(`${environment.apiUrl}/chat/getRoomsByUserId/${userId}`).pipe(map((value)=>{console.log("value :",value) ;return value.chatRooms}))
  }
  

}
