import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      name: [
        '',
        Validators.required
      ],
      email: [
        '',
        [ Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.required ],
      ],
      mob: [
        '',
        [ Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'), Validators.required ],
      ],
      password: ['',
       [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]
      ],
    });
  }

  get fc() {
    return this.registerForm.controls;
  }

  doRegister() {
    let users = [];
    if(localStorage.getItem('users')){
      users = JSON.parse(localStorage.getItem('users'));
    }

    const u = { name : this.registerForm.value.name, email : this.registerForm.value.email,  mob : this.registerForm.value.mob,
      password : window.btoa(this.registerForm.value.password) };

    users.push(u);

    localStorage.setItem('users', JSON.stringify(users));
    this.registerForm.reset();

    this.router.navigateByUrl('/login');
  }

}
