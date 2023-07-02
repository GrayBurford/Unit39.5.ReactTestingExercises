import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";


// smoke test
test('Renders without crashing', () => {
    render(<Carousel />);
});


// snapshot test
test('Matches snapshot', () => {
    const { asFragment } = render(<Carousel />);
    expect(asFragment()).toMatchSnapshot();
})

// move Carousel right using right arrow
it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // test moving past last Carousel image
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect the first image to show, but not the second or last
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});


// move Carousel left using left arrow
test('works when you click the left arrow', () => {
    const { queryByTestId, queryByAltText } = render(<Carousel />);

    // first, move to second image
    const rightArrow = queryByTestId('right-arrow');
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

    // now, move back to the first image with leftArrow
    const leftArrow = queryByTestId('left-arrow');
    fireEvent.click(leftArrow);

    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

    // move backwards from the first Carousel image to the last image
    fireEvent.click(leftArrow);
    
    expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();

})
