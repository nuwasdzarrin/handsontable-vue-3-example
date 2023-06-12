import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../HandsOnTable.vue'

describe('Showing title', () => {
    it('renders properly', () => {
        const wrapper = mount(HelloWorld, { props: { msg: 'Title Hand on table' } })
        expect(wrapper.text()).toContain('Title Hand on table')
    })
})
