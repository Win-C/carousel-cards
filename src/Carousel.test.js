import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

const testProps = {
  cardData: [
    {
      src: "imageTest1",
      caption: "captionTest1"
    },
    {
      src: "imageTest2",
      caption: "captionTest2"
    }
  ],
  title: "titleTest."
};

it("smoke test - renders without crashing", function () {
  render(<Carousel props = {testProps}/>);
});

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
});

it("snapshot test - matches snapshot", function () {
  const { container } = render(<Carousel props = {testProps}/>);
  expect(container).toMatchSnapshot();
});