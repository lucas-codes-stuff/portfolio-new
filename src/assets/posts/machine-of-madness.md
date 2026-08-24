# a machine of madness: meditations of a morsel

## what does it mean to be an engineer in tod-*ai*-ys society?

---

### about me

hi, my name is Lucas. i have been a software engineer for about 4 years and deeply interested in the space since i was a junior in high school. by all accounts, i am deeply unqualified to discuss the history and trajectory of a topic like this, but opinions are like assholes or whatever it is.

recently i have been writing, living, and *thinking* a lot more in the past year. more recently, what it means to be an engineer in an increasingly unknown space.

<figure class="my-8 flex flex-col items-center">
  <img src="/assets/post-images/book.jpg" alt="Picture of someone holding a book titled 'the thin line between love and hate'" class="rounded-lg shadow-md max-w-[55%]">
  <figcaption class="mt-2 text-sm italic text-gray-400 text-center">
    the book i published in early 2025
  </figcaption>
</figure>

---

### the ZIRP era

if you've been alive for more than 40 seconds in the united states you have probably heard of the housing crisis in 2008 that triggered one of the greatest financial recessions since 1929. as a direct response, the federal government <a href="https://fred.stlouisfed.org/series/FEDFUNDS" target="_blank">dropped interest rates</a> to a low that hadn't been seen in the country's history at 0-0.25%. if i was a business owner as this time i would be champing at the bit to get my hands on this cheap cash. not to mention the tidal wave of capital about to flow from institutional investors straight into venture capital.

<figure class="my-8 flex flex-col items-center">
  <img src="/assets/post-images/fed-interest.jpg" alt="image of a graph" class="rounded-lg shadow-md max-w-full">
  <figcaption class="mt-2 text-sm italic text-gray-400 text-center">
    that line is hugging the floor like they've been married 20 years
  </figcaption>
</figure>

to understand where that money came from, you have to look at limited partners (LPs). a limited partner in a venture capital fund is a passive investor that provides the financial capital for a fund. it is typically university endowments, public pension funds, or sovereign wealth funds. after the crash in '08, treasury bond yields plummeted. because pension funds rely on steady bond yields to meet long-term retirement payouts, this created an existential crisis. to meet those liabilities, LPs abandoned bonds and poured hundreds of billions into high-risk venture funds. thus, the ZIRP era began.

it's no wonder that the majority of the companies that rose to power during this time are still major players: Uber, DoorDash, Slack, Stripe, Zoom, and it goes on and on. once VCs had their hands on these mountains of pension cash, manufacturing paper unicorns was simple: hand a startup $100 million in exchange for 10% equity, and boom! you've "created" a $1 billion "valuation" overnight. the actual return is another story, but the real question is: in the immediate aftermath of a historic economic recession, why were unprofitable software companies suddenly drowning in millions?

---

### the greatness before the fall

i was probably playing with nerf guns during the peak era of ZIRP so i am certain i could not relate to a specific story, but i have seen the movies/shows and heard stories from my co-workers. at that point, being a software engineer was a one-way ticket to, essentially, live at the office. <a href="https://www.cbsnews.com/news/who-pays-for-perks-at-high-tech-companies/#:~:text=A%20software%20company%20called%20Asana%20has%20a%20%2410%2C000%20per%20employee%20allowance%20for%20computer%20and%20office%20furniture%20and%20d%C3%A9cor.%20The%20yoga%20classes%20and%20in%2Dhouse%20chef%20are%20additional." target="_blank">free food</a>, <a href="https://www.inc.com/business-insider/11-incredible-benefits-silicon-valley-tech-companies-offer-amazon-apple.html#:~:text=Facebook%20provides%20%244%2C000%20in%20%E2%80%9Cbaby%20cash%E2%80%9D%20to%20new%20parents%2C%20plus%20reimbursement%20for%20adoption%20or%20egg%2Dfreezing." target="_blank">"baby cash" and egg freezing</a>, and <a href="https://thenextweb.com/news/sweet-if-you-work-for-evernote-you-get-your-house-cleaned-twice-a-month-and-unlimited-vacations" target="_blank">free professional house cleaning</a> were just to name a few perks.

<figure class="my-8 flex flex-col items-center">
  <img src="/assets/post-images/nap-pod.jpg" alt="man sleeping in a MetroNaps nap pod" class="rounded-lg shadow-md max-w-[80%]">
  <figcaption class="mt-2 text-sm italic text-gray-400 text-center">
    don't even get me started on the nap pods. REUTERS/Erin Siegal
  </figcaption>
</figure>

in addition to perks, many companies offered dedicated time to hack on moonshots, including <a href="https://www.theverge.com/2012/11/12/3637786/apple-blue-sky-program-employees-personal-projects" target="_blank">Apple's Blue Sky program</a>, <a href="https://www.atlassian.com/company/shipit" target="_blank">Atlassian's ShipIt</a>, and the notorious Google 20% time (which famously turned to <a href="https://www.theatlantic.com/technology/2013/08/20-time-perk-google-no-more/312063/" target="_blank">"120% time"</a> around 2013).

it wasn't just perks and free time that these companies were burning their money on, and that cash burn didn't just stop once the initial hype died down. from 2008 through the post-COVID boom, these start-ups (and even major players like Google) were throwing their money at whatever stuck. not only was it a type of "golden handcuffs" in order to defensively talent hoard to the point where employees <a href="https://www.businessinsider.com/why-google-employees-live-in-the-parking-lot-2015-10" target="_blank">lived in the parking lot</a>, but it was also a type of "blitzscaling." a term first coined by the co-founder of a little company by the name of LinkedIn, <a href="https://techcrunch.com/2021/10/01/reid-hoffman-on-the-evolution-of-blitzscaling-amid-the-pandemic/" target="_blank">Mr. Reid Hoffman.</a>

essentially, overextending in order to capture the market as fast as possible was the name of the game. companies like Fab, which was <a href="https://qz.com/300825/how-fab-com-went-from-a-1-billion-valuation-to-a-15-million-fire-sale" target="_blank">burning $14 million a month</a> to buy competitors and build warehouses, <a href="https://www.fastcompany.com/3002341/color-failed-what-happens-its-41-million" target="_blank">Color Labs raising $41 million before even launching an app</a>, and the infamous Juicero, which spent millions on designers <a href="https://medium.com/the-launch-path/the-launch-path-a-case-study-f3f72f141845" target="_blank">only to be exposed when users realized they could squeeze the juice packets by hand</a>, are classic examples of the ZIRP era. the valuations mentioned before were an excuse for companies to bleed money. it was no secret that perks and market capture were the main things these companies were spending on. despite the underlying lie of it all, this allowed many engineers to "rest and vest" and develop key skills in their art. until it all came crashing down.

---

### the digital factory and a cognitive paradox

on November 30, 2022, OpenAI released ChatGPT. at the time, it seemed like a cute tool to test out on random projects and maybe introduce into my workflow at my first software engineering job. i soon realized how insanely limited it was and only brought it into usage fully when GPT-4 was released. even then, it could hardly write a simple algorithm to create a triangle of other triangles in React (silly problem i had at work). it feels like yesterday, only now we have agentic engineering, AI slop, and a bubble so big it's eaten the thing that originally created it.

originally, i laughed at the idea of agent harnesses controlling all the software we write, simply reducing us to auditors of a metaphorical 8-year-old with savant syndrome. then, i got to experience it first hand. in many ways, i was in awe. i had what felt like a futuristic, Tony Stark-esque experience right at my fingertips.

<figure class="my-8 flex flex-col items-center">
  <img src="/assets/post-images/jarvis.jpg" alt="Tony Stark in his suit with caption that says 'jarvis, vibe code me a todo list app to make millions. make no mistakes'" class="rounded-lg shadow-md max-w-[80%]">
  <figcaption class="mt-2 text-sm italic text-gray-400 text-center">
    literally me
  </figcaption>
</figure>

in order to squeeze out the slack that developers used to have, companies started to track productivity based on token generation, AI PRs shipped, and ticket throughput. "AI writes the code; engineers just become high-level architects!" *right.* in a four part series by Daniel Westheide, a software consultant with a background combining it with cognitive psychology, we find that, through exploratory research and a fundamental understanding of the cognitive load theory, this falls apart.

drawing on Felienne Hermans' book "The Programmer's Brain", which proposes that <a href="https://www.innoq.com/en/blog/2025/11/ai-cognitive-lens-speed-vs-skill/" target="_blank">expert programmers</a> succeed

> because they have formed extensive schemata—organized knowledge structures—in long-term memory over the years.

however, one major aspect about creating those knowledge structures is that the routine tasks companies are using AI to automate are often the very tasks junior and mid-level engineers used to rely on to build them. management teams mistake the code generated as volume backed by actual engineering capabilities, but the false sense of speed really just obscures the fact that underlying skills are either atrophying or not being developed at all.

in addition, he questions how <a href="https://www.innoq.com/en/blog/2026/03/ai-cognitive-lens-cognitive-load-theory/" target="_blank">cognitive load theory</a> presents in AI usage for software engineers. he states that

> we don't read code line by line when we understand a system; we recognize patterns—schemata—built up over years of practice.

so when he analyzed a study by Anthropic for junior engineers to implement an unknown python package, some surprising results emerged. it seems that the cognitive load with AI use isn't eliminated, it's shifted. users are now forced to reverse engineer and verify generated code. essentially, because AI code lacks human intentionality or idiomatic consistency, you incur high extraneous cognitive load. that is to say, context switching between types of AI slop is a good way to waste your time.

<figure class="my-8 flex flex-col items-center">
  <img src="/assets/post-images/reviewing-ai-code.gif" alt="gif of man in security barely patting people wit the caption 'me reviewing code written by Claude before pushing it to prod'" class="rounded-lg shadow-md max-w-[80%]">
  <figcaption class="mt-2 text-sm italic text-gray-400 text-center">
    the way i be acting with review fatigue
  </figcaption>
</figure>

researchers from the University of Auckland sent a set of questionnaires to 224 engineers to understand the effect of AI coding assistants. between the two surveys, 84% felt improvement in productivity perceptions, <a href="https://arxiv.org/pdf/2605.23135" target="_blank">but those that reported a worsened experience jumped from 14% in the first to 27% in the second.</a> overall, the researchers found a broader shift to verification rather than creation. meanwhile, another <a href="https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=11367630" target="_blank">study</a>, which surveyed 106 volunteers at a Brazilian company, found a productivity paradox. flow state specifically showed that

> while both Copilot and Gemini Code Assist were rated positively for supporting flow... Qualitative accounts indicate that intrusive autocompletions, context loss, and suggestion overload—particularly with Gemini, can disrupt immersion.

this implies that the quantitative research about predicted productivity did not align with the extraneous cognitive load developers felt.

not only is it a worsened experience, but frankly the code outcomes don't seem to be showing real results either:

- <a href="https://arxiv.org/pdf/2605.02741" target="_blank">researchers at Concordia University</a> found that "multiscale analysis—spanning single-file algorithmic tasks and complex, agent-generated systems—identifies a fundamental Reasoning Complexity Trade-off: as models become more capable, they generate increasingly bloated and coupled code. This architectural decay is so pronounced that we establish a Volume-Quality Inverse Law, where code volume is a near-perfect predictor of structural degradation." (this whole paper deserves an article please read it if you have time)
- <a href="https://www.veracode.com/blog/genai-code-security-report/" target="_blank">in VeraCode's 2025 GenAI Code Security Report</a> "45% of code samples failed security tests and introduced OWASP Top 10 security vulnerabilities into the code," among other negative related statistics
- <a href="https://gitclear-public.s3.us-west-2.amazonaws.com/The_Maintainability_Gap_August_2026_GitClear_AI_Research.pdf" target="_blank">GitClear's 2026 AI code quality study</a> found that for every 1,000 meaningful line changes, 73 were long-form duplicated code and 16.3% of code is thrown away within a week despite ~25% of it being AI generated.

what i am trying to say is that the idea that we simply exist as software engineers to design prompts and offload the art of our creations to some bot is a pipe dream. the developer experience and the statistics seem to say so. when money is finally in question so is the speed of the output, and while it is unlikely that a noticeable percentage of engineers joined this craft to painstakingly write code line by line, it is more likely there exists a sizeable percentage that joined simply because they enjoy the idea of creating, and the death of that reality *should* be mourned.

---

### mourn the death of our craft

we should mourn that code used to mean solving something. sure it was mostly for a business objective, but there is no better feeling than knowing you created something that someone can use in order to make their life easier. expressing elegance through logic. making code exist and run cleanly in clearly defined architecture. in the context of AI making us all "architects", while software engineers do not engineer about specific syntax, one cannot simply architect a solution without understanding the physical medium in which a solution is to be crafted. you wouldn't call Michelangelo an artist if all he created were chisels and paintbrushes.

really, in the world of agents all it takes is the cost of the tokens and time in order to make you exist solely as an inspector of a synthetic output. even uncle bob martin doesn't review agent output anymore.

<figure class="my-8 flex flex-col items-center">
  <img src="/assets/post-images/unclebob.jpg" alt="tweet from uncle 'bob martin'" class="rounded-lg shadow-md max-w-[80%]">
  <figcaption class="mt-2 text-sm italic text-gray-400 text-center">
    author of 'Clean Code' and 'Agile Manifesto' btw
  </figcaption>
</figure>

if this isn't a recession indicator i don't know what is to be honest. one of the most foundational (albeit controversial in some ways) engineers — the one who created SOLID — simply doesn't review code anymore. while he is not the end-all, be-all, of whether it's a dead horse with flies eating its brain, i would say its leg is broken, and we are 200 miles from home.

what does that mean for our hollow future — a future where a brittle, bloated system, designed under locally strict but globally weak logic no single human fully understands, is maintained entirely by engineers who feel disconnected from their work? we watch it die, slowly and painfully until the final death rattle in our arms is marked by the slow enshittification of the product you might have dedicated your life to, and you are replaced by a 0 and 1 somewhere far away on a datacenter in Virginia.

---

### reclaiming purpose

software was never magic under capitalism. we are a business asset at the end of the day, which at one time was used by execs as a line item to justify valuations that made no human sense. for me, personal fulfillment was the craft behind the work: understanding what you were making and the impact it had on your community and society as a whole.

so i suggest you recognize your position in it all, and do what you can to reclaim your purpose. if it's just a means to an end to you, congratulations, you have won already. nothing wrong with that. but if this is your passion? build things by hand, demand measurement of our capabilities by real stability, human understanding, and customer feedback.

what *does* it mean to build by hand? obviously, i am not suggesting you ignore the latest tools like a dogmatic Luddite. i think it really means using the deep mental schemata that we develop early in our career. choosing to write by hand to learn like building a side project, contributing to open source, or making your own personal utilities purely for the joy of craftsmanship.

<figure class="my-8 flex flex-col items-center">
  <img src="/assets/post-images/hackathon.jpg" alt="image of a hackathon in a large room" class="rounded-lg shadow-md max-w-[80%]">
  <figcaption class="mt-2 text-sm italic text-gray-400 text-center">
    build because you love it.
  </figcaption>
</figure>

and what does it mean to demand measurements of real stability? push back against token and pr velocity metrics in retros, insist on dedicated refactoring or committed project time, and truly measure the outcomes by user satisfaction and reliability. a maintainable system is what should be our goal as engineers!

when woodworking, ceramics, or shoemaking were taken over by mass production, the artisans didn't die. they perfected their craft and developed an audience that cares about real hands on their product. a real, valued, art form, and outside the corporate software mill, software craftsmanship remains a real, valued art form — and it stays alive as long as we continue to breathe life into it.

---

### other sources not referenced

[Trends in VC Fund Performance](https://angelcapitalassociation.org/blog/trends-in-vc-fund-performance/)
