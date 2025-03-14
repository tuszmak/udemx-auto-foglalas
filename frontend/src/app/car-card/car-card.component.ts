import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Car } from '../../lib/types';
import { CardShellComponent } from '../admin/card-shell/card-shell.component';

@Component({
  selector: 'app-car-card',
  imports: [MatCardModule, CommonModule, MatButtonModule, CardShellComponent],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css',
})
export class CarCardComponent {
  @Input() car!: Car;
  @Input() buttonText: string = '';
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  buttonWasClicked(): void {
    this.onClick.emit();
  }
}
