import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardModalPage } from './card-modal.page';

describe('CardModalPage', () => {
  let component: CardModalPage;
  let fixture: ComponentFixture<CardModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
