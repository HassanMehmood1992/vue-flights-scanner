import { mount, createLocalVue } from "@vue/test-utils";
import { shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";

import Flights from "@/pages/flights/index";

const localVue = createLocalVue();
localVue.use(Vuex);

let wrapper;

const $route = {
  query: {
    fromCity:'fromCity'
  }
}

beforeEach(() => {
  let vuetify = new Vuetify();

  wrapper = shallowMount(Flights, {
    store: new Vuex.Store({
      state: { products: [] }
    }),
    localVue,
    vuetify,
    mocks: {
      $route
    },
    stubs: {
      NuxtLink: true,
      Nuxt: true
      // Any other component that you want stubbed
    }
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe("Flights page", () => {
  test("is fully functional", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
