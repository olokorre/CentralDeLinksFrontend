import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders the slot content', () => {
    const wrapper = mount(HelloWorld, {
      slots: { default: 'Bem vindo a Central de Links' }
    })
    expect(wrapper.text()).toContain('Bem vindo a Central de Links')
  })
})
