// Example data for Home (Figma 994:6213), copied verbatim from the frame.
export const homeDashboard = {
  week: [
    ['Mo', '19'],
    ['Tu', '20'],
    ['We', '22'],
    ['Th', '23'],
    ['Fi', '24'],
    ['Sa', '25'],
    ['Su', '26'],
  ] as const,
  today: '23',
  cycleDay: 'Day 4',
  cyclePhase: 'Menstruation',
  completed: '0/5',
  stats: [
    ['Up to date', '2'],
    ['Overdue', '1'],
    ['Records', '0'],
  ] as const,
  screenings: [
    { icon: 'done', title: 'Smear test / HPV', subtitle: 'Completed Mar 2024' },
    { icon: 'done', title: 'Blood pressure', subtitle: 'Completed Jan 2025' },
    {
      icon: 'overdue',
      title: 'Blood panel',
      subtitle: 'Overdue — was due Nov 2024',
    },
    { icon: 'soon', title: 'Thyroid check', subtitle: 'Due in 3 weeks' },
    { icon: 'scheduled', title: 'Thyroid check', subtitle: 'Due in 3 weeks' },
  ] as const,
};
