// Sample data for organizations by category (with locations)
const organizationsData = [
    {
        category: "art",
        title: "Art",
        description: "Organizations supporting visual, performing, and creative arts",
        organizations: [
            {
                name: "Green Earth Foundation",
                description: "Promoting emerging artists through grants and exhibitions",
                link: "org-info.html",
                location: "europe"
            },
            {
                name: "Urban Canvas Collective",
                description: "Supporting street art and public murals in urban areas",
                link: "#",
                location: "north-america"
            },
            {
                name: "Performing Arts Network",
                description: "Connecting theater, dance, and music professionals",
                link: "#",
                location: "asia"
            }
        ]
    },
    {
        category: "culture",
        title: "Culture",
        description: "Organizations preserving and promoting cultural heritage",
        organizations: [
            {
                name: "Cultural Heritage Trust",
                description: "Protecting historical sites and traditions",
                link: "#",
                location: "europe"
            },
            {
                name: "Global Cultures Exchange",
                description: "Facilitating cultural exchange programs worldwide",
                link: "#",
                location: "north-america"
            },
            {
                name: "Indigenous Arts Council",
                description: "Supporting indigenous artists and traditions",
                link: "#",
                location: "africa"
            }
        ]
    },
    {
        category: "social-inclusion",
        title: "Social Inclusion",
        description: "Organizations working for equality and accessibility",
        organizations: [
            {
                name: "Equal Access Initiative",
                description: "Advocating for disability rights and accessibility",
                link: "#",
                location: "europe"
            },
            {
                name: "Diversity in Tech",
                description: "Promoting inclusion in the technology sector",
                link: "#",
                location: "north-america"
            },
            {
                name: "Youth Integration Network",
                description: "Supporting at-risk youth through mentorship programs",
                link: "#",
                location: "middle-east"
            }
        ]
    },
    {
        category: "digitality",
        title: "Digitality",
        description: "Organizations focused on digital transformation and innovation",
        organizations: [
            {
                name: "Digital Futures Lab",
                description: "Researching the impact of digital technologies on society",
                link: "#",
                location: "europe"
            },
            {
                name: "Tech for Good",
                description: "Developing technological solutions for social challenges",
                link: "#",
                location: "asia"
            },
            {
                name: "Open Data Consortium",
                description: "Promoting transparency through open data initiatives",
                link: "#",
                location: "north-america"
            }
        ]
    },
    {
        category: "unemployment",
        title: "Unemployment",
        description: "Organizations addressing joblessness and workforce development",
        organizations: [
            {
                name: "Skills Build Network",
                description: "Providing vocational training for unemployed individuals",
                link: "#",
                location: "africa"
            },
            {
                name: "Career Pathways",
                description: "Connecting job seekers with training and employment opportunities",
                link: "#",
                location: "south-america"
            },
            {
                name: "New Start Initiative",
                description: "Supporting career transitions for mid-career professionals",
                link: "#",
                location: "europe"
            }
        ]
    },
    {
        category: "entrepreneurship",
        title: "Entrepreneurship",
        description: "Organizations supporting startups and business innovation",
        organizations: [
            {
                name: "Startup Hub",
                description: "Incubator for early-stage tech startups",
                link: "#",
                location: "north-america"
            },
            {
                name: "Women Entrepreneurs Network",
                description: "Empowering female founders through mentorship and funding",
                link: "#",
                location: "middle-east"
            },
            {
                name: "Social Enterprise Alliance",
                description: "Supporting businesses with social and environmental missions",
                link: "#",
                location: "asia"
            }
        ]
    }
];

// DOM elements
const categoryFilter = document.getElementById('categoryFilter');
const locationFilter = document.getElementById('locationFilter');
const categoriesContainer = document.getElementById('categoriesContainer');

// Display all categories initially
function displayCategories(categoryFilterValue = 'all', locationFilterValue = 'all') {
    categoriesContainer.innerHTML = '';

    let filteredCategories = organizationsData;
    
    // Apply category filter
    if (categoryFilterValue !== 'all') {
        filteredCategories = filteredCategories.filter(cat => cat.category === categoryFilterValue);
    }
    
    // Apply location filter to organizations within each category
    filteredCategories = filteredCategories.map(category => {
        let filteredOrgs = category.organizations;
        
        if (locationFilterValue !== 'all') {
            filteredOrgs = filteredOrgs.filter(org => org.location === locationFilterValue);
        }
        
        return {
            ...category,
            organizations: filteredOrgs
        };
    }).filter(category => category.organizations.length > 0);

    if (filteredCategories.length === 0) {
        categoriesContainer.innerHTML = '<div class="no-results">No organizations found with these filters</div>';
        return;
    }

    filteredCategories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.dataset.category = category.category;

        categoryCard.innerHTML = `
            <div class="category-header">
                <h2>${category.title}</h2>
                <p>${category.description}</p>
            </div>
            <div class="organizations-list">
                ${category.organizations.map(org => `
                    <div class="organization">
                        <div class="org-info">
                            <h3>${org.name}</h3>
                            <p>${org.description}</p>
                            ${org.link ? `<a href="${org.link}" class="org-link" target="_blank">Learn More</a>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        categoriesContainer.appendChild(categoryCard);
    });
}

// Event listeners for filters
categoryFilter.addEventListener('change', function() {
    displayCategories(this.value, locationFilter.value);
});

locationFilter.addEventListener('change', function() {
    displayCategories(categoryFilter.value, this.value);
});

// Initial display
displayCategories();