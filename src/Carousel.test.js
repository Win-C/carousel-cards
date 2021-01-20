import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("smoke test - renders without crashing", function () {
  render(<Carousel />);
});

it("snapshot test - matches snapshot", function () {
  const { container } = render(<Carousel />);
  expect(container).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second or the third
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();
  
  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  
  // expect the second image to show, but not the first or the third
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first or the third
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();
  
  // move backward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);
  
  // expect the first image to show, but not the second or the third
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();
});

it("left and right arrow visibility when looping through images", function() {
  const { queryByTestId } = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow");
  const leftArrow = queryByTestId("left-arrow");
  
  // right arrow is visible and left arrow is hidden
  expect(rightArrow.getAttribute("style")).toContain("visible");
  expect(leftArrow.getAttribute("style")).toContain("hidden");

  // move forward in the carousel to third image
  fireEvent.click(rightArrow);
  // right arrow and left arrow are both visible
  expect(rightArrow.getAttribute("style")).toContain("visible");
  expect(leftArrow.getAttribute("style")).toContain("visible");
  
  // move forward in the carousel to third image
  fireEvent.click(rightArrow);
  // right arrow is hidden and left arrow is visible
  expect(rightArrow.getAttribute("style")).toContain("hidden");
  expect(leftArrow.getAttribute("style")).toContain("visible");
});
