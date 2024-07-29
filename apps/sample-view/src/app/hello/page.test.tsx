import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Hello from "./page";
import { useEnv } from "@/env/provider";

jest.mock("@/env/provider", () => ({
  useEnv: jest.fn(),
}));

describe("Hello Component", () => {
  const mockedEnv = {
    API_BASE_URL: "https://api.example.com",
  };

  beforeEach(() => {
    (useEnv as jest.Mock).mockReturnValue(mockedEnv);
  });

  /**
   * Helloコンポーネントが環境変数を正しく表示することをテストします
   */
  test("renders Hello component", () => {
    // Act
    render(<Hello />);

    // Assert
    // コンポーネントの要素がドキュメントに存在することを確認
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Environment Variables:")).toBeInTheDocument();

    // Assert
    // 複数行のJSONテキストに対するカスタムマッチャー
    expect(
      screen.getByText((content, element) => {
        // テキストが一致するかを確認する関数
        const hasText = (text: string) => element?.textContent === text;
        return hasText(JSON.stringify(mockedEnv, null, 2));
      })
    ).toBeInTheDocument();
  });

  /**
   * ボタンクリック時にHelloコンポーネントがメッセージを取得して表示することをテストします
   */
  test("fetches and displays message on button click", async () => {
    // Arrange
    // 期待値を設定
    const message = "Hello, world!";
    // fetch関数をMock
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(message),
      })
    ) as jest.Mock;

    // Act
    render(<Hello />);
    userEvent.click(screen.getByText("API Call"));

    // Assert
    // 取得したメッセージが表示されることを確認
    const displayedMessage = await screen.findByText(message);
    expect(displayedMessage).toBeInTheDocument();
  });

  /**
   * APIコールが失敗した時にHelloコンポーネントがエラーメッセージを表示しないことをテストします
   */
  test("handles API call failure", async () => {
    // Arrange
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock;

    // Act
    render(<Hello />);
    userEvent.click(screen.getByText("API Call"));

    // Assert
    expect(screen.queryByText("Failed to fetch data")).not.toBeInTheDocument();
  });
});
