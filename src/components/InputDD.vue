<template>
    <div>
        <input :id="inputID" class="mx-2 px-2 rounded-lg w-48" type="text" placeholder="Enter game title" 
            @keyup="displayLike">
        <div :id="ddID" class="absolute bg-orange-600 w-48 left-2 top-7 h-fit z-50" style="visibility:hidden;">
            <ul :id="listID">
                <!-- <li v-for="todo in todos" :key="todo.id">
                    {{ todo.text }}
                </li> -->
                <li v-for="di in displayedItemList" :key="di"> {{ di }}</li>
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
        }
    },
    methods: {

        // setList() is called from parent
        setList(listFromParent) {
        
            for (var item of listFromParent) {

                this.itemList.push(item);
            }
        },
        async sendText() {
            
            let titleKeyword = document.getElementById(this.inputID).value;
            this.$emit('textSent', titleKeyword);
        },
        displayLike(e) {

            // for (var item of document.getElementById('listID').getElementsByTagName('li')) {
            //     console.log(item);
            // }
            if (e.key == 'Escape') {
                this.closeDD();
                return;
            }

            this.displayedItemList = [];
            console.log(this.inputID);
            const expr = new RegExp(document.getElementById(this.inputID).value);

            for (var i of this.itemList) {
                if (expr.test(i))
                    this.displayedItemList.push(i);
            }

            document.getElementById(this.ddID).style.visibility = "visible";

            // clears the current timer on the games drop down if there is one
            clearTimeout(this.ddDisplayTimer);

            // starts a timer that will close the games drop down
            this.ddDisplayTimer = setTimeout(this.closeDD, 4000);
        },
        closeDD() {

            document.getElementById(this.ddID).style.visibility = "hidden";
        }
    }
}

</script>

