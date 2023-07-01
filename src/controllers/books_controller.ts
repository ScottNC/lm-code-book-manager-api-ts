import { Request, Response } from "express";
import * as bookService from "../services/books";

export const getBooks = async (req: Request, res: Response) => {
	const books = await bookService.getBooks();
	res.json(books).status(200);
};

export const getBook = async (req: Request, res: Response) => {
	const bookId = req.params.bookId;
	const book = await bookService.getBook(Number(bookId));

	if (book) {
		res.json(book).status(200);
	} else {
		res.status(404).json({message: `Book ${bookId} does not exist`});
	}
};

export const saveBook = async (req: Request, res: Response) => {
	const bookToBeSaved = req.body;
	try {
		const book = await bookService.saveBook(bookToBeSaved);
		res.status(201).json(book);
	} catch (error) {
		res.status(400).json({ message: (error as Error).message === "Validation error" ? 'IDs cannot be duplicated' : (error as Error).message });
	}
};

// User Story 4 - Update Book By Id Solution
export const updateBook = async (req: Request, res: Response) => {
	const bookUpdateData = req.body;
	const bookId = Number.parseInt(req.params.bookId);

	const book = await bookService.updateBook(bookId, bookUpdateData);
	res.status(204).json(book);
};

export const deleteBook = async (req: Request, res: Response) => {
	const bookId = req.params.bookId;

	const booksDeleted: number = await bookService.deleteBook(Number(bookId));

	if (booksDeleted)
		res.status(200).json({success: true, message: `Book ${bookId} deleted successfully`});
	else
		res.status(404).json({success: false, message: `Book ${bookId} does not exist`});
};
