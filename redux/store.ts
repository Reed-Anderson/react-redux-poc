import { combineReducers, createStore } from "redux"
import shipmentData from "./slices/shipmentsData"

const rootReducer = combineReducers( { shipmentData } )
export type RootState = ReturnType<typeof rootReducer>
export default createStore(rootReducer)
