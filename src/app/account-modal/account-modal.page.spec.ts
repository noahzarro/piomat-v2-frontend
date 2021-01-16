import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountModalPage } from './account-modal.page';

describe('AccountModalPage', () => {
  let component: AccountModalPage;
  let fixture: ComponentFixture<AccountModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
