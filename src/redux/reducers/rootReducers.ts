import { combineReducers } from "redux";
import countryReducer from "./country/"

const rootReducer = combineReducers({
    countryReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
