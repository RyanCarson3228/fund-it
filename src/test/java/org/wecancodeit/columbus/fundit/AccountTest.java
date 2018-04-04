package org.wecancodeit.columbus.fundit;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.contains;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.not;

import java.util.Collection;

import org.junit.Test;

public class AccountTest {

	@Test
	public void shouldCreateAnAccountObject() {
		Account account = new Account();

		assertNotNull(account);
	}

	@Test
	public void accountShouldHaveBalance() {
		Account account = new Account("Savings", 100.00);

		double check = account.getBalance();

		assertThat(check, is(100.00));
	}

	@Test
	public void accountSetFundToAccount() {
		Account account = new Account("Savings", 100.00);
		Fund fundTest = new Fund("Emergency", account);
		Account check = fundTest.getAccount();
		assertThat(check, is(account));

	}

	@Test
	public void accountSetFundstoAccount() {
		Account account = new Account("Savings", 100.00);
		Fund fundTest = new Fund("Emergency", account);
		Fund fundTest2 = new Fund("Dog", account);

		Account check = fundTest.getAccount();
		Account check2 = fundTest2.getAccount();

		assertThat(check, is(account));
		assertThat(check2, is(account));
	}


}