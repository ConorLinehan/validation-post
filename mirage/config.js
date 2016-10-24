import config from 'validation-post/config/environment';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */

 this.get('addresses');
 this.post('users');
 this.get('users', (db, { queryParams }) =>{
   let email = queryParams.email;

   if (email) {
     return db.users.where({ email: email});
   }

   return db.users;
 });

 if (config.environment !== 'test') {
   this.passthrough('http://www.omdbapi.com/');
   this.passthrough('https://itunes.apple.com/search');
   this.passthrough('http://api.tvmaze.com/search/shows');
   this.passthrough('http://openlibrary.org/**');
 } else {
   this.get('http://www.omdbapi.com/', () =>{
     return {
       title: 'MyMovie'
     };
   });
   this.get('https://itunes.apple.com/search', () =>{
     return [];
   });
   this.get('http://api.tvmaze.com/search/shows', () =>{
     return [];
   });
   this.get('http://openlibrary.org/**', () =>{
     return [];
   });
 }
}
