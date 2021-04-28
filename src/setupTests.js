import '@testing-library/jest-dom';

import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

require('jest-sinon');

configure({ adapter: new Adapter() });
