import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { LibrayServicesService } from 'src/app/services/libray-services.service';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  // default variables
  fileToUpload:   File      = null;
  formdata    :   FormGroup = null;
  upload_mess :   string    = null;

  

  constructor(private router : Router, private libService : LibrayServicesService) { }

  ngOnInit() {
    this.formdata = new FormGroup({});
  }

  
  // take the file from file list
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);   
  }


  // upload the retrived file from file list and routes back to home
  uploadFileToActivity() {

    if(this.fileToUpload != null){
        this.libService.add_a_book(this.fileToUpload).subscribe((data: any)=>{
          this.upload_mess = data.success;
          alert(this.upload_mess);  
        })
        this.router.navigate(['/home']);
    }
    else{
      alert("null value is not exceptable")
      this.router.navigate(['/home']);
    }
  }


 

}
