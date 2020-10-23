<template>
  <v-layout row wrap class="my-10">
    <v-flex sm6 class="mx-auto">
      <v-card class="mx-2">
        <v-card-text class="pa-0">
          <v-flex
            class="text-center"
            :style="`background:url(${$appURL}images/trips-pattern.png)`"
          >
            <v-avatar :size="100" color="grey lighten-4 my-2">
              <v-icon x-large>mdi-airplane</v-icon>
            </v-avatar>
            <h2 class="py-3">Welcome To Flight Scanner</h2>
            <p>Search your favorite flights here ! Its Simple and Easy</p>
          </v-flex>
        </v-card-text>
        <v-divider />
        <v-card-text>
          <v-form ref="searchForm" v-on:submit.prevent>
            <v-layout row>
              <v-flex sm6 class="pa-2">
                <city-search
                  label="From"
                  dense
                  outlined
                  v-model="params.fromCity"
                  required
                  placeholder="Search by name"
                  :rules="[ value => !!value || 'The specified field is required.' ]"
                >
                </city-search>
              </v-flex>
              <v-flex sm6 class="pa-2">
                <city-search
                  label="To"
                  v-model="params.toCity"
                  dense
                  outlined
                  required
                     :rules="[ value => !!value || 'The specified field is required.' ]"
                  placeholder="Search by name"
                >
                </city-search>
              </v-flex>
              <v-flex sm6 class="pa-2">
                <v-menu
                  v-model="fromDatePicker"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  nudge-bottom="5"
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="params.fromDate"
                      readonly
                      outlined
                         :rules="[ value => !!value || 'The specified field is required.' ]"
                      placeholder="Select departure date"
                      dense
                      append-icon="mdi-calendar"
                      v-on="on"
                      clearable
                    >
                      <template v-slot:label>
                        <span>Departure Date</span>
                        <span class="red--text">*</span>
                      </template>
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="params.fromDate"
                    @input="fromDatePicker = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex sm6 class="pa-2">
                <v-menu
                  v-model="toDatePicker"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="params.toDate"
                      label="Return Date"
                      readonly
                      placeholder="Select return date"
                      dense
                      append-icon="mdi-calendar"
                      outlined
                      v-on="on"
                      clearable
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="params.toDate"
                    @input="toDatePicker = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>

            <v-layout align-center justify-center >
               <v-flex  sm6 class="px-2">
                <v-btn color="secondary" block @click="searchFlights">Search Flights</v-btn>
                <v-btn  class="my-2" text block color="secondary" @click="$refs.searchForm.reset()"> Reset</v-btn>
              </v-flex>
              <!-- <v-flex  sm6 class="px-2">
                
              </v-flex> -->
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    params: {
      fromDate: null,
      toDate: null
    },
    fromDatePicker: false,
    toDatePicker: false
  }),
  methods: {
    searchFlights()
    {
      if(this.$refs.searchForm.validate())
      {

      }
    }
  }
};
</script>
<style lang="scss">
.logo-flex-wrap {
  min-height: 65px;
}
</style>
