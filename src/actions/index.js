export const increment = (bynum) => {
    return {
        type: "INCREMENT",
        payload: bynum
    }
}
 
export const decrement = (bynum) => {
    return {
        type: "DECREMENT",
        payload: bynum
    }
}