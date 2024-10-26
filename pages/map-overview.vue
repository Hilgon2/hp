<script setup lang="ts">
import type { HpApiResponse } from '~/types/api.model';
import type { HpHouse } from '~/types/house.model';
import * as L from 'leaflet';
globalThis.L = L;
import { LMap, LTileLayer, LControlZoom } from '@vue-leaflet/vue-leaflet';

const map = ref(null) as any;
const center = ref<number[]>();
const markers = ref<any[]>([]);
const allHouses = ref<HpHouse[]>([]);
const shownHouses = ref<HpHouse[]>([]);

async function initialize() {
  await useFetch('/properties.json', {
    method: 'get',
    onResponse({ response }): void {
      const data: HpApiResponse<HpHouse> = response._data;
      allHouses.value = data.data;
      shownHouses.value = data.data;
      center.value = [
        data.data[0].attributes.latitude,
        data.data[0].attributes.longitude,
      ];

      for (const house of data.data) {
        markers.value.push({
          name: house.id,
          lat: house.attributes.latitude,
          lng: house.attributes.longitude,
          popup: `
            <b>
              ${house.attributes.street}
              ${house.attributes.houseNumberFull},
              ${house.attributes.city}
            </b>
            <br />
            ${house.attributes.plotSize || 'Onbekend'} m<sup>2</sup> &#x2022;
            ${house.attributes.buildYear}
          `,
        });
      }
    },
  });
}

onMounted(async () => {
  nextTick(() => {
    initialize();
  });
});

const onMapReady = () => {
  useLMarkerCluster({
    leafletObject: map.value.leafletObject,
    markers: markers.value,
  });
};

function formatPrice(price: string) {
  if (price === null) {
    return null;
  }

  return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

function filterHouses(attributes, test) {
  console.log(map.value.getBounds());
}
</script>

<template>
  <section class="houses-container absolute bg-white px-6">
    <h1 class="mt-4">{{ shownHouses.length }} koopwoningen gevonden</h1>
    <hr class="mb-4" />
    <div class="flex flex-col">
      <article
        v-for="house in shownHouses"
        :key="house.id"
        class="mb-10 rounded-md house"
      >
        <a href="#">
          <img
            :src="house.attributes.image.href"
            :alt="`Woning aan ${house.attributes.street} ${house.attributes.houseNumber}`"
            class="rounded-tl-md rounded-tr-md"
          />
          <div class="house__details py-2 px-4">
            <b>
              {{ house.attributes.street }}
              {{ house.attributes.houseNumberFull }},
              {{ house.attributes.city }}
            </b>
            <br />
            {{ house.attributes.plotSize || 'Onbekend' }} m<sup>2</sup> &#x2022;
            {{ house.attributes.buildYear }}
            <b class="block mt-2">
              &euro;
              {{ formatPrice(house.attributes.offer.salePrice) || 'Onbekend' }}
            </b>
          </div>
        </a>
      </article>
    </div>
  </section>
  <div v-if="center" class="map">
    <LMap
      ref="map"
      :zoom="13"
      :center="center"
      :useGlobalLeaflet="true"
      :options="{ zoomControl: false }"
      @ready="onMapReady"
      @update:zoom="filterHouses"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></LTileLayer>
      <LControlZoom position="topright"></LControlZoom>
    </LMap>
  </div>
</template>

<style lang="scss" scoped>
.houses-container {
  top: 60px;
  z-index: 999;
  overflow-y: auto;
  max-height: calc(100vh - 60px);
  margin-left: -1.5rem;
}

.house {
  img {
    width: calc(400px + 1rem);
  }

  &__details {
    border: 1px solid #ccc;
    border-top: 0;
  }
}

.map {
  width: calc(100% + 3rem);
  height: calc(100vh - 60px);
  margin: 0 -1.5rem;
}
</style>
