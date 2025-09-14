import { Bounce } from "react-toastify";

export const toastOptions = {
  position: "bottom-right" as const,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
};
