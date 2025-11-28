import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const NewsArticles = () => {
  const articles = [
    {
      id: 1,
      title: "AI Traffic Analysis Transforms Urban Road Safety",
      summary: "New York City's AI system 'SeeUnsafe' uses existing traffic cameras to automatically detect collisions and near-misses, earning the Vision Zero Research Award.",
      image: "/AI Traffic Analysis Transforms Urban Road Safety.png",
      url: "https://highways.today/2025/11/24/ai-traffic-analysis/"
    },
    {
      id: 2,
      title: "The Ultimate Guide to Smart Highways and Intelligent Roadways",
      summary: "Smart highways integrate cutting-edge technology to make driving safer, smoother, and more sustainable with features like traffic warnings and electric car charging.",
      image: "/The Ultimate Guide to Smart Highways and Intelligent Roadways.png",
      url: "https://highways.today/2025/04/28/guide-to-smart-highways/"
    },
    {
      id: 3,
      title: "Climate Resilience and Road Safety",
      summary: "Extreme weather events impact road safety through damaged infrastructure, alternative route diversions, and new risks from rehabilitated roads.",
      image: "/Climate Resilience and Road Safety.png",
      url: "https://irap.org/climate-change-and-road-safety/"
    }
  ];

  return (
    <div className="news-articles-section">
      <div className="section-header mb-4">
        <h3 className="text-white text-center mb-2">Recent Headlines & Insights</h3>
        <p className="text-white-50 text-center">Latest developments in road safety and traffic management</p>
      </div>
      
      <div className="articles-container">
        {articles.map((article, index) => (
          <Row key={article.id} className={`article-row ${index < articles.length - 1 ? 'mb-4' : ''}`}>
            <Col xs={12}>
              <Card className="article-card h-100">
                <Row className="g-0 h-100">
                  <Col md={4} className="article-image-col">
                    <div className="article-image-container">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="article-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="article-image-placeholder" style={{display: 'none'}}>
                        <i className="fas fa-newspaper"></i>
                        <span>News Article</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={8}>
                    <Card.Body className="article-content">
                      <div className="article-header">
                        <h5 className="article-title">{article.title}</h5>
                      </div>
                      <p className="article-summary">{article.summary}</p>
                      <div className="article-footer">
                        <a 
                          href={article.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="read-more-btn"
                        >
                          <i className="fas fa-external-link-alt me-2"></i>
                          Read Full Article
                        </a>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        ))}
      </div>
    </div>
  );
};

export default NewsArticles;