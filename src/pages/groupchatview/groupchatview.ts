import { Component,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { ChatService } from '../../providers/chat-service';
import { Events, Content, TextInput } from 'ionic-angular';

/**
 * Generated class for the GroupchatviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groupchatview',
  templateUrl: 'groupchatview.html',
})
export class GroupchatviewPage {


  chatName:any
  listgroup1:any
  person_id:any
  chatID:any
  chatData:any
  msgList:any
  public imageUrl: any = "http://35.167.128.181:8000/storage";
  chatCurrentUserId:any
  chatId:any
  chatUserId:any
  editorMsg = '';
  showEmojiPicker = false;
  toggled: boolean = false;
  emojitext: string;

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: TextInput;

  constructor(public navCtrl: NavController, public navParams: NavParams,public chat:ChatService) {

    this.scrollToBottom();
    this.chatName=navParams.get("GroupName");
    this.person_id=navParams.get("Person_ID");
    console.log("PERSON_ID",this.person_id)
    
    console.log(this.chatName)
    this.chatID=navParams.get("GroupID");
    console.log("CHATID",this.chatID)
    this.chatData=navParams.get("GroupMessage");
    this.msgList=this.chatData["data"]
    console.log(this.msgList)

            this.chat.socket.on('chat.group', function(message) {
                this.chat.getgroupmessages(this.chatID).then(data => {            
                    this.listgroup1=data["data"];
                    console.log("GroupChat Data",data);
                    this.msgList=this.listgroup1;
                    this.scrollToBottom();
                    console.log("Group Chat MessageList",this.msgList);
                    this.scrollToBottom();
                  })
            }.bind(this));

  }

  onFocus() {
    //this.showEmojiPicker = false;
    //this.content.resize();
    this.scrollToBottom();
}

handleSelection(event) {
    this.editorMsg = this.editorMsg + " " + event.char;
    if (!this.editorMsg) {
        this.messageInput.setFocus();
    }
    this.content.resize();
    this.scrollToBottom();
}

sendGroupMsg() {
    if (!this.editorMsg.trim()) return;

    // Mock message
    const id = Date.now().toString();
    let grpChatMessage = {
        sender_id: this.person_id,
        group_id: this.chatID,
        text: this.editorMsg
    };
    //console.log("MessageData",ChatMessage)
    //this.pushNewMsg(newMsg);
    this.editorMsg = '';

    if (!this.emojitext) {
        this.messageInput.setFocus();
    }

    this.chat.sendGroupMsg(grpChatMessage)
        .then(res => {

            this.chat.getgroupmessages(this.chatID)
                .then((data) => {
                    console.log(data)
                    this.msgList = data["data"]
                    this.scrollToBottom();
                    console.log(this.msgList)


                })
        })
}


getMsgIndexById(id: string) {
    return this.msgList.findIndex(e => e.messageId === id)
}

scrollToBottom() {
    setTimeout(() => {
        if(this.content._scroll) {
            this.content.scrollToBottom(0);
        }
    }, 600)
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupchatviewPage');
  }

}
