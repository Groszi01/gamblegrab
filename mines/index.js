let numRows = 8;
let numCols = 8;
let numMines;
let gameStarted = false;
let currentBet = 0;
let currentMultiplier = 1.00;
let currentBalance;
const expressApi = 'http://localhost:3000/';

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
                    document.getElementById("startGameButton").disabled = false;
                    $('#kiszallas-button').css
                    ({
                        'cursor': 'not-allowed',
                        'background-color': '#505050',
                    });
                    document.getElementById("kiszallas-button").disabled = true;
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


/*ONLOAD*/
function RefreshUserBalance() {
    fetch( expressApi + 'api/getloggedbalance/').then((response) => response.json())
    .then((json) => {
        if (json.success) {
            currentBalance = json.balance;
            $('#currentBalance').text('$' + json.balance);
        } else {

            Toastify({
                text: "Hiba a betöltés során!",
                gravity: "top",
                position: "center",
                style: {
                    background: "#ff0000",
                },
            }).showToast();
        }
    });

}


function addBalance(amount) {
    fetch( expressApi + 'api/addtologgedbalance/' + amount)
        .then((response) => response.json())
        .then((json) => {
            if (json.success) {
                Toastify({
                    text: "Kiszálltál",
                    gravity: "top",
                    position: "center",
                    style: {
                        background: "#42c966",
                    },
                }).showToast();
                RefreshUserBalance();
            } else {
                Toastify({
                    text: "Hiba!",
                    gravity: "top",
                    position: "center",
                    style: {
                        background: "#ff0000",
                    },
                }).showToast();
            }
        });
}





RefreshUserBalance();
initializeBoard();
renderBoard();
document.getElementById("kiszallas-button").disabled = true;





$("#startGameButton").on("click", function () {
    currentBet = document.getElementById("betAmount").value;


    if (currentBet > currentBalance) {
        Toastify({
            text: "Nincs elég egyenleged!",
            gravity: "top",
            position: "center",
            style: {
                background: "#ff0000",
            },
        }).showToast();
        return;
    } else {

        fetch(expressApi + 'api/removeloggedbalance/' + currentBet)
            .then((response) => response.json())
            .then((json) => {
                if (json.success) {
                    Toastify({
                        text: "Jó játékot!",
                        gravity: "top",
                        position: "center",
                        style: {
                            background: "#42c966",
                        },
                    }).showToast();

                    document.getElementById("startGameButton").disabled = true;


                    RefreshUserBalance();
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
                    } else {
                        if (currentBet > currentBalance) {
                            Toastify({
                                text: "Nincs elég egyenleged!",
                                gravity: "top",
                                position: "center",
                                style: {
                                    background: "#ff0000",
                                },
                            }).showToast();
                            return;
                        } else {
                            /*API REQUEST*/
                            console.log('helo');
                        }


                    }
                    $('#betValue').text('$' + currentBet);
                    $('#multiplierValue').text('x' + currentMultiplier.toFixed(2));
                    $('#winningsValue').text('$' + (parseInt(currentBet) * currentMultiplier).toFixed(2));


                    gameStarted = true;
                    initializeBoard();
                    renderBoard();
                } else {
                    Toastify({
                        text: "Hiba!",
                        gravity: "top",
                        position: "center",
                        style: {
                            background: "#ff0000",
                        },
                    }).showToast();
                }
            });

    }
});


$("#kiszallas-button").on("click", function () {
    addBalance(parseFloat(currentBet) * currentMultiplier);
    if (gameStarted) {
        gameStarted = false;
        currentMultiplier = 1.00;
        currentBet = 0;
        $('#betValue').text('N/A');
        $('#multiplierValue').text('N/A');
        $('#winningsValue').text('N/A');
        $('#mineCount').prop('disabled', false);



        document.getElementById("startGameButton").disabled = false;
        $('#kiszallas-button').css
        ({
            'cursor': 'not-allowed',
            'background-color': '#505050',
        });

        document.getElementById("kiszallas-button").disabled = true;

        renderBoard()
        initializeBoard()

    }
});



