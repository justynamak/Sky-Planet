class WindowSize {
  constructor() {
    this.mobile = false;
    window.addEventListener("resize", this.checkIfMobile.bind(this));
  }
  checkIfMobile() {
    if (
      getComputedStyle(
        document.querySelector(".main-nav__hamburger")
      ).getPropertyValue("display") === "none"
    ) {
      this.mobile = false;
    } else {
      this.mobile = true;
    }
    return this.mobile;
  }
}
export { WindowSize };
