<template>
  <v-layout row wrap class="my-10">
    <v-flex sm8 class="mx-auto">
      <v-card class="mx-2">
        <v-card-text class="pb-0">
          <v-btn text to="/home"> &larr; Back</v-btn>
        </v-card-text>
        <v-card-text>
          <v-flex :style="`background:url(${$appURL}images/trips-pattern.png)`">
            <v-layout row class="px-2">
              <v-flex>
                <h2>Flight Scanner</h2>
                <p>
                  Found
                  <span class="secondary--text">{{ data.length }}</span> flights
                </p>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card-text>
        <v-card-text class="py-0 ">
          <v-layout row wrap align-center>
            <v-flex md4 sm6 xs12 class="secondary--text px-2 font-weight-bold">
              Total Price: {{ total }}  {{$currency}}
            </v-flex>
            <v-flex md4 sm6 xs12>
              <v-checkbox
                v-model="directFilter"
                label="Direct"
                @change="filterData"
              ></v-checkbox>
            </v-flex>
            <v-flex md4 sm6 xs12 class="px-2">
              <v-slider
                v-model="priceRangeFilter"
                label="Price"
                :max="max"
                hide-details=""
                @change="filterData"
              >
                <template v-slot:thumb-label>
                  {{ priceRangeFilter }} 
                </template>
              </v-slider>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider />
        <v-card-text class="px-0">
          <v-data-table
            class="custom-data-table"
            :loading="fetchingLoader"
            :headers="headers"
            v-model="selectedFlights"
            show-select
            :items="data"
          >
            <!-- outboundleg -->
            <template v-slot:item.outboundleg.departureDate="{ item }">
              <div>
                <v-layout column>
                  <v-flex md4 class="black--text text-h6 d-flex align-center">
                    <div class="text-right pr-4">
                      {{ item.outboundleg.origin.IataCode }}
                    </div>
                    <div class="black--text py-2 d-flex align-center">
                      <v-icon style="justify-content: flex-end; width: 10px; "
                        >mdi-circle-small</v-icon
                      >
                      <v-icon style="justify-content: flex-end; width: 10px;"
                        >mdi-circle-small</v-icon
                      >
                      <v-icon style="justify-content: flex-end; width: 10px;"
                        >mdi-circle-small</v-icon
                      >
                      <v-icon style="transform: rotate(90deg)"
                        >mdi-airplane</v-icon
                      >

                      <v-icon style="justify-content: flex-start; width: 10px;"
                        >mdi-circle-small</v-icon
                      >
                      <v-icon style="justify-content: flex-start; width: 10px;"
                        >mdi-circle-small</v-icon
                      >
                      <v-icon style="justify-content: flex-start; width: 10px;"
                        >mdi-circle-small</v-icon
                      >
                    </div>
                    <div class="text-left px-4" style="text-align:left;">
                      {{ item.outboundleg.destination.IataCode }}
                    </div>
                  </v-flex>
                  <v-flex class="caption ">
                    <v-icon small color="secondary">mdi-calendar</v-icon>
                    {{ item.outboundleg.departureDate | moment("DD-MMM-YYYY") }}
                  </v-flex>
                  <v-flex class="caption pb-2">
                    {{ item.carriers }}
                    <v-chip
                      x-small
                      color="secondary"
                      v-for="(carrier, i) in item.outboundleg.carriers"
                      :key="i"
                    >
                      {{ carrier.Name }}
                    </v-chip>
                  </v-flex>
                </v-layout>
              </div>
            </template>
            <!-- inboundleg -->
            <template v-slot:item.inboundleg.departureDate="{ item }">
              <div v-if="item.inboundleg">
                <v-layout column>
                  <v-flex md4 class="black--text text-h6 d-flex align-center">
                    <div class="text-right pr-4">
                      {{ item.inboundleg.origin.IataCode }}
                    </div>
                    <div class="black--text py-2 d-flex align-center">
                      <v-icon style="justify-content: flex-end; width: 10px; "
                        >mdi-circle-small</v-icon
                      >
                      <v-icon style="justify-content: flex-end; width: 10px;"
                        >mdi-circle-small</v-icon
                      >
                      <v-icon style="justify-content: flex-end; width: 10px;"
                        >mdi-circle-small</v-icon
                      >
                      <v-icon style="transform: rotate(90deg)"
                        >mdi-airplane</v-icon
                      >

                      <v-icon style="justify-content: flex-start; width: 10px;"
                        >mdi-circle-small</v-icon
                      >
                      <v-icon style="justify-content: flex-start; width: 10px;"
                        >mdi-circle-small</v-icon
                      >
                      <v-icon style="justify-content: flex-start; width: 10px;"
                        >mdi-circle-small</v-icon
                      >
                    </div>
                    <div class="text-left px-4" style="text-align:left;">
                      {{ item.inboundleg.destination.IataCode }}
                    </div>
                  </v-flex>
                  <v-flex class="caption ">
                    <v-icon small color="secondary">mdi-calendar</v-icon>
                    {{ item.inboundleg.departureDate | moment("DD-MMM-YYYY") }}
                  </v-flex>
                  <v-flex class="caption pb-2">
                    {{ item.carriers }}
                    <v-chip
                      x-small
                      color="secondary"
                      v-for="(carrier, i) in item.inboundleg.carriers"
                      :key="i"
                    >
                      {{ carrier.Name }}
                    </v-chip>
                  </v-flex>
                </v-layout>
              </div>
            </template>
            <!-- direct -->
            <template v-slot:item.direct="{ item }">
              <v-icon small :color="item.direct ? 'green' : 'red'">
                {{ item.direct ? "mdi-check" : "mdi-close" }}</v-icon
              >
            </template>

            <!-- price -->
            <template v-slot:item.price="{ item }">
              <div>
                <v-icon color="yellow" v-if="item.cheapest" small>
                  mdi-star</v-icon
                >
                <span
                  :class="
                    item.cheapest ? 'font-weight-bold secondary--text' : ''
                  "
                >
                  {{ item.price }} {{$currency}}
                </span>
                <div class="caption">
                  {{ item.quotedDate | moment("DD-MMM-YYYY [at] HH:ss") }}
                </div>
              </div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    data: [],
    unfilteredData: [],
    params: {
      etd: null,
      eta: null,
      fromCity: null,
      toCity: null
    },
    max: 5000,
    directFilter: false,
    priceRangeFilter: "",
    selectedFlights: [],
    fetchingLoader: false,
    places: [],
    carriers: []
  }),
  mounted() {},
  computed: {
    total() {
      let total = 0;
      _.map(this.selectedFlights, flight => {
        total = total + _.toNumber(flight.price);
      });
      return total;
    },

    headers() {
      let header = [
        {
          text: "Departure Flight",
          sortable: true,
          value: "outboundleg.departureDate"
        },
        {
          text: "Return Flight",
          sortable: true,
          value: "inboundleg.departureDate"
        },
        {
          text: "Direct",
          sortable: true,
          align: "center",
          value: "direct",
          width: "10%"
        },
        {
          text: "Price",
          align: "right",
          sortable: true,
          value: "price",
          width: "20%"
        }
      ];
      return this.params.eta
        ? header
        : _.reject(header, { text: "Return Flight" });
    }
  },
  watch: {
    "$route.query": {
      immediate: true,
      handler() {
        if (_.size(this.$route.query)) this.prepareFilters(this.$route.query);
      }
    }
  },
  methods: {
    filterData() {
      let unfilteredData = _.cloneDeep(this.unfilteredData);
      if (this.directFilter && this.priceRangeFilter) {
        unfilteredData = _.reject(unfilteredData, item => !item.direct);
        unfilteredData = _.reject(unfilteredData, item => {
          return !(item.price <= this.priceRangeFilter);
        });
        this.data = unfilteredData;
      } else if (this.directFilter) {
        unfilteredData = _.reject(unfilteredData, item => !item.direct);

        this.data = unfilteredData;
      } else if (this.priceRangeFilter) {
        unfilteredData = _.reject(unfilteredData, item => {
          return !(item.price <= this.priceRangeFilter);
        });
        debugger;
        this.data = unfilteredData;
      } else {
        this.data = unfilteredData;
      }
    },
    getSectorInfo(response, quote, type) {
      if (quote[type]) {
        let places = response.data.Places;
        let carriers = response.data.Carriers;
        let outboundcarriers = [];
        let origin = {};
        let destination = {};
        let departureDate = null;

        _.map(quote[type].CarrierIds, item => {
          outboundcarriers.push(_.filter(carriers, { CarrierId: item })[0]);
        });

        origin = _.filter(places, { PlaceId: quote[type].OriginId })[0];
        destination = _.filter(places, {
          PlaceId: quote[type].DestinationId
        })[0];
        departureDate = quote[type].DepartureDate;

        return {
          origin: origin,
          destination: destination,
          carriers: outboundcarriers,
          departureDate: departureDate
        };
      } else {
        return null;
      }
    },
    fetchFlights() {
      this.fetchingLoader = true;
      this.loading = true;
      let api = `browseroutes/v1.0/${this.$country}/${this.$currency}/${this.$locale}/${this.params.fromCity}/${this.params.toCity}/${this.params.etd}`;

      if (this.params.eta) {
        api = `browseroutes/v1.0/${this.$country}/${this.$currency}/${this.$locale}/${this.params.fromCity}/${this.params.toCity}/${this.params.etd}/${this.params.eta}`;
      }
      axios
        .get(api)
        .then(response => {
          if (response.status == 200) {
            let quotes = response.data.Quotes;

            let results = [];

            _.map(quotes, (item, i) => {
              let obj = {};
              obj.id = i;
              obj.cheapest = false;
              obj.price = item.MinPrice;
              obj.direct = item.Direct;
              obj.quotedDate = item.QuoteDateTime;
              obj.outboundleg = this.getSectorInfo(
                response,
                item,
                "OutboundLeg"
              );
              obj.inboundleg = this.params.eta
                ? this.getSectorInfo(response, item, "InboundLeg")
                : null;

              results.push(obj);
            });

            let cheapest = _.minBy(results, "price");
            _.map(results, item => {
              if (item.id == cheapest.id) {
                item.cheapest = true;
              }
            });
            let expensive = _.maxBy(results, "price");
            _.map(results, item => {
              if (item.id == expensive.id) {
                item.expensive = true;
              }
            });
            this.max = expensive ? expensive.price : 10000;

            this.data = results;
            this.unfilteredData = results;
            debugger;
          }
        })
        .finally(() => {
          this.fetchingLoader = false;
        });
    },
    prepareFilters(filters) {
      this.params = {};

      // cities
      this.params.fromCity = filters.fromCity || null;
      this.params.toCity = filters.toCity || null;

      // Dates
      if (filters.fromDate)
        this.params.etd = this.$moment(filters.etd).format("YYYY-MM-DD");
      if (filters.toDate)
        this.params.eta = this.$moment(filters.eta).format("YYYY-MM-DD");

      this.fetchFlights();
    }
  }
};
</script>
<style lang="scss">
.logo-flex-wrap {
  min-height: 65px;
}
</style>
