import Sortable from 'sortablejs'

export default {
  params: ['onSort'],
  sortable: null,
  sortedTracks: [],
  bind () {
  },
  update (newVal, oldVal) {
    this.sortedTracks = [].concat(newVal)
    this.sortable = Sortable.create(this.el, {
      animation: 150,
      delay: 150,
      onEnd: (e) => {
        const oldIndex = e.oldIndex
        const newIndex = e.newIndex
        const tmp = this.sortedTracks[oldIndex]
        this.sortedTracks.splice(oldIndex, 1)
        this.sortedTracks.splice(newIndex, 0, tmp)
        this.vm[this.params.onSort].apply(null, [this.sortedTracks])
      }
    })
  }
}
