import { Component } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {

    selectedBeer: BeerData = {} as BeerData;

    sendBeer(beer: BeerData): void {
        this.selectedBeer = beer;
    }

}
