AFRAME.registerComponent('random_sky', {
  schema: { type: "int" },

  init: function() {
    const num = Math.floor((Math.random() * this.data) + 1);
    this.el.setAttribute("src", `#sky${num}`);
  },
});
