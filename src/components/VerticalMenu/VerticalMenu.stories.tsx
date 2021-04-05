import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Provider } from "react-redux";
import configureStore from "../../store/configureStore";
import VerticalMenu from "./VerticalMenu";

const store = configureStore();

export default {
  title: "InTheOffice/VerticalMenu",
  component: VerticalMenu,
} as Meta;

const Template: Story = (args) => {
  return (
    <Provider store={store}>
      <VerticalMenu {...args} />
    </Provider>
  );
};

export const Default = Template.bind({});
Default.args = {};
