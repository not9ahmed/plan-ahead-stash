import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, DividerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'plan-ahead-stash-app';
}
