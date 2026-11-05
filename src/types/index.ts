export type Book = {
  _id: string; title: string; author: string; category: string; description: string; image: string;
  totalCopies: number; availableCopies: number; rating: number;
  ownerId: string; ownerEmail: string; ownerName: string; createdAt: string; updatedAt: string;
};

export type Borrow = {
  _id: string; bookId: string; userEmail: string; userName: string;
  bookTitle: string; bookAuthor: string; bookImage: string;
  borrowedAt: string; dueDate?: string; status: "active" | "returned"; returnedAt?: string;
  totalCopies?: number;
  copiesBefore?: number;
  copiesAfter?: number;
};

export type BookPayload = {
  title: string; author: string; category: string; description: string; image: string; totalCopies: number;
};