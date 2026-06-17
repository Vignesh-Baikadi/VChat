function formatChatDate(dateString) {

  const date = new Date(dateString);
  const now = new Date();

  if (
    date.toDateString() ===
    now.toDateString()
  ) {
    return "TODAY";
  }

  const yesterday = new Date();
  yesterday.setDate(
    yesterday.getDate() - 1
  );

  if (
    date.toDateString() ===
    yesterday.toDateString()
  ) {
    return "YESTERDAY";
  }

  const diffDays = Math.floor(
    (now - date) /
    (1000 * 60 * 60 * 24)
  );

  if (diffDays < 7) {
    return date
      .toLocaleDateString(
        "en-US",
        {
          weekday: "long",
        }
      )
      .toUpperCase();
  }

  return date.toLocaleDateString();
}

export default formatChatDate;