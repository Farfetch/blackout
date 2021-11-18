// Setup enzyme.
const { configure: configureEnzyme } = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

configureEnzyme({ adapter: new EnzymeAdapter() });

global.console = { ...global.console, warn: props => jest.fn(props) };
