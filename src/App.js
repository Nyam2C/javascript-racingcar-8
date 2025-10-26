import { RacingController } from './controller/RacingController.js';

class App {
  async run() {
    const controller = new RacingController();
    await controller.run();
  }
}

export default App;
