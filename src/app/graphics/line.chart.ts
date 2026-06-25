import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input } from '@angular/core';
import * as d3 from "d3";

type ChartPoint = {
    date: Date;
    balance: number;
};

@Component({
    selector: 'app-line-chart',
    template: '<div class="chart"></div>',
    imports: [CommonModule]
})
export class LineChart {
    @Input() chartData: any[] = [];
    elementRef = inject(ElementRef);

    ngOnInit(): void {
        if (this.chartData.length == 0) return;

        const margin = { top: 10, right: 30, bottom: 30, left: 60 };
        const container = this.elementRef.nativeElement.querySelector('.chart');

        if (!container) return;

        const width = container.clientWidth - margin.left - margin.right;
        const height = (container.clientHeight == 0 ? 400 : container.clientHeight) - margin.top - margin.bottom;

        const data: ChartPoint[] = this.chartData.map(d => ({
            ...d,
            date: new Date(d.date)
        }));

        const svg = d3.select(this.elementRef.nativeElement).select('.chart').append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        const x = d3.scaleUtc()
            .domain(d3.extent(data, d => d.date) as [Date, Date])
            .range([margin.left, width - margin.right]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.balance) ?? 0])
            .range([height - margin.bottom, margin.top]);


        svg.append("g")
            .call(d3.axisLeft(y));

        const formatDate = d3.utcFormat("%b %d");

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(6).tickFormat((d) => formatDate(d as Date)));

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line<ChartPoint>()
                .x(function (d) { return x(d.date) })
                .y(function (d) { return y(d.balance) })
            )
    }

    ngOnDestroy(): void {
        d3.select(this.elementRef.nativeElement).select('.chart').selectAll('*').remove();
    }
}