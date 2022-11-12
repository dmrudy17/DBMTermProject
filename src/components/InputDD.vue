<template>
    <div class="relative">
        <input :id="inputID" class="mx-1 px-2 rounded-lg w-48" type="text" placeholder="Enter game title" 
            @keyup="handleKeypress">
        <div :id="ddID" class="absolute bg-slate-600 w-50 left-2 top-7 h-fit z-50 px-2" style="visibility:hidden;">
            <ul :id="listID">
                <li class="text-white" v-for="di in displayedItemList" :key="di"> {{ di }}</li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    props: ['inputID', 'ddID', 'listID'],
    data() {

        return {

            itemList: [],
            displayedItemList: [],
            ddDisplayTimer: undefined,
            selectedItemIndex: 0,
        }
    },
    methods: {

        // setList() is called from parent
        setList(listFromParent) {
        
            for (var item of listFromParent) {

                this.itemList.push(item);
            }
        },
        handleKeypress(e) {

            console.log(e);

            if (e.key == 'Enter') {
                this.$emit('textSent', document.getElementById(this.inputID).value);
                return;
            }
            else if (e.key == 'Escape') {
                this.closeDD();
                return;
            }

            // let elementsDisplayed = document.getElementById(this.listID).getElementsByTagName('li');
            // if (elementsDisplayed.length > 0) {
            //     console.log(this.selectedItemIndex);
            //     elementsDisplayed[this.selectedItemIndex].style.background = 'dimgray';

            //     if (e.key == 'ArrowDown' || e.key == 'ArrowUp') {

            //         let prevIndex = this.selectedItemIndex;
            //         let indexAdjust = (e.key == 'ArrowDown' ? 1 : -1);
            //         this.selectedItemIndex = Math.max(Math.min(this.selectedItemIndex + indexAdjust, elementsDisplayed.length - 1), 0)
            //         console.log(indexAdjust, prevIndex, this.selectedItemIndex );
            //         elementsDisplayed[this.selectedItemIndex].style.background = 'dimgray';
            //         elementsDisplayed[prevIndex].style.background = 'black';
            //         this.clearAndSetDisplayTimer();

            //         return;
            //     }
            // }

            const expr = new RegExp(document.getElementById(this.inputID).value, 'i');
            this.displayedItemList = [];
            for (var i of this.itemList) {
                if (expr.test(i))
                    this.displayedItemList.push(i);
            }
            //this.selectedItemIndex = 0;
            document.getElementById(this.ddID).style.visibility = "visible";
            this.clearAndSetDisplayTimer();
        },
        clearAndSetDisplayTimer() {

            // clears the current timer on the games drop down if there is one
            clearTimeout(this.ddDisplayTimer);
            // starts a timer that will close the games drop down
            this.ddDisplayTimer = setTimeout(this.closeDD, 4000);
        },
        closeDD() {

            document.getElementById(this.ddID).style.visibility = "hidden";
            this.displayedItemList = [];
            //this.selectedItemIndex = 0;
        }
    }
}

</script>

