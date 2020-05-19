import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComandasPage } from './comandas.page';

describe('ComandasPage', () => {
  let component: ComandasPage;
  let fixture: ComponentFixture<ComandasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComandasPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComandasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
