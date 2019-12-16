import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from "./components/Header/Header"
import { Provider } from "react-redux";
import store from "./store/store";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import {shallow,mount,render} from "enzyme";
import Category from "./components/Category/Category"

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
});


describe('<Header />', () => {
  it('renders Header components', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(".header"));
  });
 
  it('renders an category', () => {
    const wrapper = shallow(<Category />);
    expect(wrapper.find('.category'));
  });
});

