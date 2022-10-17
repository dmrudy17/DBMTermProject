<template>
    <button @click="fetchAll()" class="px-4 py-2 bg-green-500 rounded-lg">Fetch All!</button>
</template>

<script>
// import axios from 'axios';
// import { supabase } from '../supabase'
// const apiKey = import.meta.env.VITE_RAWG_API_KEY;

import { fetchGenres } from '../fetchGenres'

export default {
    
    methods: {
        async fetchAll() {

            await fetchGenres();
        },
    }
}

// // clears the genres table, fetches genre pages from rawg, then sends them to our database
// // - leverages the value of response to determine when to stop fetching.  If it is undefined, it is most
// //   likely because we passed the last valid page number.  Can check error message for details.
// async function fetchGenres() {

//     await clearGenresTable();

//     const totalPagesWeWant = 1;
//     const pageSize = 40;
//     var allGenresFetched = [];

//     for (var pageNum = 1; pageNum <= totalPagesWeWant; pageNum++) {

//         var response = await fetchGenrePage(pageSize, pageNum);

//         if (!response) // most likely indicates invalid page number
//             break;

//         const genresFetched = response.data.results;
//         for (var i=0; i<genresFetched.length; i++) 
//             allGenresFetched[i] = { genre_id: genresFetched[i].id, name: genresFetched[i].name };
//     }

//     await sendAllGenresToDatabase(allGenresFetched);
// }

// // fetches a single genre page
// // - returns the response if .get is successful.  If not, error is displayed and return value is undefined
// async function fetchGenrePage(pageSize, pageNum) {

//     try {

//         const url = `https://api.rawg.io/api/genres?key=${apiKey}&page_size=${pageSize}&page=${pageNum}`;
//         return await axios.get(url);

//     } catch (err) {
//         handleError(err);
//     }
// }

// // sends all genres from the fetched results to our database
// // - if any of those in the list are already in the db, then this will fail
// async function sendAllGenresToDatabase(allGenresFetched) {

//     try {
        
//         const { data, error } = await supabase
//                 .from('Genres')
//                 .insert(allGenresFetched)

//         if (error) throw error

//     } catch (err) {
//         handleError(err);
//     }
// }

// // sends an individual genre to our database
// async function sendGenreToDatabase(g) {

//     try {
        
//         const { data, error } = await supabase
//                 .from('Genres')
//                 .insert( [{ genre_id: g.id, name: g.name}])

//         if (error) throw error
        
//     } catch (err) {
//         handleError(err);
//     }
// }

// // invoke the clearGenresTable function on supabase
// async function clearGenresTable() {

//     try {
 
//         const { error } = await supabase
//                 .rpc('clearGenresTable')

//         if (error) throw error

//     } catch (err) {
//         handleError(err);
//     }
// }

// function handleError(e) {
    
//     if (e.response) {
//         console.log("Server Error: ", e);
//     } else if (e.request) {
//         console.log("Network Error: ", e);
//     } else {
//         console.log("Client Error: ", e);
//     }
// }

</script>
