import React from "react";
import Header from './Header';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('renders Header component', () => {
    const props={ online: true };
    const headerInstance = shallow(<Header {...props} />);

it('Should return online text message',()=>{
    const element = headerInstance.find('Detector');
    expect(element).toBeTruthy();
  
})



});
