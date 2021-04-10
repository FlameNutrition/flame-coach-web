import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

require('jest-sinon');

configure({ adapter: new Adapter() });
