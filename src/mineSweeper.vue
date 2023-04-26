<template>
    <v-app>

        <body>
            <v-layout justify-center>
                <v-container>
                    <div class="window" :style="{ 'width': rowNumber * 24 + 100 + 'px' }">
                        <div class="title-bar">
                            <div class="title-bar-text">
                                <img src="../public/img/mine-menu-icon.png"> </img>Minesweeper
                            </div>
                            <div class="title-bar-controls">
                                <button aria-label="Minimize"></button>
                                <button aria-label="Maximize"></button>
                                <button aria-label="Close"></button>
                            </div>
                        </div>
                        <div class="window-body" style="grid-template-columns: repeat(2, 1fr) ">
                            <table>
                                <tr>
                                    <td>
                                <tr>
                                    <td class="menu" colspan="${size}">
                                        <section id="status-bar">
                                            <div id="bomb-counter">{{minesCount0.toString() }}
                                            </div>
                                            <div v-if="(!isDoomed && !isWin && !shockingTimer)" id="reset"><img
                                                    @click="reRenderGrid" src="../public/img/smiley-face.png"></div>
                                            <div v-else-if="(isDoomed)" id="reset" style="border: none"><img
                                                    @click="reRenderGrid" src="../public/img/dead-face.png" width="100%"
                                                    height="100%"></div>
                                            <div v-else-if="(isWin)" id="reset" style="border: none"><img
                                                    @click="reRenderGrid" src="../public/img/cool-face.png" width="100%"
                                                    height="100%"></div>
                                            <div v-else-if="(!!shockingTimer)" id="reset" style="border: none"><img
                                                    @click="reRenderGrid" src="../public/img/o-face.png" width="100%"
                                                    height="100%"></div>
                                            <div id="timer">{{ timer2.toString() + timer1.toString() + timer0.toString()
                                            }}
                                            </div>
                                        </section>
                                    </td>
                                </tr>
                                <tr>
                                    <div v-if="refresh" v-for=" (row, i) in grid" :key="i" id="col"
                                        :style="{ 'grid-template-columns': 'repeat(' + rowNumber + ', 0fr)' }">
                                        <cell v-if="refresh" v-for=" (col, j) in grid[i]" :key="j" :ref="grid[i][j].id"
                                            @doomed="handleDoomed" @revealSurroundings="revealHandler(i, j, true)"
                                            @shocked="revealHandler(i, j, false)" @flag="flagHandler(-1)" @unflag="flagHandler(1)"
                                            :val="grid[i][j].val">
                                        </cell>
                                    </div>
                                </tr>
                                </td>
                                <td>
                                    <div>
                                        <fieldset>
                                            <div class="field-row">map size</div>
                                            <div class="field-row">
                                                <input v-model="rowNumber" id="radio10" type="radio" name="mapSize"
                                                    value=9 checked="checked">
                                                <label for="radio10">9*9</label>
                                            </div>
                                            <div class="field-row">
                                                <input v-model="rowNumber" id="radio11" type="radio" name="mapSize"
                                                    value=12>
                                                <label for="radio11">12*12</label>
                                            </div>
                                            <div class="field-row">
                                                <input v-model="rowNumber" id="radio12" type="radio" name="mapSize"
                                                    value=15>
                                                <label for="radio12">15*15</label>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div>
                                        <fieldset>
                                            <div class="field-row">Frequency of mines</div>
                                            <div class="field-row">
                                                <input v-model="mineFrequency" id="radio20" type="radio"
                                                    name="fieldset-example" value=0.1 checked="checked">
                                                <label for="radio20">10%</label>
                                            </div>
                                            <div class="field-row">
                                                <input v-model="mineFrequency" id="radio21" type="radio"
                                                    name="fieldset-example" value=0.2>
                                                <label for="radio21">20%</label>
                                            </div>
                                            <div class="field-row">
                                                <input v-model="mineFrequency" id="radio22" type="radio"
                                                    name="fieldset-example" value=0.3>
                                                <label for="radio22">30%</label>
                                            </div>
                                        </fieldset>
                                    </div>
                                </td>
                                </tr>
                            </table>
                            <div>

                            </div>
                        </div>
                    </div>

                </v-container>
                <v-container>
                    <div class="window" style="width: 400px">
                        <div class="title-bar">
                            <div class="title-bar-text">
                                Minesweeper Manual
                            </div>
                            <div class="title-bar-controls">
                                <button aria-label="Minimize"></button>
                                <button aria-label="Maximize"></button>
                                <button aria-label="Close"></button>
                            </div>
                        </div>
                        <div class="window-body" style=" font-size: 18px">
                            <p>The purpose of the game is to open all the cells of the board which do not contain a
                                bomb.
                                You lose if you set off a bomb cell.</p>

                            <p>Every non-bomb cell you open with left clicking will tell you the total number of bombs
                                in the eight
                                neighboring cells. Once you are sure that a cell contains a bomb, you can
                                <b>right-click</b> to put
                                a flag it on it as a reminder. Once you have flagged all the bombs around an open cell,
                                you
                                can quickly open the remaining non-bomb cells by <b>right clicking</b> on the cell.
                            </p>

                            <p>you can set the size of the map and the frequency of mines by using the radio buttons on
                                the right side</p>

                            <p>To start a new game (abandoning the current one), <b>just click on the yellow face
                                    button</b>.</p>
                            <p>author: Nick Du yxd421@case.edu, MIT License, no right reserved</p>

                        </div>
                    </div>
                </v-container>
            </v-layout>
        </body>
    </v-app>
</template>
<script>
import cell from "./cell.vue";
export default {
    components: {
        cell,
    },
    created() {
        this.reRenderGrid();
    },
    methods: {
        timerController() {
            if (this.timer0 + 1 > 9) {
                if (this.timer1 + 1 > 9) {
                    this.timer2 += 1;
                    this.timer1 = 0;
                    this.timer0 = 0;
                } else {
                    this.timer1 += 1;
                    this.timer0 = 0;
                }
            } else {
                this.timer0 += 1;
            }
        },
        flagHandler(val) {
            this.minesCountController(val);
            this.winConditionChecker();
        },
        winConditionChecker() {
            let res = true;
            let leftOnlyMine = true;
            for (let i = 0; i < this.rowNumber; i++) {
                for (let j = 0; j < this.rowNumber; j++) {
                    res &= !this.$refs[this.grid[i][j].id][0].notRevealed || this.$refs[this.grid[i][j].id][0].isFlaged === true && this.grid[i][j].val === true;
                    if (this.$refs[this.grid[i][j].id][0].notRevealed === true) {
                        leftOnlyMine &= this.grid[i][j].val === true;
                    }
                }
            }
            res = res || leftOnlyMine;
            if (res) {
                this.isWin = true;
                this.timerEnabled = false;
                for (let i = 0; i < this.rowNumber; i++) {
                    for (let j = 0; j < this.rowNumber; j++) {
                        if (this.$refs[this.grid[i][j].id][0].isFlaged === false)
                            this.$refs[this.grid[i][j].id][0].notRevealed = false;
                    }
                }

            }

        }
        ,
        revealHandler(i, j, a) {
            if (this.timerEnabled === false)
                this.timerEnabled = true;



            this.shockingTimer = 5;
            this.flipSurroundingEmpty(i, j, a);

        },
        minesCountController(val) {
            this.minesCount0+=val;
        },

        flipSurroundingEmpty(col, row, activeMode) {
            let flagCount = 0
            for (let a = -1; a < 2; a++) {
                for (let b = -1; b < 2; b++) {
                    if (this.grid[col + a] != null && this.grid[row + b] != null && (a != 0 || b != 0) &&
                            this.$refs[this.grid[col + a][row + b].id][0].notRevealed === true
                        ) {
                            
                    flagCount += this.$refs[this.grid[col + a][row + b].id][0].isFlaged ? 1 : 0;
                        }
                }
            }
            console.log(flagCount);
            
           
            if (col > -1 && row > -1 && col < this.rowNumber && row < this.rowNumber) {
                for (let a = -1; a < 2; a++) {
                    for (let b = -1; b < 2; b++) {
                        if (this.grid[col + a] != null && this.grid[row + b] != null && (a != 0 || b != 0) &&
                            this.$refs[this.grid[col + a][row + b].id][0].notRevealed === true
                        ) {

                            if (!activeMode) {
                                if (this.grid[col + a][row + b].val !== true && this.grid[col + a][row + b].val >= 0 && this.$refs[this.grid[col + a][row + b].id][0].isFlaged === false)
                                    this.$refs[this.grid[col + a][row + b].id][0].notRevealed = false;
                                if (this.grid[col + a][row + b].val === 0)
                                    this.flipSurroundingEmpty(col + a, row + b, activeMode);
                            } else if(flagCount===this.grid[col][row].val) {
                                if (this.grid[col + a][row + b].val !== true && this.grid[col + a][row + b].val >= 0 && this.$refs[this.grid[col + a][row + b].id][0].isFlaged === false)
                                    this.$refs[this.grid[col + a][row + b].id][0].notRevealed = false;
                                if (this.$refs[this.grid[col + a][row + b].id][0].isFlaged === true && this.grid[col + a][row + b].val === true && this.$refs[this.grid[col + a][row + b].id][0].notRevealed === true) {
                                    this.flipSurroundingEmpty(col + a, row + b, activeMode);
                                } else if (this.$refs[this.grid[col + a][row + b].id][0].isFlaged === true && this.grid[col + a][row + b].val !== true) {
                                    this.$refs[this.grid[col + a][row + b].id][0].isFalsePositive = true;
                                    this.handleDoomed();
                                }



                            }

                        }
                    }
                }
            }
            this.winConditionChecker();
        },

        handleDoomed() {
            for (let i = 0; i < this.rowNumber; i++) {
                for (let j = 0; j < this.rowNumber; j++) {
                    this.$refs[this.grid[i][j].id][0].notRevealed = false;
                }
            }
            this.minesCount0 = 0;
            this.minesCount1 = 0;
            this.isDoomed = true;
            this.timerEnabled = false;
        },
        reRenderGrid() {
            this.grid = [];
            this.timerEnabled = false;
            this.timer0 = 0;
            this.timer1 = 0;
            this.timer2 = 0;
            this.minesCount0 = 0;
            this.minesCount1 = 0;
            for (let i = 0; i < this.rowNumber; i++) {
                this.grid[i] = [];
                for (let j = 0; j < this.rowNumber; j++) {
                    this.grid[i][j] = {};
                    this.grid[i][j].val =
                        //true denotes has mine
                        Math.floor(Math.random() * 1 / this.mineFrequency) == 0 ? true : false;

                    if (this.grid[i][j].val === true) {
                        this.minesCountController(1);
                    }
                    this.grid[i][j].id = i + "," + j;
                }
            }
            for (let i = 0; i < this.rowNumber; i++) {
                for (let j = 0; j < this.rowNumber; j++) {
                    let minesSurrounding = 0;
                    if (!this.grid[i][j].val) {
                        minesSurrounding +=
                            i > 0 && j > 0 && this.grid[i - 1][j - 1].val === true ? 1 : 0;
                        minesSurrounding += i > 0 && this.grid[i - 1][j].val === true ? 1 : 0;
                        minesSurrounding += i > 0 && j < this.rowNumber - 1 && this.grid[i - 1][j + 1].val === true ? 1 : 0;
                        minesSurrounding += j > 0 && this.grid[i][j - 1].val === true ? 1 : 0;
                        minesSurrounding += j < this.rowNumber - 1 && this.grid[i][j + 1].val === true ? 1 : 0;
                        minesSurrounding += j > 0 && i < this.rowNumber - 1 && this.grid[i + 1][j - 1].val === true ? 1 : 0;
                        minesSurrounding += i < this.rowNumber - 1 && this.grid[i + 1][j].val === true ? 1 : 0;
                        minesSurrounding += i < this.rowNumber - 1 && j < this.rowNumber - 1 && this.grid[i + 1][j + 1].val === true ? 1 : 0;
                        this.grid[i][j].val = minesSurrounding;
                    }
                }
            }
            this.$forceUpdate();
            for (let i = 0; i < this.rowNumber; i++) {
                for (let j = 0; j < this.rowNumber; j++) {
                    if (this.$refs[this.grid[i][j].id] != null) {
                        this.$refs[this.grid[i][j].id][0].notRevealed = true;
                        this.$refs[this.grid[i][j].id][0].isFlaged = false;
                        this.$refs[this.grid[i][j].id][0].isFalsePositive = false;
                    }
                }
            }
            this.isWin = false;
            this.isDoomed = false;
        },

    },
    data() {
        return {
            minesCount0: 0,
            minesCount1: 0,
            timer0: 0,
            timer1: 0,
            timer2: 0,
            mineFrequency: 0.1,
            rowNumber: 9,
            grid: [this.rowNumber],
            isDoomed: false,
            isWin: false,
            shockingTimer: 0,
            refresh: true,
            timerEnabled: false,

        }

    },

    watch: {
        timerEnabled(val) {
            if (val) {
                setTimeout(() => {
                    this.timer0 = 1;
                }, 1000);
            }
        },
        timer0: {
            handler(value) {
                if (this.timerEnabled) {
                    setTimeout(() => {
                        this.timerController();
                    }, 1000);
                }

            },
            immediate: true
        }
        ,
        shockingTimer: {
            handler(value) {
                if (value > 0) {
                    setTimeout(() => {
                        this.shockingTimer--;
                    }, 100);
                }
            },
            immediate: true // This ensures the watcher is triggered upon creation
        },
        rowNumber: {
            handler(value) {
                this.reRenderGrid();
            }
        },
        mineFrequency: {
            handler(value) {
                this.reRenderGrid();

            }
        }
    }
};
</script>

<style>
#col {
    display: grid;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
}
</style>