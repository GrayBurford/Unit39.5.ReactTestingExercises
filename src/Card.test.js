import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

// smoke test
test('Renders without crashing', () => {
    render(<Card />);
})


// snapshot test
test('Matches snapshot', () => {
    const { asFragment } = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
})