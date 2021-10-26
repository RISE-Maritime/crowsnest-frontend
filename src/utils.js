export function formatTime(s) {
    const dtFormat = new Intl.DateTimeFormat('en-GB', {
      timeStyle: 'medium',
      timeZone: 'UTC'
    });
    return dtFormat.format(new Date(s * 1e3));
  }
  