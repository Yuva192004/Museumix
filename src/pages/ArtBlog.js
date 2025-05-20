import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/ArtBlog.css';

const ArtBlog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => {
      setBlogPosts([
        {
          id: 1,
          title: "The Evolution of Digital Art in the 21st Century",
          author: "Elena Rodriguez",
          date: "May 10, 2025",
          category: "Digital Art",
          excerpt: "Exploring how digital technologies have transformed artistic expression and opened new frontiers for creativity.",
          content: "Full article content would go here...",
          image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
          featured: true
        },
        {
          id: 2,
          title: "Classical Techniques in Contemporary Painting",
          author: "Michael Chen",
          date: "April 28, 2025",
          category: "Painting",
          excerpt: "How modern artists are reviving Renaissance methods to create stunning contemporary works.",
          content: "Full article content would go here...",
          image: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe",
          featured: true
        },
        {
          id: 3,
          title: "The Rise of Virtual Reality Exhibitions",
          author: "Sarah Johnson",
          date: "April 15, 2025",
          category: "Virtual Exhibitions",
          excerpt: "Virtual reality is changing how we experience art galleries and museums around the world.",
          content: "Full article content would go here...",
          image: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d7",
          featured: false
        },
        {
          id: 4,
          title: "Indigenous Art in the Global Market",
          author: "David Okoye",
          date: "April 3, 2025",
          category: "Cultural Art",
          excerpt: "Examining the growing recognition and appreciation of indigenous art forms in international galleries.",
          content: "Full article content would go here...",
          image: "https://images.unsplash.com/photo-1620598300302-46b44f8931ae",
          featured: false
        },
        {
          id: 5,
          title: "The Intersection of AI and Creative Expression",
          author: "Leila Hassan",
          date: "March 22, 2025",
          category: "Digital Art",
          excerpt: "How artificial intelligence is being used as a tool and medium in contemporary art creation.",
          content: "Full article content would go here...",
          image: "https://images.unsplash.com/photo-1581093588401-3e09f2f9e9d9",
          featured: false
        },
        {
          id: 6,
          title: "Photography as Social Commentary",
          author: "James Wilson",
          date: "March 10, 2025",
          category: "Photography",
          excerpt: "Contemporary photographers using their lenses to document and critique social issues.",
          content: "Full article content would go here...",
          image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",
          featured: false
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];
  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);
  const featuredPosts = blogPosts.filter(post => post.featured);

  if (id) {
    const post = blogPosts.find(post => post.id === parseInt(id));

    if (loading) {
      return (
        <div className="art-blog-container">
          <div className="loading-spinner">
            <p>Loading article...</p>
          </div>
        </div>
      );
    }

    if (!post) {
      return (
        <div className="art-blog-container">
          <div className="blog-header">
            <h1>Article Not Found</h1>
            <p>The article you're looking for doesn't exist.</p>
            <Link to="/blog" className="read-more-btn" style={{ marginTop: '20px' }}>
              Back to Blog
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="art-blog-container">
        <div className="single-post">
          <Link to="/blog" className="back-to-blog">
            ← Back to All Articles
          </Link>
          <div className="single-post-header">
            <h1>{post.title}</h1>
            <div className="post-meta">
              <span className="post-author">By {post.author}</span>
              <span className="post-date">{post.date}</span>
            </div>
            <span className="post-category">{post.category}</span>
          </div>
          <div className="single-post-image">
            <img
              src={post.image}
              alt={post.title}
            />
          </div>
          <div className="single-post-content">
            <p>{post.content}</p>
            <p>This is where the full article content would be displayed. In a real application, this would be rich text content with paragraphs, images, formatting, etc.</p>
            <p>The article would continue with more detailed information about {post.title.toLowerCase()}.</p>
            <p>For now, this is just placeholder content to demonstrate how a single blog post view would work.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="art-blog-container">
      <div className="blog-header">
        <h1>Art Blog</h1>
        <p>Discover insights, trends, and stories from the art world</p>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <p>Loading articles...</p>
        </div>
      ) : (
        <>
          {featuredPosts.length > 0 && (
            <section className="featured-posts">
              <h2>Featured Articles</h2>
              <div className="featured-posts-grid">
                {featuredPosts.map(post => (
                  <div key={post.id} className="featured-post-card">
                    <div className="featured-image-container">
                      <img
                        src={post.image}
                        alt={post.title}
                      />
                    </div>
                    <div className="featured-post-content">
                      <span className="post-category">{post.category}</span>
                      <h3>{post.title}</h3>
                      <p className="post-excerpt">{post.excerpt}</p>
                      <div className="post-meta">
                        <span className="post-author">By {post.author}</span>
                        <span className="post-date">{post.date}</span>
                      </div>
                      <Link to={`/blog/${post.id}`} className="read-more-btn">
                        Read Article
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="blog-categories">
            <h3>Browse by Category</h3>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <section className="blog-posts-grid">
            {filteredPosts.length === 0 ? (
              <p className="no-posts">No articles found in this category.</p>
            ) : (
              filteredPosts.map(post => (
                <div key={post.id} className="blog-post-card">
                  <div className="post-image-container">
                    <img
                      src={post.image}
                      alt={post.title}
                    />
                    <span className="post-category-tag">{post.category}</span>
                  </div>
                  <div className="post-content">
                    <h3>{post.title}</h3>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <div className="post-meta">
                      <span className="post-author">By {post.author}</span>
                      <span className="post-date">{post.date}</span>
                    </div>
                    <Link to={`/blog/${post.id}`} className="read-more-link">
                      Read More →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </section>

          <section className="blog-newsletter">
            <div className="newsletter-content">
              <h3>Stay Updated with Art Trends</h3>
              <p>Subscribe to our newsletter for the latest art news, exhibition updates, and exclusive content.</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Your email address" required />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ArtBlog;
