import authReducer from './authReducer';
import * as actionTypes from './authAction';
import reducer from './authReducer';

describe('Authentication Reducer',()=>{
    let initState;
    beforeEach(()=>{
        initState = {
            authenticatedData: null,
            loading: false,
            error: null
        }
    })
    it('AuthReducer returns initState',()=>{
        expect(authReducer(undefined,{})).toEqual(initState)
    })
    it('AuthReducer returns Success',()=>{
        let action = {
            type : actionTypes.AUTH_SUCCESS,
            payload : {
            id:'asdffadsf3423112'
        }
    }
        expect(authReducer(initState,action)).toEqual({
            ...initState,
            authenticatedData: {
                id: 'asdffadsf3423112'
            }
        })
    })
})