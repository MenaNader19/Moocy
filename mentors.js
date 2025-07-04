// Mentor data
const mentors = [
    {
        name: "Mohamed Ragab Abd El-Satar",
        expertise: "Marketing",
        bio: "Mohamed Ragab Abd El-Satar is a cultural development expert, program designer, and creative writing trainer, with extensive experience in youth empowerment, advocacy campaigns through art, and authorship in poetry and theater.",
        img: "mentor 1.jpg"
    },
    {
        name: "Michael Chen",
        expertise: "Programming",
        bio: "Full-stack developer and coding instructor. I can help you master JavaScript, Python, and web development frameworks to boost your tech career.",
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "David Rodriguez",
        expertise: "Business Architect",
        bio: "Serial entrepreneur and business coach. I've launched 5 successful startups and can guide you through the challenges of building your own business.",
        img: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Mohamed Fawzy Mahmoud",
        expertise: "Founder / CEO of Bubinga Agency",
        bio: "Mohamed Fawzy is an Egyptian event manager, marketer, and cultural leader with extensive experience in organizing international projects, youth empowerment through Erasmus+, and digital transformation initiatives.",
        img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "James Peterson",
        expertise: "Programming",
        bio: "Senior software engineer specializing in mobile app development. I mentor junior developers in iOS and Android platforms.",
        img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Lisa Wong",
        expertise: "Finance",
        bio: "Financial advisor with expertise in personal finance management and investment strategies. I help people achieve financial independence.",
        img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
];

// Display all mentors initially
displayMentors(mentors);

// Search functionality
document.getElementById('search').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredMentors = mentors.filter(mentor => 
        mentor.expertise.toLowerCase().includes(searchTerm) || 
        mentor.name.toLowerCase().includes(searchTerm) ||
        mentor.bio.toLowerCase().includes(searchTerm)
    );
    displayMentors(filteredMentors);
});

// Function to display mentors
function displayMentors(mentorsToDisplay) {
    const container = document.getElementById('mentorsContainer');
    
    if (mentorsToDisplay.length === 0) {
        container.innerHTML = '<div class="no-results">No mentors found matching your search. Try a different keyword.</div>';
        return;
    }
    
    container.innerHTML = mentorsToDisplay.map(mentor => `
        <div class="mentor-card">
            <img src="${mentor.img}" alt="${mentor.name}" class="mentor-img">
            <div class="mentor-info">
                <h3 class="mentor-name">${mentor.name}</h3>
                <span class="mentor-expertise">${mentor.expertise}</span>
                <p class="mentor-bio">${mentor.bio}</p>
                <a href="#" class="book-btn">Book Now</a>
            </div>
        </div>
    `).join('');
}