<template>
  <v-autocomplete
    v-model="val"
    name="airportSearch"
    hide-no-data
    item-text="PlaceName"
    item-value="PlaceId"
    :class="classNames"
    :clearable="clearable"
    :color="color"
    :dark="dark"
    :deletable-chips="multiple"
    :flat="flat"
    :hide-details="hideDetails"
    :hint="hint"
    :items="items"
    :loading="loading"
    :multiple="multiple"
    :chips="multiple"
    :small-chips="multiple"
    :label="label"
    hide-selected
    :dense="dense"
    no-filter
    :outlined="outlined"
    :placeholder="placeholder"
    :prepend-inner-icon="icon"
    :return-object="returnObject"
    :required="required"
    :rounded="rounded"
    :rules="rules"
    :search-input.sync="searchInput"
    :solo="solo"
  >
    <template v-slot:label>
      <span>{{ label }}</span>
      <span v-if="required" class="red--text">*</span>
    </template>

    <template v-slot:item="data">
      <v-layout column class="py-2">
        <div class="caption secondary--text font-weight-medium">
          {{ data.item.PlaceName ? data.item.PlaceName : "" }}
        </div>
        <div class="caption grey--text">
          {{
            _.join(
              _.filter([data.item.PlaceId, data.item.CountryName], _.identity),
              " / "
            )
          }}
        </div>
      </v-layout>
    </template>
  </v-autocomplete>
</template>

<script>
import * as _ from "lodash";
export default {
  props: {
    classNames: {
      type: String,
      default: null
    },
    clearable: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: null
    },
    dark: {
      type: Boolean,
      default: false
    },
    deletablechips: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    },
    forFilter: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    returnObject: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: function() {
        return [];
      }
    },
    solo: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Object, Array],
      default: null
    }
  },
  data: () => ({
    items: [],
    loading: false,
    searchInput: ""
  }),
  mounted() {},

  computed: {
    val: {
      get() {
        return this.value;
      },
      set(v) {
        if (_.isUndefined(v)) v = null;
        this.searchInput = "";
        this.$emit("onSelect", v);
      }
    }
  },

  watch: {
    searchInput: {
      immediate: false,
      handler() {
        if (this.searchInput) {
          this.getItems(this.searchInput);
        }
      }
    }
  },

  methods: {
    getItems: _.debounce(function(val) {
      if (val && val.length >= 2) {
        this.loading = true;
        axios
          .get(`autosuggest/v1.0/${this.$country}/${this.$currency}/${this.$locale}/?query=${val}`)
          .then(response => {
            this.items = response.data.Places;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }, 1000)
  }
};
</script>
