export const HTTP_STATUS = Object.freeze({
  IDLE: "IDLE",
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED ",
});

export const USER_ROLES = Object.freeze({
  CUSTOMER: "Customer",
  ADMIN: "Admin",
  GUEST: "Guest",
});

export const DATE_FORMAT = "MM/DD/YYYY";

export const SALE_STATUS = {
  pending: "Pending",
  processing: "Processing",
  completed: "Completed",
  delivering: "Delivering",
  delivered: "Delivered",
  cancelled: "Cancelled",
  returned: "Returned",
};

export const DISCOUNT_TYPES = {
  none: "None",
  percentage: "Percentage",
  fixed: "Fixed",
};

export const PRODUCT_STATUS = {
  active: "Active",
  inactive: "Inactive",
};
