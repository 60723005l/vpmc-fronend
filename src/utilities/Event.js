
class Event {
  constructor () {
    this._listeners = []
  }

  addEventListener (listener = () => {}) {
    this._listeners.push(listener)
    return () => this.removeEventListener(listener)
  }

  raise (arg = {}) {
    this._listeners.forEach(listener => {
      listener(arg)
    })
  }

  removeEventListener (listener = () => {}) {
    const index = this._listeners.findIndex(e => e === listener)

    if (index < 0) {
      console.warn('listener not found')
      return
    } else {
      this._listeners.splice(index, 1)
    }
  }
}

export default Event
