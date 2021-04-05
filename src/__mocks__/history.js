let mockHistoryPush = jest.fn();
let mockHistory = jest.requireActual("history");
mockHistory.push = mockHistoryPush;

export { mockHistoryPush, mockHistory as default };
