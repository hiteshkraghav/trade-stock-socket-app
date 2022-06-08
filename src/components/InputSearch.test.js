import React from "react";
import InputSearch from './InputSearch';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('renders InputSearch component', () => {
    const props={ inputVal:'ABC', setInputVal:jest.fn(), validate:jest.fn()  };
    const inputInstance = shallow(<InputSearch {...props} />);

it('Should return error message',()=>{
    const element = inputInstance.find('input');
    expect(element).toHaveLength(1)
    expect(element.prop('type')).toEqual('text')
    expect(element.prop('value')).toEqual('ABC')
  
})

it('Should test button to add isin',()=>{
    const btnElem = inputInstance.find('button');
  btnElem.simulate('click');
  expect(props.validate).toHaveBeenCalled();
})


});
