#  **CP Contest Tracker Platform**

### 📚 **Overview**
This platform helps users keep track of all coding contests happening across major platforms like:  
- 🟡 **LeetCode**  
- 🟠 **CodeChef**  
- 🔵 **Codeforces**  

It shows both **upcoming** and **past** contests with powerful filtering options.  
- 🎯 **Purpose:** Makes it easier for competitive programmers to plan their participation and review past contests.  

---

## 🛠️ **Tech Stack**
### 🎨 **Frontend:**
- React.js + Vite  
- TailwindCSS + ShadCN  
- LocalStorage for bookmarks  

### ⚡️ **Backend:**
- Express.js  
- MongoDB  
- Node-cron for periodic data fetching  

### 🎥 **External APIs:**
- YouTube API for fetching solution videos  

---

---

## 🎨 **Core Features**

✅ **View All Contests:** List of upcoming and past contests.  
✅ **Filters:** Filter by platform — LeetCode, Codeforces, CodeChef, or multiple at once.  
✅ **Bookmark Contests:** Save contests locally in the browser using `localStorage`.  
✅ **Solution Links:** Recent contests include solution videos fetched via YouTube API (powered by TLE Eliminators).  
✅ **Manual Video Linking:** Admins with a secret key can manually insert video links.  

---



## 🕒 **Cron Jobs and Automation**
- Cron jobs run periodically to update contest data from LeetCode, CodeChef, and Codeforces APIs.  
- Recent contest videos are fetched and updated automatically using YouTube API.  
- Cron job every couple of hour to check and update any contests which has happened over the last few hours
---

## 🔐 **Authentication and Security**
✅ **Admin Access:**  
- Manual video insertion is allowed only for **authenticated users**.  
- ✅ Currently uses a **hardcoded secret value** to verify and authenticate admin users.  

✅ **JWT Token for Security:**  
- Upon successful authentication, a JWT token is generated and stored in the user's `localStorage` to maintain secure sessions.  

---



### 🔥 **APIs**
- `GET /contests` — Get all contests.  
- `GET /contests/upcoming` — Gets all upcoming contests, irrespective of the three platforms.
- `GET /leetcode` — Get all upcoming LeetCode contests.  
- `GET /codechef` — Get all upcoming CodeChef contests.  
- `GET /codeforces` — Get all upcoming Codeforces contests.  
- `GET /addVideo` — Exclusive to people with secret code and authentication to put in video links.
- `GET /access` - To verify secret code and authenticate the user

---

## 🚀 **Areas of Improvement**
Although the platform is fully functional, there are some optimizations that can significantly improve performance and scalability:

1. 📚 **Database-Level Pagination:**  
   - Implement pagination at the database level to fetch contests efficiently.  
   - Currently, all objects are fetched in a single instance, which can be optimized using **limit/skip** or **cursor-based pagination** for better performance.  

2. ⚡️ **Client-Side Caching with Zustand/React-Query:**  
   - Utilize a client-side state management library like **Zustand** or **React-Query** to cache contest data.  
   - This will reduce unnecessary API calls and improve load times by maintaining a local cache of fetched contests.  

3. 🎥 **Optimized Video Fetching Mechanism:**  
   - Improve the process of fetching solution videos.  
   - Currently, hardcoded playlist links are used with a cron job running every 6 hours.  
   - Explore dynamic fetching or webhooks to trigger video updates only when necessary, reducing unnecessary API calls.  

---

## 🔮 **Future Scope**
To further enhance the platform and improve user experience, the following feature can be added:

📧 **Email/Calendar Integration for Contest Reminders:**  
   - Allow users to subscribe to specific contests and receive automated email reminders before they start.  
   - Integrate with Google Calendar or Outlook to sync contest schedules directly, ensuring that users never miss a contest.


Will continue to add more ideas...

---

