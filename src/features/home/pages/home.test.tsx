import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from './home.page';

describe('Given Home Page component', () => {
    describe('When it has been instantiate', () => {
        let jsx: JSX.Element;
        let title: string;
        beforeEach(() => {
            // arrange
            title = 'Página Home';
            jsx = <HomePage title={title} />;
        });
        test('Then it renders title page', () => {
            // act
            render(jsx);
            // assert
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
        test('Then it respond to a click in any button increasing the state value', () => {
            // arrange
            const initialState = 'Total clicks: 0';
            const newState = 'Total clicks: 1';
            // act
            render(jsx);
            // assert
            expect(screen.getByText(initialState)).toBeInTheDocument();
            const buttons = screen.getAllByRole('button');
            expect(buttons[0]).toBeInTheDocument();
            userEvent.click(buttons[0]);
            expect(screen.getByText(newState)).toBeInTheDocument();
        });
    });
});
