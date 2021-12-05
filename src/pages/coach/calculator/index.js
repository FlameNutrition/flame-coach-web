import Page from '../../../components/Page';
import DashboardLayout from '../../../layouts/DashboardLayout';
import Auth from '../../../route/auth';

import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Calculator from '../../../components/Calculator';
import UICard from '../../../components/Core/UICard';
import UIText from '../../../components/Core/UIText';

const CalculatorPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) return null;

  return (
    <Auth router={router}>
      {session ?
        <DashboardLayout user={session.user}>
          <Page
            title={"Calories Calculator"}
            isError={false}
            isLoading={false}>
            <UICard title="Calories Calculator - Harris–Benedict">
              <UIText padding={'15px'}>
                The Harris–Benedict equation is a method used to estimate an individual{'\''} basal metabolic rate (BMR).
                The estimated BMR value may be multiplied by a number that corresponds to the individual{'\''} activity level;
                the resulting number is the approximate daily kilocalorie intake to maintain current body weight. The Harris–Benedict equation
                may be used to assist weight loss — by reducing kilocalorie intake number below the estimated maintenance intake of the equation.
              </UIText>
              <Calculator />
            </UICard>
          </Page>
        </DashboardLayout> : null
      }
    </Auth>
  );
};

export default CalculatorPage;
