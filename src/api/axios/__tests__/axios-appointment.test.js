import mockAxios from "axios";
import {
  addAppointment,
  deleteAppointment,
  editAppointment,
  getCoachAppointments,
  getCoachNextAppointment,
  getClientNextAppointment
} from "../axios-appointments";
import moment from "moment-timezone";
import { defaultTimezone } from "../../../utils/timezoneUtil";

describe("axios-appointments tests", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("get client next appointment successfully from API", async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: "data" } });

    const result = await getClientNextAppointment("a65ad74f-4f9f-4b00-98ee-756e454da73f");

    expect(mockAxios)
      .toBeCalledWith({
        method: "get",
        url: `/appointment/client/getNext?clientIdentifier=a65ad74f-4f9f-4b00-98ee-756e454da73f`,
        headers: {
          "Content-Type": "application/json"
        }
      });
    expect(result)
      .toEqual({ response: "data" });
  });

  it("get coach next appointment successfully from API", async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: "data" } });

    const result = await getCoachNextAppointment("a65ad74f-4f9f-4b00-98ee-756e454da73f");

    expect(mockAxios)
      .toBeCalledWith({
        method: "get",
        url: `/appointment/coach/getNext?coachIdentifier=a65ad74f-4f9f-4b00-98ee-756e454da73f`,
        headers: {
          "Content-Type": "application/json"
        }
      });
    expect(result)
      .toEqual({ response: "data" });
  });

  it("get coach appointments successfully from API", async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: "data" } });

    const result = await getCoachAppointments("a65ad74f-4f9f-4b00-98ee-756e454da73f");

    expect(mockAxios)
      .toBeCalledWith({
        method: "get",
        url: `/appointment/coach/get?coachIdentifier=a65ad74f-4f9f-4b00-98ee-756e454da73f`,
        headers: {
          "Content-Type": "application/json"
        }
      });
    expect(result)
      .toEqual({ response: "data" });
  });

  it("get coach appointments with filter successfully from API", async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: "data" } });

    const result = await getCoachAppointments("a65ad74f-4f9f-4b00-98ee-756e454da73f", "2021-10-05", "2021-11-10");

    expect(mockAxios)
      .toBeCalledWith({
        method: "get",
        url: `/appointment/coach/get?coachIdentifier=a65ad74f-4f9f-4b00-98ee-756e454da73f&from=2021-10-05&to=2021-11-10`,
        headers: {
          "Content-Type": "application/json"
        }
      });
    expect(result)
      .toEqual({ response: "data" });
  });

  it("addAppointment successfully from API", async () => {
    mockAxios.mockResolvedValueOnce({ data: { result: "true" } });

    expect(mockAxios.create.mock)
      .toBeTruthy();

    const result = await addAppointment({
      appointment: {
        dttmStarts: moment.tz("2021-07-20T10:52:52", defaultTimezone),
        dttmEnds: moment.tz("2021-07-20T11:52:52", defaultTimezone),
        resource: {
          price: 160.75,
          notes: "Review results"
        }
      },
      clientIdentifier: "7e0e4e3c-1922-4c04-9d77-a04ba742a73e",
      coachIdentifier: "123eb289-9103-4395-89fe-8b2cc2251cf7"
    });

    expect(mockAxios)
      .toBeCalledWith({
        method: "post",
        url: "/appointment/create?coachIdentifier=123eb289-9103-4395-89fe-8b2cc2251cf7&clientIdentifier=7e0e4e3c-1922-4c04-9d77-a04ba742a73e",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({
          dttmStarts: "2021-07-20T10:52:52+01:00",
          dttmEnds: "2021-07-20T11:52:52+01:00",
          price: 160.75,
          notes: "Review results"
        })
      });
    expect(result)
      .toEqual({ result: "true" });
  });

  it("editAppointment successfully from API", async () => {
    mockAxios.mockResolvedValueOnce({ data: { result: "true" } });

    expect(mockAxios.create.mock)
      .toBeTruthy();

    const result = await editAppointment({
      appointmentIdentifier: "7e0e4e3c-1922-4c04-9d77-a04ba742a73e",
      appointment: {
        dttmStarts: moment.tz("2021-07-20T10:52:52", defaultTimezone),
        dttmEnds: moment.tz("2021-07-20T11:52:52", defaultTimezone),
        resource: {
          price: "200.75",
          notes: "Review results 2"
        }
      }
    });

    expect(mockAxios)
      .toBeCalledWith({
        method: "post",
        url: "/appointment/update?appointmentIdentifier=7e0e4e3c-1922-4c04-9d77-a04ba742a73e",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({
          dttmStarts: "2021-07-20T10:52:52+01:00",
          dttmEnds: "2021-07-20T11:52:52+01:00",
          price: 200.75,
          notes: "Review results 2"
        })
      });
    expect(result)
      .toEqual({ result: "true" });
  });

  it("deleteAppointment successfully from API", async () => {
    mockAxios.mockResolvedValueOnce({ data: { result: "true" } });

    expect(mockAxios.create.mock)
      .toBeTruthy();

    const result = await deleteAppointment({
      appointmentIdentifier: "7e0e4e3c-1922-4c04-9d77-a04ba742a73e"
    });

    expect(mockAxios)
      .toBeCalledWith({
        method: "delete",
        url: "/appointment/delete?appointmentIdentifier=7e0e4e3c-1922-4c04-9d77-a04ba742a73e",
        headers: {
          "Content-Type": "application/json"
        }
      });
    expect(result)
      .toEqual({ result: "true" });
  });
});
