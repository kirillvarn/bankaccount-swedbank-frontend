import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import ListUtil from '../../utils/util.array';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-table',
    templateUrl: './table.html',
    styleUrl: './table.css',
    imports: [CommonModule, RouterLink]
})
export class Table {
    @Input() data: any[] = [];
    @Input() columns: string[] = [];
    @Input() showDetails: boolean = false;

    get rows() {
        if (this.data.length > 0) {
            return this.data.map((el) => ListUtil.pickKeys(el as Record<string, any>, this.columns));
        }

        return [];
    };
}