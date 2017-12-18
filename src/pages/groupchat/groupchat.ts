import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { ChatService } from '../../providers/chat-service';
import { GroupchatviewPage } from '../groupchatview/groupchatview';


/**
 * Generated class for the GroupchatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groupchat',
  templateUrl: 'groupchat.html',
})
export class GroupchatPage {
  
  personId : any;
  friendList :any;
  groupName:any;
  groupList:any;
  group_name :any;
  friendsSelected:any={};
  public buttonClicked :boolean = false;
  


  constructor(public navCtrl: NavController, public navParams: NavParams,public chat :ChatService,public toast :ToastController) {
    
    this.personId=navParams.get("PersonID");
    

    //Get Friend List
    this.chat.getFriendList(this.personId).then((res)=>{
      console.log(res);
      if(res!=null){
        this.friendList=res["data"];
      }
    })

    this.getGroupListData();
   
  }

   //Get GroupList
   getGroupListData(){
    this.chat.getGroupList(this.personId).then((res)=>{
      console.log(res);
      if(res!=null){
        this.groupList=res["data"];
      }
      console.log("GroupList",this.groupList)
    })
  
   }
   
   public listgroup1:any;
   getGroupAnnouncement(group_id,group_name){
     console.log("group_id:",group_id);
     console.log("group_name:",group_name);
     this.group_name=group_name;
     localStorage.setItem('group_id', group_id);  
     this.chat.getgroupmessages(group_id)
     .then(data => {
   
         console.log("aaaaaa",data);
         this.listgroup1=data;
         console.log(this.listgroup1);
         //console.log("PERSON_ID",this.personId)
          this.navCtrl.push(GroupchatviewPage,{"GroupMessage":this.listgroup1,"GroupName":this.group_name,"GroupID":group_id,"Person_ID":this.personId})

       },
       error => {
         console.log("error");
       }); 
   }

  onButtonClicked(){
    this.buttonClicked=true;
  }

  /* onSelected(name){
   
    
    var selectedList=[];
    console.log(name)
    for( var i in this.friendsSelected){
      selectedList.push(i);
    }
    console.log(selectedList);
   } */

  
  save(){
         var array = [];
         array.push(this.personId)
         for(var i in this.friendsSelected) {
          console.log(this.friendsSelected[i]);
          if(this.friendsSelected[i] == true) {
              array.push(i);
          }
      }
      console.log(array);

      if(this.groupName == null){
          this.presentToast("Enter Valid Group Name")
      }else if(array.length>=1){
        this.presentToast("Please add Members")
      }else{
          //Status 0-Shoutout and status 1-chat
          let status_chat=1;
          this.chat.creategroup(this.personId,array,this.groupName,status_chat).then(data=>{
            console.log(data);
            this.buttonClicked=false;
            this.getGroupListData();
            this.presentToast("Group Created Successfully")
          })
          // this.viewCtrl.dismiss()
      }   
  }

  cancel(){
    this.buttonClicked=false;
  }

  presentToast(msg) {
    let toast = this.toast.create({
    message: msg,
    duration: 2000,
    position: 'middle',
    cssClass: 'toast_class'
    });
    toast.onDidDismiss(() => {
    console.log('Dismissed toast');
    });
    toast.present();
    }
  
}
