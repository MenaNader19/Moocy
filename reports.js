// Report data
const reports = [
    
    {
    id: 1,
    title: "Cultural & Creative Industries in Egypt",
    category: "Cultural Economy",
    date: "2023-01-01",
    summary: "Overview of Egypt’s cultural and creative industries (CCI), including strengths, challenges, and recommended action points across social, political, and economic dimensions.",
    pdfUrl: "pdfs/CREACT4MED-Egypt.pdf",
    dataPoints: [
        { label: "Population", value: "102.33 million (2020)" },
        { label: "GDP", value: "$363.06B (2020)" },
        { label: "Unemployment Rate", value: "10.45%" },
        { label: "Youth Unemployment", value: "26.54%" },
        { label: "Female Unemployment", value: "21.33%" }
    ],
    details: {
        overview: "The report explores Egypt’s creative and cultural industries, which are deeply rooted in the nation’s heritage. The industries face challenges such as lack of coordination, legal restrictions, and funding limitations, yet they benefit from rich cultural assets and a young, creative population.",
        keyFindings: [
            "Most CCIs are concentrated in Cairo and Alexandria (95% of cultural events)",
            "Crafts, Design, Publishing, and Digital Media are the most visible sub-sectors",
            "Legal and political constraints hinder artistic freedom and entrepreneurship",
            "Youth are both key consumers and producers of creative content",
            "Digitalization is creating global market access but increasing piracy risks"
        ],
        recommendations: [
            "Promote collaboration among CCI actors and initiatives",
            "Support digital education and skills training for creative entrepreneurs",
            "Leverage Egypt’s heritage and youth creativity for global branding",
            "Reform restrictive laws and support policies beyond the handicraft sector",
            "Establish funding schemes and quality control mechanisms to ensure product viability"
        ]
    }
},
{
        id: 2,
        title: "Q3 Financial Performance Analysis",
        category: "Finance",
        date: "2023-10-15",
        summary: "Comprehensive review of Q3 financial results with key metrics and trends analysis.",
        dataPoints: [
            { label: "Revenue Growth", value: "+12.5% YoY" },
            { label: "Operating Margin", value: "18.2%" },
            { label: "Net Profit", value: "$4.2M" }
        ],
        details: {
            overview: "This report analyzes our financial performance for the third quarter of 2023, comparing results to both previous quarters and year-over-year metrics. Key findings include strong revenue growth but some pressure on margins due to supply chain costs.",
            keyFindings: [
                "Revenue exceeded projections by 3.2%",
                "Operating expenses increased by 8% due to new hires and marketing spend",
                "Accounts receivable days improved to 42 (from 48 last quarter)"
            ],
            recommendations: [
                "Implement stricter cost controls on discretionary spending",
                "Re-evaluate supplier contracts to address margin pressure",
                "Maintain current growth investments in high-performing divisions"
            ]
        }
    }

    
];

// Display all reports initially
displayReports(reports);

// Filter functionality
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
const dateFromInput = document.getElementById('date-from');
const dateToInput = document.getElementById('date-to');
const resetButton = document.getElementById('reset-filters');

[searchInput, categorySelect, dateFromInput, dateToInput].forEach(element => {
    element.addEventListener('input', filterReports);
});

resetButton.addEventListener('click', resetFilters);

function filterReports() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categorySelect.value;
    const dateFrom = dateFromInput.value;
    const dateTo = dateToInput.value;

    const filteredReports = reports.filter(report => {
        // Search term matching
        const matchesSearch = 
            report.title.toLowerCase().includes(searchTerm) ||
            report.category.toLowerCase().includes(searchTerm) ||
            report.summary.toLowerCase().includes(searchTerm) ||
            report.dataPoints.some(dp => dp.label.toLowerCase().includes(searchTerm) || dp.value.toLowerCase().includes(searchTerm));

        // Category matching
        const matchesCategory = category === '' || report.category === category;

        // Date range matching
        let matchesDate = true;
        if (dateFrom && report.date < dateFrom) matchesDate = false;
        if (dateTo && report.date > dateTo) matchesDate = false;

        return matchesSearch && matchesCategory && matchesDate;
    });

    displayReports(filteredReports);
}

function resetFilters() {
    searchInput.value = '';
    categorySelect.value = '';
    dateFromInput.value = '';
    dateToInput.value = '';
    filterReports();
}

// Function to display reports
function displayReports(reportsToDisplay) {
    const container = document.getElementById('reportsContainer');
    
    if (reportsToDisplay.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>No reports found matching your criteria. Try adjusting your filters.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = reportsToDisplay.map(report => `
        <div class="report-card" id="report-${report.id}">
            <div class="report-header">
                <span class="report-category category-${report.category.toLowerCase()}">${report.category}</span>
                <h3 class="report-title">${report.title}</h3>
                <div class="report-date">${formatDate(report.date)}</div>
            </div>
            <p class="report-summary">${report.summary}</p>
            
            <div class="report-data">
                ${report.dataPoints.map(dp => `
                    <div class="data-point">
                        <div class="data-label">${dp.label}</div>
                        <div class="data-value">${dp.value}</div>
                    </div>
                `).join('')}
                <div class="chart-placeholder">Chart: ${report.dataPoints[0].label} vs ${report.dataPoints[1].label}</div>
            </div>
            
            <div class="report-details" id="details-${report.id}">
                <div class="details-content">
                    <div class="details-section">
                        <h4>Overview</h4>
                        <p>${report.details.overview}</p>
                    </div>
                    <div class="details-section">
                        <h4>Key Findings</h4>
                        <ul>
                            ${report.details.keyFindings.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="details-section">
                        <h4>Recommendations</h4>
                        <ul>
                            ${report.details.recommendations.map(r => `<li>${r}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="report-actions">
                <button class="btn btn-outline toggle-details" data-report="${report.id}">
                    <i class="fas fa-chevron-down"></i> View Details
                </button>
                <button class="btn btn-primary download-pdf" data-report="${report.id}">
                    <i class="fas fa-file-pdf"></i> Download PDF
                </button>
            </div>
        </div>
    `).join('');

    // Add event listeners for the newly created elements
    document.querySelectorAll('.toggle-details').forEach(button => {
        button.addEventListener('click', toggleDetails);
    });

    document.querySelectorAll('.download-pdf').forEach(button => {
        button.addEventListener('click', downloadPDF);
    });
}

function toggleDetails(e) {
    const reportId = e.target.getAttribute('data-report');
    const detailsSection = document.getElementById(`details-${reportId}`);
    const button = e.target.closest('.toggle-details');
    
    detailsSection.classList.toggle('expanded');
    
    if (detailsSection.classList.contains('expanded')) {
        button.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Details';
    } else {
        button.innerHTML = '<i class="fas fa-chevron-down"></i> View Details';
    }
}

function downloadPDF(e) {
    const reportId = e.target.getAttribute('data-report');
    const report = reports.find(r => r.id == reportId);
    
    if (report && report.pdfUrl) {
        // فتح الرابط في تبويب جديد أو تحميل مباشر
        const link = document.createElement('a');
        link.href = report.pdfUrl;
        link.download = '';  // يخليه يحمل الملف بدل ما يفتحه
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("PDF file not available for this report.");
    }
}


function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}