let mockHistoryPush = jest.fn();
let mockHistoryCreateBrowserHistory = jest.requireActual(
  "history/createBrowserHistory"
);

module.exports = {
  ...mockHistoryCreateBrowserHistory,
  push: mockHistoryPush,
  mockHistoryPush
};
