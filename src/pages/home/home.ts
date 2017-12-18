import { Component } from '@angular/core';
import { NavController,IonicPage,NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
import { ChatPage } from '../chat/chat';
import { UseronlinestatusPage } from '../useronlinestatus/useronlinestatus';



import { ChatService } from '../../providers/chat-service';
import { Item } from 'ionic-angular/components/item/item';
import { concat } from 'rxjs/operator/concat';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //personId : any;
  chatId : any;
  chatName : any;
  chatUserId : any;
  public personList: any=[];
  public message_list : any =[];
  toUser:Object;
  public personId :any
  public imageUrl :any ="http://35.167.128.181:8000/storage";//Image Url

  constructor(public navCtrl: NavController,public chat : ChatService, public navPrms: NavParams) {
   
    this.personId=this.navPrms.get("PersonID")
    this.loadChatList(this.personId);
 
  }
 
  //Method for getting ChatList
  loadChatList(personId){
      //Method for getting ChatList
      this.chat.getChatList(this.personId).then((data)=>{
        console.log(data["data"]);
        for(let i=0; i<data["data"].length; i++){
          this.personList.push(data["data"][i]);
        }
      console.log(this.personList);
      }); 
  }
       


  //Get individual Item click
  getIndividualChat(Item){
   
    this.chatId=Item.id;
    this.chatName=Item.name;
    this.chatUserId=Item.user_id;
    this.toUser = {
      currentUserId:this.personId,
      chatUserID:this.chatUserId,
      ChatMsgName:this.chatName,
      ChatID:this.chatId
     }

    this.chat.getChatInfo(this.chatId).then((res)=>{
      let ChatList =res["data"];
      console.log(ChatList)
      // if(ChatList.length>0){

        this.navCtrl.push(ChatPage,{"ChatData":res["data"],"ChatObject":this.toUser});
      // }
      console.log(res);
    });
  }
  

}
