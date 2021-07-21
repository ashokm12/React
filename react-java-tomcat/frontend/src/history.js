import { createBrowserHistory  } from 'react-router';

const historyConfig = {
    basename: '/nics'
};
const createHistory = createBrowserHistory(historyConfig);

export default createHistory;