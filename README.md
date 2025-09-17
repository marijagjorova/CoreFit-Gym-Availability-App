CoreFit Gym Availability App
## Summary This project presents the development of a Gym Availability App. The application is designed to help users check gym occupancy, manage availability, and reduce overcrowding issues. The app is designed for fitness centers that want to simplify communication with clients, offer online booking, and maintain an interactive relationship with their members.

1. Introduction 
# Background: Many gyms face issues of overcrowding, especially during peak hours. This causes frustration among gym members and reduces the effectiveness of workouts.
# Purpose: The purpose of this project is to create an application that provides gym availability information to users, helping them decide the best times to visit.
# Main Goals
 * Fast user registration and login
 * Calendar for selecting appointments with coaches
 * Easy management of booked sessions
 * Direct communication with the gym
 * Sending news and notifications via email

2. System Requirements
# Hardware Requirements:
 * Smartphone or Computer
 * Internet connection
# Software Requirements:
 * Web browser or mobile OS (Android/iOS)
 * Development frameworks (Vue)
   
3.System Design 
# User Guide
 * Sign Up: Create an account through the “Sign Up” page
 * Login: Enter email and password
 * Book an Appointment: Select a trainer and time in the calendar
 * View Appointments: See all booked sessions in “My Appointments”
 * Contact Us: Fill out the form in “About Us” for questions or comments
 * Subscribe to News: Receive promotions and information via email
# Architecture Diagram
<img width="1215" height="773" alt="diagram" src="https://github.com/user-attachments/assets/6cfb0e87-652f-4b1c-8dd2-f66503bd9ac8" />

4.Features
 * Sign Up – Create a new user account with email and password
 * Login – Access all features using Firebase Authentication
 * Appointment Calendar – Visual overview of available slots and trainers
 * Book a Training Session – Select a time slot which is automatically saved in the Firestore database
 * My Appointments – Personal history of all booked sessions
 * Contact Form (About Us) – Send messages or inquiries to the gym with email response
 * Newsletter Subscription – Sign up to receive news and notifications

5.Implementation
 * Frontend: Vue 3
 * Build Tool: Vite
 * Backend Service: Firebase (Authentication, Firestore Database, Email Service)
 * CSS: Custom styles (style.css)
 * Bootstrap
   
6.Results / Evaluation The app successfully allows users to view gym availability and book slots. Limitations include the lack of integration with real-time sensors and limited notification features.

7.Installation and Running
 1. Clone the project:
 2. git clone <repo-url>
 3. cd gym-app
 4. Install dependencies: npm install
 5. Configure Firebase: Open src/firebase.js and enter your Firebase API keys
 6. Start the application: npm run dev
