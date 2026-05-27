export interface Booking {
  id: string;
  title: string;
  providerName?: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  date: string;
  time: string;
  price: string;
  imageUrl: string;
}

export interface Pro {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviewsCount: number;
  avatarUrl: string;
}

export interface Category {
  icon: string;
  name: string;
}
