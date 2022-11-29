/* 
    upsertTables.js

    Synchronize our db tables with data in rawg.
    
    Functions for gathering results from api endpoints and sending them to our db in bulk, filling
    every row in the table. 
*/

import axios from 'axios';
import { supabase } from './supabase'
import { handleError } from './error'
const apiKey = import.meta.env.VITE_RAWG_API_KEY;

export async function upsertAll() {
    await upsertFromGames();
    await upsertGenres();
    await upsertPlatforms();
}

// fetches pages from the games endpoint and uses the games' attributes to build our tables including: Games
// Tags, Game To Tag, Game To Genre, and Game To Platform
export async function upsertFromGames() {
    
    const totalPagesWeWant = 10;
    const pageSize = 40;
    const baseURL = "https://api.rawg.io/api/games";

    // all rows fetched for the Games table
    var allGames = [];

    // all rows fetched for the game<->genre table
    var allGameGenreLinks = []

    // all rows fetched for the game<->platform table
    var allGamePlatformLinks = []

    // all rows fetched for the game<->tag table
    var allGameTagLinks = []

    // all rows fetched for Tags table
    var allTags = [];
    
    for (var pageNum = 1; pageNum <= totalPagesWeWant; pageNum++) {

        console.log("Getting /games page ", pageNum);

        var response = await fetchPage(baseURL, pageSize, pageNum);
    
        const games = response.data.results;

        for (var game of games) {

            for (var genre of game.genres) {
                allGameGenreLinks.push({ game_id: game.id, genre_id: genre.id });
            }

            for (var p of game.platforms) {
                // p.platform is not a typo - see 'games' object
                allGamePlatformLinks.push({ game_id: game.id, platform_id: p.platform.id }); 
            }

            for (var tag of game.tags) {
                allTags.push({ tag_id: tag.id, tag_name: tag.name, is_rateable: true, description: ""});
                allGameTagLinks.push({ game_id: game.id, tag_id: tag.id, avg_score: null, times_rated: 0 });
            }

            allGames.push({
                    game_id: game.id,
                    title: game.name,
                    release_date: game.released,
                    background_image: game.background_image,
                    confidence: 0,
                });
        }

        if (!response.data.next) 
            break;
    }
    
    await insertNonDuplicates(allGames, "Games");
    await insertNonDuplicates(allGameGenreLinks, "Game To Genre");
    await insertNonDuplicates(allGamePlatformLinks, "Game To Platform");
    await insertNonDuplicates(allGameTagLinks, "Game To Tag");
    await insertNonDuplicates(allTags, "Tags");
    
    console.log("done upserting from games");
  }

// fetches genre pages from rawg, then sends the results to our database
// - there are currently a total of 19 genres on rawg
export async function upsertGenres() {

    const totalPagesWeWant = 1; // note that this will be the number of requests made
    const pageSize = 40;
    const baseURL = 'https://api.rawg.io/api/genres';
    var allFetched = [];

    for (var pageNum = 1; pageNum <= totalPagesWeWant; pageNum++) {

        console.log("Getting /genres page ", pageNum);

        var response = await fetchPage(baseURL, pageSize, pageNum);

        const fetched = response.data.results;
        for (var i=0; i<fetched.length; i++) 
            allFetched.push( { genre_id: fetched[i].id, name: fetched[i].name } );

        if (!response.data.next)  // if next is null, then this is the last page
            break;
    }

    await insertNonDuplicates(allFetched, 'Genres');
}

// fetches platform pages from rawg, then sends the results to our database
// - there are currently a total of 51 platforms on rawg
export async function upsertPlatforms() {

    const totalPagesWeWant = 2; // note that this will be the number of requests made
    const pageSize = 40;
    const baseURL = 'https://api.rawg.io/api/platforms';
    var allFetched = [];

    for (var pageNum = 1; pageNum <= totalPagesWeWant; pageNum++) {

        console.log("Getting /platforms page ", pageNum);

        var response = await fetchPage(baseURL, pageSize, pageNum);
        
        const fetched = response.data.results;
        for (var i=0; i<fetched.length; i++) 
            allFetched.push( { platform_id: fetched[i].id, name: fetched[i].name } );

        if (!response.data.next)  // if next is null, then this is the last page
            break;
    }

    await insertNonDuplicates(allFetched, 'Platforms');
}

// fetches a single page
// - returns the response if .get is successful.  If not, error is displayed and return value is undefined
async function fetchPage(baseURL, pageSize, pageNum) {

    try {

        const url = baseURL + `?key=${apiKey}&page_size=${pageSize}&page=${pageNum}`;
        return await axios.get(url);

    } catch (err) {
        handleError(err);
    }
}

// sends all fetched results to our database as an array of js objects
// - if any of those in the list are already in the db, then this will fail
async function sendToDatabase(allFetched, tableName) {

    try {
        
        const { data, error } = await supabase
                .from(tableName)
                .insert(allFetched)

        if (error) throw error

    } catch (err) {
        handleError(err);
    }
}

// With ignoreDuplicates set to true, this will insert any rows that are not already in the table.  By default, a row
// is considered to be already in the table (aka a duplicate) if there is already a row with the same primary key
// - IMPORTANT NOTE - if ignoreDuplicates is not set, this will instead update duplicate rows, which may wipe data
//   that is unique to our db.  For example, updating a row in Games would set the confidence column
async function insertNonDuplicates(rows, tableName) {
    console.log("inserting to", tableName);
    try {
        
        const { data, error } = await supabase
                .from(tableName)
                .upsert(rows, 
                    { ignoreDuplicates: true } )

        if (error) throw error

    } catch (err) {
        handleError(err);
    }
}