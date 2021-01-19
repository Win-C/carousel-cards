import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

it("smoke test - renders without crashing", function () {
  render(
    <Card
      caption="captionTest"
      src="imageTest"
      currNum="1"
      totalNum="1"
    />
  );
});

it("snapshot test - matches snapshot", function () {
  const { container } = render(
    <Card
      caption="captionTest"
      src="imageTest"
      currNum="1"
      totalNum="1"
    />
  );
  expect(container).toMatchSnapshot();
});
