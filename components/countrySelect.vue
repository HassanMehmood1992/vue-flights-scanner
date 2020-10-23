<template>
  <v-autocomplete
    v-model="val"
    item-text="Name"
    item-value="Code"
    class="selectFields-input"
    hide-no-data
    :class="[searchInput ? 'has-data' : '', classNames]"
    :clearable="clearable"
    :color="color"
    :dark="dark"
    :deletable-chips="deletablechips"
    :dense="dense"
    :flat="flat"
    :hide-details="hideDetails"
    :hint="hint"
    :items="items"
    :label="label"
    :loading="loading"
    :menu-props="{
      contentClass: 'selectFields-dropdown',
      nudgeBottom: 10,
      transition: 'scale-transition',
      lazy: true,
      dense: true
    }"
    :multiple="multiple"
    :outlined="outlined"
    :placeholder="placeholder"
    :prepend-inner-icon="icon"
    :return-object="returnObject"
    :required="required"
    :rounded="rounded"
    :rules="rules"
    :search-input.sync="searchInput"
    :solo="solo"
    @click:clear="$emit('onClear')"
  >
    <template v-slot:label>
      <span>{{ label }}</span>
      <span v-if="required" class="red--text">*</span>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  props: {
    countryCode: {
      type: String,
      default: null
    },
    classNames: {
      type: String,
      default: null
    },
    classSelection: {
      type: String,
      default: "caption"
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
      default: function() {
        return {} || [];
      }
    }
  },
  data: () => ({
    items: [],
    loading: false,
    searchInput: ""
  }),

  computed: {
    val: {
      get() {
        return this.value;
      },
      set(v) {
        this.searchInput = "";
        this.$emit("onSelect", v);
      }
    }
  },

  mounted() {
    this.getItems();
  },

  methods: {
    getItems() {
      this.loading = true;
      axios
        .get("reference/v1.0/countries/en-US")
        .then(response => {
          debugger;
          this.items = _.sortBy(response.data.Countries, ["Name"]);
          if (this.countryCode) {
            let company = _.filter(this.items, { id: this.countryCode });
            if (company.length == 1) {
              this.val = company[0];
            }
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
