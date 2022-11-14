<template>
  <div class="flex w-full h-1/2">
    <div class="w-1/12 text-white flex items-center">
      <div class="w-full text-right">
        <button @click="showPrevious()">
          <ChevronLeftIcon class="stroke-white h-10 w-10 mr-5" />
        </button>
      </div>
    </div>
    <div id="sliderContainer" class="w-full h-full overflow-hidden">

      <ul id="slider" class="grid grid-rows-1 grid-flow-col">
        <li v-for="card in carouselCards" :key="card" class="p-5 text-white" :style="'width:' + cardWidth + 'px;'">
          <CarouselCard :image="card.image" :title="card.game_title" :topTags="card.top_tags" :bottomTags="card.bottom_tags" :platformIcons="card.platform_icons" />
        </li>

      </ul>
    </div>
    <div class="w-1/12 text-white flex items-center">
      <div class="w-full">
        <button @click="showNext()">
          <ChevronRightIcon class="stroke-white h-10 w-10 ml-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CarouselCard from './CarouselCard.vue';
import { ChevronLeftIcon } from '@heroicons/vue/24/outline';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import store from '../store/index';
import { computed } from 'vue';

export default {
  data() {
    return {
      index: 0,
      wheelTimer: null, // allows us to adjust scroll speed
      cardWidth: null, // determined by .clientWidth of sliderContainer
      cardsOnScreen: 4,
    }
  },
  setup() {
    
    var carouselCards = computed(() => store.state.carouselCards);
    
    return { carouselCards };
  },
  components: {
    CarouselCard,
    ChevronLeftIcon,
    ChevronRightIcon
  },
  mounted() {
    
    // mounted() is always called on hot-reload, updated() is not
    // when the program is initially run or page is refreshed, carouselCards will not be populated in this function

    let slider = document.getElementById('slider');
    slider.addEventListener("wheel", this.wheelHandler);

    let sliderContainer = document.getElementById('sliderContainer');
    this.cardWidth = sliderContainer.clientWidth / this.cardsOnScreen;
  },
  updated() {
    
    let slider = document.getElementById('slider');
    slider.style.transition = 'margin';
    slider.style.transitionDuration = '1s';
  },
  methods: {
    showNext() {
      
      if (this.index < this.carouselCards.length - this.cardsOnScreen) {

        this.index++;

        let slider = document.getElementById('slider');
        slider.style.marginLeft = ((+slider.style.marginLeft.slice(0, -2)) - this.cardWidth) + 'px';

        if (this.index == this.carouselCards.length - this.cardsOnScreen - 2) {

          // this will tell the parent to fetch more cards.
          this.$emit('endOfCarousel');
        }
      }

      console.log(this.index);
      console.log(this.carouselCards.length, this.carouselCards); 
    },
    showPrevious() {

      if (this.index != 0) {

        this.index--;

        let slider = document.getElementById('slider');
        slider.style.marginLeft = ((+slider.style.marginLeft.slice(0, -2)) + this.cardWidth) + 'px';
      }

      console.log(this.index);
      console.log(this.carouselCards.length);
    },
    reset() {

      // called from GameBrowser.vue after applying a new filter

      this.index = 0;
      let slider = document.getElementById('slider');
      slider.style.marginLeft = 0;
    },
    wheelHandler(e) {

      if (this.wheelTimer === null) {

          if (e.deltaY < 0)
            this.showPrevious();
          else if (e.deltaY > 0)
            this.showNext();

          // the number entered here determines scroll speed, with smaller numbers meaning faster speed
          // i.e. 100 will allow for 1 showNext/showPrev every .1 secs, 500 allows for 1 every .5 secs, etc
          this.wheelTimer = setTimeout(this.clearWheelTimer, 500);
      }
    },
    clearWheelTimer() {

      clearTimeout(this.wheelTimer);
      this.wheelTimer = null;
    }
  }
}
</script>
