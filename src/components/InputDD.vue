<template>
    <div class="relative">
        <input :id="inputID" class="mx-1 px-1 rounded-lg w-48" type="text" placeholder="Enter game title" 
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
            selectedIndex: -1,
        }
    },
    mounted() {

        document.addEventListener("click", this.handleClick);
    },
    methods: {

        // setList() is called from parent
        setList(listFromParent) {
        
            for (var item of listFromParent) {

                this.itemList.push(item);
            }
        },
        handleKeypress(e) {

            let elemsDisplayed = document.getElementById(this.listID).getElementsByTagName('li');

            // if the key pressed is 'Enter', send the input's value to parent.  Also if an item is
            // selected in the dropdown, make that the input's value and clear the dropdown
            if (e.key == 'Enter') {

                if (this.selectedIndex > -1) {

                    elemsDisplayed[this.selectedIndex].style.background = 'rgb(71 85 105 / var(--tw-bg-opacity))';
                    document.getElementById(this.inputID).value = elemsDisplayed[this.selectedIndex].innerHTML
                    this.selectedIndex = -1;
                    this.closeDD();
                }

                this.$emit('textSent', document.getElementById(this.inputID).value);
                return;
            }
            
            if (e.key == 'Escape') {

                this.closeDD();
                return;
            }

            // reset bg color for any previously selected item in the dropdown, then change it for the next
            // if arrow up or down has been pressed
            if (elemsDisplayed.length > 0) {

                if (this.selectedIndex > -1)
                    elemsDisplayed[this.selectedIndex].style.background = 'rgb(71 85 105 / var(--tw-bg-opacity))';

                if (e.key == 'ArrowDown' || e.key == 'ArrowUp') {

                    let dir = e.key == 'ArrowDown' ? 1 : -1;
                    this.selectedIndex = this.clampIndex(this.selectedIndex + dir, -1, elemsDisplayed.length - 1);

                    if (this.selectedIndex > -1)
                        elemsDisplayed[this.selectedIndex].style.background = 'dimgray';

                    this.clearAndSetDisplayTimer();
                    return;
                }
            }

            this.closeDD();

            // if the input field is not empty, recompute the list and display the dropdown
            let inputValue = document.getElementById(this.inputID).value;
            if (inputValue != '') {

                const expr = new RegExp(inputValue, 'i');
                for (var i of this.itemList) {
                    if (expr.test(i))
                        this.displayedItemList.push(i);
                }

                document.getElementById(this.ddID).style.visibility = "visible";
                this.clearAndSetDisplayTimer();
            }
        },
        clearAndSetDisplayTimer() {

            // clears the current timer on the games drop down if there is one
            clearTimeout(this.ddDisplayTimer);
            // starts a timer that will close the games drop down
            this.ddDisplayTimer = setTimeout(this.closeDD, 4000);
        },
        handleClick(e) {
            
            if (!document.getElementById(this.ddID).contains(e.target))
                this.closeDD();
        },
        closeDD() {

            document.getElementById(this.ddID).style.visibility = "hidden";
            this.displayedItemList = [];
            this.selectedIndex = -1;
        },
        clampIndex(nextInd, min, max) {

            return Math.min(Math.max(nextInd, min), max);
        }
    }
}

</script>

