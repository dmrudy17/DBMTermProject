/* 
    syncTables.js

    Synchronize our db tables with data in rawg.
    
    Functions for gathering results from api endpoints and sending them to our db in bulk, filling
    every row in the table.  This may only make sense when the tables are relatively small, as with
    Genres and Platforms.
*/

import axios from "axios";
import { supabase } from "./supabase";
const apiKey = import.meta.env.VITE_RAWG_API_KEY;

export async function upsertFromGames() {
  //total page limit
  const totalPagesWeWant = 25;
  //limit of items for 1 page
  const pageSize = 40;

  /*
  only get from this endpoint, from games we can get everything else
  */
  const baseURL = "https://api.rawg.io/api/games";

  // all Rrows fetched for the games table
  var allGames = [];

  // all rows fetched for the game<->genre table
  var allGameGenreLinks = [];

  // all rows fetched for the game<->platform table
  var allGamePlatformLinks = [];

  // all rows fetched for the game<->tag table
  var allGameTagLinks = [];

  // all rows fetched for the tags table.  User Set() because we will surely encounter duplicates when fetching. This may
  // not be necessary since we have ignore duplicates on upsert, but it will keep the list of rows sent much smaller
  const allTags = new Set();

  //for each page
  for (var pageNum = 1; pageNum <= totalPagesWeWant; pageNum++) {
    var response = await fetchPage(baseURL, pageSize, pageNum);

    //grab 40 games
    const games = response.data.results;

    //for each game
    for (var game of games) {
      //for a game
      //see what genre it has
      //#region THIS MIGHT TIE WITH UPSERT GENRE
      for (var genre of game.genres) {
        //the array will have game id and genre id
        //TODO:DEBUG THIS SEE WHAT IT LOOKS LIKE
        allGameGenreLinks.push({ game_id: game.id, genre_id: genre.id });
      }
      //#endregion

      //for a game
      //see what platform it on
      for (var p of game.platforms) {
        //array of game id and plat_id
        allGamePlatformLinks.push({
          game_id: game.id,
          platform_id: p.platform.id,
        });
      }

      //for a game
      //see what rawg tag it has
      for (var tag of game.tags) {
        //unique Set of tags {tag id..}
        allTags.add({
          id: tag.id,
          name: tag.name,
          is_rateable: true,
          description: "",
        });

        allGameTagLinks.push({
          game_id: game.id,
          tag_id: tag.id,
          score: null,
        });
      }

      //add array for a game title
      allGames.push({
        game_id: game.id,
        game_name: game.name,
        release_date: game.released,
        background_image: game.background_image,
        confidence: 0,
      });
    }

    if (!response.data.next) break;
  }

  await insertNonDuplicates(allGames, "Games");
  await insertNonDuplicates(allGameGenreLinks, "Game To Genre");
  await insertNonDuplicates(allGamePlatformLinks, "Game To Platform");
  await insertNonDuplicates(allGameTagLinks, "Game To Tag");

  //doesn't like taking Set() as argument
  //so convert it Array.from(allTags)
  await insertNonDuplicates(Array.from(allTags), "Tags");

  console.log("done upserting from games");
}

// fetches genre pages from rawg, then sends the results to our database
// - there are currently a total of 19 genres on rawg
export async function upsertGenres() {
  const totalPagesWeWant = 1; // note that this will be the number of requests made
  const pageSize = 40;
  const baseURL = "https://api.rawg.io/api/genres";
  var allFetched = [];

  for (var pageNum = 1; pageNum <= totalPagesWeWant; pageNum++) {
    var response = await fetchPage(baseURL, pageSize, pageNum);

    const fetched = response.data.results;
    for (var i = 0; i < fetched.length; i++)
      allFetched.push({ genre_id: fetched[i].id, name: fetched[i].name });

    if (!response.data.next)
      // if next is null, then this is the last page
      break;
  }

  await insertNonDuplicates(allFetched, "Genres");
}

//#region rip boxo
// export async function fetchGames() {
//   const totalPagesWeWant = 1;
//   const pageSize = 40;
//   const baseURL = "https://api.rawg.io/api/games";
//   var allFetched = [];
//   for (var pageNum = 1; pageNum <= totalPagesWeWant; pageNum++) {
//     var response = await fetchPage(baseURL, pageSize, pageNum);

//     const fetched = response.data.results;
//     for (var i = 0; i < fetched.length; i++) {
//       allFetched.push({
//         game_id: fetched[i].id,
//         game_name: fetched[i].name,
//         release_date: fetched[i].released,
//         confidence: 0,
//       });
//     }
//     if (!response.data.next) break;
//   }
//   await sendToDatabase(allFetched, "Games");
// }
// export async function fetchTags() {
//   const totalPagesWeWant = 1;
//   const pageSize = 40;
//   const baseURL = "https://api.rawg.io/api/tags";
//   var allFetched = [];
//   for (var pageNum = 1; pageNum <= totalPagesWeWant; pageNum++) {
//     var response = await fetchPage(baseURL, pageSize, pageNum);

//     const fetched = response.data.results;
//     for (var i = 0; i < fetched.length; i++) {
//       allFetched.push({
//         id: fetched[i].id,
//         name: fetched[i].name,
//         is_rateable: true,
//         description: "",
//       });
//     }
//     if (!response.data.next) break;
//   }
//   await sendToDatabase(allFetched, "Tags");
// }
//#endregion

// fetches a single page
// - returns the response if .get is successful.  If not, error is displayed and return value is undefined
async function fetchPage(baseURL, pageSize, pageNum) {
  try {
    const url =
      baseURL + `?key=${apiKey}&page_size=${pageSize}&page=${pageNum}`;
    return await axios.get(url);
  } catch (err) {
    handleError(err);
  }
}

// sends all fetched results to our database as an array of js objects
// - if any of those in the list are already in the db, then this will fail
async function sendToDatabase(allFetched, tableName) {
  try {
    const { data, error } = await supabase.from(tableName).insert(allFetched);

    if (error) throw error;
  } catch (err) {
    handleError(err);
  }
}

//this replaces sendToDatabase
// With ignoreDuplicates set to true, this will insert any rows that are not already in the table.
//  By default,
//    a row is considered to be already in the table (aka a duplicate)
//      if there is already a row with the same primary key

// - IMPORTANT NOTE - if ignoreDuplicates is not set,
// this will instead update duplicate rows, which may wipe data
//   that is unique to our db.  For example,
//updating a row in Games would reset the confidence column
async function insertNonDuplicates(rows, tableName) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .upsert(rows, { ignoreDuplicates: true });

    if (error) throw error;
  } catch (err) {
    handleError(err);
  }
}

// invoke the database function on supabase that clears to the table you want to clear
// - includes clearGenresTable and clearPlatformsTable
async function clearTable(db_function) {
  try {
    const { error } = await supabase.rpc(db_function);

    if (error) throw error;
  } catch (err) {
    handleError(err);
  }
}

function handleError(e) {
  if (e.response) {
    console.log("Server Error: ", e);
  } else if (e.request) {
    console.log("Network Error: ", e);
  } else {
    console.log("Client Error: ", e);
  }
}
