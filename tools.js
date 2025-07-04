
        // Sample tools data organized by categories
        const toolsData = {
    projectManagement: {
        title: "Project Management Tools",
        tools: [
            {
                name: "Trello",
                icon: "🗂️",
                description: "Visual project management tool that helps teams collaborate on tasks and timelines.",
                link: "https://trello.com/"
            },
            {
                name: "Asana",
                icon: "✅",
                description: "Helps NGOs plan, track, and manage projects efficiently across teams.",
                link: "https://asana.com/"
            },
            {
                name: "ClickUp",
                icon: "📊",
                description: "All-in-one project platform with time tracking and goal setting.",
                link: "https://clickup.com/"
            },
            {
                name: "Notion",
                icon: "📝",
                description: "Workspace tool for documentation, tasks, and knowledge sharing.",
                link: "https://www.notion.so/"
            }
        ]
    },
    communicationAdvocacy: {
        title: "Communication & Advocacy Tools",
        tools: [
            {
                name: "Canva",
                icon: "🎨",
                description: "Design tool for creating campaigns, infographics, posters, and social media content.",
                link: "https://www.canva.com/"
            },
            {
                name: "Mailchimp",
                icon: "📧",
                description: "Email marketing platform to engage supporters and send newsletters.",
                link: "https://mailchimp.com/"
            },
            {
                name: "Buffer",
                icon: "📱",
                description: "Schedule and manage social media posts across platforms.",
                link: "https://buffer.com/"
            },
            {
                name: "Change.org",
                icon: "🗳️",
                description: "Platform to create and promote petitions for advocacy and social causes.",
                link: "https://www.change.org/"
            }
        ]
    },
    fundraisingFinance: {
        title: "Fundraising & Finance Tools",
        tools: [
            {
                name: "GiveWP",
                icon: "💰",
                description: "Donation plugin for WordPress that helps collect funds online.",
                link: "https://givewp.com/"
            },
            {
                name: "Fundly",
                icon: "🤝",
                description: "Online fundraising platform ideal for community campaigns.",
                link: "https://www.fundly.com/"
            },
            {
                name: "QuickBooks",
                icon: "📒",
                description: "Financial software for expense tracking, reporting, and donor management.",
                link: "https://quickbooks.intuit.com/"
            },
            {
                name: "Donorbox",
                icon: "🎁",
                description: "Easy-to-integrate donation system for nonprofits and NGOs.",
                link: "https://donorbox.org/"
            }
        ]
    },
    collaborationTraining: {
        title: "Collaboration & Training Tools",
        tools: [
            {
                name: "Zoom",
                icon: "🎥",
                description: "Video conferencing tool for meetings, training, and webinars.",
                link: "https://zoom.us/"
            },
            {
                name: "Google Workspace",
                icon: "📂",
                description: "Suite of cloud tools (Docs, Sheets, Meet) for team collaboration.",
                link: "https://workspace.google.com/"
            },
            {
                name: "Kahoot!",
                icon: "🎮",
                description: "Interactive platform to run quizzes and training sessions.",
                link: "https://kahoot.com/"
            },
            {
                name: "Mentimeter",
                icon: "📊",
                description: "Live feedback and polling tool great for workshops and public consultations.",
                link: "https://www.mentimeter.com/"
            }
        ]
    }
};


        // DOM elements
        const searchInput = document.getElementById('search-input');
        const categoryFilter = document.getElementById('category-filter');
        const categoriesContainer = document.getElementById('categories-container');

        // Display all categories and tools
        function displayTools(filterCategory = 'all', searchTerm = '') {
            categoriesContainer.innerHTML = '';

            let hasResults = false;

            for (const [categoryId, categoryData] of Object.entries(toolsData)) {
                // Skip if not matching filter
                if (filterCategory !== 'all' && categoryId !== filterCategory) {
                    continue;
                }

                // Filter tools by search term
                const filteredTools = categoryData.tools.filter(tool => {
                    return tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase());
                });

                // Skip category if no tools match (and we're not showing all)
                if (filteredTools.length === 0 && filterCategory !== 'all') {
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

                // Create tools grid
                const toolsGrid = document.createElement('div');
                toolsGrid.className = 'tools-grid';

                // Add tool cards
                if (filteredTools.length > 0) {
                    filteredTools.forEach(tool => {
                        const toolCard = document.createElement('div');
                        toolCard.className = 'tool-card';
                        toolCard.innerHTML = `
                            <div class="tool-icon">${tool.icon}</div>
                            <h3>${tool.name}</h3>
                            <p>${tool.description}</p>
                            <a href="${tool.link}" class="tool-link" target="_blank">Visit Tool</a>
                        `;
                        toolsGrid.appendChild(toolCard);
                    });
                } else {
                    toolsGrid.innerHTML = '<div class="no-results">No tools found in this category matching your search.</div>';
                }

                // Assemble category
                categoryContent.appendChild(toolsGrid);
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
                categoriesContainer.innerHTML = '<div class="no-results">No tools found matching your criteria.</div>';
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
            displayTools(categoryFilter.value, this.value);
        });

        categoryFilter.addEventListener('change', function() {
            displayTools(this.value, searchInput.value);
        });

        // Initial display
        displayTools();
