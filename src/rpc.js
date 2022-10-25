
import { handleError } from './error'
import { supabase } from './supabase'

export async function updateRating_rpc(userIDArg, tagNameArg, gameNameArg, ratingArg) {

    try {
            
        const { data, error } = await supabase
                .rpc('update_rating', {  user_id_arg: userIDArg,
                                        tag_name_arg: tagNameArg,
                                        game_name_arg: gameNameArg,
                                        rating_arg: ratingArg })
                
        if (error) throw error

    } catch (err) {
        handleError(err);
    }
}

// invoke the database function that clears to the table you want to clear
// - includes clearGenresTable and clearPlatformsTable
export async function clearTable(db_function) {

    try {
 
        const { error } = await supabase
                .rpc(db_function)

        if (error) throw error

    } catch (err) {
        handleError(err);
    }
}