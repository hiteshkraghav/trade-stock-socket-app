import React from "react";
import PortfolioData from "./PortfolioData";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("renders PortfolioData component", () => {
  const stocks = {
      AB1234567891: {
        isin: "AB1234567891",
        price: 12.222,
        bid: 123.323,
        ask: 23.224,
        time: 42522525,
      },
      AB56w6567891: {
        isin: "AB56w6567891",
        price: 12.222,
        bid: 123.323,
        ask: 23.224,
        time: 42522525,
      },
    },
    selectedStock = jest.fn();

  const props = { stocks, selectedStock };

  const headerInstance = shallow(<PortfolioData {...props} />);

  it("Should return th with message", () => {
    const element = headerInstance.find("th");
    const countVal = element.at(0).text();
    expect(countVal).toEqual("No");
  });

  it("Should find stock row first button", () => {
    const btnElement = headerInstance.find("StockRow");
    expect(btnElement.at(1).prop("count")).toEqual(1);
})
});
