// Sample job data
        const jobs = [
            {
                title: "Community Outreach Coordinator",
                company: "Youth for Change",
                location: "Cairo, Egypt",
                salary: 9000,
                type: "fulltime",
                experience: "mid",
                workType: "onsite",
                description: "Coordinate field visits, engage with local communities, and support awareness campaigns."
            },
            {
                title: "Fundraising Specialist",
                company: "Hope Foundation",
                location: "Remote",
                salary: 12000,
                type: "fulltime",
                experience: "senior",
                workType: "remote",
                description: "Develop fundraising strategies and maintain relationships with donors and sponsors."
            },
            {
                title: "Advocacy Officer",
                company: "Rights Watch",
                location: "Amman, Jordan",
                salary: 10500,
                type: "fulltime",
                experience: "mid",
                workType: "onsite",
                description: "Lead advocacy initiatives and contribute to policy analysis in human rights programs."
            },
            {
                title: "Monitoring & Evaluation Assistant",
                company: "Impact NGO",
                location: "Tunis, Tunisia",
                salary: 8000,
                type: "parttime",
                experience: "entry",
                workType: "onsite",
                description: "Assist in collecting, analyzing, and reporting data to evaluate project effectiveness."
            },
            {
                title: "Youth Programs Intern",
                company: "Future Leaders",
                location: "Remote",
                salary: 4000,
                type: "parttime",
                experience: "entry",
                workType: "remote",
                description: "Support the planning and implementation of youth capacity-building workshops."
            },
            {
                title: "Field Project Manager",
                company: "Humanity Now",
                location: "Beirut, Lebanon",
                salary: 15000,
                type: "fulltime",
                experience: "senior",
                workType: "onsite",
                description: "Manage field operations and coordinate project teams for humanitarian response."
            },
            {
                title: "Psychosocial Support Officer",
                company: "Safe Space Initiative",
                location: "Alexandria, Egypt",
                salary: 9500,
                type: "fulltime",
                experience: "mid",
                workType: "onsite",
                description: "Provide emotional support and referrals to vulnerable community members."
            },
            {
                title: "Logistics & Procurement Assistant",
                company: "Relief Link",
                location: "Khartoum, Sudan",
                salary: 8500,
                type: "fulltime",
                experience: "entry",
                workType: "onsite",
                description: "Support procurement, warehouse operations, and field delivery planning."
            }
];


        // DOM elements
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const workTypeRadios = document.getElementsByName('work-type');
        const salaryRange = document.getElementById('salary-range');
        const jobTypeCheckboxes = document.getElementsByName('job-type');
        const experienceSelect = document.getElementById('experience');
        const locationInput = document.getElementById('location');
        const jobListings = document.getElementById('job-listings');
        const selectedSalary = document.getElementById('selected-salary');

        // Format salary with commas
        function formatSalary(salary) {
            return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        // Update displayed salary range
        salaryRange.addEventListener('input', function() {
            selectedSalary.textContent = formatSalary(this.value);
        });

        // Display all jobs initially
        function displayJobs(jobsToDisplay) {
            jobListings.innerHTML = '';

            if (jobsToDisplay.length === 0) {
                jobListings.innerHTML = '<div class="no-results">No jobs found matching your criteria.</div>';
                return;
            }

            jobsToDisplay.forEach(job => {
                const jobCard = document.createElement('div');
                jobCard.className = 'job-card';

                // Map experience levels to display text
                const experienceMap = {
                    'entry': 'Entry Level',
                    'mid': 'Mid Level',
                    'senior': 'Senior Level'
                };

                // Map work types to display text
                const workTypeMap = {
                    'remote': 'Remote',
                    'onsite': 'On-site'
                };

                jobCard.innerHTML = `
                    <h3>${job.title}</h3>
                    <div class="company">${job.company}</div>
                    <div class="details">
                        <div class="detail">
                            <i>📍</i>
                            <span>${job.location}</span>
                        </div>
                        <div class="detail">
                            <i>💰</i>
                            <span class="salary">$${formatSalary(job.salary)}/year</span>
                        </div>
                        <div class="detail">
                            <i>⏱️</i>
                            <span>${job.type === 'fulltime' ? 'Full-time' : 'Part-time'}</span>
                        </div>
                        <div class="detail">
                            <i>📊</i>
                            <span>${experienceMap[job.experience]}</span>
                        </div>
                        <div class="detail">
                            <i>🏢</i>
                            <span>${workTypeMap[job.workType]}</span>
                        </div>
                    </div>
                    <p>${job.description}</p>
                    <a href="#" class="apply-btn">Apply Now</a>
                `;

                jobListings.appendChild(jobCard);
            });
        }

        // Filter jobs based on criteria
        function filterJobs() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedWorkType = document.querySelector('input[name="work-type"]:checked').value;
            const minSalary = parseInt(salaryRange.value);
            const selectedExperience = experienceSelect.value;
            const locationTerm = locationInput.value.toLowerCase();
            
            // Get checked job types
            const selectedJobTypes = [];
            jobTypeCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedJobTypes.push(checkbox.value);
                }
            });

            const filteredJobs = jobs.filter(job => {
                // Search term filter
                const matchesSearch = job.title.toLowerCase().includes(searchTerm) || 
                                      job.company.toLowerCase().includes(searchTerm) ||
                                      job.description.toLowerCase().includes(searchTerm);
                
                // Work type filter
                const matchesWorkType = selectedWorkType === 'any' || job.workType === selectedWorkType;
                
                // Salary filter
                const matchesSalary = job.salary >= minSalary;
                
                // Job type filter
                const matchesJobType = selectedJobTypes.includes(job.type);
                
                // Experience filter
                const matchesExperience = selectedExperience === 'any' || job.experience === selectedExperience;
                
                // Location filter
                const matchesLocation = locationTerm === '' || job.location.toLowerCase().includes(locationTerm);
                
                return matchesSearch && matchesWorkType && matchesSalary && 
                       matchesJobType && matchesExperience && matchesLocation;
            });

            displayJobs(filteredJobs);
        }

        // Event listeners
        searchBtn.addEventListener('click', filterJobs);
        
        // Also filter when pressing Enter in search input
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterJobs();
            }
        });

        // Initial display of all jobs
        displayJobs(jobs);