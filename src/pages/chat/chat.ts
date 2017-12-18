import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

// import { ChatService, ChatMessage, UserInfo } from "../providers/chat-service";
import { Events, Content, TextInput } from 'ionic-angular';
import { ChatService } from '../../providers/chat-service';
import { elementAt } from 'rxjs/operator/elementAt';
import { Socket } from 'ng-socket-io';


/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
})
export class ChatPage {

    chatData: any;
    msgData: any
    msgList: any = [];
    chatName: any
    chatMsgObject: any
    chatCurrentUserId: any
    chatUserId: any;
    chatId: any
    sub: any
    public imageUrl: any = "http://35.167.128.181:8000/storage";
    @ViewChild(Content) content: Content;
    @ViewChild('chat_input') messageInput: TextInput;
    ChatMessage: any = [];
    //user: UserInfo;
    // toUser: UserInfo;
    editorMsg = '';
    showEmojiPicker = false;
    toggled: boolean = false;
    emojitext: string;

    constructor(public navParams: NavParams,
        public events: Events, public chat: ChatService) {
        this.scrollToBottom();
        this.msgList = navParams.get("ChatData");
        this.chatMsgObject = navParams.get("ChatObject");
        this.chatName = this.chatMsgObject.ChatMsgName;
        this.chatCurrentUserId = this.chatMsgObject.currentUserId;
        this.chatUserId = this.chatMsgObject.chatUserID;
        this.chatId = this.chatMsgObject.ChatID;
        console.log("Chat ID:", this.chatId)
        //this.chatId=this.msgList.id;
        
      

        this.chat.socket.on('chat.message', function (message) {
            this.chat.getChatInfo(this.chatId).then((res) => {
                console.log(res);
                this.msgList = res["data"];
                console.log("Message List Socket :",this.msgList)
                this.scrollToBottom();
                

            });
        }.bind(this));
       // console.log(this.msgList);
        console.log(this.chatMsgObject);

    }


    onFocus() {
        //this.showEmojiPicker = false;
        this.content.resize();
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

    sendMsg() {
        if (!this.editorMsg.trim()) return;

        // Mock message
        const id = Date.now().toString();
        let ChatMessage = {
            curentuserid: this.chatCurrentUserId,
            chatuserid: this.chatUserId,
            message: this.editorMsg
        };
        console.log("MessageData",ChatMessage)
        //this.pushNewMsg(newMsg);
        this.editorMsg = '';

        if (!this.emojitext) {
            this.messageInput.setFocus();
        }

        this.chat.sendMsg(ChatMessage)
            .then(res => {

                this.chat.getChatInfo(this.chatId)
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
            if (this.content.scrollToBottom) {
                this.content.scrollToBottom();
            }
        }, 600)
    }
}