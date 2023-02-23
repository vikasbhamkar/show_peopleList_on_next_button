import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'protest';
  allData: any;
  data: any;
  total: any;
  recordone = false;
  norecord = true;
  onerecord = false;
  currentPage = 1;
  recordsPerPage = 3;
  constructor(private http: HttpClient) {
    this.getData().subscribe((data) => {
      this.total = data.length;
      this.data = data.slice(0, this.recordsPerPage);
    })
  }
  getData() {
    return this.http.get<any>('assets/data.json').pipe(
      tap(data => this.allData = data)
    );
  }
  getnextpage() {
    this.currentPage++;
    const startIndex = (this.currentPage - 1) * this.recordsPerPage;
    const endIndex = startIndex + this.recordsPerPage;
    this.data = this.allData.slice(startIndex, endIndex);
    if (startIndex == this.total - 1) {
      this.onerecord = true;
    }
    if (startIndex > this.total) {
      this.norecord = false;
      this.recordone = true;
    }
  }
}
