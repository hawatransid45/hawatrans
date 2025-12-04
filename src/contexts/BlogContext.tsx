'use client';

import {createContext, useContext, useState, useEffect} from 'react';
import {BlogPost} from '@/data/blogPosts';

interface BlogContextType {
  posts: BlogPost[];
  loading: boolean;
  addPost: (post: Omit<BlogPost, 'id'>) => Promise<boolean>;
  updatePost: (slug: string, locale: string, post: Partial<BlogPost>) => Promise<boolean>;
  deletePost: (slug: string, locale: string) => Promise<boolean>;
  getPostBySlug: (slug: string, locale: string) => BlogPost | undefined;
  refreshPosts: (locale?: string) => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({children}: {children: React.ReactNode}) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Load posts from API on mount
  useEffect(() => {
    refreshPosts();
  }, []);

  const refreshPosts = async (locale?: string) => {
    try {
      setLoading(true);
      const url = locale ? `/api/blog?locale=${locale}` : '/api/blog';
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error('Failed to load blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (post: Omit<BlogPost, 'id'>): Promise<boolean> => {
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      const data = await response.json();
      
      if (data.success) {
        setPosts(prev => [data.data, ...prev]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to create post:', error);
      return false;
    }
  };

  const updatePost = async (slug: string, locale: string, updatedData: Partial<BlogPost>): Promise<boolean> => {
    try {
      const response = await fetch(`/api/blog/${slug}?locale=${locale}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      
      if (data.success) {
        setPosts(prev => prev.map(post => 
          post.slug === slug && post.locale === locale ? data.data : post
        ));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to update post:', error);
      return false;
    }
  };

  const deletePost = async (slug: string, locale: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/blog/${slug}?locale=${locale}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        setPosts(prev => prev.filter(post => !(post.slug === slug && post.locale === locale)));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to delete post:', error);
      return false;
    }
  };

  const getPostBySlug = (slug: string, locale: string) => {
    // Cari post berdasarkan slug DAN locale untuk memastikan data yang benar diedit
    return posts.find(p => p.slug === slug && p.locale === locale);
  };

  return (
    <BlogContext.Provider value={{posts, loading, addPost, updatePost, deletePost, getPostBySlug, refreshPosts}}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}
