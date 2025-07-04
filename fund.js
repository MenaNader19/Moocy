// Sample funding data
        const fundingOpportunities = [
            {
                title: "Arts Development Grant",
                type: "full",
                amount: 15000,
                categories: ["Art", "Culture"],
                deadline: "2023-12-15",
                description: "Support for individual artists to develop new work."
            },
            {
                title: "Community Music Program",
                type: "partial",
                amount: 8000,
                categories: ["Music", "Training"],
                deadline: "2023-11-30",
                description: "Funding for community music education initiatives."
            },
            {
                title: "Theater Production Fund",
                type: "partial",
                amount: 12000,
                categories: ["Performing Arts"],
                deadline: "2024-01-20",
                description: "Support for small theater companies producing new works."
            },
            {
                title: "Cultural Heritage Preservation",
                type: "full",
                amount: 18000,
                categories: ["Culture", "Art"],
                deadline: "2023-12-01",
                description: "Grants for projects preserving cultural heritage."
            },
            {
                title: "Artist Residency Program",
                type: "full",
                amount: 20000,
                categories: ["Art", "Training"],
                deadline: "2024-02-15",
                description: "Funding for artists to participate in residency programs."
            },
            {
                title: "Youth Music Initiative",
                type: "partial",
                amount: 7500,
                categories: ["Music", "Training"],
                deadline: "2023-11-15",
                description: "Support for music programs targeting young people."
            },
            {
                title: "Dance Performance Grant",
                type: "partial",
                amount: 10000,
                categories: ["Performing Arts"],
                deadline: "2024-01-10",
                description: "Funding for dance companies to create new performances."
            },
            {
                title: "Creative Writing Fund",
                type: "full",
                amount: 15000,
                categories: ["Art", "Culture"],
                deadline: "2023-12-31",
                description: "Support for emerging writers to complete projects."
            }
        ];

        // DOM elements
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const fundingTypeRadios = document.getElementsByName('funding-type');
        const minAmountInput = document.getElementById('min-amount');
        const maxAmountInput = document.getElementById('max-amount');
        const categoryCheckboxes = document.getElementsByName('category');
        const fundingList = document.getElementById('funding-list');

        // Format amount with commas
        function formatAmount(amount) {
            return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        // Format date as Month Day, Year
        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        }

        // Display all funding opportunities initially
        function displayFundingOpportunities(opportunitiesToDisplay) {
            fundingList.innerHTML = '';

            if (opportunitiesToDisplay.length === 0) {
                fundingList.innerHTML = '<div class="no-results">No funding opportunities found matching your criteria.</div>';
                return;
            }

            opportunitiesToDisplay.forEach(opportunity => {
                const fundingCard = document.createElement('div');
                fundingCard.className = 'funding-card';

                // Create categories badges
                const categoriesBadges = opportunity.categories.map(cat => 
                    `<span class="category">${cat}</span>`
                ).join(' ');

                fundingCard.innerHTML = `
                    <h3>${opportunity.title}</h3>
                    <div class="details">
                        <div class="detail">
                            <i>💰</i>
                            <span class="amount">$${formatAmount(opportunity.amount)}</span>
                        </div>
                        <div class="detail">
                            <i>📝</i>
                            <span class="type">${opportunity.type === 'full' ? 'Full Funding' : 'Partial Funding'}</span>
                        </div>
                        <div class="detail">
                            <i>⏰</i>
                            <span class="deadline">Deadline: ${formatDate(opportunity.deadline)}</span>
                        </div>
                        <div class="detail">
                            <i>🏷️</i>
                            <span>${categoriesBadges}</span>
                        </div>
                    </div>
                    <p>${opportunity.description}</p>
                    <a href="#" class="apply-btn">Apply Now</a>
                `;

                fundingList.appendChild(fundingCard);
            });
        }

        // Filter funding opportunities based on criteria
        function filterFundingOpportunities() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedFundingType = document.querySelector('input[name="funding-type"]:checked').value;
            const minAmount = parseInt(minAmountInput.value) || 5000;
            const maxAmount = parseInt(maxAmountInput.value) || 20000;
            
            // Get checked categories
            const selectedCategories = [];
            categoryCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedCategories.push(checkbox.value);
                }
            });

            const filteredOpportunities = fundingOpportunities.filter(opportunity => {
                // Search term filter
                const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm) || 
                                     opportunity.description.toLowerCase().includes(searchTerm);
                
                // Funding type filter
                const matchesFundingType = selectedFundingType === 'any' || opportunity.type === selectedFundingType;
                
                // Amount range filter
                const matchesAmount = opportunity.amount >= minAmount && opportunity.amount <= maxAmount;
                
                // Categories filter
                const matchesCategory = opportunity.categories.some(cat => selectedCategories.includes(cat));
                
                return matchesSearch && matchesFundingType && matchesAmount && matchesCategory;
            });

            displayFundingOpportunities(filteredOpportunities);
        }

        // Validate amount inputs
        function validateAmountInputs() {
            let min = parseInt(minAmountInput.value) || 5000;
            let max = parseInt(maxAmountInput.value) || 20000;

            // Ensure min is not less than 5000
            min = Math.max(min, 5000);
            
            // Ensure max is not more than 20000
            max = Math.min(max, 20000);
            
            // Ensure min is not more than max
            if (min > max) {
                min = max;
            }

            minAmountInput.value = min;
            maxAmountInput.value = max;
        }

        // Event listeners
        searchBtn.addEventListener('click', filterFundingOpportunities);
        
        // Also filter when pressing Enter in search input
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterFundingOpportunities();
            }
        });

        // Validate amount inputs when they change
        minAmountInput.addEventListener('change', validateAmountInputs);
        maxAmountInput.addEventListener('change', validateAmountInputs);

        // Initial display of all funding opportunities
        displayFundingOpportunities(fundingOpportunities);

        