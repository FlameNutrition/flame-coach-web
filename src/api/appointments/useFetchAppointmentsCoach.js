import { useQuery } from 'react-query';
import { getCoachAppointments } from '../axios/axios-appointments';
import moment from 'moment-timezone';
import { timezone } from '../../utils/timezoneUtil';

// eslint-disable-next-line import/prefer-default-export
export const useFetchAppointmentsCoach = (coachIdentifier) => {
  const {
    isLoading,
    isError,
    isFetching,
    data
  } = useQuery(['getCoachAppointments', coachIdentifier],
    () => getCoachAppointments({ coachIdentifier }), {
      select: (data) => {
        if (data === undefined || !data.appointments) {
          return [];
        }

        return data.appointments.map((item) => {

            const startDate = moment.tz(item.dttmStarts, timezone);
            const endDate = moment.tz(item.dttmEnds, timezone);

            return {
              id: item.identifier,
              title: `${item.client.firstName} ${item.client.lastName}`,
              start: new Date(startDate.format('YYYY-MM-DDTHH:mm:ss')),
              end: new Date(endDate.format('YYYY-MM-DDTHH:mm:ss')),
              allDay: false, //TODO: Check if this is all day
              resource: {
                clientIdentifier: item.client.identifier,
                price: item.price,
                notes: item.notes
              }
            };
          }
        );
      }
    });

  return {
    isLoading,
    isError,
    isFetching,
    data
  };
};
