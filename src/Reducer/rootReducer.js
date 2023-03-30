import { combineReducers } from "redux";
import loginReducer from '../Reducer/Login/loginReducer'
import userInfoReducer from '../Reducer/UserInfo/UserReducer'
import currentTrackReducer from "./CurrentTrack/currentTrackReducer";
import featuredPlaylistReducer from "./FeaturedPlaylist/FeaturedPlaylistReducer";
import playerControlsReducer from "./PlayerControl/playerControlReducer";
import playlistDetailsReducer from "./PlaylistDetails/playlistDetailsReducer";
import searchReducer from "./Search/SearchReducer";
import weekelySongsReducer from "./WeekelySongs/WeekelySongsReducer";
import BodyReducer from './Body/BodyReducer'

const rootReducer = combineReducers({
    login: loginReducer,
    userInfo: userInfoReducer,
    featuredPlaylist: featuredPlaylistReducer,
    weekelySongs: weekelySongsReducer,
    currentTrack : currentTrackReducer,
    playerControls: playerControlsReducer,
    playlistDetails: playlistDetailsReducer,
    search: searchReducer,
    body: BodyReducer
})

export default rootReducer;