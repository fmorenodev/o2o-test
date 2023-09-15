import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-beer-detail',
    templateUrl: './beer-detail.component.html',
    styleUrls: ['./beer-detail.component.scss']
})
export class BeerDetailComponent {

    @Input() selectedBeer = {} as BeerData;

    ngOnChanges(changes: SimpleChanges): void {
        this.selectedBeer = changes['selectedBeer'].currentValue;
    }

    isEmpty(obj: Object): boolean {
        return Object.keys(obj).length === 0;
    }

}
