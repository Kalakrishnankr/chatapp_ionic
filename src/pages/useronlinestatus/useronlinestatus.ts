import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ChatService } from '../../providers/chat-service';
import { HomePage } from '../home/home';
import { ChatPage } from '../chat/chat';
import { GroupchatPage } from '../groupchat/groupchat';


/**
 * Generated class for the UseronlinestatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-useronlinestatus',
  templateUrl: 'useronlinestatus.html',
})
export class UseronlinestatusPage {
//personId : any;
chat_user_Id : any;
chatName : any;
uID : any 
public friendsList: any=[];
public chat_flag=0;
//public message_list : any =[];
toUser:Object;
public personId :any=6;//Person ID is hardcoded here
public imageUrl :any ="http://35.167.128.181:8000/storage";//Image Url

constructor(public navCtrl: NavController,public chat : ChatService) {
 
  //Method for getting ChatList
  this.getallFriendList(this.personId);
}
//Go to ChatList Page
getChatListPage(){
  this.navCtrl.push(HomePage,{"PersonID":this.personId});
}

//Go to Group Chat Page
getGroupChat(){
  this.navCtrl.push(GroupchatPage,{"PersonID":this.personId})
}

//Go to Online ChatPAge
getOnlineChat(){

}


getallFriendList(personId){
  this.chat.getFriendList(this.personId).then((data)=>{
    //console.log(data["data"]);
    for(let i=0; i<data["data"].length; i++){
      this.friendsList.push(data["data"][i]);
    }
   console.log(this.friendsList);
  });
}

getIndividualChat(Item){
  
   this.chat_user_Id=Item.id;//chat user_id
   this.chatName=Item.name;
   
   this.getchatListData(this.chat_user_Id);

}

getchatListData(chatUserId)
{
  this.chat.getChatList(chatUserId).then((res)=>{
          console.log(res["data"]);
          for(let i=0; i<res["data"].length; i++){
            
            if(res["data"][i].user_id == this.personId){
              this.chat_flag=1;
              let chatData=res["data"][i];
              this.uID=chatData.id;
              console.log("ChatData",chatData)

            }
      
    }

    if(this.chat_flag == 1){
      console.log("already chatted before");
      this.toUser = {
        currentUserId:this.personId,
        chatUserID:this.chat_user_Id,
        ChatMsgName:this.chatName,
        ChatID:this.uID
       }
      this.chat.getChatInfo(this.uID).then((res)=>{
        let ChatList =res["data"];
        console.log(ChatList)
        this.chat_flag=0;
        // if(ChatList.length>0){
          this.navCtrl.push(ChatPage,{"ChatData":ChatList,"ChatObject":this.toUser});
        // }
       
      })
    }else{
      console.log("not chatted yet");
      console.log("Chat User ID",this.chat_user_Id);
      console.log("User ID",this.personId)
      this.chat.addNewChatting(this.personId,this.chat_user_Id).then((res)=>{
            console.log(res)
            let newChatList = res["data"];
            this.toUser = {
              currentUserId:this.personId,
              chatUserID:this.chat_user_Id,
              ChatMsgName:this.chatName,
              ChatID:this.uID
             }
             this.navCtrl.push(ChatPage,{"ChatData":newChatList,"ChatObject":this.toUser});

      })


      

    }
    


   })
}
   
     
  
   
   



}
