/**
 * Main JavaScript for Maryam Habeeb - Luxury Real Estate Website
 * 
 * This script handles animations, interactions, and user experience enhancements.
 * It initializes after the DOM content is fully loaded.
 */

// Execute code when DOM is fully loaded to ensure all elements are available
document.addEventListener('DOMContentLoaded', function() {
    /**
     * Save Contact Functionality
     * Creates and downloads a vCard file with contact information including photo
     */
    const saveContactBtn = document.getElementById('save-contact');
    if (saveContactBtn) {
        saveContactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Function to convert image to base64
            function getImageAsBase64(url, callback) {
                const img = new Image();
                img.crossOrigin = 'Anonymous';
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.height = this.naturalHeight;
                    canvas.width = this.naturalWidth;
                    ctx.drawImage(this, 0, 0);
                    const dataURL = canvas.toDataURL('image/jpeg');
                    callback(dataURL.replace(/^data:image\/(png|jpeg);base64,/, ''));
                };
                img.src = url;
            }
            
            // Get the headshot image and create vCard with it
            getImageAsBase64('assets/Headshot.jpeg', function(base64Image) {
                // Create vCard content with Maryam's contact information including photo
                const vCardContent = 
                `BEGIN:VCARD
VERSION:3.0
FN:Maryam Habeeb
N:Habeeb;Maryam;;;
TITLE:Real Estate Agent
TEL;TYPE=CELL:2486172270
EMAIL:Maryam@iconrex.com
URL;TYPE=WORK:https://www.zillow.com/profile/maryam690
URL;TYPE=Instagram:https://www.instagram.com/habeeb.maryam
URL;TYPE=Facebook:https://www.facebook.com/share/1BGdCN1HT3/
URL;TYPE=TikTok:https://www.tiktok.com/@maryamh2199
PHOTO;ENCODING=b;TYPE=JPEG:${base64Image}
END:VCARD`;
                
                // Create a Blob with the vCard content
                const blob = new Blob([vCardContent], { type: 'text/vcard' });
                
                // Create a download link and trigger it
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'maryam_habeeb.vcf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        });
    }
    // Select key elements for animations and interactions
    const profileImage = document.querySelector('.profile-image');
    const profileInfo = document.querySelector('.profile-info');
    const profileLinks = document.querySelector('.profile-links');
    const contactSection = document.querySelector('.contact-section');
    
    /**
     * Initial Animation Setup
     * Set all elements to be invisible initially for fade-in effects
     */
    profileImage.style.opacity = '0';
    profileInfo.style.opacity = '0';
    profileLinks.style.opacity = '0';
    contactSection.style.opacity = '0';
    
    /**
     * Staggered Animation Sequence
     * Add animation classes with progressive delays for a sequential reveal effect
     */
    // Profile image appears first
    setTimeout(() => {
        profileImage.classList.add('fade-in');
    }, 300);
    
    // Profile info slides up second
    setTimeout(() => {
        profileInfo.classList.add('slide-up');
    }, 600);
    
    // Profile links slide up third
    setTimeout(() => {
        profileLinks.classList.add('slide-up');
    }, 900);
    
    // Contact section fades in last
    setTimeout(() => {
        contactSection.classList.add('fade-in');
    }, 1200);
    
    /**
     * Social Icons Hover Effects
     * Adds interactive hover animations to social media icons
     */
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        // Lift icon slightly on hover
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        // Return to original position when hover ends
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    /**
     * Smooth Scrolling for Anchor Links
     * Enables smooth scrolling behavior for any in-page anchor links
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            // Skip empty anchors
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Scroll smoothly to the target element
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});