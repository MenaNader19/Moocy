// You can add JavaScript functionality here
        document.querySelectorAll('.apply-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const position = this.closest('.opportunity-item').querySelector('h3').textContent;
                alert(`Thank you for your interest in the ${position} position! You will be redirected to the application form.`);
                // In a real implementation, you would redirect to an application page
                // window.location.href = '/apply?position=' + encodeURIComponent(position);
            });
        });