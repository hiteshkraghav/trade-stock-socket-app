import React from "react";
import Error from './Error';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('renders Error component', () => {
    const props={ message:'Explainable error message ',closeMsg:jest.fn(()=>'') };
    const errorInstance = shallow(<Error {...props} />);

it('Should return error message',()=>{
    const element = errorInstance.find('div');
    expect(element.text()).toBe('Explainable error message clear');
  
})

});
