import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  slug: string;
  locale: 'en' | 'id' | 'ko' | 'zh' | 'ja';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    excerpt: {
      type: String,
      required: [true, 'Please provide an excerpt'],
      maxlength: [500, 'Excerpt cannot be more than 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    author: {
      type: String,
      required: [true, 'Please provide an author name'],
    },
    publishedAt: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
    slug: {
      type: String,
      required: [true, 'Please provide a slug'],
      unique: true,
    },
    locale: {
      type: String,
      enum: ['en', 'id', 'ko', 'zh', 'ja'],
      required: [true, 'Please specify a locale'],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Add index for faster queries
BlogPostSchema.index({ slug: 1, locale: 1 });
BlogPostSchema.index({ locale: 1, publishedAt: -1 });

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
