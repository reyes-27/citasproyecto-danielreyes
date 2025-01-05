import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaDeCitasComponent } from './lista-de-citas.component';

describe('ListaDeCitasComponent', () => {
  let component: ListaDeCitasComponent;
  let fixture: ComponentFixture<ListaDeCitasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ListaDeCitasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaDeCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
