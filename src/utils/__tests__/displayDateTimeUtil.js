import {
  displayDate, displayDateWithDash,
  displayDateWithSlash,
  displayFullTime,
  displayTime
} from "../displayDateTimeUtil";
import moment from "moment-timezone";

describe("displayDateTimeUtil tests", () => {

  it("test display full date time", () => {

    //Full date with timezone
    expect(displayFullTime(moment.tz("2013-11-18 11:55", "America/Toronto")))
      .toEqual("Monday, November 18th 2013, 11:55:00 am");
    //Full date without timezone
    expect(displayFullTime(moment("2013-11-18 11:55")))
      .toEqual("Monday, November 18th 2013, 11:55:00 am");

  });

  it("test display date", () => {

    //Date with timezone
    expect(displayDate(moment.tz("2013-11-18 11:55", "America/Toronto")))
      .toEqual("Monday, November 18th 2013");
    //Date without timezone
    expect(displayDate(moment("2013-11-18 11:55")))
      .toEqual("Monday, November 18th 2013");

  });

  it("test display date with slash", () => {

    //Date with timezone
    expect(displayDateWithSlash(moment.tz("2013-11-18 11:55", "America/Toronto")))
      .toEqual("2013/11/18");
    //Date without timezone
    expect(displayDateWithSlash(moment("2013-11-18 11:55")))
      .toEqual("2013/11/18");

  });

  it("test display date with dash", () => {

    //Date with timezone
    expect(displayDateWithDash(moment.tz("2013-11-18 11:55", "America/Toronto")))
      .toEqual("2013-11-18");
    //Date without timezone
    expect(displayDateWithDash(moment("2013-11-18 11:55")))
      .toEqual("2013-11-18");

  });

  it("test display time", () => {

    //Time with timezone
    expect(displayTime(moment.tz("2013-11-18 11:55", "America/Toronto")))
      .toEqual("11:55:00 am");
    //Date without timezone
    expect(displayTime(moment("2013-11-18 11:55")))
      .toEqual("11:55:00 am");

  });

  it("test display full date time when date is null or undefined", () => {

    expect(displayFullTime(null))
      .toEqual("N/A");
    expect(displayFullTime(undefined))
      .toEqual("N/A");

  });
});
