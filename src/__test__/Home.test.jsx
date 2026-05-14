import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import { HashRouter } from "react-router-dom";

describe("Home Page", () => {
  beforeEach(() => {
    render(
      <HashRouter>
          <Home/>
      </HashRouter>,
    );
  });

  it("Should find first content section", () => {
    const firstSection = screen.getByText("First Section");
    expect(firstSection).toBeInTheDocument();
  });
  it("Should find second content section", () => {
    const secondSection = screen.getByText("Second Section");
    expect(secondSection).toBeInTheDocument();
  });
});
