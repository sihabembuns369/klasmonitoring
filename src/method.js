import Vue from "vue";
// import axios from 'axios'
// import numeral from "numeral";
import numeral from "numeral";
import moment from "moment";
// import { _ } from "vue-underscore";

const globalMethods = Vue.mixin({
  methods: {
    reverse(array) {
      return array.slice().reverse();
    },
    getImgUrl(pic) {
      return require("./assets/image/icons/" + pic);
    },
    formatDateDefault(date) {
      if (date == null) {
        return null;
      }
      return moment(date).format("YYYY-MM-DD");
    },
    formatDateYear(date) {
      if (date == null) {
        return null;
      }
      return moment(date).format("YYYY");
    },
    formatDateExcel: function(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    removeSpace: function(text) {
      return text.replace(/ /g, "_");
    },
    handleErrorApi(errorMessage, returnType = "array") {
      if (errorMessage) {
        let sequence = 1;
        let message = [];
        let messageString = [];

        for (const [key, value] of Object.entries(errorMessage)) {
          let alertTemp = {
            index: sequence,
            key: key,
            value: value[0],
          };

          message.push(alertTemp);
          messageString.push(value[0]);
        }

        if (returnType == "string") {
          return messageString.join();
        }

        return message;
      }

      return "Opps! Ada kesalahan";
    },
  },
  filters: {
    formatDateTime: function(date) {
      if (date) {
        return moment(date).format("D MMMM YYYY HH:mm");
      } else {
        return null;
      }
    },
    formatDateMonth: function(dateMonth) {
      let yearNow = new Date().getFullYear();
      let date = new Date(yearNow, dateMonth - 1);
      if (dateMonth) {
        return date.toLocaleString("id", { month: "short" });
      } else {
        return null;
      }
    },
    formatDateTimeNonClock: function(date) {
      if (date) {
        return moment(date).format("D MMMM YYYY");
      } else {
        return null;
      }
    },
    formatTime: function(date) {
      if (date) {
        return moment(date).format("HH:mm");
      } else {
        return null;
      }
    },
    formatNumber(value) {
      let formatted = numeral(value).format("0,0");
      return formatted;
    },
    formatNumberDecimal: function(value) {
      let formatted = numeral(value).format("0,0");
      return formatted;
    },
    romanizeNumber(num) {
      if (isNaN(num)) return NaN;
      var digits = String(+num).split(""),
        key = [
          "",
          "C",
          "CC",
          "CCC",
          "CD",
          "D",
          "DC",
          "DCC",
          "DCCC",
          "CM",
          "",
          "X",
          "XX",
          "XXX",
          "XL",
          "L",
          "LX",
          "LXX",
          "LXXX",
          "XC",
          "",
          "I",
          "II",
          "III",
          "IV",
          "V",
          "VI",
          "VII",
          "VIII",
          "IX",
        ],
        roman = "",
        i = 3;
      while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
      return Array(+digits.join("") + 1).join("M") + roman;
    },
  },
});

export default globalMethods;
