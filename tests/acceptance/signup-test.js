import { test } from 'qunit';
import moduleForAcceptance from 'validation-post/tests/helpers/module-for-acceptance';
import page from 'validation-post/tests/pages/signup';

moduleForAcceptance('Acceptance | signup');

test('it can signup user', function(assert) {
  let [firstAddress, secondAddress] = server.createList('address', 20);
  let expectedAddresses = [firstAddress, secondAddress].mapBy('attrs.name');

  page.visit();
  andThen(() =>{
    page.form.fill({
      name: 'John Doe',
      email: 'me@example.com',
      addresses: [0, 1],
      palindrome: 'kayak',
      media: 'MyMovie'
    });

    page.form.submit.click();

    andThen(() => {
      // Assert User was created
      let user = server.db.users[0].data.attributes;
      assert.equal(user.name, 'John Doe');
      assert.equal(user.email, 'me@example.com');
      assert.deepEqual(user.addresses.mapBy('name'), expectedAddresses);
      assert.equal(user['favorite-media'], 'MyMovie');
      assert.equal(user['favorite-palindrome'], 'kayak');
    });
  });
});

test('it prevents invalid request', function(assert) {
  assert.expect(0);
  server.createList('address', 20);

  page.visit();
  andThen(() =>{
    page.form.fill({
      name: '123',
      email: 'notA email',
      addresses: [],
      palindrome: 'nope',
      media: '123'
    });

    page.form.submit.click();
  });
});
