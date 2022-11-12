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
        <li v-for="card in carouselCards" :key="card" class="p-5 text-white w-96">
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
      index: 0
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
    let sliderContainer = document.getElementById('sliderContainer');
    let slider = document.getElementById('slider');
    slider.addEventListener("wheel", this.wheelHandler);
    let cards = document.getElementsByTagName('li');

    let sliderContainerWidth = sliderContainer.clientWidth;
    let elementsToShow = 4;

    let cardWidth = sliderContainerWidth / elementsToShow;

    slider.style.width = 20 * cardWidth + 'px';
    slider.style.transition = 'margin';
    slider.style.transitionDuration = '1s';

    console.log(this.carouselCards.length);
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
      let elementsToShow = 4;

      let cardWidth = sliderContainerWidth / elementsToShow;
      if (this.index != this.carouselCards.length - elementsToShow) {
        this.index++;
        slider.style.marginLeft = ((+slider.style.marginLeft.slice(0, -2)) - cardWidth) + 'px';
      }
    },
    showPrevious() {
      let sliderContainer = document.getElementById('sliderContainer');
      let slider = document.getElementById('slider');

      let sliderContainerWidth = sliderContainer.clientWidth;
      let elementsToShow = 4;

      let cardWidth = sliderContainerWidth / elementsToShow;

      if (this.index != 0) {
        this.index--;
        slider.style.marginLeft = ((+slider.style.marginLeft.slice(0, -2)) + cardWidth) + 'px';
      }
    },
    wheelHandler(e) {
      if (e.deltaY < 0)
        this.showPrevious();
      else if (e.deltaY > 0)
        this.showNext();
    }
  }
}
</script>
