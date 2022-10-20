/* 
    syncTables.js

    Synchronize our db tables with data in rawg.
    
    Functions for gathering results from api endpoints and sending them to our db in bulk, filling
    every row in the table.  This may only make sense when the tables are relatively small, as with
    Genres and Platforms.
*/

import axios from 'axios';
import { supabase } from './supabase'
const apiKey = import.meta.env.VITE_RAWG_API_KEY;

// clears the genres table, fetches genre pages from rawg, then sends the results to our database
// - there are currently a total of 19 genres on rawg
export async function syncGenres() {

    const totalPagesWeWant = 1; // note that this will be the number of requests made
    const pageSize = 40;
    const baseURL = 'https://api.rawg.io/api/genres';
    var allFetched = [];

    for (var pageNum = 1; pageNum <= totalPagesWeWant; pageNum++) {

        var response = await fetchPage(baseURL, pageSize, pageNum);

        const fetched = response.data.results;
        for (var i=0; i<fetched.length; i++) 
            allFetched.push( { genre_id: fetched[i].id, name: fetched[i].name } );

        if (!response.data.next)  // if next is null, then this is the last page
            break;
    }

    await insertNonDuplicates(allFetched, 'Genres');
}

// clears the platforms table, fetches platform pages from rawg, then sends the results to our database
// - there are currently a total of 51 platforms on rawg
export async function syncPlatforms() {

    const totalPagesWeWant = 2; // note that this will be the number of requests made
    const pageSize = 40;
    const baseURL = 'https://api.rawg.io/api/platforms';
    var allFetched = [];

    for (var pageNum = 1; pageNum <= totalPagesWeWant; pageNum++) {

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

// invoke the database function on supabase that clears to the table you want to clear
// - includes clearGenresTable and clearPlatformsTable
async function clearTable(db_function) {

    try {
 
        const { error } = await supabase
                .rpc(db_function)

        if (error) throw error

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