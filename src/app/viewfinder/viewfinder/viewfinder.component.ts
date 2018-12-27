import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-viewfinder',
  templateUrl: './viewfinder.component.html',
  styleUrls: ['./viewfinder.component.css']
})
export class ViewfinderComponent implements OnInit {

  public params: any

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
          this.params = params;
          console.log(params);
      });
  }

  ngOnInit() {
  }

}
