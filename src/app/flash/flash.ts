import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FlashMessageService } from '../services/flash.service';

@Component({
  selector: 'app-flash',
  imports: [CommonModule],
  templateUrl: './flash.html',
  styleUrl: './flash.css',
})
export class Flash {
  flash = inject(FlashMessageService);
}
