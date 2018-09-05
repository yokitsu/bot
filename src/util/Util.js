const reRegExpExpChar = /[\\^$.*+?()[\]{}|]/g;
const regHasRegExpChar = new RegExp(reRegExpExpChar.source);

module.exports = class Util {
  static escapeRegExp(str) {
    return (str && regHasRegExpChar.test(str)) ? str.replace(reRegExpExpChar, '\\$&') : str;
  }

  static duration(msec) {
    const days = Math.floor(msec / 1000 / 60 / 60 / 24);
    msec -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(msec / 1000 / 60 / 60);
    msec -= hours * 1000 * 60 * 60;
    const mins = Math.floor(msec / 1000 / 60);
    msec -= mins * 1000 * 60;
    const sec = Math.floor(msec / 1000);

    let timestr = "";

    if (days > 0) timestr += `${days}d`;
    if (hours > 0) timestr += `${hours}h`;
    if (mins > 0) timestr += `${mins}m`;
    if (sec > 0) timestr += `${sec}s`;

    return timestr;
  }
}