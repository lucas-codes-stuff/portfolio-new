# 🎵 The Rise and Pause of Chromatica  
## Building (and Almost Launching) a Mood-Based Music Generator

### ✨ The Dream

It started with a simple but powerful idea: what if music could *amplify* or *soothe* your mood in real time? Feeling joyful? Let’s double down with something energetic and upbeat. Feeling low? Here’s something that understands you. Not just algorithmically, but emotionally.

I've always believed music can be more than background noise. It’s a mirror to how we feel, and sometimes, the thing that helps us feel something new. I wanted to build something that captured that emotional power and bring it to users in a personalized, intelligent way.

I knew this would be ambitious. So I reached out to Kyra Moore. She is a talented developer I met through LinkedIn. We quickly realized we had a complementary vision and skill set, and dove into planning. Our first meeting was all wireframes, napkin-math on neural net usage, and a shared obsession with clean code and great UX.

That idea became **Chromatica!** A web application that would allow users to input their mood, context, or activity, and receive a curated playlist that truly *fit* them. Not just a guess, but something crafted using machine learning and deep audio feature mapping.

---

### 🧠 How It Worked

Chromatica was powered by a browser-based neural network trained to understand a combination of:

- **Emotional states** (happy, sad, anxious, motivated…)
- **Events or activities** (e.g. workout, relaxing, commuting, studying)
- **Music genres** (electronic, lo-fi, indie, ambient, etc.)

We started by generating a base dataset. One that mapped these inputs to the **audio features** that Spotify exposes: things like tempo, energy, danceability, acousticness, and valence. These features describe a song not by genre or title, but by how it *feels*.

Since we didn’t have access to a huge labeled dataset, I leaned on ChatGPT to help generate training pairs. Then I wrote a Python script that varied these values to simulate real-world variance. Think: a “sad + indie” moment might lean toward low energy, high acousticness, and low valence, but there’s wiggle room, so we made sure our model could handle nuance.

We one-hot encoded inputs and normalized the outputs to train the model, and here's the wild part: we ran all of this *in the browser* using TensorFlow.js.

We stored and served models and metadata using **Supabase**, which let us persist user sessions and run serverless functions. When a user selected a mood, event, or genre, we’d feed the encoded array into the model, grab the predicted audio features, then plug them into Spotify’s [recommendation endpoint](https://developer.spotify.com/documentation/web-api/reference/get-recommendations) to fetch matching tracks.

The results? Genuinely impressive. It felt like magic when the system picked songs that *hit* exactly how you wanted to feel.

---

### 🛠️ Building the App

We split the work based on strengths, but collaborated heavily across every feature.

- I built the neural network, data pipelines, and frontend integration using **Angular** and **TensorFlow.js**
- Kyra led the UX strategy and the Spotify integration logic, crafting an interface that was sleek but simple enough for anyone to use
- We both worked on authentication, Supabase integration, and overall app flow
- Every feature was documented and version-controlled — this was a real, launchable product

The UI allowed users to choose a combination of feelings or activities, see mood-based visual transitions, and receive a curated playlist that matched that emotional context. We even had designs for future features — like audio previews, saved sessions, and responsive modals for different listening modes.

By all accounts, **we were at 95%**. Just a few UI refinements and final testing sprints away from soft-launching.

---

### 💔 What Went Wrong

Then... the Spotify API changed.

Specifically, the recommendation endpoint (the one at the *core* of our app) was deprecated. Access became restricted. We didn’t have a production quota extension submitted yet, and suddenly, we had no access.

We tried to pivot... fast. We explored alternate APIs and open music databases, but nothing could match the specificity and flexibility of Spotify's endpoint for this use case. Every workaround either just didn't work with any network changes or added so much complexity it would’ve delayed the project indefinitely.

We were stuck.

And after everything (the excitement, the hours of design, the months of building and refining) we had to step back.

---

### 🧠 What We Learned

The end of Chromatica wasn’t a failure. It was a field test in what it takes to build something innovative with real-world dependencies.

Here’s what we took from it:

- **Third-party APIs aren’t forever.** Stay on top of changelogs, roadmap discussions, and submit production requests early.
- **Dependencies need backups.** If one key feature can break your app, your system isn't resilient enough yet.
- **Collaboration multiplies progress.** This app never would’ve existed without the synergy Kyra and I brought to it.
- **Build to learn.** Even if a project doesn’t launch, the knowledge it creates will pay off in the next one.

---

### 🎯 What’s Next

Chromatica might be on hold, but the core ideas live on.

We’re already thinking about next steps! They’re even more ambitious:

- **Port the concept to AI-generated music**: Instead of pulling from Spotify’s catalog, what if the system composed its own emotional melodies using models like Riffusion or Magenta?
- **Explore wellness integrations**: Could this be part of a journaling or meditation app, where music becomes a therapeutic tool?
- **Use the model in a creative tool**: Let artists or indie creators generate music moods for visual projects. Something like videos, games, or art installations.

I’m also thinking about how we can open-source parts of this. The one-hot encoding strategies, the emotion-to-audio map, even the training logic. Those could help other developers and researchers exploring the emotional side of music + AI.

Chromatica may not have launched, but it’s already shaped the next version of how I build, collaborate, and innovate.

---

### 🙌 Final Words

Chromatica was a bold idea. And even though it didn’t cross the finish line, it changed how I think about building apps.

It reminded me that:
- **Great projects don’t have to be published to be powerful**
- **The right collaborator makes everything better**
- **And even when APIs break, your momentum doesn’t have to**

Onward and upward. 🚀

**→ Got questions about Chromatica? Want to collaborate on something similar? [Let’s connect!](https://github.com/lucas-codes-stuff)**
