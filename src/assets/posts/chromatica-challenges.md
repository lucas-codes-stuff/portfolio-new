# chromatica: autopsy of a mood engine

## building and almost launching a mood-based music generator

---

### the dream and the napkin math

it started with a premise that sounds almost naive in hindsight: what if music wasn't just background noise while you churn through tickets, but an actual mirror to how you feel? feeling good? amplify it. feeling like garbage at 2 AM? play something that gets it.

i've always believed music has that kind of raw leverage over human emotion. so i reached out to Kyra Moore, a developer i met on LinkedIn. we had complementary skill sets and a shared delusion that we could actually ship this thing. our first meeting was all napkin-math on neural net compute, wireframes sketched on whatever app we could access, and an obsession with clean UX.

we called it **Chromatica**. the goal was simple: you input your current mood, activity, or context, and instead of relying on generic playlist algorithms, the app would generate a single or sequence of songs mapped strictly to your emotional state using deep audio feature mapping.

---

### how the engine actually ran

the core was a browser-based neural network trained to link three distinct vectors: emotional states, activities, and music genres.

because labeled datasets for human feelings don't just exist sitting cleanly in a public S3 bucket, i leaned on ChatGPT to generate initial training pairs, then wrote a Python script to inject random variance so the model could handle human nuance. a "sad + indie" state meant cranking acousticness up, pulling valence down, and dialing down energy—but leaving room for unpredictable edge cases.

we normalized the outputs, one-hot encoded the inputs, and ran inference directly in the browser using TensorFlow.js. Supabase handled our session persistence and serverless logic. when you selected a mood, the model predicted target audio features—valence, danceability, energy—and fed those straight into Spotify’s recommendation endpoint.

and honestly? when it worked, it felt like black magic. the model picked tracks that hit with eerie emotional precision.

---

### building 95% of a ghost

we split the labor cleanly:

- i handled the Angular frontend, data pipelines, and TensorFlow.js integration
- Kyra spearheaded the UX design and the Spotify integration logic
- we both fought through auth, Supabase schemas, and overall app flow

by all accounts, we were at 95%. the UI had smooth mood transitions, curated outputs, and designs waiting in the wings for saved sessions and modal players. we were one testing sprint away from a soft launch.

---

### the rugpull

then Spotify pulled the plug.

without warning, Spotify deprecated the exact recommendation endpoint our system depended on. access was instantly restricted, our production quota request was stranded, and the core engine of our app turned into a paperweight overnight.

we tried to pivot fast—scouring open music databases and alternative APIs—but nothing offered the granular audio feature mapping Spotify had. every workaround was either too brittle or added so much architectural complexity that it wasn't the same app anymore. we were stuck staring at a polished shell with no engine.

---

### post-mortem

it’s easy to look back at an unlaunched project and call it wasted cycles. but Chromatica was less of a failure and more of an expensive field test in third-party fragility.

if you build your core value proposition on top of someone else's API, you don't own a product—you're renting a sandbox until the landlord changes the locks. submit your quota requests early, build fallbacks before you write feature code, and remember that the real win isn't always the URL you deploy. it's the skills and collaboration you keep when the server goes down.

onward and upward.

---

**→ got questions about Chromatica or want to collaborate on something similar? [let’s connect!](https://github.com/lucas-codes-stuff)**
