const courses = [
    {
        id: 1,
        title: "Women's Economic Empowerment in Civil Society",
        category: "Community Development",
        startDate: "2023-11-01",
        duration: "6 weeks",
        summary: "Comprehensive training program for organizations working on women's economic empowerment initiatives.",
        details: {
            overview: "This course provides practical tools for designing and implementing effective economic empowerment programs for women in marginalized communities.",
            curriculum: [
                "Module 1: Fundamentals of Women's Economic Empowerment",
                "Module 2: Designing Sustainable Livelihood Programs",
                "Module 3: Monitoring and Evaluation Frameworks",
                "Module 4: Case Studies from Successful Programs"
            ],
            outcomes: [
                "Develop gender-sensitive program frameworks",
                "Apply best practices in vocational training",
                "Measure program impact effectively"
            ],
            instructor: "Dr. Sarah Johnson, Women's Rights Specialist"
        },
        enrollment: {
            status: "Open",
            deadline: "2023-10-25",
            fee: "$199 (scholarships available)"
        }
    },
    {
        id: 2,
        title: "Digital Advocacy Strategies for NGOs",
        category: "Digital Activism",
        startDate: "2023-11-15",
        duration: "4 weeks",
        summary: "Master digital tools for effective social change campaigns and policy influence.",
        details: {
            overview: "Learn how to leverage social media, digital storytelling, and online mobilization techniques for maximum impact.",
            curriculum: [
                "Module 1: Social Media for Social Change",
                "Module 2: Creating Viral Campaign Content",
                "Module 3: Online Community Building",
                "Module 4: Measuring Digital Impact"
            ],
            outcomes: [
                "Develop multi-platform advocacy strategies",
                "Create engaging digital content",
                "Build and mobilize online communities"
            ],
            instructor: "Michael Chen, Digital Campaigns Expert"
        },
        enrollment: {
            status: "Open",
            deadline: "2023-11-05",
            fee: "$149"
        }
    },
    {
        id: 3,
        title: "Nonprofit Leadership Academy",
        category: "Capacity Building",
        startDate: "2024-01-10",
        duration: "8 weeks",
        summary: "Advanced leadership training for emerging civil society leaders.",
        details: {
            overview: "Transformational leadership program focusing on strategic vision, organizational management, and sustainable impact.",
            curriculum: [
                "Module 1: Leadership in Civil Society",
                "Module 2: Strategic Planning for NGOs",
                "Module 3: Financial Sustainability",
                "Module 4: Team Building and Culture"
            ],
            outcomes: [
                "Develop personal leadership philosophy",
                "Create strategic organizational plans",
                "Master nonprofit financial management"
            ],
            instructor: "David Mwangi, Nonprofit Leadership Coach"
        },
        enrollment: {
            status: "Coming Soon",
            deadline: "2023-12-20",
            fee: "$0"
        }
    }
];

// Display all courses initially
displayCourses(courses);

// Filter functionality
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
const dateFromInput = document.getElementById('date-from');
const statusSelect = document.getElementById('status');

[searchInput, categorySelect, dateFromInput, statusSelect].forEach(element => {
    element.addEventListener('input', filterCourses);
});

function filterCourses() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categorySelect.value;
    const dateFrom = dateFromInput.value;
    const status = statusSelect.value;

    const filteredCourses = courses.filter(course => {
        // Search term matching
        const matchesSearch = 
            course.title.toLowerCase().includes(searchTerm) ||
            course.category.toLowerCase().includes(searchTerm) ||
            course.summary.toLowerCase().includes(searchTerm) ||
            course.details.overview.toLowerCase().includes(searchTerm);

        // Category matching
        const matchesCategory = category === '' || course.category === category;

        // Date range matching
        let matchesDate = true;
        if (dateFrom && course.startDate < dateFrom) matchesDate = false;

        // Status matching
        const matchesStatus = status === '' || course.enrollment.status.toLowerCase() === status.toLowerCase();

        return matchesSearch && matchesCategory && matchesDate && matchesStatus;
    });

    displayCourses(filteredCourses);
}

function resetFilters() {
    searchInput.value = '';
    categorySelect.value = '';
    dateFromInput.value = '';
    statusSelect.value = '';
    filterCourses();
}

// Function to display courses
function displayCourses(coursesToDisplay) {
    const container = document.getElementById('coursesContainer');
    
    if (coursesToDisplay.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>No courses found matching your criteria. Try adjusting your filters.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = coursesToDisplay.map(course => `
        <div class="course-card" id="course-${course.id}">
            <div class="course-header">
                <span class="course-category category-${course.category.toLowerCase().replace(' ', '-')}">${course.category}</span>
                <h3 class="course-title">${course.title}</h3>
                <div class="course-meta">
                    <span class="start-date"><i class="far fa-calendar-alt"></i> Starts: ${formatDate(course.startDate)}</span>
                    <span class="duration"><i class="far fa-clock"></i> Duration: ${course.duration}</span>
                </div>
            </div>
            <p class="course-summary">${course.summary}</p>
            
            <div class="course-details" id="details-${course.id}">
                <div class="details-content">
                    <div class="details-section">
                        <h4>Course Overview</h4>
                        <p>${course.details.overview}</p>
                    </div>
                    <div class="details-section">
                        <h4>Curriculum</h4>
                        <ul>
                            ${course.details.curriculum.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="details-section">
                        <h4>Learning Outcomes</h4>
                        <ul>
                            ${course.details.outcomes.map(outcome => `<li>${outcome}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="instructor-info">
                        <h4>Instructor</h4>
                        <p>${course.details.instructor}</p>
                    </div>
                </div>
            </div>
            
            <div class="enrollment-info">
                <div class="enrollment-status status-${course.enrollment.status.toLowerCase().replace(' ', '-')}">
                    Enrollment: ${course.enrollment.status}
                </div>
                <div class="enrollment-deadline">
                    <i class="far fa-calendar-times"></i> Deadline: ${formatDate(course.enrollment.deadline)}
                </div>
                <div class="course-fee">
                    <i class="fas fa-tag"></i> Fee: ${course.enrollment.fee}
                </div>
            </div>
            
            <div class="course-actions">
                <button class="btn btn-outline toggle-details" data-course="${course.id}">
                    <i class="fas fa-chevron-down"></i> Course Details
                </button>
                <button class="btn btn-primary enroll-now" data-course="${course.id}">
                    <i class="fas fa-user-plus"></i> Enroll Now
                </button>
            </div>
        </div>
    `).join('');

    // Add event listeners
    document.querySelectorAll('.toggle-details').forEach(button => {
        button.addEventListener('click', toggleDetails);
    });

    document.querySelectorAll('.enroll-now').forEach(button => {
        button.addEventListener('click', enrollCourse);
    });
}

function toggleDetails(e) {
    const courseId = e.target.getAttribute('data-course');
    const detailsSection = document.getElementById(`details-${courseId}`);
    const button = e.target.closest('.toggle-details');
    
    detailsSection.classList.toggle('expanded');
    
    if (detailsSection.classList.contains('expanded')) {
        button.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Details';
    } else {
        button.innerHTML = '<i class="fas fa-chevron-down"></i> Course Details';
    }
}

function enrollCourse(e) {
    const courseId = e.target.getAttribute('data-course');
    const course = courses.find(c => c.id == courseId);
    
    // In a real implementation, this would redirect to enrollment page
    alert(`Enrollment process for: ${course.title}\n\nYou would now be redirected to complete your enrollment.`);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}