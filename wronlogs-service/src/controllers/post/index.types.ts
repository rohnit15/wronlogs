import { Request } from "express";

export interface CreatePostRequest extends Request {
  body: {
    title: string;
    content: string;
    author: string;
  };
}
