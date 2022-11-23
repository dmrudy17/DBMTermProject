import { supabase } from './supabase'
import axios from 'axios';
import { handleError } from './error'
const apiKey = import.meta.env.VITE_RAWG_API_KEY;

export async function fetchGenres() {

    try {
      const { data, error } = await supabase.from('Genres').select()

      if (error) throw error
    
      return data;  

    } catch (e) {
        handleError(e);
    }
}

export async function fetchPlatforms() {

    try {
      const { data, error } = await supabase.from('Platforms').select()

      if (error) throw error
    
      return data;  

    } catch (e) {
        handleError(e);
    }
}

export async function fetchGameTitles() {

  try {
    const { data, error } = await supabase.from('Games').select('title')

    if (error) throw error
    
    let titles = [];
    for (var t of data)
      titles.push(t.title)

    return titles;  

  } catch (e) {
      handleError(e);
  }
}

export async function fetchGameDetails(gameID) {

  try {
    const url = `https://api.rawg.io/api/games/${gameID}` + `?key=${apiKey}`;
    return await axios.get(url);
    
  } catch (err) {
      handleError(err);
  }
}