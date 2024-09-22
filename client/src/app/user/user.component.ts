import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  @ViewChild('closeSignInModalBtn', { static: true }) closeSignInModalBtn: ElementRef<HTMLElement>; 
  @ViewChild('closeSignUpModalBtn', { static: true }) closeSignUpModalBtn: ElementRef<HTMLElement>; 

  localUser = {
    firstName: '',
    lastName: '',
    password: '',
    email: '',
  };

  public signUpFormValidated = false;
  public signInFormValidated = false;

  constructor(
    private userService:UserService
  ) {}

  signUp = () => {
    this.userService.signUp(this.localUser).subscribe(() => {
      let el: HTMLElement = this.closeSignUpModalBtn.nativeElement;
      el.click();
    })
  };

  signIn = () => {
    this.userService.signIn(this.localUser).subscribe(() => {
      let el: HTMLElement = this.closeSignInModalBtn.nativeElement;
      el.click();
    })
  };
}
