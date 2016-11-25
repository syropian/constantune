import Vue from 'vue'
import App from 'src/App'
import store from 'src/store'

describe('App.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      store,
      render: (h) => h(App)
    })
    expect(!!vm.$el.querySelector('.main'))
      .to.not.equal(null)
  })
  it('should have the correct default data', () => {
    expect(App.data).to.be.a('function')
    expect(App.data().url).to.equal('')
  })
})
