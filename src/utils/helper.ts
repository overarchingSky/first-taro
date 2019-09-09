type action = {
    type:string,
    payload:any
}
export function createAction(type:string) {
    return (payload:any):action => {
        return {
            type,
            payload
        }
    }
}