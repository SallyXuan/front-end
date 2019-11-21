import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class LibrayServicesService {


  constructor(private http: HttpClient) {}

  get_booklist() {
    // get request
    return this.http.get("book_list");
  }

  search_a_book(book_name: string) {
    //get request
    return this.http.get("search?book_name=" + book_name);
  }

  download_a_book(book_name: string) { //get request
    return this.http.get("download_book?book_name="+book_name,{ responseType: "blob"});
  }

  add_a_book(fileToUpload: File) {
    // post request
    const formData: FormData = new FormData();
    formData.append("fi", fileToUpload, fileToUpload.name);
    return this.http.post("add", formData);
  }
}
