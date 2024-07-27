import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonToTableComponent } from './json-to-table.component';

describe('JsonToTableComponent', () => {
  let component: JsonToTableComponent;
  let fixture: ComponentFixture<JsonToTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonToTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonToTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
