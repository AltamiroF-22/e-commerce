"use client";

const SetBodyHiddenInPopUps = (IsOpen: boolean) => {
  if (IsOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
};

export default SetBodyHiddenInPopUps;
