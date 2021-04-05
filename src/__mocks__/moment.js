const moment = jest.requireActual("moment");

let mockMoment = (timestamp = 0) => {
  return moment(timestamp);
};

mockMoment.duration = moment.duration;

export default mockMoment;
