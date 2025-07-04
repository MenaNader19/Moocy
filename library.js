// Sample books data organized by categories
        const booksData = {
    communityDevelopment: {
        title: "Community Development",
        books: [
            {
                title: "The Community Development Handbook",
                author: "RHG",
                cover: "https://m.media-amazon.com/images/I/41qk0URzEOL._SY425_.jpg",
                description: "A practical guide to building healthy communities through grassroots engagement.",
                link: "https://www.amazon.com/Community-Development-Handbook-Governments/dp/0662645930"
            },
            {
                title: "Asset Building & Community Development",
                author: "Gary Paul Green, Anna Haines",
                cover: "https://m.media-amazon.com/images/I/41-Ug8nZ-jL._SY425_.jpg",
                description: "Examines the asset-based approach to community empowerment and sustainability.",
                link: "https://www.amazon.com/Asset-Building-Community-Development-Green/dp/1506362305"
            }
        ]
    },
    humanRights: {
        title: "Human Rights & Advocacy",
        books: [
            {
                title: "The Human Rights Revolution",
                author: "Peterson, Lauren, Hoffmann",
                cover: "https://m.media-amazon.com/images/I/41f8JGfqEyL._SY425_.jpg",
                description: "A historical look at how human rights became a global movement.",
                link: "https://www.amazon.com/Human-Rights-Revolution-International-History/dp/0521142574"
            },
            {
                title: "Advocacy and Policy Change Evaluation",
                author: "Annette Gardner",
                cover: "https://m.media-amazon.com/images/I/51Q1P5BLsGL._SY425_.jpg",
                description: "Strategies and tools for evaluating advocacy campaigns effectively.",
                link: "https://www.amazon.com/Advocacy-Policy-Change-Evaluation-Approaches/dp/0804778446"
            }
        ]
    },
    nonprofitManagement: {
        title: "Nonprofit Management",
        books: [
            {
                title: "Managing the Non-Profit Organization",
                author: "Peter F. Drucker",
                cover: "https://m.media-amazon.com/images/I/51VG1u3TqSL._SY425_.jpg",
                description: "Classic insights into mission, leadership, and performance in nonprofits.",
                link: "https://www.amazon.com/Managing-Non-Profit-Organization-Principles-Practices/dp/0060851147"
            },
            {
                title: "Nonprofit Management 101",
                author: "Darian Rodriguez Heyman",
                cover: "https://m.media-amazon.com/images/I/51opvHkLwtL._SY425_.jpg",
                description: "A practical guide covering fundraising, marketing, governance, and HR.",
                link: "https://www.amazon.com/Nonprofit-Management-101-Practical-Fundraising/dp/1119585455"
            }
        ]
    },
    genderYouthPeace: {
        title: "Gender, Youth, and Peacebuilding",
        books: [
            {
                title: "Youth and Peacebuilding",
                author: "Sukanya Podder",
                cover: "https://m.media-amazon.com/images/I/41AUdtJKtCL._SY425_.jpg",
                description: "Explores how youth can play a central role in peacebuilding processes.",
                link: "https://www.amazon.com/Youth-Peacebuilding-Sukanya-Podder/dp/0367339827"
            },
            {
                title: "Gender and Development",
                author: "Janet Momsen",
                cover: "https://m.media-amazon.com/images/I/51K7FYp0V8L._SY425_.jpg",
                description: "Analyzes the role of gender in development practices and policies.",
                link: "https://www.amazon.com/Gender-Development-Routledge-Perspectives/dp/1138810637"
            }
        ]
    }
};


        // DOM elements
        const searchInput = document.getElementById('search-input');
        const categoryFilter = document.getElementById('category-filter');
        const categoriesContainer = document.getElementById('categories-container');

        // Display all categories and books
        function displayBooks(filterCategory = 'all', searchTerm = '') {
            categoriesContainer.innerHTML = '';

            let hasResults = false;

            for (const [categoryId, categoryData] of Object.entries(booksData)) {
                // Skip if not matching filter
                if (filterCategory !== 'all' && categoryId !== filterCategory) {
                    continue;
                }

                // Filter books by search term
                const filteredBooks = categoryData.books.filter(book => {
                    return book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.description.toLowerCase().includes(searchTerm.toLowerCase());
                });

                // Skip category if no books match (and we're not showing all)
                if (filteredBooks.length === 0 && filterCategory !== 'all') {
                    continue;
                }

                hasResults = true;

                // Create category element
                const categoryElement = document.createElement('div');
                categoryElement.className = 'category';
                categoryElement.dataset.category = categoryId;

                // Create category header
                const categoryHeader = document.createElement('div');
                categoryHeader.className = 'category-header';
                categoryHeader.innerHTML = `
                    <h2>${categoryData.title}</h2>
                    <span class="toggle-icon">▼</span>
                `;

                // Create category content
                const categoryContent = document.createElement('div');
                categoryContent.className = 'category-content';

                // Create books grid
                const booksGrid = document.createElement('div');
                booksGrid.className = 'books-grid';

                // Add book cards
                if (filteredBooks.length > 0) {
                    filteredBooks.forEach(book => {
                        const bookCard = document.createElement('div');
                        bookCard.className = 'book-card';
                        bookCard.innerHTML = `
                            <div class="book-cover">
                                ${book.cover ? `<img src="${book.cover}" alt="${book.title}">` : '📚'}
                            </div>
                            <div class="book-info">
                                <h3>${book.title}</h3>
                                <div class="author">by ${book.author}</div>
                                <p>${book.description}</p>
                                <a href="${book.link}" class="book-link" target="_blank">More Info</a>
                            </div>
                        `;
                        booksGrid.appendChild(bookCard);
                    });
                } else {
                    booksGrid.innerHTML = '<div class="no-results">No books found in this category matching your search.</div>';
                }

                // Assemble category
                categoryContent.appendChild(booksGrid);
                categoryElement.appendChild(categoryHeader);
                categoryElement.appendChild(categoryContent);
                categoriesContainer.appendChild(categoryElement);

                // Add click event to toggle category
                categoryHeader.addEventListener('click', function() {
                    categoryElement.classList.toggle('open');
                });
            }

            // Show message if no results at all
            if (!hasResults) {
                categoriesContainer.innerHTML = '<div class="no-results">No books found matching your criteria.</div>';
            } else {
                // Open all categories by default when searching
                if (searchTerm) {
                    document.querySelectorAll('.category').forEach(cat => {
                        cat.classList.add('open');
                    });
                }
            }
        }

        // Event listeners
        searchInput.addEventListener('input', function() {
            displayBooks(categoryFilter.value, this.value);
        });

        categoryFilter.addEventListener('change', function() {
            displayBooks(this.value, searchInput.value);
        });

        // Initial display
        displayBooks();