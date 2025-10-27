import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("자동차 경주", () => {
  test("기능 테스트", async () => {
    // given
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ["pobi,woni", "1"];
    const logs = ["pobi : -", "woni : ", "최종 우승자 : pobi"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, STOP]);

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("예외 테스트", async () => {
    // given
    const inputs = ["pobi,javaji"];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("여러 라운드 진행 후 단독 우승자가 결정된다", async () => {
    const inputs = ["pobi,woni,jun", "5"];
    const logs = ["최종 우승자 : pobi"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([
      5, 3, 2, 4, 3, 1, 6, 2, 3, 7, 4, 2, 8, 3, 1,
    ]);

    const app = new App();
    await app.run();

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("공동 우승자가 여러 명일 때 쉼표로 구분하여 출력된다", async () => {
    const inputs = ["pobi,woni,jun", "3"];
    const logs = ["최종 우승자 : pobi, woni"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([4, 5, 2, 6, 7, 1, 8, 9, 0]);

    const app = new App();
    await app.run();

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("모든 자동차가 같은 거리일 때 모두 우승자로 출력된다", async () => {
    const inputs = ["pobi,woni,jun", "2"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([3, 2, 1, 0, 1, 2]);

    const app = new App();
    await app.run();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("최종 우승자 : pobi, woni, jun")
    );
  });

  test("각 라운드마다 실행 결과가 출력된다", async () => {
    const inputs = ["pobi,woni", "3"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([4, 3, 5, 4, 6, 2]);

    const app = new App();
    await app.run();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("실행 결과"));
  });

  test("자동차 이름에 공백만 입력하면 에러가 발생한다", async () => {
    const inputs = ["pobi,   ,jun"];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("자동차 이름이 5자를 초과하면 에러가 발생한다", async () => {
    const inputs = ["pobi,woowahan"];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("중복된 자동차 이름이 있으면 에러가 발생한다", async () => {
    const inputs = ["pobi,woni,pobi"];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("시도 횟수가 숫자가 아니면 에러가 발생한다", async () => {
    const inputs = ["pobi,woni", "abc"];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("시도 횟수가 음수이면 에러가 발생한다", async () => {
    const inputs = ["pobi,woni", "-1"];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("시도 횟수가 소수이면 에러가 발생한다", async () => {
    const inputs = ["pobi,woni", "3.5"];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("시도 횟수가 0이면 모든 자동차가 우승자가 된다", async () => {
    const inputs = ["pobi,woni,jun", "0"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);

    const app = new App();
    await app.run();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("최종 우승자 : pobi, woni, jun")
    );
  });

  test("한 대의 자동차만 있어도 정상 동작한다", async () => {
    const inputs = ["pobi", "3"];
    const logs = ["최종 우승자 : pobi"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([5, 6, 7]);

    const app = new App();
    await app.run();

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("전진 조건 경계값: 무작위 값이 4일 때 전진한다", async () => {
    const inputs = ["pobi", "1"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([4]);

    const app = new App();
    await app.run();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("pobi : -"));
  });

  test("전진 조건 경계값: 무작위 값이 3일 때 멈춘다", async () => {
    const inputs = ["pobi", "1"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([3]);

    const app = new App();
    await app.run();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("pobi : "));
    expect(logSpy).not.toHaveBeenCalledWith(
      expect.stringContaining("pobi : -")
    );
  });

  test("이름 앞뒤 공백은 제거되어 처리된다", async () => {
    const inputs = [" pobi , woni ", "1"];
    const logs = ["pobi : ", "woni : "];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([3, 2]);

    const app = new App();
    await app.run();

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("다양한 횟수만큼 이동하면 거리가 올바르게 누적된다", async () => {
    const inputs = ["pobi", "10"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([4, 5, 6, 7, 8, 9, 4, 5, 6, 7]);

    const app = new App();
    await app.run();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("pobi : ----------")
    );
  });
});
