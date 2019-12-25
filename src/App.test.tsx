import React from "react";
import { render } from "@testing-library/react";
import App, { getLiveNeighbors } from "./App";
import { getColor, isOnBoard, initializeBoard } from "./App";

// test("renders learn react link", () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("check color green", () => {
  expect(getColor(true)).toEqual("green");
});

test("check color black", () => {
  expect(getColor(false)).toEqual("grey");
});

test("check isOnBoard", () => {
  expect(isOnBoard(1, 1, 10, 10)).toEqual(true);
});

test("check isOnBoard false", () => {
  expect(isOnBoard(11, 11, 10, 10)).toEqual(false);
});

test("check initializeBoard", () => {
  let expected_result: boolean[][] = [
    [false, false],
    [false, false]
  ];
  expect(initializeBoard(2)).toEqual(expected_result);
});

test("check getLiveNeighbors 0", () => {
  let someBoard: boolean[][] = [
    [false, false, false],
    [false, true, false],
    [false, false, false]
  ];
  expect(getLiveNeighbors(someBoard, 1, 1)).toEqual(0);
});
test("check getLiveNeighbors 1", () => {
  let someBoard: boolean[][] = [
    [false, false, false],
    [false, true, false],
    [true, false, false]
  ];
  expect(getLiveNeighbors(someBoard, 1, 1)).toEqual(1);
});

test("check getLiveNeighbors 2", () => {
  let someBoard: boolean[][] = [
    [true, false, false],
    [false, true, false],
    [true, false, false]
  ];
  expect(getLiveNeighbors(someBoard, 1, 1)).toEqual(2);
});
