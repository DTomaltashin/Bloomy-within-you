interface Quote {
  text: string;
  author: string;
  category?: 'motivation' | 'healing' | 'self-care' | 'resilience' | 'mindfulness' | 'growth';
}

export const quotes: Quote[] = [
  // Mental Health & Healing
  {
    text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious. Having feelings doesn't make you a negative person. It makes you human.",
    author: "Lori Deschene",
    category: "healing"
  },
  {
    text: "Mental health problems don't define who you are. They are something you experience, but they are not you.",
    author: "Unknown",
    category: "healing"
  },
  {
    text: "There is hope, even when your brain tells you there isn't.",
    author: "John Green",
    category: "healing"
  },
  {
    text: "You are not your illness. You have an individual story to tell. You have a name, a history, a personality. Staying yourself is part of the battle.",
    author: "Julian Seifter",
    category: "healing"
  },
  {
    text: "What mental health needs is more sunlight, more candor, and more unashamed conversation.",
    author: "Glenn Close",
    category: "healing"
  },
  {
    text: "The strongest people are those who win battles we know nothing about.",
    author: "Unknown",
    category: "resilience"
  },
  {
    text: "Sometimes the people around you won't understand your journey. They don't need to, it's not for them.",
    author: "Joubert Botha",
    category: "resilience"
  },
  {
    text: "Just because no one else can heal or do your inner work for you doesn't mean you can, should, or need to do it alone.",
    author: "Lisa Olivera",
    category: "healing"
  },

  // Self-Care & Mindfulness
  {
    text: "Self-care is how you take your power back.",
    author: "Lalah Delia",
    category: "self-care"
  },
  {
    text: "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman",
    category: "mindfulness"
  },
  {
    text: "Mindfulness is about being fully awake in our lives. It is about perceiving the exquisite vividness of each moment.",
    author: "Jon Kabat-Zinn",
    category: "mindfulness"
  },
  {
    text: "The present moment is the only time over which we have dominion.",
    author: "Thích Nhất Hạnh",
    category: "mindfulness"
  },
  {
    text: "Self-compassion is simply giving the same kindness to ourselves that we would give to others.",
    author: "Christopher Germer",
    category: "self-care"
  },
  {
    text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
    author: "Buddha",
    category: "self-care"
  },
  {
    text: "Rest when you're weary. Refresh and renew yourself, your body, your mind, your spirit. Then get back to work.",
    author: "Ralph Marston",
    category: "self-care"
  },

  // Growth & Resilience
  {
    text: "Recovery is not one and done. It is a lifelong journey that takes place one day, one step at a time.",
    author: "Unknown",
    category: "growth"
  },
  {
    text: "The wound is the place where the Light enters you.",
    author: "Rumi",
    category: "growth"
  },
  {
    text: "You are braver than you believe, stronger than you seem, and smarter than you think.",
    author: "A.A. Milne",
    category: "motivation"
  },
  {
    text: "It's okay to not be okay. It's not okay to stay that way.",
    author: "Unknown",
    category: "growth"
  },
  {
    text: "Your current situation is not your final destination. The best is yet to come.",
    author: "Unknown",
    category: "motivation"
  },
  {
    text: "Every storm runs out of rain. Every dark night turns into day.",
    author: "Maya Angelou",
    category: "resilience"
  },
  {
    text: "The only way out is through.",
    author: "Robert Frost",
    category: "resilience"
  },
  {
    text: "You have been assigned this mountain to show others it can be moved.",
    author: "Mel Robbins",
    category: "motivation"
  },

  // Hope & Inspiration
  {
    text: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
    author: "Albus Dumbledore",
    category: "motivation"
  },
  {
    text: "Stars can't shine without darkness.",
    author: "Unknown",
    category: "motivation"
  },
  {
    text: "You are allowed to be both a masterpiece and a work in progress simultaneously.",
    author: "Sophia Bush",
    category: "growth"
  },
  {
    text: "Progress, not perfection.",
    author: "Unknown",
    category: "growth"
  },
  {
    text: "Be patient with yourself. Nothing in nature blooms all year.",
    author: "Unknown",
    category: "self-care"
  },
  {
    text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
    author: "Unknown",
    category: "self-care"
  },
  {
    text: "Healing doesn't mean the damage never existed. It means the damage no longer controls our lives.",
    author: "Akshay Dubey",
    category: "healing"
  },
  {
    text: "You are not broken. You are breaking through.",
    author: "Alex Elle",
    category: "growth"
  }
];

export const getRandomQuote = (): Quote => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

export const getQuotesByCategory = (category: Quote['category']): Quote[] => {
  return quotes.filter(quote => quote.category === category);
};

export const getMotivationalQuote = (): Quote => {
  const motivationalQuotes = quotes.filter(quote => 
    quote.category === 'motivation' || quote.category === 'resilience'
  );
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
};

export const getHealingQuote = (): Quote => {
  const healingQuotes = quotes.filter(quote => 
    quote.category === 'healing' || quote.category === 'self-care'
  );
  const randomIndex = Math.floor(Math.random() * healingQuotes.length);
  return healingQuotes[randomIndex];
};