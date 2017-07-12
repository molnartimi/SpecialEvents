/**
 * Created by NB-72 on 2017. 07. 11..
 */
import {Component} from "@angular/core";
import {AuthService} from "../services/auth.service";
@Component({
  templateUrl: 'setting.component.html',
  styleUrls: ['setting.component.css']
})
export class SettingComponent {
  old: string;
  new1: string;
  new2: string;
  wrong: boolean = false;

  constructor(private authService: AuthService) {}

  save(): void{
    if(this.authService.changePwd(this.old, this.new1, this.new2)) {
      this.wrong = false;
      let snack = document.getElementById("snackbar");
      snack.className = "show";
      setTimeout(() => {
        snack.className = snack.className.replace("show","")
      }, 2000);
    }
    else {
      this.wrong = true;
    }


  }
}
