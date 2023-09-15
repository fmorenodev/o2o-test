import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Subject, OperatorFunction, Observable, debounceTime, distinctUntilChanged, filter, merge, map } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

    @Input() labelText: string = '';
    @Output() selectedBeer = new EventEmitter<BeerData>();

    beerData: BeerData[] = [];

    constructor(private apiService: ApiService) { }

    @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    formatter = (result: BeerData) => result.name;

    /**
     * Función auxiliar de la barra de búsqueda
     */
    search: OperatorFunction<string, readonly BeerData[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map((term) =>
                (term === '' ? this.beerData : this.beerData.filter(
                    (beer: BeerData) => this.ingredientFilter(term, beer))).slice(0, 10),
            ),
        );
    };

    // Filtros para la barra de búsqueda

    ingredientFilter(searchTerm: string, beer: BeerData) {
        return this.nameFilter(searchTerm, beer) ||
            this.hopFilter(searchTerm, beer) ||
            this.maltFilter(searchTerm, beer) ||
            this.yeastFilter(searchTerm, beer) ||
            this.twistFilter(searchTerm, beer);
    }

    nameFilter(searchTerm: string, elementToSearch: { name: string }): boolean {
        return elementToSearch.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    }

    hopFilter(searchTerm: string, beer: BeerData): boolean {
        return beer.ingredients.hops.filter((hop) => this.nameFilter(searchTerm, hop)).length > 0;
    }

    maltFilter(searchTerm: string, beer: BeerData): boolean {
        return beer.ingredients.malt.filter((malt) => this.nameFilter(searchTerm, malt)).length > 0;
    }

    yeastFilter(searchTerm: string, beer: BeerData): boolean {
        return beer.ingredients.yeast.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    }

    twistFilter(searchTerm: string, beer: BeerData): boolean {
        if (beer.method.twist == null) {
            beer.method.twist = '';
        }
        return beer.method.twist.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    }

    /**
     * Llamada a la api
     */
    getBeers() {
        this.apiService.get('beers').subscribe((data: any) => {
            this.beerData = data;
            console.log(this.beerData);
        });
    }

    showBeer(event: NgbTypeaheadSelectItemEvent, input: HTMLInputElement): void {
        this.selectedBeer.emit(event.item);
        event.preventDefault();
        input.value = '';
    }

}