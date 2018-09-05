module.exports = class Collection extends Map {
  constructor() {
    super();

    // Credit: https://github.com/discordjs/discord.js/blob/master/src/util/Collection.js
    Object.defineProperty(this, '_array', { value: null, writable: true, configurable: true });
    Object.defineProperty(this, '_keyArray', { value: null, writable: true, configurable: true });
  }

  filter(callback) {
    let result = [];
    const all = Array.from(this.values());
    for (let i = 0; i < all.length; i++) {
      if (callback(all[i])) result.push(all[i]);
    }

    return result;
  }

  map(callback) {
    const values = Array.from(this.values());
    let result = [];
    for (let i = 0; i < values.length; i++) {
      result.push(callback(values[i]));
    }

    return result;
  }

  array() {
    if (!this._array || this._array.length !== this.size) this._array = [...this.values()];
    return this._array;
  }

  keyArray() {
    if (!this._keyArray || this._keyArray.length !== this.size) this._keyArray = [...this.keys()];
    return this._keyArray;
  }

  random(amount) {
    let array = this.array();
    if (typeof amount === 'undefined') return array[Math.floor(Math.random() * array.length)];
    if (array.length === 0 || !amount) return [];
    const random = new Array(amount);
    array = array.slice();
    for (let i = 0; i < amount; i++) random[i] = array.splice(Math.floor(Math.random() * array.length), 1)[0];

    return random;
  }
}