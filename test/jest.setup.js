// ./test/jest.setup.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import snackbar from "@/components/snackbar";
import citySearch from "@/components/citySearch";
import vueMoment from "vue-moment";
import VueLodash from "vue-lodash";
import lodash from 'lodash';


import VuePerfectScrollbar from 'vue-perfect-scrollbar';
Vue.component("snackbar", snackbar);
Vue.component("citySearch", citySearch);
Vue.component('vue-perfect-scrollbar', VuePerfectScrollbar);
Vue.use(VueLodash, { lodash: lodash });
Vue.use(vueMoment);
Vue.use(Vuetify)
