import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordStrengthComponent } from './password-strength.component';

// TODO tests
describe('PasswordStrengthComponent', () => {
	let component: PasswordStrengthComponent;
	let fixture: ComponentFixture<PasswordStrengthComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PasswordStrengthComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PasswordStrengthComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
