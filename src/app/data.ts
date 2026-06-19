export interface Member {
  id: string;
  name: string;
  role: "teacher" | "student";
  bio: string;
  goals: string;
  platform?: string;
  socials: { label: string; url: string }[];
  gender?: "boy" | "girl";
}

export const teachers: Member[] = [
  {
    id: "jadyn",
    name: "Jadyn",
    role: "teacher",
    bio: "Jadyn is a seasoned content creator with years of experience building engaged communities across multiple platforms. A founding mentor at Blacktop Academy, Jadyn specializes in audience growth strategy, brand deals, and long-form content production.",
    goals: "To empower every student to find their authentic creator voice and turn passion into a sustainable career.",
    platform: "Twitch / YouTube",
    socials: [],
  },
  {
    id: "blake",
    name: "Blake",
    role: "teacher",
    bio: "Blake brings technical mastery and creative storytelling to Blacktop Academy. With a background in production and live streaming, Blake mentors students on broadcast quality, editing workflows, and personal brand development.",
    goals: "To raise the production standard for every creator in the academy and help them stand out in a crowded space.",
    platform: "Twitch / TikTok",
    socials: [],
  },
];

export const students: Member[] = [
  { id: "jeremiah", name: "Jeremiah", role: "student", gender: "boy", bio: "Jeremiah is a competitive gamer and emerging streamer with a passion for FPS titles and community building.", goals: "Grow his channel to 10k followers and land a brand deal.", platform: "Twitch", socials: [] },
  { id: "cassy", name: "Cassy", role: "student", gender: "girl", bio: "Cassy is a lifestyle and gaming creator known for her positive energy and interactive streams.", goals: "Build a loyal community and collaborate with other creators.", platform: "TikTok / Twitch", socials: [] },
  { id: "kamo", name: "Kamo", role: "student", gender: "boy", bio: "Kamo is a multi-game streamer with a knack for entertaining commentary and high-energy content.", goals: "Turn streaming into a full-time career.", platform: "YouTube", socials: [] },
  { id: "cory", name: "Cory", role: "student", gender: "boy", bio: "Cory is a sports gaming specialist who brings authentic reactions and deep game knowledge to every stream.", goals: "Become a recognized name in the sports gaming community.", platform: "Twitch", socials: [] },
  { id: "dee", name: "Dee", role: "student", gender: "girl", bio: "Dee is a creative director at heart — her streams blend fashion, gaming, and real talk in a unique package.", goals: "Develop a personal brand that transcends gaming.", platform: "Instagram / Twitch", socials: [] },
  { id: "payhten", name: "Payhten", role: "student", gender: "girl", bio: "Payhten is a rising variety streamer with a gift for connecting authentically with her audience.", goals: "Hit 5k followers and launch her first merch drop.", platform: "Twitch", socials: [] },
  { id: "sean", name: "Sean", role: "student", gender: "boy", bio: "Sean is a technical wizard behind the stream — great production value paired with competitive gameplay.", goals: "Launch a YouTube channel to complement his streams.", platform: "Twitch / YouTube", socials: [] },
  { id: "t2", name: "T2", role: "student", gender: "boy", bio: "T2 is a high-energy entertainer whose unpredictable streams keep viewers coming back every time.", goals: "Break into the top tier of streamers and collaborate with his idols.", platform: "Twitch", socials: [] },
  { id: "latte", name: "Latte", role: "student", gender: "girl", bio: "Latte brings cozy vibes and competitive spirit to her streams — a rare and winning combination.", goals: "Build a warm, inclusive community around gaming and lifestyle content.", platform: "Twitch", socials: [] },
  { id: "nevaeh", name: "Nevaeh", role: "student", gender: "girl", bio: "Nevaeh is a storyteller who uses streaming as a canvas for creativity, narrative, and self-expression.", goals: "Create a show-style stream format that sets her apart.", platform: "YouTube / TikTok", socials: [] },
  { id: "mooda", name: "Mooda", role: "student", gender: "boy", bio: "Mooda is a laid-back streamer whose authentic personality drives a dedicated and growing fanbase.", goals: "Monetize his channel and turn his hobby into a side income.", platform: "Twitch", socials: [] },
  { id: "jb", name: "Jb", role: "student", gender: "boy", bio: "Jb is a competitive gamer and commentator who brings sharp insight and humor to every session.", goals: "Go pro or become a full-time gaming content creator.", platform: "Twitch / YouTube", socials: [] },
  { id: "james", name: "James", role: "student", gender: "boy", bio: "James is a variety creator who covers gaming, pop culture, and tech — always with something to say.", goals: "Build a brand that crosses entertainment verticals.", platform: "YouTube", socials: [] },
  { id: "dynm", name: "Dynm", role: "student", gender: "boy", bio: "Dynm streams with raw energy and skill — a highlight machine who always delivers memorable moments.", goals: "Grow to 25k and get verified on his platforms.", platform: "Twitch / TikTok", socials: [] },
  { id: "rasalynn", name: "Rasalynn", role: "student", gender: "girl", bio: "Rasalynn is a confident and captivating creator whose streams feel like hanging out with a best friend.", goals: "Host live events and build a brand beyond streaming.", platform: "Twitch / Instagram", socials: [] },
  { id: "maleria", name: "Maleria", role: "student", gender: "girl", bio: "Maleria brings elegance and edge to her content — a creator who commands attention from the first frame.", goals: "Launch a content house and elevate the creators around her.", platform: "YouTube / Twitch", socials: [] },
];

export const allMembers: Member[] = [...teachers, ...students];
