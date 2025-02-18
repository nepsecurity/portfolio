// Get DOM elements
const addTextBtn = document.getElementById('add-text-btn');
const addImageBtn = document.getElementById('add-image-btn');
const addVideoBtn = document.getElementById('add-video-btn');
const publishBtn = document.getElementById('publish-btn');
const contentBlocks = document.getElementById('content-blocks');
const postsContainer = document.getElementById('posts-container');

// Add Text Block
addTextBtn.addEventListener('click', () => {
    const textBlock = document.createElement('div');
    textBlock.classList.add('content-block');
    textBlock.innerHTML = `
        <textarea placeholder="Write your text here..."></textarea>
        <button class="delete-btn">Delete</button>
    `;
    contentBlocks.appendChild(textBlock);

    // Add delete functionality
    const deleteBtn = textBlock.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        contentBlocks.removeChild(textBlock);
    });
});

// Add Image Block
addImageBtn.addEventListener('click', () => {
    const imageBlock = document.createElement('div');
    imageBlock.classList.add('content-block');
    imageBlock.innerHTML = `
        <input type="file" accept="image/*">
        <button class="delete-btn">Delete</button>
    `;
    contentBlocks.appendChild(imageBlock);

    // Add delete functionality
    const deleteBtn = imageBlock.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        contentBlocks.removeChild(imageBlock);
    });

    // Handle image upload
    const fileInput = imageBlock.querySelector('input');
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imageBlock.innerHTML = `
                    <img src="${e.target.result}" alt="Uploaded Image" class="resizable-image">
                    <button class="delete-btn">Delete</button>
                `;
                // Re-add delete functionality
                imageBlock.querySelector('.delete-btn').addEventListener('click', () => {
                    contentBlocks.removeChild(imageBlock);
                });
                // Make image resizable
                makeResizable(imageBlock.querySelector('.resizable-image'));
            };
            reader.readAsDataURL(file);
        }
    });
});

// Add Video Block
addVideoBtn.addEventListener('click', () => {
    const videoBlock = document.createElement('div');
    videoBlock.classList.add('content-block');
    videoBlock.innerHTML = `
        <input type="text" placeholder="Enter YouTube video URL...">
        <button class="delete-btn">Delete</button>
    `;
    contentBlocks.appendChild(videoBlock);

    // Add delete functionality
    const deleteBtn = videoBlock.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        contentBlocks.removeChild(videoBlock);
    });

    // Handle video URL input
    const videoInput = videoBlock.querySelector('input');
    videoInput.addEventListener('change', (e) => {
        const url = e.target.value;
        if (url) {
            const videoId = url.split('v=')[1];
            videoBlock.innerHTML = `
                <iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                <button class="delete-btn">Delete</button>
            `;
            // Re-add delete functionality
            videoBlock.querySelector('.delete-btn').addEventListener('click', () => {
                contentBlocks.removeChild(videoBlock);
            });
        }
    });
});

// Publish Blog Post
publishBtn.addEventListener('click', () => {
    const post = document.createElement('div');
    post.classList.add('blog-post');

    // Add title (clickable to expand/collapse)
    const titleElement = document.createElement('h3');
    titleElement.textContent = 'Blog Post Title'; // You can add a title input field if needed
    titleElement.classList.add('blog-title');
    titleElement.addEventListener('click', () => {
        post.classList.toggle('expanded');
    });

    // Add content
    const contentElement = document.createElement('div');
    contentElement.classList.add('blog-content');
    contentBlocks.querySelectorAll('.content-block').forEach(block => {
        if (block.querySelector('textarea')) {
            // Text block
            contentElement.innerHTML += `<p>${block.querySelector('textarea').value}</p>`;
        } else if (block.querySelector('img')) {
            // Image block
            contentElement.innerHTML += `<img src="${block.querySelector('img').src}" alt="Blog Image" class="resizable-image">`;
        } else if (block.querySelector('iframe')) {
            // Video block
            contentElement.innerHTML += block.querySelector('iframe').outerHTML;
        }
    });

    // Add edit and delete buttons (only for published posts)
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('blog-buttons');
    buttonsContainer.innerHTML = `
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;

    // Add event listeners for buttons
    const editBtn = buttonsContainer.querySelector('.edit-btn');
    const deleteBtn = buttonsContainer.querySelector('.delete-btn');

    // Edit functionality
    editBtn.addEventListener('click', () => {
        const newContent = prompt('Edit your blog post:', contentElement.textContent);
        if (newContent !== null) {
            contentElement.innerHTML = newContent;
        }
    });

    // Delete functionality
    deleteBtn.addEventListener('click', () => {
        postsContainer.removeChild(post);
    });

    // Append elements to the post
    post.appendChild(titleElement);
    post.appendChild(contentElement);
    post.appendChild(buttonsContainer);

    // Make images resizable
    post.querySelectorAll('.resizable-image').forEach(img => {
        makeResizable(img);
    });

    postsContainer.prepend(post);
    contentBlocks.innerHTML = ''; // Clear editor

    // Ask if the user wants to add the post to the Projects section
    const addToProjects = confirm('Do you want to put this in the Projects section?');
    if (addToProjects) {
        addToProjectsSection(post.innerHTML);
    }
});

// Function to add a post to the Projects section
function addToProjectsSection(postContent) {
    // Save the project to local storage
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(postContent);
    localStorage.setItem('projects', JSON.stringify(projects));

    // Update the Projects section in the portfolio
    updateProjectsSection();
}

// Function to update the Projects section in the portfolio
function updateProjectsSection() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const projectsContainer = document.getElementById('projects-container');

    // Clear existing projects
    projectsContainer.innerHTML = '';

    // Add each project to the Projects section
    projects.forEach((project, index) => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project-card');
        projectElement.innerHTML = `
            ${project}
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;

        // Add remove functionality
        const removeBtn = projectElement.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => {
            removeProject(index);
        });

        projectsContainer.appendChild(projectElement);
    });
}

// Function to remove a project from the Projects section
function removeProject(index) {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.splice(index, 1); // Remove the project at the specified index
    localStorage.setItem('projects', JSON.stringify(projects));
    updateProjectsSection(); // Refresh the Projects section
}

// Function to make images resizable
function makeResizable(image) {
    image.style.resize = 'both';
    image.style.overflow = 'auto';
}

// Load projects when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateProjectsSection();
});