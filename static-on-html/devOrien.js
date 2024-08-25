// Assuming _onDeviceOrientation is a method of an object called myObject
var myObject = {
  heading: null,
  _onDeviceOrientation: function(A) {
      console.log("Orientation event:", A);

      if (typeof A.webkitCompassHeading !== 'undefined') {
          console.log("webkitCompassHeading available:", A.webkitCompassHeading);
          if (A.webkitCompassAccuracy < 50) {
              this.heading = A.webkitCompassHeading;
          } else {
              console.warn("webkitCompassAccuracy is too high:", A.webkitCompassAccuracy);
          }
      } else if (A.alpha !== null && A.alpha !== undefined) {
          console.log("Alpha value:", A.alpha);
          console.log("Beta value:", A.beta);
          console.log("Gamma value:", A.gamma);
          if (A.absolute === true || A.absolute === undefined) {
              this.heading = this._computeCompassHeading(A.alpha, A.beta, A.gamma);
          } else {
              console.warn("event.absolute is false");
          }
      } else {
          console.warn("event.alpha is null or undefined");
      }
  },
  _computeCompassHeading: function(alpha, beta, gamma) {
      // Compute compass heading here
      return alpha; // Just a placeholder
  }
};

// Add event listener for device orientation
window.addEventListener('deviceorientation', function(event) {
  myObject._onDeviceOrientation(event);
});
