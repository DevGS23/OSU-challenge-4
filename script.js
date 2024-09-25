document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('blogForm');
    const errorElement = document.getElementById('error');
    const toggleButton = document.getElementById('toggle');
    const backButton = document.getElementById('back');
    const postContainer = document.getElementById('postContainer');

    // Form Submission Logic
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;

            if (!username || !title || !content) {
                errorElement.textContent = 'Please complete the form.';
                return;
            }

            const blogPost = {
                username,
                title,
                content
            };

            const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
            blogPosts.push(blogPost);
            localStorage.setItem('blogPosts', JSON.stringify(blogPosts));

            window.location.href = 'blog.html';
        });
    }

    // Blog Page Logic
    if (postContainer) {
        const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

        if (blogPosts.length === 0) {
            postContainer.innerHTML = '<p>No Blog posts yet...</p>';
        } else {
            blogPosts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                    <p><strong>Author:</strong> ${post.username}</p>
                `;
                postContainer.appendChild(postElement);
            });
        }

        // Back Button Logic
        backButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        // Toggle Light/Dark Mode
        toggleButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }
});
