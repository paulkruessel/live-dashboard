import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dash } from "./dash/dash";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dash],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('dashboard-client');
}
