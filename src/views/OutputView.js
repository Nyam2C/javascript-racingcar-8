import { MissionUtils } from "@woowacourse/mission-utils";
import { PROMPT } from "../constants/index.js";

const OutputView = {

    printStart() {
        MissionUtils.Console.print(PROMPT.RESULT);
    },

    printRoundResult(cars) {
        cars.getCars().forEach(car => {
            MissionUtils.Console.print(`${car.getName()} : ${'-'.repeat(car.getDistance())}`);
        });
        MissionUtils.Console.print('');
    },

    printWinners(cars) {
        MissionUtils.Console.print(PROMPT.FINAL_WINNER + `${cars.getWinners().map(car => car.getName()).join(', ')}`);
    },

    printError(errorMessage) {
        MissionUtils.Console.print(errorMessage);
    },
};

export default OutputView;