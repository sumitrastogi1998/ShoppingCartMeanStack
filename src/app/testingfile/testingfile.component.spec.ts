import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingfileComponent } from './testingfile.component';

describe('TestingfileComponent', () => {
  let component: TestingfileComponent;
  let fixture: ComponentFixture<TestingfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
