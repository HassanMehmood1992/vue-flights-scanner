import { mount, createLocalVue } from "@vue/test-utils";
import { shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";

import Home from "@/pages/home/index";

const localVue = createLocalVue();
localVue.use(Vuex);

let wrapper;

beforeEach(() => {
  let vuetify = new Vuetify();

  wrapper = shallowMount(Home, {
    store: new Vuex.Store({
      state: { products: [] }
    }),
    localVue,
    vuetify,
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

describe("Home page", () => {
  test("is fully functional", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test("should have a Welcome To Flight Scanner title", () => {
    const title = wrapper.find("h2.py-3");
    expect(title.element.innerHTML).toBe("Welcome To Flight Scanner");
  });
});
