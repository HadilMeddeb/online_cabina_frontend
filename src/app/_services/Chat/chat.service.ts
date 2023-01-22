import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
message$: BehaviorSubject<string> = new BehaviorSubject('');
socket!:Socket
constructor(private http:HttpClient) { 
}

getConnected(){
  console.log("environment.socketUrl",environment.socketUrl)
  this.socket.emit('connexion');
}


sendMessage(data:any) {
  this.socket.emit('message', data);
}

getNewMessage = () => {
  this.socket.on('message-broadcast', (message) =>{
    console.log("message from service :",message)
    this.message$.next(message);
  });
  return this.message$.asObservable();
};


joinRoom = (roomName:string) => {
  this.socket.emit('join-room', roomName,(messages:any)=>{
    console.log(messages)
  });
}

getRoomConversation = () => {
  this.socket.emit('room-conversation',(messages:any)=>{
    console.log(messages)
  });
}


QuitRoom=(userId: string,roomId:string)=>{
  this.socket.emit("quit-room", {userId,roomId});
  console.log("quit room")
}

setupSocketConnection(userId: string,roomId:string)
{
    this.socket = io(environment.socketUrl); 
    this.socket.emit("join-room", {userId,roomId}, (err:any) => {
      console.log("join room")  
      if (err) {
        alert(err);
      } });
}

subscribeToMessages = (cb:any) => {
  if (!this.socket) return(cb(null, ""));
  this.socket.on('message', msg => {
    console.log('Room event received!');
    return cb(null, msg);
  });
}


quitRoom(room:string)
{
  this.socket.emit("quit",room)
}

sendNewMessage = (message:string, roomName:string, cb:any) => {
  if (this.socket) this.socket.emit('message', { message, roomName }, cb);}
}


