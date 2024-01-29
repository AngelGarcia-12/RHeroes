import { authReducer } from "../../../src/auth"
import { types } from "../../../src/auth/types/types";

describe('Pruebas en authReducer', () => {
    test('Debe de retornar el estado por defecto', () => {
        const state = authReducer({logged: false}, {});
        expect(state).toEqual({logged: false});
    })
    test('Debe (login) llamar al login automaticamente y establecer el usuario', () => {
        const action = {
            type: types.login,
            payload: {
                name: 'Angel',
                id: '123',
            }
        }

        const state = authReducer({logged: false}, action);
        expect(state).toEqual({
            logged: true,
            user: action.payload
        })
    })
    test('Debe (logout) borrar el name del usuario y logged false ', () => {
        const state = {
            logged: true,
            user: {id: '123', name: 'Angel'}
        }

        const action = {
            type: types.logout,
        }

        const newState = authReducer(state, action);
        expect(newState).toEqual({logged: false});
    })
})