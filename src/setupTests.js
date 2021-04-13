import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';

require('jest-sinon');

configure({ adapter: new Adapter() });
