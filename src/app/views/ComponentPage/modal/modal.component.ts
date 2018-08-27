import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  @Input() message:string = '';
  @Input() title:string = '';
  @Input() optionMessage:string = '';
  @Input() redirectHome:boolean = false;
  @Output() close = new EventEmitter<boolean>();
  @Output() opt = new EventEmitter<boolean>();

  countTime:number;

  closebtn(){
    if(this.redirectHome) this.router.navigateByUrl('/');
    this.close.emit(false);
  }

  optionbtn(){
    this.opt.emit(true);
  }

  ngOnInit() {
    if(this.optionMessage.length>0){
      this.countTime=0
    }else{
      this.countTime = 5;
      setInterval(()=>{
        this.countTime = this.countTime - 1;
      }, 1000);
      setTimeout(() => {
        this.closebtn();
      }, 5000);
    }
  }

  

}
