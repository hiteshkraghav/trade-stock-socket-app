import React from "react";
import StockRow from "./StockRow";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("renders StockRow component", () => {
  const stock = {
      isin: "AB1234567891",
      price: 12.222,
      bid: 123.323,
      ask: 23.224,
      time: 42522525,
    },
    selectedStock = jest.fn(),
    count = 1;

  const props = { stock, selectedStock, count };

  const headerInstance = shallow(<StockRow {...props} />);

  it("Should return div with message", () => {
    const element = headerInstance.find("td");
    const countVal = element.at(0).text();
    expect(countVal).toEqual("2");
  });

  it("Should simulate button", () => {
    const btnElement = headerInstance.find("button");
    btnElement.simulate("click");
    expect(props.selectedStock).toHaveBeenCalled();
  });
});
