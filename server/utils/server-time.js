class ServerTime {
  constructor() {
    this.startTime = new Date();
  }

  get uptime() {
    return ((Date.now() - this.startTime) / 1000).toFixed(2);
  }

  get started() {
    return this.startTime;
  }

  get currentTime() {
    return new Date();
  }
}

module.exports = new ServerTime();