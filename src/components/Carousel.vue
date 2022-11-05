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

      <ul id="slider" class="flex w-full">
        <li v-for="n in items" :key="n" class="w-96 p-4  text-white h-full">
          <CarouselCard />
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

export default {
  data() {
    return {
      items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      index: 0
    }
  },
  components: {
    CarouselCard,
    ChevronLeftIcon,
    ChevronRightIcon
  },
  mounted() {
    let sliderContainer = document.getElementById('sliderContainer');
    let slider = document.getElementById('slider');
    let cards = document.getElementsByTagName('li');

    let sliderContainerWidth = sliderContainer.clientWidth;
    let elementsToShow = 5;

    let cardWidth = sliderContainerWidth / elementsToShow;

    slider.style.width = cards.length * cardWidth + 'px';
    slider.style.transition = 'margin';
    slider.style.transitionDuration = '1s';

    for (let index = 0; index < cards.length; index++) {
      const element = cards[index];
      element.style.width = cardWidth + 'px';
    }
  },
  methods: {
    showNext() {
      let sliderContainer = document.getElementById('sliderContainer');
      let slider = document.getElementById('slider');

      let sliderContainerWidth = sliderContainer.clientWidth;
      let elementsToShow = 5;

      let cardWidth = sliderContainerWidth / elementsToShow;
      if (this.index != this.items.length - elementsToShow) {
        this.index++;
        slider.style.marginLeft = ((+slider.style.marginLeft.slice(0, -2)) - cardWidth) + 'px';
      }
    },
    showPrevious() {
      let sliderContainer = document.getElementById('sliderContainer');
      let slider = document.getElementById('slider');

      let sliderContainerWidth = sliderContainer.clientWidth;
      let elementsToShow = 5;

      let cardWidth = sliderContainerWidth / elementsToShow;

      if (this.index != 0) {
        this.index--;
        slider.style.marginLeft = ((+slider.style.marginLeft.slice(0, -2)) + cardWidth) + 'px';
      }
    }
  }
}
</script>
