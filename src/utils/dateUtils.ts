// Format date to a readable string
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

// Calculate time ago
export const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000; // seconds in a year

  if (interval > 1) {
    return `${Math.floor(interval)} year${
      Math.floor(interval) === 1 ? "" : "s"
    } ago`;
  }

  interval = seconds / 2592000; // seconds in a month
  if (interval > 1) {
    return `${Math.floor(interval)} month${
      Math.floor(interval) === 1 ? "" : "s"
    } ago`;
  }

  interval = seconds / 86400; // seconds in a day
  if (interval > 1) {
    return `${Math.floor(interval)} day${
      Math.floor(interval) === 1 ? "" : "s"
    } ago`;
  }

  interval = seconds / 3600; // seconds in an hour
  if (interval > 1) {
    return `${Math.floor(interval)} hour${
      Math.floor(interval) === 1 ? "" : "s"
    } ago`;
  }

  interval = seconds / 60; // seconds in a minute
  if (interval > 1) {
    return `${Math.floor(interval)} minute${
      Math.floor(interval) === 1 ? "" : "s"
    } ago`;
  }

  return `${Math.floor(seconds)} second${
    Math.floor(seconds) === 1 ? "" : "s"
  } ago`;
};
