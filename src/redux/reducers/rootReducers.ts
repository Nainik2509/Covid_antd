import { AnyAction, combineReducers } from "redux";
import countryReducer from "./country/"
import authReducer from "./auth/"
import { ThunkDispatch } from "redux-thunk";

const rootReducer = combineReducers({
    countryReducer,
    authReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<any, any, AnyAction>;
export default rootReducer;
