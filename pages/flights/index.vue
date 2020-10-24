<template>
  <v-layout row wrap class="my-10">
    <v-flex sm10 class="mx-auto">
      <v-card class="mx-2">
        <v-card-text class="pb-0">
          <v-btn text> &larr; Back</v-btn>
        </v-card-text>
        <v-card-text>
          <v-flex :style="`background:url(${$appURL}images/trips-pattern.png)`">
            <v-layout row class="px-2">
              <v-flex>
                <h2>Flight Scanner</h2>
                <p>Found 234 flights</p>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card-text>
        <v-divider />
        <v-card-text class="px-0">
          <v-data-table
            class="custom-data-table"
            :loading="fetchingLoader"
            :headers="headers"
            :items="data"
          >
            <!-- title -->
            <template v-slot:item.title="{ item }">
              <h4
                class="font-weight-medium primary--text text-truncate hover-underline"
              >
                {{ item.title }}
              </h4>
            </template>
            <!-- Type -->
            <template v-slot:item.type="{ item }"> </template>
            <!-- Depart -->
            <template v-slot:item.depart="{ item }"> </template>
            <!-- Arrival -->
            <template v-slot:item.arrival="{ item }"> </template>
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
    params: {
      etd: null,
      eta: null,
      fromCity: null,
      toCity: null
    },
    fetchingLoader: false,
    places: [],
    carriers: [],

    headers: [
      {
        text: "Operator",
        sortable: false,
        value: "carrier",
      },
      {
        text: "Flight",
        sortable: false,
        value: "places",
      },
      {
        text: "Direct",
        sortable: false,
        value: "direct",
      },
      {
        text: "Price",
        sortable: false,
        value: "price",
      }
    ]
  }),
  mounted() {},
  watch: {
    "$route.query": {
      immediate: true,
      handler() {
        if (_.size(this.$route.query)) this.prepareFilters(this.$route.query);
      }
    }
  },
  methods: {
    fetchFlights() {
      this.fetchingLoader = true;
      this.loading = true;
      axios
        .get(
          `browseroutes/v1.0/AE/AED/en-us/${this.params.fromCity}/${
            this.params.toCity
          }/${this.params.etd}?query=${this.params.eta || "anytime"}`
        )
        .then(response => {
          if (response.status == 200) {
            this.data = response.data.Quotes;
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
