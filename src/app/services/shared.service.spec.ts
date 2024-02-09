import { TestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';

describe('SharedService', () => {
  let service: SharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return current page number', () => {
    const currentPage = service.getPage();
    expect(currentPage).toBe(1); 
  });
  it('should filter genres by type', () => {
    const genres: any[] = [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Comedy' },
      { id: 3, name: 'Drama' }
    ];

    // Prueba filtrando los géneros por un tipo específico
    let filteredGenres = service.filterByGenre(genres, 2);
    expect(filteredGenres.length).toBe(1); // Debería haber un solo género con el tipo 2

    // Prueba filtrando los géneros por un tipo que no existe en la lista
    filteredGenres = service.filterByGenre(genres, 5);
    expect(filteredGenres.length).toBe(0); // No debería haber géneros con el tipo 5

    // Prueba filtrando los géneros sin especificar un tipo
    //filteredGenres = service.filterByGenre(genres, undefined);
    //expect(filteredGenres.length).toBe(0); // No debería haber géneros filtrados si el tipo es undefined
  });
});
