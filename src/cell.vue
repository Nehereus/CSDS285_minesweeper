<template>
    <button v-if="isFalsePositive" class="cell"  @contextmenu="revealSurroundings($event)" :style="{'background-image':'url(' + require('../public/img/wrong-bomb.png') + ')' }"></button>
    <button v-else-if="isFlaged" class="cell"    @contextmenu="unflag($event)" :style="{'background-image':'url(' + require('../public/img/flag.png') + ')'}"></button>
    <button v-else-if="notRevealed" class="cell" @click="reveal" @contextmenu="flag($event)" :style="{'background-image':'url(' + require('../public/img/unrevealed.png') + ')'}"></button>
    <button v-else-if="(val===true)" class="cell"  @contextmenu="revealSurroundings($event)" :style="{'background-image':'url(' + require('../public/img/doomed.png') + ')' }"></button>
    <button v-else-if="(val===0)" class="cell"  @contextmenu="revealSurroundings($event)" :style="{ 'box-shadow':'inset -2px -2px grey','background-image':'url(' + require('../public/img/0.png') + ')'}" disabled></button>
    <button v-else-if="(val===1)" class="cell"  @contextmenu="revealSurroundings($event)" :style="{'background-image':'url(' + require('../public/img/1.png') + ')'}" ></button>
    <button v-else-if="(val===2)" class="cell"  @contextmenu="revealSurroundings($event)" :style="{'background-image':'url(' + require('../public/img/2.png') + ')'}" ></button>
    <button v-else-if="(val===3)" class="cell"  @contextmenu="revealSurroundings($event)" :style="{'background-image':'url(' + require('../public/img/3.png') + ')'}" ></button>
    <button v-else-if="(val===4)" class="cell"  @contextmenu="revealSurroundings($event)" :style="{'background-image':'url(' + require('../public/img/4.png') + ')'}" ></button>
    <button v-else-if="(val===5)" class="cell"  @contextmenu="revealSurroundings($event)" :style="{'background-image':'url(' + require('../public/img/5.png') + ')'}" ></button>
    <button v-else-if="(val===6)" class="cell"  @contextmenu="revealSurroundings($event)" :style="{'background-image':'url(' + require('../public/img/6.png') + ')'}" ></button>
    <button v-else-if="(val===7)" class="cell"  @contextmenu="revealSurroundings($event)" :style="{'background-image':'url(' + require('../public/img/7.png') + ')'}" ></button>
    <button v-else-if="(val===8)" class="cell"  @contextmenu="revealSurroundings($event)" :style="{'background-image':'url(' + require('../public/img/8.png') + ')'}" ></button>

</template>

<script>
export default {
    methods:{
        reveal(){
            this.notRevealed=false;
            if(this.val===true){
            this.$emit("doomed");
            }else{
                this.$emit("shocked");
            }
            },
        flag(e){
            e.preventDefault();
            this.isFlaged=true;
            this.$emit("flag");
        },
        unflag(e){
            e.preventDefault();
            this.isFlaged=false;
            this.$emit("unflag");
        },
        revealSurroundings(e){
            e.preventDefault();
            this.$emit("revealSurroundings");
        },



    },
    data() {
        return {
            notRevealed:true,
            isFlaged:false,
            isFalsePositive:false,
        }

    },
    props: {
        val: {
        }
    }
}
</script>

<style>
.cell {
    min-width: 10px;
    background-image: url("../public/img/unrevealed.png");
    background-size: 100% 100%;
}
</style>
