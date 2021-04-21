import React from "react";
import ReactDOM from 'react-dom';
import App from '../components/App';
import LineGraph from '../components/LineGraph';
import InfoBox from '../components/InfoBox';
import {render, queryByTestId} from "@testing-library/react";


it("renders LineGraph without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<LineGraph/>, div)
    ReactDOM.unmountComponentAtNode(div);
})

it("renders Infoboxes without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<InfoBox/>, div)
    ReactDOM.unmountComponentAtNode(div);
})

it("renders page header corrrectly", () => {
    const {queryByTestId} = render(<App/>)
    expect(queryByTestId("dashboard-header")).toBeTruthy()
})

it("renders table header corrrectly", () => {
    const {queryByTestId} = render(<App/>)
    expect(queryByTestId("table-header")).toBeTruthy()
})


it("renders dropdown button corrrectly", () => {
    const {queryByTestId} = render(<App/>)
    expect(queryByTestId("dropdown-button")).toBeTruthy()
})