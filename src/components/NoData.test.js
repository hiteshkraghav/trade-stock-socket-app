import React from "react";
import NoData from './NoData';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('renders NoData component', () => {
    const props={ count: 0};
    const headerInstance = shallow(<NoData {...props} />);

it('Should return div with message',()=>{
    const element = headerInstance.find('div');
    expect(element.text()).toBe('There are currently no stock in your portfolio.');
})

});
