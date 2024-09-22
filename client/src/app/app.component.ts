import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { AppService } from './app.service';
import { UserComponent } from './user/user.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, UserComponent, BreadcrumbsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';

  constructor(
    private appService:AppService,
  ) {}

  ngOnInit() {
    this.appService.restoreStateFromLocalStorage();    
  }
}
