import Page from '../../../components/Page';
import Grid from '@material-ui/core/Grid';
import NextAppointment from '../../../components/Dashboard/NextAppointment';
import moment from 'moment-timezone';
import Income from '../../../components/Dashboard/Income';
import TotalClients from '../../../components/Dashboard/TotalClients';
import DashboardBox from '../../../components/Core/DashboardBox';
import IncomeChart from '../../../components/Charts/IncomeChart';
import { useIsMobile } from '../../../utils/mediaUtil';
import { useFetchCoachClientsMetrics } from '../../../api/metrics/useFetchCoachClientsMetrics';
import PropTypes from 'prop-types';
import { useFetchCoachIncomesByMonth } from '../../../api/incomes/useFetchCoachIncomes';
import { getTimezoneDateTime } from '../../../utils/timezoneUtil';
import { logError } from '../../../logging';
import { useFetchNextCoachAppointment } from '../../../api/appointments/useFetchAppointmentsCoach';

const Dashboard = ({
    coachIdentifier
  }) => {

    const isMobile = useIsMobile();

    const todayDate = getTimezoneDateTime(moment());

    const firstDayOfMonth = todayDate.startOf('month')
      .format('YYYY-MM-DD');
    const lastDayOfMonth = todayDate.endOf('month')
      .format('YYYY-MM-DD');

    const firstDayOfYear = todayDate.startOf('year')
      .format('YYYY-MM-DD');
    const lastDayOfYear = todayDate.endOf('year')
      .format('YYYY-MM-DD');

    const coachClientsMetrics = useFetchCoachClientsMetrics(coachIdentifier);

    const coachMonthIncome = useFetchCoachIncomesByMonth(coachIdentifier, firstDayOfMonth, lastDayOfMonth,
      {
        onError: async (err) => {
          logError('useFetchCoachIncomesByMonth',
            'useQuery getCoachIncomes',
            'Error:', err);
        },
        select: data => {
          if (data === undefined || data.incomes.length === 0 || data.incomes[firstDayOfMonth] === undefined) {
            return 0.0;
          }

          return data.incomes[firstDayOfMonth].reduce((partialSum, value) => partialSum + value, 0.0);
        }
      });

    const coachFullYearIncome = useFetchCoachIncomesByMonth(coachIdentifier, firstDayOfYear, lastDayOfYear,
      {
        onError: async (err) => {
          logError('useFetchCoachIncomesByMonth',
            'useQuery getCoachIncomes',
            'Error:', err);
        },
        select: data => {
          const dataChart = [];

          if (data === undefined || data.incomes.length === 0) {
            for (let index = 1; index <= 12; index++) {
              dataChart.push({
                month: index,
                value: 0.0
              });
            }
            return dataChart;
          }

          let nextMonth = todayDate.startOf('year');

          for (let i = nextMonth.month(); i < 12; i++) {
            const totalIncomes = data.incomes[nextMonth.format('YYYY-MM-DD')]?.reduce((partialSum, value) => partialSum + value, 0.0);

            dataChart.push({
              month: (nextMonth.month() + 1),
              value: totalIncomes !== undefined ? totalIncomes : 0.0
            });

            nextMonth = nextMonth.add(1, 'month');
          }

          return dataChart;
        }
      });

    const nextAppointment = useFetchNextCoachAppointment(coachIdentifier);

    return (
      <Page
        title="Dashboard"
        isError={false}
        isLoading={false}
      >
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <Income isLoading={coachMonthIncome.isFetching} currency="£"
                    total={coachMonthIncome.data}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalClients isLoading={coachClientsMetrics.isFetching}
                          total={coachClientsMetrics.data?.clientsStatus.numberOfTotalClients}/>
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <NextAppointment isLoading={nextAppointment.isFetching}
                             date={getTimezoneDateTime(nextAppointment.data?.appointments[0].dttmStarts)}
                             name={nextAppointment.data?.appointments[0]?.client?.firstName + ' ' + nextAppointment.data?.appointments[0]?.client?.lastName}/>
          </Grid>
          <Grid
            item
            lg={12}
            sm={12}
            xs={12}
          >
            <DashboardBox isLoading={coachFullYearIncome.isFetching}>
              <IncomeChart dataChart={coachFullYearIncome.data} isMobile={isMobile}/>
            </DashboardBox>
          </Grid>
        </Grid>
      </Page>
    );
  }
;

Dashboard.propTypes = {
  coachIdentifier: PropTypes.string.isRequired
};

export default Dashboard;

