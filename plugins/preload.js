import Vue from "vue";
import moment from "moment";
import vueMoment from "vue-moment";
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import VueLodash from "vue-lodash";
import lodash from 'lodash';
import citySearch from "@/components/citySearch";
import countrySelect from "@/components/countrySelect";
import '@mdi/font/css/materialdesignicons.css'
import snackbar from "@/components/snackbar";

Vue.prototype.$appURL = process.env.NUXT_ENV_ENVIRONMENT == 'production' ? process.env.NUXT_APP_URL : '/';
Vue.prototype.$currency = process.env.NUXT_ENV_CURRENCY
Vue.prototype.$locale = process.env.NUXT_ENV_LOCALE
Vue.prototype.$country = process.env.NUXT_ENV_COUNTRY

window.moment = moment;

Vue.use(vueMoment);

Vue.use(VueLodash, { lodash: lodash });
Vue.component("snackbar", snackbar);
Vue.component('vue-perfect-scrollbar', VuePerfectScrollbar);
Vue.component("citySearch", citySearch);
Vue.component("countrySelect", countrySelect);



