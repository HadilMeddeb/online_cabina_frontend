import { TestBed } from '@angular/core/testing';

import { FicheSanitaireService } from './fiche-sanitaire.service';

describe('FicheSanitaireService', () => {
  let service: FicheSanitaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FicheSanitaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
