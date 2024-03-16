import { cleanup, render, screen } from "@testing-library/react"
import App from "./App"

afterEach(() => {
  cleanup();
})

describe('App Component', () => {
  test('renders Main Section', () => {
    render(<App />);
    const mainSection = screen.getByTestId('main-section');
    expect(mainSection).toBeInTheDocument();
  })

})