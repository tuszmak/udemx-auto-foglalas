import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [provideNativeDateAdapter()],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
