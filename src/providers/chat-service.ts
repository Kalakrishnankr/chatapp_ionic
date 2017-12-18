import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { Http, Headers, RequestOptions,Response } from '@angular/http';
import { Events } from 'ionic-angular';
import * as io from 'socket.io-client';
import { SocketIoModule, SocketIoConfig,Socket } from 'ng-socket-io'; 


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import 'rxjs/Rx';




@Injectable()
export class ChatService {

    //Service Api Calls
    baseUrl="http://35.167.128.181:8000/api/";
    socket = io('http://35.167.128.181:3000/');
    
    
    person_id: any
    //end here
    constructor(public http: Http,
                public events: Events) {
    }
    private _serverError(err: any) {
        console.log('sever error:', err);  // debug
        if(err instanceof Response) {
          return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(err || 'backend server error');
    }

    //get chat list
    getChatList(person_id){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return new Promise(resolve=>{
            this.http.get(`${this.baseUrl}getChatList/`+person_id,{headers}).subscribe(data=>{
                console.log(data)
                if(data.status == 200){
                    resolve(data.json())
                    data.json();
                }else{
                    resolve(false);
                }
               },err=>{
                    resolve(false);
                })
            })
        
       /*  return this.http.get(this.baseUrl+"getChatList/"+person_id,{headers})
        .map((res) => res.json())
        .do(data => console.log('server data:', data))  // debug
        .catch(this._serverError); */

    }
    //add new person chat
    getChatInfo(chatId){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return new Promise(resolve=>{
            this.http.get(`${this.baseUrl}getChatInfo/`+chatId,{headers}).subscribe(data =>{
                console.log(data)
                if(data.status == 200){
                 resolve(data.json())
                 data.json();
                }else
                 resolve(false);
            },err=>{
                resolve(false);
            })


            })
        }
       
    //send Message
    sendMsg(newMsg){
        let body=newMsg
        let headers =new Headers();
         headers.append('Content-Type','application/json');
        return new Promise(resolve => {
            this.http.post(`${this.baseUrl}chatting`,body,{headers}).subscribe(data => { 
              console.log("Message ",data)
              if(data.status == 200){
                resolve(data);
                this.socket.emit('chat.message', 'New Message');
                data;
              }
              else
                resolve(false);
              },
              err => {
                resolve(false);
              
            })
          })
    }

    //Get Friendlist
    getFriendList(person_id){
        let body = {curentuserid: person_id}
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return new Promise(resolve=>{
            this.http.post(`${this.baseUrl}friendsList`,body,{headers}).subscribe(data =>{
                console.log("Friends",data)
                if(data.status == 200){
                    resolve(data.json());
                    data.json();
                }else{
                    resolve(false)
                }},
                err=>{
                    resolve(false);
                

                })
        })
    }

    //Add new chatting 
    addNewChatting(curentuserid,chatuserdid){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return  new Promise(resolve=>{
            this.http.get(`${this.baseUrl}addnewchat?curentuserid=`+curentuserid+`&&chatuserid=`+chatuserdid,{headers}).subscribe(data =>{
                    console.log("NewChat",data)
                    if(data.status == 200){
                        resolve(data.json());
                        data.json();
                    }else{
                        resolve(false)
                    }},
                    err=>{
                        resolve(false);

            })

        })
    }

    //Create a new Group
    creategroup(person_id,value,group_name,status_chat){
        let body={
            currentId:person_id,
            member_id:value,
            groupName:group_name,
            status:status_chat
        }
        console.log("Friends Idz:",body)
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return new Promise(resolve=>{
            this.http.post(`${this.baseUrl}creategroup/`,body,{headers}).subscribe(data=>{
                console.log("Groupcreated",data)
                if(data.status == 200){
                    resolve(data.json());
                    data.json();
                }else{
                    resolve(false);
                }},err=>{
                    resolve(false);
                
            })
        })

    }

    //Get GroupList

    getGroupList(person_id){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return new Promise(resolve=>{
            this.http.get(`${this.baseUrl}getmychatgroups/`+person_id,{headers}).subscribe(data=>{
                console.log("Groupcreated",data)
                if(data.status == 200){
                    resolve(data.json());
                    data.json();
                }else{
                    resolve(false);
                }},err=>{
                    resolve(false);
                
            })
        })
    }

    //Get GroupMessage
    getgroupmessages(group_id){

        let headers = new Headers();
                headers.append('Content-Type','application/json');
                return new Promise(resolve=>{
                    this.http.get(`${this.baseUrl}getgroupmessages/`+group_id,{headers}).subscribe(data=>{
                        console.log("Group Messages",data)
                        if(data.status == 200){
                            resolve(data.json());
                            data.json();
                        }else{
                            resolve(false);
                        }},err=>{
                            resolve(false);
                        
                    })
                })


    }

    //Send Group Message
    sendGroupMsg(grpChatMsg){
        let body=grpChatMsg;
        let headers= new Headers();
            headers.append('Content-Type','application/json');
            return new Promise(resolve=>{
                this.http.post(`${this.baseUrl}postgroupmessages/`,body,{headers}).subscribe(data=>{

                    console.log("Groupcreated",data)
                    if(data.status == 200){
                        resolve(data.json());
                        this.socket.emit('chat.group', 'New Messages');                      
                    }else{
                        resolve(false);
                    }},err=>{
                        resolve(false);

                })
            })


    }



}
