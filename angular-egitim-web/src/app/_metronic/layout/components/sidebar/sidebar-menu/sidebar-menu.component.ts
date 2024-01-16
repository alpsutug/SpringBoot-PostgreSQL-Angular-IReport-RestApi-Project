import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../../modules/auth";

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  public user: any;
  public appRoleId = 0;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.appRoleId = Number(this.user.appRoleId);
  }

}
