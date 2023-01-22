import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';
import { ChatService } from 'src/app/_services/Chat/chat.service';
import { RoomService } from 'src/app/_services/rooms/room.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit ,OnDestroy{

  filterString=""
  sendedMessage=""
  selectedRoom=this.route.snapshot.params.roomId;
  CurrentConversation:any
  virtualConversation:{
  chatRoomId:string,
  createdAt:Date,
  message:string,
  postedByUser:any}[]=[]

  currentUser=this.authenticationService.getCurrentUser()
  rooms$=this.roomService.getRoomsByUserId(this.authenticationService.getCurrentUser()._id)
  constructor(private chatService:ChatService,
              private roomService:RoomService,
              private route:ActivatedRoute,
              private authenticationService:AuthenticationService,
             ){console.log("length virtual conversation:",this.virtualConversation.length )}

 
ngOnInit(): void 
{
    // getConversation
      // this.roomService.getConversationByRoomId(this.selectedRoom).subscribe(
      // {
      //     next:(data)=>{
      //                   console.log("conversation :", data)
      //                   this.CurrentConversation=data},
      //     error:(err)=>{console.log("conversation :", err)}
      // })

      if(this.authenticationService.loggedIn())
       {this.chatService.setupSocketConnection(this.currentUser._id,this.selectedRoom);
      
      
      }
}



submitMessage() {
  const message = this.sendedMessage;
  if (message) {
    this.chatService.sendNewMessage(this.currentUser,message,this.selectedRoom, 
    //   (cb:any) => {
    //   console.log("ACKNOWLEDGEMENT ", cb);
    // }
    )}
} 



handleSelectedRoom(id:any)
{
this.selectedRoom=id
 this.roomService.getConversationByRoomId(this.selectedRoom).subscribe(
  {
      next:(data)=>{
                    console.log("conversation :", data)
                    this.CurrentConversation=data},
      error:(err)=>{console.log("conversation :", err)}
  })}

  sendMessage(){console.log("here we send messages !")}

  ngOnDestroy(){
    this.chatService.quitRoom(this.selectedRoom)
  }
}
