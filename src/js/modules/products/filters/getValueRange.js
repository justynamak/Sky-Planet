import $ from "jquery";
import "ion-rangeslider/js/ion.rangeSlider";

const getValueRange = obj => {
  const val1 = document.getElementById("from");
  const val2 = document.getElementById("to");

  $(".js-range-slider").ionRangeSlider({
    type: "double",
    min: 0,
    max: 1500,
    from: 200,
    to: 500,
    skin: "round",
    onStart: function(data) {
      val1.setAttribute("value", data.from);
      val2.setAttribute("value", data.to);

      val1.addEventListener("input", function() {
        let start = this.value;
        val1.setAttribute("value", start);
      });
    },

    onChange: function(data) {
      val1.setAttribute("value", data.from);
      val2.setAttribute("value", data.to);

      val1.addEventListener("input", function() {
        let start = this.value;
        val1.setAttribute("value", start);
      });
      obj.setValue();
    }
  });
};
export { getValueRange };
