<script>
  import { onMount } from 'svelte';
  
  let resources = [
    {
      id: 1,
      title: '🚀 2025 Vibe Coder\'s Field Guide',
      description: 'Comprehensive mental model for building anything with AI. Covers vibe coding concepts, workflows, tech stacks, and accessibility by default.',
      category: 'Guides',
      difficulty: 'Intermediate',
      format: 'PDF',
      size: '8.2 MB',
      downloadUrl: '#download-1',
      highlights: [
        'Core vibe coding concepts',
        'Tech stack comparison (Next.js, Svelte, Vue)',
        'Project archetypes',
        'WCAG accessibility checklist',
        'Professional patterns'
      ]
    },
    {
      id: 2,
      title: '📖 Vibe Coding Manifesto',
      description: 'AI-assisted development manifesto emphasizing intent over syntax. Philosophy, workflows, tools (Cursor, Claude, Copilot), and production deployment.',
      category: 'Philosophy',
      difficulty: 'Beginner',
      format: 'PDF',
      size: '425 KB',
      downloadUrl: '#download-2',
      highlights: [
        'Vibe coding philosophy',
        'Tool comparisons',
        'Neurodivergent optimization',
        'Security best practices',
        'Real-world case studies'
      ]
    },
    {
      id: 3,
      title: '🛠️ Universal End-to-End Vibe Coding Guide',
      description: 'Complete 2025 guide from prompt engineering to agent orchestration. Tools, frameworks, security, and structured learning paths.',
      category: 'How-To',
      difficulty: 'Intermediate',
      format: 'Markdown',
      size: '24 KB',
      downloadUrl: '#download-3',
      highlights: [
        'Tool tier lists',
        'Prompt engineering',
        'Agent orchestration',
        'Security patterns',
        'Learning frameworks'
      ]
    },
    {
      id: 4,
      title: '🎯 Cheat Sheet: Building Web Pages & Apps in 2025',
      description: 'Beginner-friendly guide explaining tech stacks, frontend, backend, databases, DevOps, and accessibility in plain English.',
      category: 'Quick Reference',
      difficulty: 'Beginner',
      format: 'PDF',
      size: '92 KB',
      downloadUrl: '#download-4',
      highlights: [
        'Tech stack basics',
        'Frontend frameworks',
        'Backend languages',
        'Database options',
        'Deployment strategies'
      ]
    },
    {
      id: 5,
      title: '🧠 Context Engineering in LLMs',
      description: 'Technical deep-dive on context engineering paradigms, bottlenecks, retrieval architectures, and risk analysis for production systems.',
      category: 'Advanced',
      difficulty: 'Advanced',
      format: 'PDF',
      size: '280 KB',
      downloadUrl: '#download-5',
      highlights: [
        'Context windows explained',
        'Retrieval strategies',
        'Compression techniques',
        'Risk frameworks',
        'Benchmark analysis'
      ]
    },
    {
      id: 6,
      title: '📚 Vibe Coding & Web Dev Study Guide',
      description: 'Comprehensive study guide with quiz, essay questions, and glossary. Perfect for learning and certification preparation.',
      category: 'Learning',
      difficulty: 'Intermediate',
      format: 'PDF',
      size: '206 KB',
      downloadUrl: '#download-6',
      highlights: [
        'Quiz questions & answers',
        'Essay prompts',
        'Glossary (50+ terms)',
        'WCAG accessibility',
        'Web architecture patterns'
      ]
    },
    {
      id: 7,
      title: '🎨 Web Dev & AI Glossary',
      description: 'Comprehensive glossary of 50+ terms covering web development, AI-assisted coding, frameworks, and modern architectures.',
      category: 'Reference',
      difficulty: 'All Levels',
      format: 'PDF',
      size: '56 KB',
      downloadUrl: '#download-7',
      highlights: [
        '50+ web dev terms',
        'Frontend/backend glossary',
        'Stack terminology',
        'AI/ML concepts',
        'Architecture patterns'
      ]
    },
    {
      id: 8,
      title: '🔬 Cheat Sheets for AI, Neural Networks & Machine Learning',
      description: 'Advanced technical cheat sheets for ML engineers. Deep learning, neural networks, training techniques, and optimization strategies.',
      category: 'Advanced',
      difficulty: 'Advanced',
      format: 'PDF',
      size: '8.06 MB',
      downloadUrl: '#download-8',
      highlights: [
        'Neural network architectures',
        'Training techniques',
        'Optimization algorithms',
        'Hyperparameter tuning',
        'Model evaluation'
      ]
    },
    {
      id: 9,
      title: '📊 R Cheat Sheets for Data Science',
      description: 'Comprehensive R language cheat sheets for data analysis, visualization, and statistical computing.',
      category: 'Data Science',
      difficulty: 'Intermediate',
      format: 'PDF',
      size: '16.5 MB',
      downloadUrl: '#download-9',
      highlights: [
        'R syntax basics',
        'Data manipulation',
        'Visualization libraries',
        'Statistical functions',
        'Package management'
      ]
    },
    {
      id: 10,
      title: '📈 Vibe Coding 2025 Comprehensive Presentation',
      description: 'Paradigm shift presentation covering vibe coding adoption trends, workflows, tech stacks, and 2025 roadmap.',
      category: 'Presentations',
      difficulty: 'All Levels',
      format: 'PowerPoint',
      size: '1.78 MB',
      downloadUrl: '#download-10',
      highlights: [
        'Adoption trends',
        'Workflow visualization',
        'Tech ecosystem map',
        'Future roadmap',
        'Team training deck'
      ]
    }
  ];

  let selectedCategory = 'All';
  let filteredResources = resources;
  let searchQuery = '';

  $: {
    filteredResources = resources.filter(r => {
      const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  const categories = ['All', ...new Set(resources.map(r => r.category))];
  
  const difficultyColor = {
    'Beginner': '#10b981',
    'Intermediate': '#f59e0b',
    'Advanced': '#ef4444',
    'All Levels': '#8b5cf6'
  };
</script>

<svelte:head>
  <title>Vibe Coding Resources - Cheat Sheets & Guides</title>
  <meta name="description" content="Download essential cheat sheets and guides to accelerate your AI-assisted web development journey with vibe coding." />
</svelte:head>

<div class="resources-container">
  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-content">
      <h1>📚 Vibe Coding Resources</h1>
      <p class="subtitle">Download these essential cheat sheets and guides to accelerate your web development journey.</p>
    </div>
  </section>

  <!-- Search & Filter -->
  <section class="search-filter">
    <div class="search-box">
      <input 
        type="text" 
        placeholder="Search resources by title or topic..." 
        bind:value={searchQuery}
        class="search-input"
      />
    </div>
    
    <div class="category-filters">
      {#each categories as category}
        <button 
          class="filter-btn {selectedCategory === category ? 'active' : ''}"
          on:click={() => selectedCategory = category}
        >
          {category}
        </button>
      {/each}
    </div>
  </section>

  <!-- Results Count -->
  <section class="results-info">
    <p>Showing <span class="highlight">{filteredResources.length}</span> resources</p>
  </section>

  <!-- Resources Grid -->
  <section class="resources-grid">
    {#each filteredResources as resource (resource.id)}
      <article class="resource-card">
        <div class="card-header">
          <h3>{resource.title}</h3>
          <div class="meta-tags">
            <span class="category-tag">{resource.category}</span>
            <span class="difficulty-tag" style="--color: {difficultyColor[resource.difficulty]}">
              {resource.difficulty}
            </span>
            <span class="format-tag">{resource.format}</span>
          </div>
        </div>

        <p class="description">{resource.description}</p>

        <div class="highlights">
          <h4>Key Topics:</h4>
          <ul>
            {#each resource.highlights as highlight}
              <li>✓ {highlight}</li>
            {/each}
          </ul>
        </div>

        <div class="card-footer">
          <div class="file-info">
            <span class="size">📦 {resource.size}</span>
          </div>
          <a href={resource.downloadUrl} class="download-btn">
            ⬇️ Download
          </a>
        </div>
      </article>
    {/each}
  </section>

  <!-- Empty State -->
  {#if filteredResources.length === 0}
    <section class="empty-state">
      <p>No resources found matching your criteria. Try adjusting your search or filters.</p>
    </section>
  {/if}

  <!-- CTA Section -->
  <section class="cta-section">
    <h2>🚀 Ready to Level Up?</h2>
    <p>Start with the <strong>2025 Vibe Coder's Field Guide</strong> for a comprehensive mental model of building with AI.</p>
    <p>Then explore specific guides based on your needs—beginner fundamentals or advanced patterns.</p>
  </section>

  <!-- Footer Note -->
  <section class="footer-note">
    <p>All resources are curated and tested. Last updated: December 2025</p>
  </section>
</div>

<style>
  :global {
    --color-primary: #3182ce;
    --color-primary-dark: #2c5282;
    --color-background: #f7fafc;
    --color-surface: #ffffff;
    --color-border: #e2e8f0;
    --color-text: #2d3748;
    --color-text-light: #718096;
  }

  .resources-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
    min-height: 100vh;
  }

  .hero {
    text-align: center;
    margin-bottom: 60px;
    padding: 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    color: white;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
  }

  .hero h1 {
    font-size: 2.5rem;
    margin: 0 0 12px 0;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.1rem;
    margin: 0;
    opacity: 0.95;
    font-weight: 300;
  }

  .search-filter {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;
  }

  .search-box {
    position: relative;
  }

  .search-input {
    width: 100%;
    padding: 14px 20px;
    font-size: 1rem;
    border: 2px solid var(--color-border);
    border-radius: 8px;
    background: var(--color-surface);
    color: var(--color-text);
    transition: all 0.3s ease;
  }

  .search-input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }

  .category-filters {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .filter-btn {
    padding: 10px 16px;
    border: 2px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-text);
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    font-size: 0.95rem;
    transition: all 0.3s ease;
  }

  .filter-btn:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  .filter-btn.active {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
    box-shadow: 0 4px 12px rgba(49, 130, 206, 0.3);
  }

  .results-info {
    text-align: center;
    margin-bottom: 30px;
    font-size: 0.95rem;
    color: var(--color-text-light);
  }

  .highlight {
    color: var(--color-primary);
    font-weight: 600;
  }

  .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 24px;
    margin-bottom: 60px;
  }

  .resource-card {
    background: var(--color-surface);
    border-radius: 12px;
    padding: 24px;
    border: 2px solid var(--color-border);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .resource-card:hover {
    border-color: var(--color-primary);
    box-shadow: 0 8px 24px rgba(49, 130, 206, 0.12);
    transform: translateY(-4px);
  }

  .card-header {
    margin-bottom: 16px;
  }

  .card-header h3 {
    margin: 0 0 12px 0;
    font-size: 1.3rem;
    color: var(--color-text);
    line-height: 1.3;
  }

  .meta-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .category-tag,
  .difficulty-tag,
  .format-tag {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .category-tag {
    background: #edf2f7;
    color: #2d3748;
  }

  .difficulty-tag {
    background: rgba(var(--color), 0.1);
    color: var(--color);
  }

  .format-tag {
    background: #f0fdf4;
    color: #166534;
  }

  .description {
    color: var(--color-text-light);
    line-height: 1.6;
    margin: 0 0 20px 0;
    flex: 1;
  }

  .highlights {
    background: #f9fafb;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .highlights h4 {
    margin: 0 0 12px 0;
    font-size: 0.95rem;
    color: var(--color-text);
  }

  .highlights ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .highlights li {
    color: var(--color-text-light);
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    border-top: 1px solid var(--color-border);
  }

  .file-info {
    font-size: 0.85rem;
    color: var(--color-text-light);
  }

  .size {
    display: inline-block;
  }

  .download-btn {
    padding: 10px 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  .download-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: var(--color-text-light);
    font-size: 1.1rem;
  }

  .cta-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 40px;
    border-radius: 12px;
    text-align: center;
    margin-bottom: 40px;
  }

  .cta-section h2 {
    margin: 0 0 16px 0;
    font-size: 1.8rem;
  }

  .cta-section p {
    margin: 12px 0;
    font-size: 1.05rem;
    line-height: 1.6;
  }

  .footer-note {
    text-align: center;
    color: var(--color-text-light);
    font-size: 0.9rem;
    padding: 20px;
  }

  @media (max-width: 768px) {
    .resources-container {
      padding: 20px 16px;
    }

    .hero {
      padding: 30px 20px;
    }

    .hero h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1rem;
    }

    .resources-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .category-filters {
      flex-direction: column;
    }

    .filter-btn {
      width: 100%;
    }
  }
</style>