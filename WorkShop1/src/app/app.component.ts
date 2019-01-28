import { Component } from '@angular/core';
import { ApiService } from './conec_api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WorkShop1';
  infos: any;
  errorMessage: string;

  constructor(private apiService: ApiService) {
    this.GetData();
  }

  GetData() {
    this.apiService.getInfo().subscribe(
      listOrders => {
        this.infos = listOrders;
        console.log(this.infos);
      },
      error => (this.errorMessage = <any>error),
    );
  }
}






