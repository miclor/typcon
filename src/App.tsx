import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export function initializeBoard(size: number): Array<Array<boolean>> {
  return new Array(size).fill(false).map(() => new Array(size).fill(false));
}

const App: React.FC = () => {
  return (
    <div>
      <Board size={10} />
    </div>
  );
};

interface BoardProps {
  size: number;
}

interface BoardState {
  board: Array<Array<boolean>>;
  started: boolean;
}

export function getColor(value: boolean): string {
  if (value) {
    return "green";
  } else {
    return "grey";
  }
}

export function isOnBoard(
  x: number,
  y: number,
  height: number,
  width: number
): boolean {
  if (x >= 0 && x < width && y >= 0 && y < height) {
    return true;
  }
  return false;
}

export function getLiveNeighbors(
  board: Array<Array<boolean>>,
  x: number,
  y: number
): number {
  let neighbors = [];
  for (let i = y - 1; i <= y + 1; i++) {
    for (let j = x - 1; j <= x + 1; j++) {
      let onBoard = isOnBoard(j, i, board.length, board[0].length);
      if (onBoard && (i !== y || j !== x)) {
        neighbors.push(board[j][i]);
      }
    }
  }
  let result = neighbors.filter(cell => cell === true).length;
  return result;
}

export function calcNextBoard(
  oldBoard: Array<Array<boolean>>
): Array<Array<boolean>> {
  let boardSize: number = oldBoard.length;
  let newBoard = [];
  for (let j = 0; j < boardSize; j++) {
    let rowBoard = [];
    for (let i = 0; i < boardSize; i++) {
      if (oldBoard[j][i] === true) {
        if (
          getLiveNeighbors(oldBoard, j, i) === 2 ||
          getLiveNeighbors(oldBoard, j, i) === 3
        ) {
          rowBoard.push(true);
        } else {
          rowBoard.push(false);
        }
      } else {
        if (getLiveNeighbors(oldBoard, j, i) === 3) {
          rowBoard.push(true);
        } else {
          rowBoard.push(false);
        }
      }
    }
    newBoard.push(rowBoard);
  }
  return newBoard;
}

class Board extends React.Component<BoardProps, BoardState> {
  intervalID: NodeJS.Timeout;

  constructor(props: BoardProps) {
    super(props);
    this.state = {
      board: initializeBoard(props.size),
      started: false
    };
    this.intervalID = setInterval(() => true, 1000);
    clearTimeout(this.intervalID);
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    if (this.state.started) {
      this.setState({
        board: calcNextBoard(this.state.board)
      });
    }
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ started: true })}>Start</button>
        <button onClick={() => this.setState({ started: false })}>Stop</button>
        <button
          onClick={() =>
            this.setState({
              started: false,
              board: initializeBoard(this.props.size)
            })
          }
        >
          Reset
        </button>
        <TableContainer component={Paper}>
          <Table key="theBoard">
            <TableBody>
              {this.state.board.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((col, colIndex) => (
                    <TableCell
                      key={colIndex}
                      style={{
                        backgroundColor: getColor(
                          this.state.board[rowIndex][colIndex]
                        ),
                        border: "1px solid black"
                      }}
                      onClick={event => {
                        let tmpBoard = this.state.board;
                        tmpBoard[rowIndex][colIndex] = true;
                        this.setState({ board: tmpBoard });
                      }}
                    >
                      {/* {[rowIndex, colIndex]} */}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default App;
