import { toast } from "react-toastify";

const notificationMiddleware = () => (next) => (action) => {
  if (action.successMessage && /(.*)_(SUCCESS)/.test(action.type)) {
    toast.success(action.successMessage);
  }

  next(action);
};

export default notificationMiddleware;
