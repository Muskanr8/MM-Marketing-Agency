export const CATEGORIES = [
  { id: 'sofa', name: 'Sofa' },
  { id: 'bed', name: 'Bed' },
  { id: 'dining', name: 'Dining' },
  { id: 'chair', name: 'Chair' },
  { id: 'table', name: 'Table' },
  { id: 'shelves', name: 'Shelves' },
];

export const PRICE_RANGES = [
  { label: 'Under ₹5,000', min: 0, max: 5000 },
  { label: '₹5,000 - ₹15,000', min: 5000, max: 15000 },
  { label: '₹15,000 - ₹30,000', min: 15000, max: 30000 },
  { label: '₹30,000 - ₹50,000', min: 30000, max: 50000 },
  { label: 'Above ₹50,000', min: 50000, max: 999999 },
];

export const ORDER_STATUS = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  shipped: { label: 'Shipped', color: 'bg-blue-100 text-blue-800' },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800' },
};

export const PAYMENT_STATUS = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800' },
  failed: { label: 'Failed', color: 'bg-red-100 text-red-800' },
};

export const ITEMS_PER_PAGE = 12;
