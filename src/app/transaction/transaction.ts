import { Component, inject, Signal } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { BackButtonDirective } from '../directives/back-button.directive';
import { PdfService } from '../services/pdf.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.html',
  imports: [CommonModule, BackButtonDirective]
})
export class Transaction {
  transactionService = inject(TransactionService);
  transactionId = inject(ActivatedRoute).snapshot.paramMap.get('id')!;
  pdfService = inject(PdfService);

  transaction$ = this.transactionService.getTransaction(this.transactionId);
  transaction = toSignal(this.transaction$);

  generateReport() {
    this.transaction$.subscribe((transaction) => {
      this.pdfService.generatePDF("Transaction overview", [transaction]);
    });
  }
}