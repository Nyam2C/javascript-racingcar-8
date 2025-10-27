import Car from './Car.js';

class Race {
  constructor(carNames, tryCount) {
    this.cars = carNames.map((name) => new Car(name));
    this.tryCount = tryCount;
  }

  moveCars() {
    this.cars.forEach((car) => car.move());
  }

  getCars() {
    return this.cars;
  }

  getWinners() {
    const maxDistance = Math.max(...this.cars.map((car) => car.getDistance()));
    console.log('maxDistance:', maxDistance);
    return this.cars.filter((car) => car.getDistance() === maxDistance);
  }
}

export default Race;