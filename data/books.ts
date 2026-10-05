// Auto-generated from legacy data — do not edit by hand.
export interface BookMeta {
  slug: string; title: string;
  testament: 'old' | 'new' | 'extra';
  description: string; image: string;
  videoId?: string; chapters: number;
}

export const BOOKS: BookMeta[] = [
  { slug: 'genesis', title: 'Genesis', testament: 'old', description: 'In the beginning, God created the Heavens and the Earth. ... and the Spirit of God was hovering over the waters.', image: '/images/live-love-cartoon.png', videoId: 'TJlan-pJzfQ', chapters: 50 },
  { slug: 'exodus', title: 'Exodus', testament: 'old', description: 'Honor your father and your mother, so that you may live long in the land the Lord your God is giving you.', image: '/images/live-love-cartoon.png', videoId: 'jH_aojNJM3E', chapters: 41 },
  { slug: 'leviticus', title: 'Leviticus', testament: 'old', description: 'Don\'t seek revenge | bear a grudge against anyone among your people, love your neighbor as yourself. I am the Lord.', image: '/images/live-love-cartoon.png', videoId: 'IJ-FekWUZzE', chapters: 27 },
  { slug: 'numbers', title: 'Numbers', testament: 'old', description: 'The Lord is slow to anger, abounding in love and forgiving sin and rebellion. Yet he does not leave the guilty unpunished', image: '/images/live-love-cartoon.png', videoId: 'tp5MIrMZFqo', chapters: 36 },
  { slug: 'deuteronomy', title: 'Deuteronomy', testament: 'old', description: 'Hear, O Israel, The Lord our God, the Lord is one. Love the Lord your God with all your heart & soul & all your strength', image: '/images/live-love-cartoon.png', videoId: 'q5QEH9bH8AU', chapters: 35 },
  { slug: 'joshua', title: 'Joshua', testament: 'old', description: 'then choose for yourselves this day whom you will serve ... as for me and my household, we will serve the Lord', image: '/images/live-love-cartoon.png', videoId: 'JqOqJlFF_eU', chapters: 25 },
  { slug: 'judges', title: 'Judges', testament: 'old', description: 'And the Angel of the Lord appeared to him and said to him, The Lord is with you, you mighty man of courage', image: '/images/live-love-cartoon.png', videoId: 'kOYy8iCfIJ4', chapters: 22 },
  { slug: 'ruth', title: 'Ruth', testament: 'old', description: 'May you be richly rewarded by the Lord, the God of Israel, under whose wings you have come to take refuge.', image: '/images/live-love-cartoon.png', videoId: '0h1eoBeR4Jk', chapters: 5 },
  { slug: 'samuel-1', title: '1 Samuel', testament: 'old', description: 'There is no one holy like the Lord; there is no one besides you;there is no Rock like our God.', image: '/images/live-love-cartoon.png', videoId: undefined, chapters: 32 },
  { slug: 'samuel-2', title: '2 Samuel', testament: 'old', description: 'Though you are little in your own eyes, aren\'t you the head of the tribes of Israel? The Lord anointed you king over Israel', image: '/images/live-love-cartoon.png', videoId: undefined, chapters: 25 },
  { slug: 'kings-1', title: '1 Kings', testament: 'old', description: 'So be strong, act like a man, and observe what the Lord your God requires: Walk in obedience to him .', image: '/images/live-love-cartoon.png', videoId: undefined, chapters: 23 },
  { slug: 'kings-2', title: '2 Kings', testament: 'old', description: 'Don\'t be afraid. Those  with us are more than those who are with them ..., Open his eyes, LORD, so that he may see', image: '/images/live-love-cartoon.png', videoId: undefined, chapters: 26 },
  { slug: 'chronicles-1', title: '1 Chronicles', testament: 'old', description: 'Tell of all his wonderful acts.Glory in his holy name; let the hearts of those who seek the Lord rejoice.', image: '/images/live-love-cartoon.png', videoId: undefined, chapters: 30 },
  { slug: 'chronicles-2', title: '2 Chronicles', testament: 'old', description: 'He gave them these orders: “You must serve faithfully and wholeheartedly in the fear of the Lord.', image: '/images/live-love-cartoon.png', videoId: undefined, chapters: 37 },
  { slug: 'ezra', title: 'Ezra', testament: 'old', description: 'Praise be to the Lord, the God of our ancestors', image: '/images/live-love-cartoon.png', videoId: undefined, chapters: 11 },
  { slug: 'matthew', title: 'Matthew', testament: 'new', description: 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.', image: '/images/live-love-cartoon.png', videoId: '3Dv4-n6OYGI', chapters: 29 },
  { slug: 'mark', title: 'Mark', testament: 'new', description: 'For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many.', image: '/images/live-love-cartoon.png', videoId: 'HGHqu9-DtXk', chapters: 17 },
  { slug: 'luke', title: 'Luke', testament: 'new', description: 'For the Son of Man came to seek and to save the lost ... Do to others as you would have them do to you.', image: '/images/live-love-cartoon.png', videoId: 'XIb_dCIxzr0', chapters: 17 },
  { slug: 'john', title: 'John', testament: 'new', description: 'I am the way and the truth and the life. No one comes to the Father except through me.', image: '/images/live-love-cartoon.png', videoId: 'G-2e9mMf7E8', chapters: 11 },
  { slug: 'developer', title: 'My Testimony', testament: 'extra', description: '', image: '/images/cover-testimony.jpg', videoId: 'jhcmzjwbvyk', chapters: 4 },
  { slug: 'parables', title: 'Parables of Jesus', testament: 'extra', description: '', image: '/images/cover-parables.jpg', videoId: 'XX-aAg4_U2Q', chapters: 43 },
  { slug: 'enoch-1', title: 'The Book of Enoch', testament: 'extra', description: 'The five lost (hidden) books of Enoch and the Watchers', image: '/images/live-love-cartoon.png', videoId: 'DfXE_ChHTJw', chapters: 37 },
  { slug: 'acts', title: 'Acts', testament: 'new', description: '', image: '/images/cover-acts.jpg', videoId: 'oiVAbkINtRU', chapters: 13 },
  { slug: 'romans', title: 'Romans', testament: 'new', description: '', image: '/images/cover-romans.jpg', videoId: 'ej_6dVdJSIU', chapters: 17 },
];

export const bookBySlug = (slug: string) => BOOKS.find((b) => b.slug === slug);
