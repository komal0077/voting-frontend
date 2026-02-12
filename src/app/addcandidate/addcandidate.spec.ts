import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addcandidate } from './addcandidate';

describe('Addcandidate', () => {
  let component: Addcandidate;
  let fixture: ComponentFixture<Addcandidate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addcandidate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addcandidate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
