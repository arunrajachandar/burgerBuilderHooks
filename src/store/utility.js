export const updateObject = (oldValue, updatedValue) => {
    return{
        ...oldValue,
        ...updatedValue
    }
}