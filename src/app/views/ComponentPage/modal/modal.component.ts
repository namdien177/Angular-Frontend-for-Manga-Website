import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor() { }

  @Input() message:string;
  @Output() close = new EventEmitter<boolean>();

  closebtn(){
    this.close.emit(false);
  }

  ngOnInit() {
    setTimeout(() => {
      this.close.emit(false)
    }, 3000);
  }

  

}
