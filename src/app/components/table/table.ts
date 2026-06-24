import { CommonModule } from '@angular/common';
import { Component, computed, Input, Signal } from '@angular/core';
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

    rows: Signal<any[]> = computed(() => {
        if (this.data.length > 0) {
            return this.data.map((el) => ListUtil.pickKeys(el, this.columns));
        }

        return [];
    });
}