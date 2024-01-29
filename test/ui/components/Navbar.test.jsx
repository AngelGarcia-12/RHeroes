import { fireEvent, render, screen } from "@testing-library/react";
import { AuthContext } from "../../../src/auth";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { Navbar } from "../../../src/ui";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en el componentes de <Navbar/>', () => {
    const contextValue = {
        logged: true,
        user: {
            name: 'Angel',
        },
        logout: jest.fn(),
    }

    beforeEach(() => jest.clearAllMocks());

    test('Debe de mostrar el nombre del usuario', () => {
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Angel')).toBeTruthy();
    })

    test('Debe de llamar el logout y navigate cuando se hace click en el boton', () => {
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);

        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login',{"replace": true});
    })
})