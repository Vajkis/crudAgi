import { checkAll_const, createPagesInList_const } from "../Constants/pagesListConstants";

function pagesList_reducer(state, action) {

    let newState = state;

    switch (action.type) {
        case createPagesInList_const:
            newState = [[]];
            const totalItemsInPage = localStorage.getItem('totalItemsInPage') || 3;

            if (action.payload) {
                for (const employeeItem of action.payload) {
                    if (!employeeItem.deleted) {
                        if (newState[newState.length - 1].length < totalItemsInPage) {
                            newState[newState.length - 1] = [...newState[newState.length - 1], employeeItem];
                        } else {
                            newState = [...newState, [employeeItem]]
                        }
                    }
                }
            }
            break;

        case checkAll_const:
            newState[action.payload.page - 1] = newState[action.payload.page - 1]?.map(e => ({ ...e, check: action.payload.isCheck }));
            break;

        default:
    }

    // switch (action.type) {
    //     case :
    //         break;
    //     default:
    // }

    return newState;
}

export default pagesList_reducer;