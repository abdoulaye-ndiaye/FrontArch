import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changer-password',
  templateUrl: './changer-password.component.html'
})
export class ChangerPasswordComponent implements OnInit {
  inputText: string = 'changer-password';
  constructor() { }

  ngOnInit(): void {
  }

}
