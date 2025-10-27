import { MissionUtils } from "@woowacourse/mission-utils";
import { PROMPT } from "../constants/index.js";

const OutputView = {

    printStart() {
        MissionUtils.Console.print(PROMPT.RACE_START);
    },

    printError(errorMessage) {
        MissionUtils.Console.print(errorMessage);
    },
};

export default OutputView;