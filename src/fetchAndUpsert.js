/* 
    fetchAndUpsert.js

    Synchronize our db tables with data in rawg.
    
    Functions for gathering results from api endpoints and sending them to our db in bulk, filling
    every row in the table. 
*/

import axios from 'axios';
import { supabase } from './supabase'
import { handleError } from './error'
import { getCurrentTags } from './rpc';
const apiKey = import.meta.env.VITE_RAWG_API_KEY;

export async function doIt() {

    const totalPagesWeWant = 25;
    const pageSize = 40;
    const baseURL = "https://api.rawg.io/api/games";

    // all rows fetched for the games table
    var allGames = [];

    // all rows fetched for the game<->genre table
    var allGameGenreLinks = []

    // all rows fetched for the game<->platform table
    var allGamePlatformLinks = []

    // all rows fetched for the game<->tag table
    var allGameTagLinks = []

    // all rows fetched for the tags table.  The table's tag_id attribute is an auto-incrementing primary key, which is
    // necessary for user's to be able to add tags.  However in this function we need to know the tags' id's before
    // inserting them so that we can form the allGameTagLinks array for the "Game To Tag" table, therefore we need to query
    // the max tag_id and assign the tag_id's manually starting from there.
    const ourCurrentTagsInfo = await getCurrentTags();
    var nextTagID = ourCurrentTagsInfo.max_id + 1;
    var ourCurrentTags = ourCurrentTagsInfo.tags;
    if (ourCurrentTags === null)
        ourCurrentTags = [];

    var allTags = [];
    console.log("next tag_id: ",nextTagID);
    for (var pageNum = 1; pageNum <= totalPagesWeWant; pageNum++) {

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
                
                // check if the tag is in our db
                let thisTag = ourCurrentTags.find(elem => elem.name == tag.name);

                // if it is not, create a new tag using the next available id
                if (thisTag === undefined) {
                    thisTag = { tag_id: nextTagID, tag_name: tag.name, is_rateable: true, description: ""};
                    ourCurrentTags.push( { tag_id: nextTagID, name: tag.name } );
                    allTags.push(thisTag);
                    nextTagID++;
                }
                
                allGameTagLinks.push({ game_id: game.id, tag_id: thisTag.tag_id, avg_score: null, times_rated: 0 });
            }

            allGames.push({
                game_id: game.id,
                title: game.name,
                release_date: game.released,
                background_image: game.background_image,
                confidence: 0,
            });
        }

        console.log(pageNum);
        if (!response.data.next) 
            break;
    }

    await insertNonDuplicates(allGames, "Games");
    await insertNonDuplicates(allGameGenreLinks, "Game To Genre");
    await insertNonDuplicates(allGamePlatformLinks, "Game To Platform");
    console.log("allt len: ",allTags.length);
    await insertNonDuplicates(allTags, "Tags Test");
    await insertNonDuplicates(allGameTagLinks, "Game To Tag Test");

    console.log("done upserting from games");
}

async function insertNonNameDuplicates(rows, tableName) {

    try {
        
        const { data, error } = await supabase
                .from(tableName)
                .upsert(rows, 
                    { onConflict: 'tag_name'},
                    { ignoreDuplicates: true },)

        if (error) throw error

    } catch (err) {
        handleError(err);
    }
}

async function insertNonDuplicates(rows, tableName) {

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
