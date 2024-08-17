export function generateIdea(): string {
  const ideas = {
    website: "A website",
    app: "An app",
    game: "A game",
    extension: "A browser extension",
    tool: "A productivity tool",
    platform: "An online platform",
    service: "A web service",
    gadget: "A tech gadget",
  };

  const about = {
    website: [
      "about pups",
      "about cats",
      "that generates images using AI",
      "for a social media",
      "for book reviews and recommendations",
      "showcasing local artists from your city/country",
      "for organizing community/local events",
      "that provides educational resources",
      "for sharing recipes and cooking tips",
      "focused on mental health and wellness"
    ],
    app: [
      "for meditation and mindfulness",
      "that gamifies daily chores",
      "for tracking water intake",
      "that helps with time management",
      "for learning a musical instrument",
      "that connects local volunteers with opportunities",
      "for collaborative grocery shopping",
      "that helps reduce digital distractions",
      "for managing personal finances",
      "that offers daily challenges and rewards"
    ],
    game: [
      "that teaches coding concepts",
      "about running a virtual city",
      "about a virtual garden",
      "based on historical events",
      "that improves vocabulary",
      "centered around solving mysteries",
      "about solving puzzles",
      "that explores philosophical concepts",
      "focusing on teamwork and cooperation",
      "that simulates space exploration",
      "set in a post-apocalyptic world",
      "with a focus on narrative storytelling"
    ],
    extension: [
      "for blocking ads and trackers",
      "that summarizes long articles",
      "for managing tabs efficiently",
      "that provides language translation",
      "for customizing website appearances",
      "that tracks time spent on different sites",
      "for quick note-taking while browsing",
      "for scheduling social media posts",
      "that provides accessibility features",
      "for enhancing privacy and security",
      "that integrates with productivity tools"
    ],
    tool: [
      "for automating repetitive tasks",
      "that helps with project management",
      "for tracking fitness progress",
      "that offers advanced analytics",
      "for simplifying code deployment",
      "that assists with digital design",
      "for managing team communications",
      "that aids in learning new skills",
      "for organizing research data",
      "that integrates with various APIs"
    ],
    platform: [
      "for connecting freelancers with clients",
      "that hosts virtual events and meetings",
      "for managing online courses",
      "that supports collaborative workspaces",
      "for sharing and discovering podcasts",
      "that provides real-time data visualization",
      "for hosting open-source projects",
      "that offers community-driven support",
      "for crowdfunding creative projects",
      "that helps with remote team management"
    ],
    service: [
      "for real-time data backup",
      "that provides on-demand technical support",
      "for personal health monitoring",
      "that offers customized learning paths",
      "for managing digital content",
      "that delivers instant translations",
      "for virtual customer service",
      "that helps with event planning",
      "for managing subscription services",
      "that provides financial advisory"
    ],
    gadget: [
      "for tracking physical activity",
      "that integrates with smart home systems",
      "for enhancing virtual reality experiences",
      "that offers health monitoring features",
      "for improving audio quality",
      "that provides real-time navigation",
      "for managing digital photography",
      "that enhances gaming experiences",
      "for optimizing personal productivity",
      "that assists with home automation"
    ]
  };

  const keys = Object.keys(ideas) as Array<keyof typeof ideas>;
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  
  return ideas[randomKey] + " " + about[randomKey][Math.floor(Math.random() * about[randomKey].length)];
}
