import moment from "moment";

export default {
  install(Vue) {
    Vue.filter("date", (date) => {
      return moment(date).format("DD.MM.YYYY HH:mm:ss");
    });
  },
};
