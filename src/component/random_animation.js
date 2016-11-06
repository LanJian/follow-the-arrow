AFRAME.registerComponent('random_animation', {
  schema: { type: "int" },

  init: function() {
    setInterval((function() {
      console.log('ssssssssssssssfffffffffffffffffffffffsssssss');

      var duration = Math.floor((Math.random() * 10) + 5);
      var x_angle =
        Math.floor((Math.random() * 240) - 120) + this.el.object3D.rotation.x;
      var y_angle =
        Math.floor((Math.random() * 240) - 120) + this.el.object3D.rotation.y;

      var anim = document.createElement("a-animation");
      anim.setAttribute("attribute", "rotation");
      anim.setAttribute("dur", duration * 1000);
      anim.setAttribute("fill", "forwards");
      anim.setAttribute("to", `${x_angle} ${y_angle} 0`);
      this.el.appendChild(anim);
    }).bind(this), 10000);
  },
});
