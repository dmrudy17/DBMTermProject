import { supabase } from './supabase'
import { handleError } from './error'

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