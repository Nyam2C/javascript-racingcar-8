import { Car } from './Car.js';

class Race {
  constructor(carNames, tryCount) {
    this.cars = carNames.map((name) => new Car(name));
    this.tryCount = tryCount;
  }
}

export default Race;