import axios from './axios-flame-coach';

export const getCoachAppointments = async ({ coachIdentifier }) => {
  const config = {
    method: 'get',
    url: `/appointment/coach/get?coachIdentifier=${coachIdentifier}`,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const response = await axios(config);

  return response.data;
};

export const addAppointment = async ({
  appointment,
  clientIdentifier,
  coachIdentifier
}) => {
  const data = JSON.stringify({
    dttmStarts: appointment.dttmStarts.format(),
    dttmEnds: appointment.dttmEnds.format(),
    price: Number.parseFloat(appointment.resource?.price),
    notes: appointment.resource?.notes
  });
  const config = {
    method: 'post',
    url: `/appointment/create?coachIdentifier=${coachIdentifier}&clientIdentifier=${clientIdentifier}`,
    headers: {
      'Content-Type': 'application/json'
    },
    data
  };

  const response = await axios(config);

  return response.data;
};

export const editAppointment = async ({
  appointmentIdentifier,
  appointment
}) => {
  const data = JSON.stringify({
    dttmStarts: appointment.dttmStarts.format(),
    dttmEnds: appointment.dttmEnds.format(),
    price: Number.parseFloat(appointment.resource?.price),
    notes: appointment.resource?.notes
  });

  const config = {
    method: 'post',
    url: `/appointment/update?appointmentIdentifier=${appointmentIdentifier}`,
    headers: {
      'Content-Type': 'application/json'
    },
    data
  };

  const response = await axios(config);

  return response.data;
};

export const deleteAppointment = async ({
  appointmentIdentifier
}) => {
  const config = {
    method: 'delete',
    url: `/appointment/delete?appointmentIdentifier=${appointmentIdentifier}`,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const response = await axios(config);

  return response.data;
};
