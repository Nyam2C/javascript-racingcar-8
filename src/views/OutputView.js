import { MissionUtils } from "@woowacourse/mission-utils";

const OutputView = {
    printError(errorMessage) {
        MissionUtils.Console.print(errorMessage);
    },
};

export default OutputView;