import { Injectable } from '@angular/core'
import jsPDF from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";


@Injectable({ providedIn: 'root' })
export class PdfService {
    generatePDF(title: string, data: any[]) {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(title, 10, 10);

        const headers = Object.keys(data[0] ?? {}) as any[];
        data = data.map(element => Object.values(element));

        autoTable(doc, {
            head: [headers],
            body: data,
            startY: 20,
            theme: "plain"
        });

        doc.setFontSize(10);
        doc.text("All rights reserved", 10, 100);

        doc.save("table.pdf");
    }

}
