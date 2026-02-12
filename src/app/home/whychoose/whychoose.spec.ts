import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Whychoose } from './whychoose';

describe('Whychoose', () => {
  let component: Whychoose;
  let fixture: ComponentFixture<Whychoose>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Whychoose]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Whychoose);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
