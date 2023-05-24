class Store {
  constructor() {
    this.state = {
      nextReqGroup: 0,
      prevTime: '',
    };
  }
  getState(key) {
    return this.state[key];
  }
  setState(key, newState) {
    this.state[key] = newState;
  }
}

export const store = new Store();
