import { useQuery } from 'react-query';
import { getCoachAppointments, getCoachNextAppointment } from '../axios/axios-appointments';

export const useFetchNextCoachAppointment = (coachIdentifier, options = {}) => {
  return useQuery(['getCoachNextAppointment', coachIdentifier],
    () => getCoachNextAppointment(coachIdentifier),
    options);
};

export const useFetchAppointmentsCoach = (coachIdentifier, options = {}) => {
  return useQuery(['getCoachAppointments', coachIdentifier],
    () => getCoachAppointments(coachIdentifier),
    options);
};

export const useFetchAppointmentsCoachWithFilter = (coachIdentifier, from, to, options = {}) => {
  return useQuery(['getCoachAppointments', coachIdentifier, from, to],
    () => getCoachAppointments(coachIdentifier, from, to),
    options);
};
