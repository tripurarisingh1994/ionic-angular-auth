import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  msg = '' ;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      emailMob: [
        '',
        [
          Validators.pattern(
            '^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|(^[0-9]{10})+$'
          ),
          Validators.required,
        ],
      ],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    });
  }

  get fc() {
    return this.loginForm.controls;
  }

  doLogin() {
    let users = [];

    if (localStorage.getItem('users')) {
      users = JSON.parse(localStorage.getItem('users'));
    }

    if (users.length > 0) {
      const chk = users.findIndex((user) => (user.email === this.loginForm.value.emailMob || user.mob === this.loginForm.value.emailMob)
        && user.password === window.btoa(this.loginForm.value.password)
      );

      if (chk > -1) {
        localStorage.setItem('user', this.loginForm.value.emailMob );
        this.loginForm.reset();

        this.router.navigateByUrl('/dashboard');
      }
      else {
        this.msg = 'Email Id / Mob No. or Password did not match ! Please try with other.';

        setTimeout(()=>{
          this.msg = '';
        }, 5000);
      }

    }


  }

}
