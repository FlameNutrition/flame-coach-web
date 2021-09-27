import { convertDateToTimezoneInstance } from "../convertDateTimeUtil";

describe("convertDateTimeUtil tests", () => {

  it("test convert date to a moment timezone instance", () => {

    expect(convertDateToTimezoneInstance("2021-10-01T09:00:00+01:00")
      .format())
      .toEqual("2021-10-01T09:00:00+01:00");

  });

});
