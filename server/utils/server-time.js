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

}

module.exports = new ServerTime();
