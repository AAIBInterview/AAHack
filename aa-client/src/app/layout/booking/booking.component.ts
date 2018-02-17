import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {Router} from '@angular/router';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import { routerTransition } from '../../router.animations';
// import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service'
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  user: any;
  booksData: any;
  title: String;
  description: String;
  time: String;
  book1: any={};
  showHide: boolean;
  idForAssign:any;
  assign=false;
  allUsers:any;
  dropdownList:any=[];
  dropdownSettings:{};
  selectedItems:any;
  models: any = {};
  book: any;
  bookId: any;
  closeResult: string;

  constructor(
    // private validateService: ValidateService,
    private modalService: NgbModal,
    private authService: AuthService,
    // public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    // this.toastr.setRootViewContainerRef(vcr);
    this.authService.getAllBooks().subscribe(data => {
      this.booksData = data.books;
      console.log(this.booksData);
    });
    this.showHide = false;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
        // this.dropdownSettings = { 
        //                           singleSelection: false, 
        //                           text:"Select CustomerId",
        //                           selectAllText:'Select All',
        //                           unSelectAllText:'UnSelect All',
        //                           enableSearchFilter: true,
        //                           classes:"myclass custom-class"
        //                         };  
  }

  //for checkbox dropdown

    // onItemSelect(item:any){
    //     console.log(item);
    //     console.log(this.selectedItems);
    // }
    // OnItemDeSelect(item:any){
    //     console.log(item);
    //     console.log(this.selectedItems);
    // }
    // onSelectAll(items: any){
    //     console.log(items);
    // }
    // onDeSelectAll(items: any){
    //     console.log(items);
    // }


  onBookSubmit() {
    const book = {
      title: this.title,
      description: this.description,
      time: this.time
    }
        console.log(book);
    // Register user
    this.authService.addNewBooks(book).subscribe(data => {
      console.log("books");
      if (data.success) {
        // this.toastr.success('New book added successfully.', 'Success!');
        // this.clearForm();
        this.booksData.push(data.book);
      } else {
        // this.toastr.error(data.msg);
        //  this.toastr.error('Something went wrong!', 'Error!');
      }
    });
  }
  clearForm() {
    this.title = '';
    this.description = '';
    this.time = '';
  }
  deleteThisBook(id, index) {
    this.authService.deleteBooks(id).subscribe(data => {
      if (data.success) {
        // this.toastr.success('Book deleted successfully.', 'Success!');
        this.booksData.splice(index, 1);
      } else {
        // this.toastr.error('Something went wrong!', 'Error!');
      }
    });
  }
  // myValue;
  // editThisBook(id, i) {
  //   this.authService.editBooks(id).subscribe(data => {
  //     if (data.success) {
  //       this.showHide = true;
  //         this.book1._id = this.booksData[i]._id;
  //         this.book1.title = this.booksData[i].title;
  //         this.book1.description = this.booksData[i].description;
  //         this.book1.time = this.booksData[i].time;
  //         this.myValue = i;
  //     } else {
  //       this.toastr.error('Something went wrong!', 'Error!');
  //     }
  // });
  // }
//   onUpdateBook(){
//     this.authService.updateBooks(this.book1).subscribe(data => {
//       if(data.success) {
//          let i= this.myValue;
//           for(let x=0; x<this.booksData.length;x++){
//             if(x==i){
//               this.booksData[x]= this.book1;
//               this.book1 = {};
//               // this.msg = "Record is successfully updated..... ";
//               this.showHide = false;
//               this.toastr.success(data.msg);
//             }
//           }
//       } else {
//         this.toastr.error('Something went wrong!', 'Error!');
//       }
//   });
//  }
//  getUser(id){
//   this.idForAssign=id;
//   this.assign=true;
//   this.authService.getUserInTask().subscribe(data=>{
//     if(data.success){
//       console.log("data came");
//       this.allUsers=data.users;
//       console.log(data);
//       console.log(data.users);
//       for(let i=0;i<this.allUsers.length;i++){
//         this.dropdownList.push( {"id":i,"itemName": this.allUsers[i]});
//       } 
//     }
//     else{
//       console.log("failed to collect data");
//     }
//   })
// }

//to assign task
  // onAssignBook(){
  //   const models={
  //     bookId:this.idForAssign,
  //     customerEmailId: this.selectedItems
  //   }
  //   console.log(models)
  //   console.log("assign is working")
  //   this.authService.assignBook(models).subscribe(data=>
  //   {
  //     if(data.success){
  //       console.log("assign information is saved");
  //     }
  //     else{
  //       console.log("assign information is  not saved");
  //     }
  //   });
  // }
cancelEdit(){
  this.showHide = false;
}

onLoggedout() {
  localStorage.clear();
}  

open(content) {
  this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
  } else {
      return  `with: ${reason}`;
  }
}

}