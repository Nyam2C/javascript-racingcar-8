import { RANDOM } from '../utils/index.js';
import { GAME_RULES } from "../constants/index.js";

class Car {
  constructor(name) {
    this.name = name;
    this.distance = 0;
  }

  getName() {
    return this.name;
  }

  getDistance() {
    return this.distance;
  }

  move() {
    if (RANDOM.pick() >= GAME_RULES.MOVING_FORWARD_THRESHOLD) {
      this.distance += 1;
    }
  }
}

export default Car;