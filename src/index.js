class Sensor {
    constructor(id) {
        this.id = id;
        this.powerStatus = 'off';
        this.reportingInterval = 10000;
    }

    turn(status) {
        if (this.powerStatus === 'off' && status === 'on') {
            this.powerStatus = 'on';
            this.status = 'idle';

            setTimeout(() => {
                this.status = 'sensingDistance';
            }, this.reportingInterval);
            setTimeout(() => {
                this.status = 'reportingData';
            }, this.reportingInterval + 500);
            setTimeout(() => {
                this.status = 'idle';
            }, this.reportingInterval + 1000);
        } else if (status === 'off') {
            this.powerStatus = 'off';
        } else {
            return error('status did not change');
        }
    }
}

class IotServer {
    constructor() {
        this.workingSensor = [];
    }
    
    start(sensor) {
        this.workingSensor.push(...sensor);
    }

    publish({ deviceId, actionId, payload }) {
        for (const sensor of this.workingSensor) {
            if (sensor.id === deviceId) {
                if (sensor.powerStatus === 'on') {
                    if (actionId === 'CHANGE_REPORTING_INTERVAL') {
                        return (sensor.reportingInterval = payload);
                    }
                }
            }
        }
    }
}

module.exports = {
    Sensor,
    IotServer,
};
