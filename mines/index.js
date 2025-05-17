let numRows = 8;
let numCols = 8;
let numMines;
let gameStarted = false;
let currentBet = 0;
let currentMultiplier = 1.00;

const gameBoard =
    document.getElementById(
        "gameBoard"
    );
let board = [];

function initializeBoard() {
    for (let i = 0; i < numRows; i++) {
        board[i] = [];
        for (
            let j = 0;
            j < numCols;
            j++
        ) {
            board[i][j] = {
                isMine: false,
                revealed: false,
                count: 0,
            };
        }
    }

    let minesPlaced = 0;
    while (minesPlaced < numMines) {
        const row = Math.floor(
            Math.random() * numRows
        );
        const col = Math.floor(
            Math.random() * numCols
        );
        if (!board[row][col].isMine) {
            board[row][
                col
            ].isMine = true;
            minesPlaced++;
        }
    }

    for (let i = 0; i < numRows; i++) {
        for (
            let j = 0;
            j < numCols;
            j++
        ) {
            if (!board[i][j].isMine) {
                let count = 0;
                for (
                    let dx = -1;
                    dx <= 1;
                    dx++
                ) {
                    for (
                        let dy = -1;
                        dy <= 1;
                        dy++
                    ) {
                        const ni =
                            i + dx;
                        const nj =
                            j + dy;
                        if (
                            ni >= 0 &&
                            ni <
                                numRows &&
                            nj >= 0 &&
                            nj <
                                numCols &&
                            board[ni][nj].isMine) {
                            count++;
                        }
                    }
                }
                board[i][j].count =
                    count;
            }
        }
    }
}

function revealCell(row, col) {
    if (
        row < 0 ||
        row >= numRows ||
        col < 0 ||
        col >= numCols ||
        board[row][col].revealed
    ) {
        return;
    }

    board[row][col].revealed = true;


    //vesztés event
    if (board[row][col].isMine) {
        for (let i = 0; i < numRows; i++) {
            for (
                let j = 0;
                j < numCols;
                j++
            ) {
                board[i][j].revealed = true;
                if (board[i][j].isMine) {
                    board[i][j].revealed = true;
                    $('#betValue').text('N/A');
                    $('#multiplierValue').text('N/A');
                    $('#winningsValue').text('N/A');
                    currentMultiplier = 1.00;
                    currentBet = 0;
                    $('#mineCount').prop('disabled', false);
                }
            }
        }
        
        Toastify({
            text: "Játék vége!",
            gravity: "top",
            position: "center",
            style: {
                background: "#ff0000",
            },
        }).showToast();
               
        gameStarted = false;
        currentMultiplier = 1.00;
        currentBet = 0;
        $('#betValue').text('N/A');
        $('#multiplierValue').text('N/A');
        $('#winningsValue').text('N/A');
        $('#mineCount').prop('disabled', false);
        

        

        for (let i = 0; i < numRows; i++) {
            for (
                let j = 0;
                j < numCols;
                j++
            ) {
                if (board[i][j].isMine) {
                    board[i][j].revealed = true;
                    $('#betValue').text('N/A');
                    $('#multiplierValue').text('N/A');
                    $('#winningsValue').text('N/A');
        
                }
            }
        }

        renderBoard();
        return;
    } 

    
    renderBoard();
}

function renderBoard() {
    gameBoard.innerHTML = "";

    for (let i = 0; i < numRows; i++) {
        for (
            let j = 0;
            j < numCols;
            j++
        ) {
            const cell =
                document.createElement(
                    "div"
                );
            cell.className = "cell";
            if (board[i][j].revealed) {
                cell.classList.add(
                    "revealed"
                );
                if (board[i][j].isMine) {
                    cell.classList.add(
                        "mine"
                    );
                    cell.textContent =
                        "????";
                } else if (!board[i][j].isMine)
                 {
                    
                    currentMultiplier += (board[i][j].count * numMines) * 0.2;
                    $('#multiplierValue').text('x' + currentMultiplier.toFixed(2));
                    $('#winningsValue').text('$' + (parseInt(currentBet) * currentMultiplier).toFixed(2));
                    cell.textContent = " "
                        
                }
            }
            if (gameStarted) {
                cell.addEventListener(
                    "click",
                    () => revealCell(i, j)
                );
            }
            
            gameBoard.appendChild(cell);
        }
        gameBoard.appendChild(
            document.createElement("br")
        );
    }
}


initializeBoard();
renderBoard();
document.getElementById("kiszallas-button").disabled = true;


$("#startGameButton").on("click", function () {
    currentMultiplier = 1.00;
    document.getElementById("kiszallas-button").disabled = false;
    $('#kiszallas-button').css
        ({
            'cursor': 'pointer',
            'background-color': '#ff0000',
        });
    
    let minesInput = document.getElementById("mineCount");
    numMines = parseInt(
        minesInput.options[minesInput.selectedIndex].text
    );
    let betInput = document.getElementById("betAmount");
    currentBet = betInput.value;
    if (currentBet <= 0) {
        Toastify({
            text: "Adj meg egy érvényes tétet!",
            gravity: "top",
            position: "center",
            style: {
                background: "#ff0000",
            },
        }).showToast();
        return;
    }
    $('#betValue').text('$' + currentBet);
    $('#multiplierValue').text('x' + currentMultiplier.toFixed(2));
    $('#winningsValue').text('$' + (parseInt(currentBet) * currentMultiplier).toFixed(2));



    gameStarted = true;
    initializeBoard();
    renderBoard();
});



