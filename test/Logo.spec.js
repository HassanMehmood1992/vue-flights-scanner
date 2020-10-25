import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import citySearch from '@/components/citySearch'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper

beforeEach(() => {
    let vuetify = new Vuetify()

    wrapper = mount(citySearch, {
        store: new Vuex.Store({
            state: { products: [] }
        }),
        localVue,
        vuetify,
        propsData: { label: 'Foobar' },
    })
})

afterEach(() => {
    wrapper.destroy()
})

describe('Header', () => {
  
    test('is fully functional', () => {
        expect(wrapper.element).toMatchSnapshot()
    })
    test('should have a custom title and match snapshot', () => {

      // With jest we can create snapshot files of the HTML output
      // expect(wrapper.html()).toMatchSnapshot()
  
      // We could also verify this differently
      // by checking the text content
      
      debugger
      const title = wrapper.find('.v-select__slot > label > span')
      
      expect(title.element.innerHTML).toBe('Foobar')
    })
})