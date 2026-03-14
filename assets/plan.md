Portfolio Website for Praveen R
This plan outlines the development of a highly attractive, modern, and interactive UI/UX portfolio website for Praveen R, a Chemical Engineering student. The design will combine modern UI trends, vibrant color gradients, smooth animations, and glassmorphism.

Proposed Changes
Configuration and Setup
Create project files in c:/Users/PRAVEEN/OneDrive/Documents/website.
Utilize pure HTML, Vanilla CSS, and JavaScript to meet the core technology constraints while ensuring high performance and flexibility without complex build steps.
[Website Core Structure]
[NEW] 
index.html
Main HTML structure outlining the full single-page application.
Sections: Hero, About, Education, Experience, Skills, Projects, Opportunities, Contact, Footer.
Include placeholders for dark-mode toggle, floating navigation, and interactive cursors.
[Styling and Animations]
[NEW] 
style.css
CSS variables for deep blue (#0f172a), electric blue (#3b82f6), cyan (#06b6d4), neon green (#22c55e), and purple gradient (#8b5cf6).
Implementation of glassmorphism utility classes.
Responsive design tailored for mobile, tablet, and desktop views.
Keyframe animations for hover effects, glowing cards, and seamless transitions.
[Interactivity]
[NEW] 
script.js
Typing animation logic for the hero section titles.
Intersection Observer implementation for scroll reveals.
Logic for dynamic floating particles in the background (potentially using a lightweight script).
Progress bar animations triggering upon scroll into the Skills section.
Dark mode toggle implementation saving state in localStorage.
[Assets]
[NEW] 
profile_pic.png
An AI-generated placeholder for Praveen R.
[NEW] 
project_illustration.png
An AI-generated futuristic clean-tech illustration representing the wastewater/hydrogen research project.
Verification Plan
Automated Tests
Running the browser_subagent to open index.html locally and verify the UI aesthetics, including making sure the deep blue, cyan, and neon green colors are correctly rendered, and animations operate seamlessly.
Manual Verification
You can manually review the site by double-clicking index.html in your file explorer (c:/Users/PRAVEEN/OneDrive/Documents/website/index.html) to verify all scroll animations, typing animations, and hover glow effects trigger correctly.
Test responsive layout by viewing on different screen sizes.
Toggle dark/light mode to ensure it applies seamlessly.