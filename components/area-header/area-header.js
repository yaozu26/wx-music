Component({
  properties: {
    title: {
      type: String,
      default: () => ""
    },
    more: {
      type: String,
      default: () => ""
    }
  },
  methods: {
    onmoreClick() {
      this.triggerEvent("moreClick")
    }
  }
})