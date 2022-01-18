import { setupServer } from 'msw/node';

const mswServer = setupServer();

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

export default mswServer;
