export const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

export const isValidUrl = (value) => {
  try {
    if (!value) return false;
    new URL(value);
    return true;
  } catch {
    return false;
  }
};
