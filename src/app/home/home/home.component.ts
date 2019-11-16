import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { LibrayServicesService } from "src/app/services/libray-services.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  //default variables .
  fileToUpload: File = null;
  book_name: string = null;
  book_list: [] = null;
  list: [] = null;
  welcome: {} = null;
  formdata: FormGroup = null;
  upload_mess: string = null;

  constructor(
    private router: Router,
    private libService: LibrayServicesService
  ) {}

  ngOnInit() {
    this.formdata = new FormGroup({});
  }

  // welcome message from server
  welocome() {
    this.libService.welcomeMessage().subscribe((data: any) => {
      this.welcome = data;
      console.log(this.welcome);
    });
  }

  // find all the books of library
  bookList() {
    this.libService.get_booklist().subscribe((data: any) => {
      this.book_list = data;
      console.log(this.book_list);
    });
  }

  // search a book by book name
  searchBook(book_name: string) {
    this.libService
      .search_a_book(Object(book_name)["book_name"])
      .subscribe((data: any) => {
        this.book_name = data.book_name;
        console.log(this.book_name);
      });
  }

  // take the file from file list
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  // upload the retrived file from file list
  uploadFileToActivity(file: any) {
    this.libService.add_a_book(this.fileToUpload).subscribe((data: any) => {
      this.upload_mess = data.success;
      console.log(this.upload_mess);
    });
  }

  get_book_list() {
    this.list = this.book_list;
    return this.list;
  }
}
