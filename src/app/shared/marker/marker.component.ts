import { Component, 
  OnInit,
  ViewChild,
  AfterViewInit, 
  ElementRef ,
  HostListener,
  Input, 
  Output,
  EventEmitter } from '@angular/core';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.css']
})
export class MarkerComponent implements OnInit, AfterViewInit {

  @ViewChild('myCanvas') myCanvas: ElementRef;
  @Input() backgrount:any;
  @Input() point: any;
  @Output() markersOut = new EventEmitter();
  
  public context: CanvasRenderingContext2D;
  public markers = [];

  constructor() {
  }

  ngOnInit() {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.draw();
    })
  }

  @HostListener('mousedown', ['$event'])
  mouseClicked(mouse:MouseEvent) {
    let rect = this.myCanvas.nativeElement.getBoundingClientRect();
    let mousexpos = (mouse.x - rect.left);
    let mouseypos = (mouse.y - rect.top);

    let point = {
      image: this.point.image,
      width: this.point.width,
      height:this.point.height,
      xpos:(mousexpos - (this.point.width / 2)),
      ypos:(mouseypos - this.point.height)
    }
    
    this.markers.push(point);
    this.draw();
  }

  draw(){
    this.context.fillRect(0, 0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);
    this.context.drawImage(this.backgrount.image, 0, 0, this.backgrount.width, this.backgrount.height);

    for (let marker of this.markers) {
      this.context.drawImage(marker.image, marker.xpos, marker.ypos, marker.width, marker.height);
    }

    this.markersOut.emit(this.markers);
  }

  clear(){
    this.markers = [];
    this.draw();
  }
}
