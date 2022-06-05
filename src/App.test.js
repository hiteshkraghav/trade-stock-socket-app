import React from "react";
import App from "./App";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("renders App component", () => {
  

  const headerInstance = shallow(<App />);

  it("Should return th with message", () => {
    const element = headerInstance.find("InputSearch");
   
    expect(element).toBeTruthy();
  });

});
