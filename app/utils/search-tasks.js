import { task } from 'ember-concurrency';

const MOVIE_URL = 'http://www.omdbapi.com/';
const TV_URL = 'http://api.tvmaze.com/search/shows';
const BOOK_URL = 'http://openlibrary.org/search.json';
const SONG_URL = 'https://itunes.apple.com/search';

function stringCompare (a, b) {
  return a.toLowerCase() === b.toLowerCase();
}

const isMovieTask = task(function *(term) {
  try {
    let response = yield this.get('ajax').request(`${MOVIE_URL}?t=${term}`);
    return stringCompare(response.title, term);
  } catch (e) {
    console.log(e);
    return false;
  }
});

const isTVShowTask = task(function *(term){
  try {
    let responses = yield this.get('ajax').request(`${TV_URL}?q=${term}`);
    let matchingResponses = responses.filter(r => stringCompare(r.show.name, term));
    return matchingResponses.length > 0;
  } catch (e) {
    return false;
  }
});

const isBookTask = task(function *(term) {
  try {
    let response = yield this.get('ajax').request(`${BOOK_URL}?q=${term}`);
    let matchingResponses = response.docs.filter(doc => stringCompare(doc.title, term));
    return matchingResponses.length > 0;
  } catch (e) {
    return false;
  }
});

const isSongTask = task(function *(term) {
  try {
    let response = yield this.get('ajax').request(SONG_URL, {
      data: {
        media: 'music',
        attribute: 'songTerm',
        entity: 'song',
        term: term
      },
      crossDomain : true,
      xhrFields: {
         withCredentials: true
      },
      dataType: 'jsonp'
    });
    let matchedResponses = response.results.filter(song => stringCompare(song.trackName, term));
    return matchedResponses.length > 0;
  } catch (e) {
    return false;
  }
});

export {
  isMovieTask, isSongTask, isBookTask, isTVShowTask
};
