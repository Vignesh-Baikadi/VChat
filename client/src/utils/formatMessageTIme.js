function formatMessageTime(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();

  const isToday =
    date.toDateString() ===
    now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  if (
    date.toDateString() ===
    yesterday.toDateString()
  ) {
    return "Yesterday";
  }

  const diffDays = Math.floor(
    (now - date) /
      (1000 * 60 * 60 * 24)
  );

  if (diffDays < 7) {
    return date.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
      }
    );
  }

  return date.toLocaleDateString();
}

export default formatMessageTime;