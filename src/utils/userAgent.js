import parser from 'ua-parser-js';

/**
 * @deprecated
 * DO NOT USE THIS, only here for legacy purposes
 * use getUserAgent instead
 */
const userAgent = parser(navigator.userAgent);

const getUserAgent = () => parser(navigator.userAgent);

export { userAgent, getUserAgent };
