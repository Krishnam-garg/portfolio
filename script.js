document.addEventListener('DOMContentLoaded', () => {

    const typewriterElement = document.getElementById('typewriter');

    const words = [
        "Programming",
        "Web Development",
        "Data Science",
        "Machine Learning"
    ];

    let wordIndex = 0;      // Tracks which word is currently being typed/deleted
    let charIndex = 0;      // Tracks the current character index within the word
    let isDeleting = false; // Flag to know if the text is being deleted or typed

    // Animation speeds and delays (you can tweak these values)
    const typingSpeed = 100;     // Speed (in ms) for typing characters
    const deletionSpeed = 50;    // Speed (in ms) for deleting characters
    const pauseDelay = 1500;     // Pause (in ms) after a word is fully typed

    function type() {
        const currentWord = words[wordIndex];
        let currentTypingSpeed = typingSpeed;

        if (isDeleting) {
            // If deleting, reduce character index
            charIndex--;
            currentTypingSpeed = deletionSpeed; // Use deletion speed
        } else {
            // If typing, increase character index
            charIndex++;
        }

        // Update the text content of the typewriter element
        typewriterElement.textContent = currentWord.substring(0, charIndex);

        // Logic for changing state (typing -> deleting -> next word)
        if (!isDeleting && charIndex === currentWord.length) {
            // Word is fully typed, now pause and then start deleting
            currentTypingSpeed = pauseDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Word is fully deleted, now move to the next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Cycle through the array
            currentTypingSpeed = 200; // Short pause before typing next word
        }

        // Schedule the next character/word animation
        setTimeout(type, currentTypingSpeed);
    }

    // Start the typewriter effect only if the element exists on the page
    if (typewriterElement) {
        type();
    }
    // --- Modal Logic ---
    const modal = document.getElementById("project-modal");
    const closeBtn = document.querySelector(".close-btn");
    const projectBtns = document.querySelectorAll(".project-btn");
    
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const modalTech = document.getElementById("modal-tech");

    // Open modal and populate data when a project tile is clicked
    projectBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            modalTitle.textContent = btn.getAttribute("data-title");
            modalDesc.textContent = btn.getAttribute("data-desc");
            modalTech.textContent = "Tech: " + btn.getAttribute("data-tech");
            modal.style.display = "flex";
        });
    });

    // Close modal on X click
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal if user clicks outside the box
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    
});