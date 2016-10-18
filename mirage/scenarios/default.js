export default function(server) {

  server.createList('address', 10);

  // Fake 20 emails for use then print them to console for user
  let users = server.createList('user', 20);
  console.log(users.mapBy('email'));
}
