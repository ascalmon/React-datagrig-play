export const rowReducer = ( state, action) => {
    switch (action.type) {
        case 'SAVE_DATA':
            console.log('SAVE_DATA', state, action.row)
            return state;
        case 'DELETE_ROW':
            return state;
        case 'DELETE_SEL_ROWS':
            return state;
        default:
            return state;
    }
}