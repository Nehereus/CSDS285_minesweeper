//imports
    import minesweeper from './mineSweeper.vue';

//define routes
    export default [{
            path: '*',
            name: 'mineSweeper',
            component: minesweeper
        }
    ];