import { handleError } from "./error";
import { supabase } from "./supabase";

export async function fetchGameInfo_rpc(gameNameArg) {
    try {
        const { data, error } = await supabase.rpc("fetch_game_page_info", {
            game_name_arg: gameNameArg,
        });

        if (error) throw error;

        if (data.game_id == null) {
            console.log("Game not found");
            return;
        }

        return data;
    } catch (err) {
        handleError(err);
    }
}

export async function updateRating_rpc(
    userIDArg,
    tagNameArg,
    gameNameArg,
    ratingArg
) {
    try {
        const { data, error } = await supabase.rpc("update_rating", {
            user_id_arg: userIDArg,
            tag_name_arg: tagNameArg,
            game_name_arg: gameNameArg,
            rating_arg: ratingArg,
        });

        if (error) throw error;
        return data;
    } catch (err) {
        handleError(err);
    }
}

export async function getCarousel_rpc(
    userIDArg,
    genreIdArg,
    platformIdArg,
    titleKWArg,
    pageArg
) {
    try {
        const { data, error } = await supabase.rpc("get_carousel", {
            user_id_arg: userIDArg,
            genre_id_arg: genreIdArg,
            platform_id_arg: platformIdArg,
            title_kw_arg: titleKWArg,
            page: pageArg,
        });

        if (error) throw error;
        return data;
    } catch (err) {
        handleError(err);
    }
}

export async function getUserCarousel_rpc(userIdArg, pageArg) {
    try {
        const { data, error } = await supabase.rpc("get_user_carousel", {
            user_id_arg: userIdArg,
            page: pageArg,
        });

        if (error) throw error;
        return data;
    } catch (err) {
        handleError(err);
    }
}

export async function getCurrentTags() {
    try {
        const { data, error } = await supabase.rpc("get_current_tags");

        if (error) throw error;
        return data;
    } catch (err) {
        handleError(err);
    }
}

// invoke the database function that clears to the table you want to clear
// - includes clearGenresTable and clearPlatformsTable
export async function clearTable(db_function) {
    try {
        const { error } = await supabase.rpc(db_function);

        if (error) throw error;
    } catch (err) {
        handleError(err);
    }
}
