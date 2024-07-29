import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";
import Hello from "./page";
import { userEvent, within, expect, waitFor } from "@storybook/test";

const meta = {
  title: "Pages/Hello",
  component: Hello,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
  decorators: [],
} satisfies Meta<typeof Hello>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "環境変数が画面に表示されている",
  args: {},
  parameters: {
    msw: {
      handlers: [
        http.get("http://localhost:8080/hello", () => {
          return new HttpResponse("This is default!");
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    // Arrange
    const expected = '{ "API_BASE_URL": "http://localhost:8080" }';

    // Act
    const canvas = within(canvasElement);

    // Assert
    await expect(
      canvas.getByText(expected)
    ).toBeInTheDocument();
  },
};

export const Click: Story = {
  ...Default,
  name: "ボタンをクリックしてメッセージが表示される",
  parameters: {
    msw: {
      handlers: [
        http.get("http://localhost:8080/hello", () => {
          return new HttpResponse("This is mocked!");
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    // Arrange
    const expected = "This is mocked!";

    // Act
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);

    // Assert
    await waitFor(() => expect(
      canvas.getByText(expected)
    ).toBeInTheDocument());
  },
};
