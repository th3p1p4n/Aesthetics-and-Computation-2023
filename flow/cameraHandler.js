class CameraHandler {
  constructor(w, h) {
    const constraints = {
      video: {
        mandatory: {
          minWidth: w,
          minHeight: h,
        }
      },
      audio: false,
    };
    this.capture = createCapture(constraints);
    this.capture.elt.setAttribute("playsinline", "");
    this.capture.size(w, h);
    this.capture.hide();
  }

  isReady() {
    return this.capture.loadedmetadata;
  }

  getPixels() {
    return this.capture.pixels;
  }

  loadPixels() {
    this.capture.loadPixels();
  }
}