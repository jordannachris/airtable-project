/**
 * Assigns timeline items to lanes in a compact, space-efficient way.
 * Items that don't overlap can share the same lane.
 *
 * @param {Array} items - Array of timeline items with startDate and endDate
 * @returns {Array} Items with assigned lane numbers
 */
export function assignLanes(items) {
  // Sort items by start date
  const sortedItems = [...items].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  const lanes = [];
  const result = [];

  for (const item of sortedItems) {
    const itemStart = new Date(item.startDate);
    const itemEnd = new Date(item.endDate);

    // Find the first available lane
    let assignedLane = -1;

    for (let i = 0; i < lanes.length; i++) {
      const laneEnd = lanes[i];

      // Check if this item can fit in this lane (with a small buffer for readability)
      if (itemStart >= laneEnd) {
        assignedLane = i;
        lanes[i] = new Date(itemEnd.getTime() + 24 * 60 * 60 * 1000); // Add 1 day buffer
        break;
      }
    }

    // If no lane is available, create a new one
    if (assignedLane === -1) {
      assignedLane = lanes.length;
      lanes.push(new Date(itemEnd.getTime() + 24 * 60 * 60 * 1000)); // Add 1 day buffer
    }

    result.push({
      ...item,
      lane: assignedLane,
    });
  }

  return result;
}
