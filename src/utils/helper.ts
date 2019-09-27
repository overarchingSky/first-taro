type action = {
  type: string;
  payload: any;
};
let a = [1, 2, 3, 4, 5, 6];
console.log("a", a);
export function createAction(type: string) {
  return (payload: any): action => {
    return {
      type,
      payload
    };
  };
}

export default createAction;
