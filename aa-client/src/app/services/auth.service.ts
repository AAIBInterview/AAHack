import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
// import {tokenNotExpired} from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { SERVER_HOST } from './constants';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  isDev:boolean;
  profile:any;
  constructor(private http:Http) {
    this.isDev = false; // Change to false before deployment
  }
  
  sendFileToUpload(files, id){
    let formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i], files[i].name);
    }
    let ep = this.prepEndpoint('sendfiles/upload?taskid='+id);
    return this.http.post(ep, formData)
      .map(res => res.json());
  }
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('users/register');
    return this.http.post(ep, user,{headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('users/authenticate');
    return this.http.post(ep, user,{headers: headers})
      .map(res => res.json());
  }
  addNewUser(user){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('users/addNewUser');
    return this.http.post(ep, user,{headers: headers})
      .map(res => res.json());
  }
  deleteUser(id){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    let ep = this.prepEndpoint('users/deleteUser/'+id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }
  getAllUsers(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('users/getAllUsers');
    return this.http.get(ep,{headers: headers})
      .map(res => res.json());
  }
  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('users/profile');
    return this.http.get(ep,{headers: headers})
      .map(res => res.json());
  }
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  //Books
  addNewBooks(task){
    let headers = new Headers();
    this.loadToken();
    // headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    console.log("auth");
    let ep = this.prepEndpoint('books/addbooks');
    return this.http.post(ep, task,{headers: headers})
      .map(res => res.json());
  }
  getAllBooks(){
    let headers = new Headers();
    this.loadToken();
    // headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('books/getallbooks');
    return this.http.get(ep,{headers: headers})
      .map(res => res.json());
  }
  deleteBooks(id){
    let headers = new Headers();
    this.loadToken();
    // headers.append('Authorization', this.authToken);
    let ep = this.prepEndpoint('books/deletebooks/'+id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }
  editBooks(id){
    let headers = new Headers();
    this.loadToken();
    // headers.append('Authorization', this.authToken);
    let ep = this.prepEndpoint('books/editbooks/'+id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }
  updateBooks(task){
    let headers = new Headers();
    this.loadToken();
    // headers.append('Authorization', this.authToken);
    let ep = this.prepEndpoint('books/updatebooks/'+task._id);
    return this.http.post(ep,task, {headers: headers})
      .map(res => res.json());
  }
  assignBook(models){
    console.log("assignBook");
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    let lp=this.prepEndpoint('books/assignbook');
    return this.http.post(lp,models,{headers:headers}).map(res=>res.json());
  }

//profile 
fectchProfile(user){
  console.log(user);
 let headers = new Headers();
 this.loadToken();
 // headers.append('Authorization', this.authToken);
 headers.append('Content-Type','application/json');
 let ep = this.prepEndpoint('profiles/fectchProfile/'+user.email);
 return this.http.get(ep,{headers: headers})
   .map(res => res.json());
}
getAllProfiles(){
 let headers = new Headers();
 this.loadToken();
 // headers.append('Authorization', this.authToken);
 headers.append('Content-Type','application/json');
 let ep = this.prepEndpoint('profiles/getAllProfiles');
 return this.http.get(ep,{headers: headers})
   .map(res => res.json());
}
 
editprofile(id){
 let headers = new Headers();
 this.loadToken();
 // headers.append('Authorization', this.authToken);
 let ep = this.prepEndpoint('profile/editprofile/'+id);
 return this.http.get(ep, {headers: headers})
   .map(res => res.json());
}
updateprofile(profile){
 console.log(profile);
 let headers = new Headers();
 this.loadToken();
 // headers.append('Authorization', this.authToken);
 let ep = this.prepEndpoint('profiles/updateprofile');
 return this.http.post(ep,profile, {headers: headers})
   .map(res => res.json());
}
//to store the profile data
storeProfileData(token, profile){
 console.log(profile);
 localStorage.setItem('id_token', token);
 localStorage.setItem('user', JSON.stringify(profile));
 this.authToken = token;
 this.profile = profile;
}
sendFileToUpload1(files, id){
  let formData1: FormData = new FormData();
  for (let i = 0; i < files.length; i++) {
      formData1.append("file", files[i], files[i].name);
  }
  let ep = this.prepEndpoint('sendPhoto/uploadPic?_id='+id);
  return this.http.post(ep, formData1)
    .map(res => res.json());
}

//Projects
  addNewProject(project){
    let headers = new Headers();
    this.loadToken();
    // headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('projects/addproject');
    return this.http.post(ep, project,{headers: headers})
      .map(res => res.json());
  }
  getAllProjects(customerEmailId, userType){
    let headers = new Headers();
    this.loadToken();
    // headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('projects/getAllprojects/'+customerEmailId+'/'+userType);
    return this.http.get(ep,{headers: headers})
      .map(res => res.json());
  }
  getAllEmail(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('users/getAllemail');
    return this.http.get(ep,{headers: headers})
    
      .map(res => res.json());
  }
  deleteProject(id){
    let headers = new Headers();
    this.loadToken();
    // headers.append('Authorization', this.authToken);
    let ep = this.prepEndpoint('projects/deleteProject/'+id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }
  editproject(id){
    let headers = new Headers();
    this.loadToken();
    // headers.append('Authorization', this.authToken);
    let ep = this.prepEndpoint('projects/editproject/'+id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }
  updateproject(project){
    let headers = new Headers();
    this.loadToken();
    // headers.append('Authorization', this.authToken);
    let ep = this.prepEndpoint('projects/updateproject/'+project._id);
    return this.http.post(ep,project, {headers: headers})
      .map(res => res.json());
  }

  assignProject(models){
    console.log("assignProject");
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    let lp=this.prepEndpoint('projects/assignproject');
    return this.http.post(lp,models,{headers:headers}).map(res=>res.json());
  }

  assignTask(models){
    console.log("assignTask");
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    let lp=this.prepEndpoint('tasks/assigntask');
    return this.http.post(lp,models,{headers:headers}).map(res=>res.json());
  }

  //Tasks
  //to add new task
  addTask(task){
    console.log("addTask");
    let headers=new Headers();
      headers.append('Content-Type','application/json');
      var dp=this.prepEndpoint('tasks/addtask');
      return this.http.post(dp,task,{headers:headers}).map(res => res.json());
  }
 //to dispaly all the task in table
  getTask(projectId){
    console.log("getTask");
    let headers= new Headers();
    headers.append('Content-Type','application/json');
    var dp=this.prepEndpoint('tasks/gettask/'+projectId);
    return this.http.get(dp,{headers:headers}).map(res => res.json());
  }

  getMyTask(projectId,customerEmailId){
    console.log("getMyTask");
    let headers= new Headers();
    headers.append('Content-Type','application/json');
    var dp=this.prepEndpoint('tasks/getmytask/'+projectId+'/'+customerEmailId);
    return this.http.get(dp,{headers:headers}).map(res => res.json());
  }
    //to update task
    updateTask(updatetask){
      console.log("updateTask");
      let headers=new Headers();
        headers.append('Content-Type','application/json');
        var dp=this.prepEndpoint('tasks/updatetask');
        return this.http.post(dp,updatetask,{headers:headers}).map(res => res.json());
    }

    // delete task table
     deleteTasks(id){
       console.log("authservice")
    let headers = new Headers();
    // this.loadToken();
    // headers.append('Authorization', this.authToken);
    let ep = this.prepEndpoint('tasks/deletetasks/'+id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }


  //get user from user module

  getUserInTask(){
    console.log("getUserInTask")
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    let ep=this.prepEndpoint('users/getuser');
    return this.http.get(ep,{headers:headers}).map(res=>res.json());
  }

  getAllDetails(){
    console.log("getAllDetails");
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('common/getalldetails');
    return this.http.get(ep,{headers: headers})
      .map(res => res.json());
  }
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // loggedIn(){
  //   return tokenNotExpired();
  // }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }


  prepEndpoint(ep) {
      return SERVER_HOST + ep;
  }


fectchTask(id){
  console.log("getAllActivity");
 let headers = new Headers();
 this.loadToken();
 // headers.append('Authorization', this.authToken);
 headers.append('Content-Type','application/json');
 let ep = this.prepEndpoint('tasks/fectchTask/'+id);
 return this.http.get(ep,{headers: headers})
   .map(res => res.json());
}
}

